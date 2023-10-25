import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const toggleSidebar = () => {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('open');
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <h3 className="car-heading">Car Booking</h3>
      </div>

      <div className="logo_details">
        <i className="bx bxl-audible icon"></i>
        <div className="logo_name">Car Booking</div>
        <i className="bx bx-menu" id="btn" onClick={toggleSidebar}></i>
      </div>

      <ul className="nav-list">
        <li>
          <Link to="/home">
            <i className="bx bx-grid-alt"></i>
            <span className="link_name">Home</span>
          </Link>
        </li>

        {/* Customer */}
        <li className="has-submenu">
          <a>
            <i className="bx bx-user"></i>
            <span className="link_name">Customer</span>
          </a>
          <ul className="sub-menu">
            <li>
              <Link to="/addcustomer">
                <i className="bx bx-user"></i>
                <span className="link_name">Add Customer</span>
              </Link>
            </li>
            <li>
              <Link to="/viewcustomer">
                <i className="bx bx-user"></i>
                <span className="link_name">View Customer</span>
              </Link>
            </li>
          </ul>
        </li>

        {/* Vendor */}
        <li className="has-submenu">
          <a>
            <i className="bx bx-user"></i>
            <span className="link_name">Vendor</span>
          </a>
          <ul className="sub-menu">
            <li>
              <Link to="/addvendor">
                <i className="bx bx-user"></i>
                <span className="link_name">Add Vendor</span>
              </Link>
            </li>
            <li>
              <Link to="/viewvendor">
                <i className="bx bx-user"></i>
                <span className="link_name">View Vendor</span>
              </Link>
            </li>
          </ul>
        </li>
         {/* Rate */}
         <li className="has-submenu">
          <a>
            <i className="bx bx-user"></i>
            <span className="link_name">Rate</span>
          </a>
          <ul className="sub-menu">
            <li>
              <Link to="/addrate">
                <i className="bx bx-user"></i>
                <span className="link_name">Add Rate</span>
              </Link>
            </li>
          </ul>
        </li>

        {/* Customer Inquiry */}
        <li className="has-submenu">
          <a>
            <i className="bx bx-user"></i>
            <span className="link_name">Customer Inquiry</span>
          </a>
          <ul className="sub-menu">
            <li>
              <Link to="/customerenquiry">
                <i className="bx bx-user"></i>
                <span className="link_name">Add Customer Inquiry</span>
              </Link>
            </li>
            <li>
              <Link to="/viewcustomerinquiry">
                <i className="bx bx-user"></i>
                <span className="link_name">View Customer Inquiry</span>
              </Link>
            </li>
          </ul>
        </li>

        {/* Trip */}
        <li className="has-submenu">
          <a>
            <i className="bx bx-user"></i>
            <span className="link_name">Trip</span>
          </a>
          <ul className="sub-menu">
            <li>
              <Link to="/addtrip">
                <i className="bx bx-user"></i>
                <span className="link_name">Add Trip</span>
              </Link>
            </li>
            <li>
              <Link to="/viewtrip">
                <i className="bx bx-user"></i>
                <span className="link_name">View Trip</span>
              </Link>
            </li>
          </ul>
        </li>

        {/* Allocate Trip */}
        <li className="has-submenu">
          <a>
            <i className="bx bx-user"></i>
            <span className="link_name">Allocate Trip</span>
          </a>
          <ul className="sub-menu">
            <li>
              <Link to="/tripdetails">
                <i className="bx bx-user"></i>
                <span className="link_name">Allocate Trip</span>
              </Link>
            </li>
            <li>
              <Link to="/viewallocatetrip">
                <i className="bx bx-user"></i>
                <span className="link_name">View Allocate Trip</span>
              </Link>
            </li>
          </ul>
        </li>

        {/* Share Details to Customer */}
        <li className="has-submenu">
          <a>
            <i className="bx bx-user"></i>
            <span className="link_name">Share Details</span>
          </a>
          <ul className="sub-menu">
            <li>
              <Link to="/sharedetails">
                <i className="bx bx-user"></i>
                <span className="link_name">Share Trip Details</span>
              </Link>
            </li>
          </ul>
        </li>

        {/* Get Details from Driver */}
        <li className="has-submenu">
          <a>
            <i className="bx bx-user"></i>
            <span className="link_name">Get Details From Driver</span>
          </a>
          <ul className="sub-menu">
            <li>
              <Link to="/Startenddetails">
                <i className="bx bx-user"></i>
                <span className="link_name">Get Trip Details</span>
              </Link>
            </li>
            <li>
              <Link to="/viewgettripdetails">
                <i className="bx bx-user"></i>
                <span className="link_name">View Get Trip Details</span>
              </Link>
            </li>
          </ul>
        </li>

        {/* Update Duty Slip */}
        <li className="has-submenu">
          <a>
            <i className="bx bx-user"></i>
            <span className="link_name">Update Duty Slip</span>
          </a>
          <ul className="sub-menu">
            <li>
              <Link to="/updateduty">
                <i className="bx bx-user"></i>
                <span className="link_name">Add Duty Slip</span>
              </Link>
            </li>
            <li>
              <Link to="/viewdutyslip">
                <i className="bx bx-user"></i>
                <span className="link_name">View Duty Slip</span>
              </Link>
            </li>
          </ul>
        </li>

        {/* Payment */}
        <li className="has-submenu">
          <a>
            <i className="bx bx-user"></i>
            <span className="link_name">Payment</span>
          </a>
          <ul className="sub-menu">
            <li>
              <Link to="/addpayment">
                <i className="bx bx-user"></i>
                <span className="link_name">Customer Payment</span>
              </Link>
            </li>
            <li>
              <Link to="/viewcustomerpayment">
                <i className="bx bx-user"></i>
                <span className="link_name">View Customer Payment</span>
              </Link>
            </li>
            <li>
              <Link to="/">
                <i className="bx bx-user"></i>
                <span className="link_name">Vendor Payment</span>
              </Link>
            </li>
            <li>
              <Link to="/viewvendorpayment">
                <i className="bx bx-user"></i>
                <span className="link_name">View Vendor Payment</span>
              </Link>
            </li>
          </ul>
        </li>

        {/* Generate Invoice */}
        <li className="has-submenu">
          <a>
            <i className="bx bx-user"></i>
            <span className="link_name">Generate Invoice</span>
          </a>
          <ul className="sub-menu">
            <li>
              <Link to="/customerinvoice">
                <i className="bx bx-user"></i>
                <span className="link_name">Customer Invoice</span>
              </Link>
            </li>
            <li>
              <Link to="/vendorinvoice">
                <i className="bx bx-user"></i>
                <span className="link_name">Vendor Invoice</span>
              </Link>
            </li>
            <li>
              <Link to="/customerinvoicemonthly">
                <i className="bx bx-user"></i>
                <span className="link_name">Customer Monthly Invoice</span>
              </Link>
            </li>
            <li>
              <Link to="/vendorinvoicemonthly">
                <i className="bx bx-user"></i>
                <span className="link_name">Vendor Monthly Invoice</span>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
