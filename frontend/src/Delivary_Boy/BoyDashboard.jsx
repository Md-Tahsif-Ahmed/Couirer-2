import React from 'react';
import { Outlet } from 'react-router-dom';

const BoyDashboard = () => {
    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
};

export default BoyDashboard;