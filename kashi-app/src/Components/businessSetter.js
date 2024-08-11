// component to call admin API and display the result

import React, { useState, useEffect } from 'react';
import { kashiContract } from '../DataProviders/kashiContract';

function BusinessSetter({
    setter
}) {
    const [businessId, setBusinessId] = useState(null);
    useEffect(() => {
        async function fetchMaxBusinessId() {
            const contract = kashiContract;
            let maxBusinessId = await contract.businessId();
            setBusinessId(maxBusinessId.toNumber());
        }
    
        fetchMaxBusinessId();
    }, []);
    
    return (
        <div>
            <label>
            Select Business Id:
            { businessId === null ? <p>Loading...</p> :
            <select name="businessId" onChange={setter}>
                {
                    let newArray = [];
                    for (let i = 0; i < number; i++) {
                        newArray.push(i + 1);
                    }
                    newArray.map((i) => {
                    <option value={i}>{i}</option>
                })}
            </select>
            }
            </label>

        <h1>Business Id: {businessId}</h1>
        </div>
    );
    }

export default BusinessSetter;