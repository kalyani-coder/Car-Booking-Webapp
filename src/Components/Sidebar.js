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

          sharedetails
        </Link>
        </li>
        
        <li>
        <Link to="/startenddetails">

          startenddetails
        </Link>
        </li>
        
        <li>
        <Link to="/tripdetails">

          tripdetails
        </Link>
        </li>

        <li>
        <Link to="/updateduty">
          update duty 

          </Link>
          </li>
      

        <li>
        <Link to="/addpayment">

          addpayment
        </Link>
        </li>

        <li>
        <Link to="/customerenquire">

          customer Enquiry 
        </Link>
        </li>

        <li>
        <Link to="/customerinvoice">

          customer Invoice
        </Link>
        </li>

        <li>
        <Link to="/customerinvoicemonthly">

          CustomerInvoice Montholy 
        </Link>
        </li>

        <li>
        <Link to="/vendorinvoicemonthly">

         VenderInvoice Montholy 
        </Link>
        </li>

        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
