// component to call admin API and display the result

import React, { useState, useEffect } from "react";
import { kashiContract } from "../DataProviders/kashiContract";

function BusinessSetter({ setter }) {
  const [businessId, setBusinessId] = useState(null);
  function handleChange(event) {
    setter(event.target.value);
  }
  useEffect(() => {
    async function fetchMaxBusinessId() {
      const contract = kashiContract;
      let maxBusinessId = await contract.businessId();
      setBusinessId(maxBusinessId.toNumber() - 1);
    }

    fetchMaxBusinessId();
  }, []);

  return (
    <div>
      <label>
        Select Business Id:
        {businessId === null ? (
          <p>Loading...</p>
        ) : (
          <select name="businessId" onChange={handleChange}>
            {Array.from({ length: businessId }, (_, i) => i + 1).map((i) => {
              <option value={i}>{i}</option>;
            })}
          </select>
        )}
      </label>
    </div>
  );
}

export default BusinessSetter;
