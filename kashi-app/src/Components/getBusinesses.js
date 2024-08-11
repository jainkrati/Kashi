// component to call admin API and display the result

import React, { useState, useEffect } from 'react';
import { kashiContract } from '../DataProviders/kashiContract';

function GetBusinesses() {
    const [business, setBusiness] = useState(null);
    
    useEffect(() => {
        async function fetchBusiness(id) {
            const contract = kashiContract;
            let business = await contract.businesses(id);
            console.log(business);

            setBusiness({
                id: business.id.toNumber(),
                name: business.name,
                url: business.url,
                owner: business.owner,
                balance: business.balance.toNumber()
            });
        }
    
        fetchBusiness(1);
    }, []);
    
    return (
        <div>
            { business === null ? <p>Loading...</p> :
            <div>
                <h1>Business Details</h1>
                <p>Id: {business.id}</p>
                <p>Name: {business.name}</p>
                <p>Url: {business.url}</p>
                <p>Owner: {business.owner}</p>
                <p>Balance: {business.balance}</p>
            </div>
            }
        </div>
    );
    }

export default GetBusinesses;