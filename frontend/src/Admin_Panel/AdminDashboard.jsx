import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
};

export default AdminDashboard;