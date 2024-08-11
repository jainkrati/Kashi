// component to call admin API and display the result

import React, { useState, useEffect } from 'react';
import { kashiContract } from '../DataProviders/kashiContract';

function BusinessSetter({
    setter
}) {
    const [maxBusinessId, setMaxBusinessId] = useState(null);
    function handleChange(event) {
        setter(event.target.value);
    }
    useEffect(() => {
        async function fetchMaxBusinessId() {
            const contract = kashiContract;
            let maxBusinessId = await contract.businessId();
            setMaxBusinessId(maxBusinessId.toNumber() - 1);
        }
    
        fetchMaxBusinessId();
    }, []);
    
    return (
        <div>
            <label>
            Select Business Id:
            { maxBusinessId === null ? <p>Loading...</p> :
            <select name="businessId" onChange={handleChange}>
                {Array.from({length: maxBusinessId}, (v, k) => k+1).map((id) => {
                    return <option value={id}>{id}</option>
                })}
            </select>
            }
            </label>
        </div>
    );
}

export default BusinessSetter;