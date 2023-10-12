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

      <Link to="/home">

<li><a>Home</a></li>
</Link>

        <Link to="/sharedetails">

          <li><a href="#">sharedetails</a></li>
        </Link>

        <Link to="/startenddetails">

          <li><a href="#">sharedetails</a></li>
        </Link>

        <Link to="/tripdetails">

          <li><a href="#">tripdetails</a></li>
        </Link>
        <li>
        <Link to="/updateduty">
          update duty 

          
</Link>

        </li>
      


        <Link to="/addpayment">

          <li><a href="#">addpayment</a></li>
        </Link>
        <li>
        <Link to="/customerenquiry">

          customer Enquiry 
        </Link>
        </li>


        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
