// component to call admin API and display the result

import React, { useState, useEffect } from 'react';
import { kashiContract } from '../DataProviders/kashiContract';

function Admin() {
    const [admin, setAdmin] = useState(null);
    
    useEffect(() => {
        async function fetchAdmin() {
        const contract = kashiContract;
        let admin = await contract.admin();
        setAdmin(admin);
        }
    
        fetchAdmin();
    }, []);
    
    return (
        <div>
        <h1>Admin</h1>
        <p>{admin}</p>
        </div>
    );
    }

export default Admin;