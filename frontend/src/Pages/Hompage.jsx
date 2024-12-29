import React from 'react';
import Sidebar from './Shared/Sidebar';
import Navbar from './Shared/Navbar';
import Menu from './Mainpage/Menu';

const Hompage = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="lg:flex"> 
            <Sidebar></Sidebar>
            <Menu></Menu>
            </div>
     
        </div>
    );
};

export default Hompage;