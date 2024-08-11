// component to call admin API and display the result

import React, { useState, useEffect } from 'react';
import { kashiContract } from '../DataProviders/kashiContract';

function GetMySubscriptions() {
    const [subscriptions, setSubscriptions] = useState(null);
    
    useEffect(() => {
        async function fetchSubscriptions(address, businessId) {
            const contract = kashiContract;
            let subscriptions = []
            try {
                subscriptions = await contract.userSubscriptions(address, businessId);
            } catch (e) {
                console.error(e);
            }

            setSubscriptions({
                businessId: subscriptions.businessId.toNumber(),
                tierName: subscriptions.tierName,
                startDateTime: new Date(subscriptions.startDateTime.toNumber()* 1000).toString(),
                nextPaymentDueDate: new Date(subscriptions.nextPaymentDueDate.toNumber()* 1000).toString(),
            });
        }

        fetchSubscriptions("0x44AC194359fA44eCe6Cb2E53E8c90547BCCb95a0", 0);
    }, []);
    
    return (
        <div>
            { subscriptions === null ? <p>Loading...</p> :
            <div>
                <h1>Active Subscriptions</h1>
                <div>
                    <p>Business Id: {subscriptions.businessId}</p>
                    <p>Tier: {subscriptions.tierName}</p>
                    <p>Start Date: {subscriptions.startDateTime}</p>
                    <p>Next Payment Due Date: {subscriptions.nextPaymentDueDate}</p> 
                </div>
            </div>
            }
        </div>
    );
    }

export default GetMySubscriptions;