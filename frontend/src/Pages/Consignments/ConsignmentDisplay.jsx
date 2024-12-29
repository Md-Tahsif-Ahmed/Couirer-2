import React, { useContext, useEffect, useState } from 'react';
import '../Parcel/label.css';
import Sidebar from '../Shared/Sidebar';
import Navbar from '../Shared/Navbar';
import BSidebar from '../../Delivary_Boy/Shared/Bsidebar';
import ASidebar from '../../Admin_Panel/Shared/Asidebar';
import { AuthContext } from '../../contexts/AuthContext';
import Consignment from './Consignment';
 
 

 
 

const ConsignmentDisplay = () => {
  const { user, token } = useContext(AuthContext);
   

  return (
    <>
      <Navbar />
      <div className="flex">
      {
        user ? (
          <>
            {user?.role === "Admin" ? (
              <ASidebar /> // Renders the Admin Sidebar
            ) : user?.role === "Delivery Boy" ? (
              <BSidebar /> // Renders the Delivery Boy Sidebar
            ) : (
              <Sidebar /> // Default Sidebar for other users
            )}
          </>
        ) : (
          null // You can render something else here if no user is logged in
        )
      }
         <Consignment></Consignment>
      </div>
    </>
  );
};

export default ConsignmentDisplay;
