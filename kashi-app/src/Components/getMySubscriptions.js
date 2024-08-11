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
                console.log(subscriptions);
            } catch (e) {
                console.error(e);
            }

            setSubscriptions(subscriptions.map(subscription => 
                JSON.stringify(subscription),
            )
            );
        }
    
        fetchSubscriptions("0x44AC194359fA44eCe6Cb2E53E8c90547BCCb95a0", 0);
    }, []);
    
    return (
        <div>
            { subscriptions === null ? <p>Loading...</p> :
            <div>
                <h1>Subscriptions</h1>
                { subscriptions.length === 0 ? <p>No subscriptions found</p> : 
                subscriptions.map((subscription, index) => (
                    <div key={index}>
                        <p> { subscription }</p>
                        <p>Business Id: {subscription.businessId}</p>
                        <p>Tier: {subscription.tierName}</p>
                        <p>Start Date: {subscription.startDateTime}</p>
                        <p>Next Payment Due Date: {subscription.nextPaymentDueDate}</p>
                    </div>
                ))
                }
            </div>
            }
        </div>
    );
    }

export default GetMySubscriptions;