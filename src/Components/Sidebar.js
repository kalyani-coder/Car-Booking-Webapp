import React, { useState } from 'react';
import './Sidebar.css';
import { FiMenu, FiX } from 'react-icons/fi'; // Import menu and close icons
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? <FiX className="close-icon" /> : <FiMenu className="hamburger-icon" />}
      </div>
      <div className="sidebar-header">
       Car Booking
      </div>
      <div className="sidebar-menu">
      <ul>
      
      <li>
      <Link to="/home">
       Home
       </Link>
          </li>
          <li>
        <Link to="/sharedetails">

          Share Details
        </Link>
        </li>
        
        <li>
        <Link to="/startenddetails">

          Get Details From Driver
        </Link>
        </li>
        
        <li>
        <Link to="/tripdetails">

          Allocate Trip
        </Link>
        </li>

        <li>
        <Link to="/updateduty">
          Update Duty Slip

          </Link>
          </li>
      

        <li>
        <Link to="/addpayment">

          Add Payment
        </Link>
        </li>

        <li>
        <Link to="/customerenquire">

          Customer Enquiry 
        </Link>
        </li>

        <li>
        <Link to="/customerinvoice">

          Customer Invoice
        </Link>
        </li>

        <li>
        <Link to="/customerinvoicemonthly">

          Customer Invoice Monthly 
        </Link>
        </li>

        <li>
        <Link to="/vendorinvoicemonthly">

         Vender Invoice Monthly 
        </Link>
        </li>

        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
