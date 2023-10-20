import React, { useState } from 'react';
import './Sidebar.css';
import { FiMenu, FiX } from 'react-icons/fi'; // Import menu and close icons
import { Link } from 'react-router-dom';

const Sidebar = () => {


  window.onload = function () {
    const sidebar = document.querySelector(".sidebar");
    const closeBtn = document.querySelector("#btn");
    // const searchBtn = document.querySelector(".bx-search")

    closeBtn.addEventListener("click", function () {
      sidebar.classList.toggle("open")
      menuBtnChange()
    })

    // searchBtn.addEventListener("click", function () {
    //   sidebar.classList.toggle("open")
    //   menuBtnChange()
    // })



    function menuBtnChange() {
      if (sidebar.classList.contains("open")) {
        closeBtn.classList.replace("bx-menu", "bx-menu-alt-right")
      } else {
        closeBtn.classList.replace("bx-menu-alt-right", "bx-menu")
      }
    }
  }

 

  return (
    <>

      <div className="sidebar" style={{ overflowY: 'auto' }}>
        <div class="logo_details">
          <i class="bx bxl-audible icon"></i>
          <div class="logo_name">Car Booking</div>
          <i class="bx bx-menu" id="btn"></i>
        </div>
        <ul class="nav-list" >

          {/* <li>
            <i class="bx bx-search" ></i>
            <input type="text" placeholder="Search..." />
            <span class="tooltip">Search</span>
          </li> */}

          <li>
            <Link to={'/home'}>
            <a >
              <i class="bx bx-grid-alt"></i>
              <span class="link_name">Home</span>
            </a>
            </Link>
          </li>


          {/* Customer */}

          <li className="has-submenu">
            <a>
              <i className="bx bx-user"></i>
              <span className="link_name">Customer </span>
            </a>
            <ul className="sub-menu">
              <li>
                <a>
                  <Link to={'/addcustomer'}>
                  <i className="bx bx-user"></i>
                  <span className="link_name">Add Customer</span>
                  </Link>
                </a>
              </li>
              <li>
                <a>
                  <Link to={'/viewcustomer'}>
                  <i className="bx bx-user"></i>
                  <span className="link_name">View Customer</span>
                  </Link>
                </a>
              </li>
            </ul>
          </li>



          <li className="has-submenu">
            <a>
              <i className="bx bx-user"></i>
              <span className="link_name">Vendor</span>
            </a>
            <ul className="sub-menu">
              <li>
                <a>
                  <Link to={'/addvendor'}>
                  <i className="bx bx-user"></i>
                  <span className="link_name">Add Vendor</span>
                  </Link>
                </a>
              </li>
              <li>
                <a>
                  <Link to={'/viewvendor'}>
                  <i className="bx bx-user"></i>
                  <span className="link_name">View Vendor</span>
                  </Link>
                </a>
              </li>
            </ul>
          </li>



            {/* Customer inquiry */}

          <li className="has-submenu">
            <a>
              <i className="bx bx-user"></i>
              <span className="link_name">Customer Inquiry</span>
            </a>
            <ul className="sub-menu">
              <li>
                <a>
                  <Link to={'/customerenquiry'}>
                  <i className="bx bx-user"></i>
                  <span className="link_name">Add Customer Inquiry</span>
                  </Link>
                </a>
              </li>
              <li>
                <a>
                  <Link to={'/viewcustomerinquiry'}>
                  <i className="bx bx-user"></i>
                  <span className="link_name">View Customer Inquiry</span>
                  </Link>
                </a>
              </li>
            </ul>
          </li>

          {/* trip details  */}


          <li className="has-submenu">
            <a>
              <i className="bx bx-user"></i>
              <span className="link_name">Trip Details</span>
            </a>
            <ul className="sub-menu">
              <li>
                <a>
                  <Link to={'/tripdetails'}>
                  <i className="bx bx-user"></i>
                  <span className="link_name">Allocate Trip</span>
                  </Link>
                </a>
              </li>
              <li>
                <a>
                  <i className="bx bx-user"></i>
                  <span className="link_name">View Trip Details</span>
                </a>
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
                <a>
                  <Link to={'/sharedetails'}>
                  <i className="bx bx-user"></i>
                  <span className="link_name">Share Trip Details</span>
                  </Link>
                </a>
              </li>
              {/* <li>
                <a>
                  <i className="bx bx-user"></i>
                  <span className="link_name">View Shared Details</span>
                </a>
              </li> */}
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
                <a>
                  <Link to={'/Startenddetails'}>
                  <i className="bx bx-user"></i>
                  <span className="link_name">Get Trip Details</span>
                  </Link>
                </a>
              </li>
              <li>
                <a>
                  <i className="bx bx-user"></i>
                  <span className="link_name">View Get Trip Details</span>
                </a>
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
                <a>
                  <Link to={'/updateduty'}>
                  <i className="bx bx-user"></i>
                  <span className="link_name">Add Duty Slip</span>
                  </Link>
                </a>
              </li>
              <li>
                <a>
                  <i className="bx bx-user"></i>
                  <span className="link_name">View Duty Slip</span>
                </a>
              </li>
            </ul>
          </li>


          <li className="has-submenu">
            <a>
              <i className="bx bx-user"></i>
              <span className="link_name">Payment </span>
            </a>
            <ul className="sub-menu">
              <li>
                <a>
                  <Link to={'/'}>
                  <i className="bx bx-user"></i>
                  <span className="link_name">Customer Payment</span>
                  </Link>
                </a>
              </li>
              <li>
                <a>
                  <i className="bx bx-user"></i>
                  <span className="link_name">View Customer Payment</span>
                </a>
              </li>
              <li>
                <a>
                  <Link to={'/'}>
                  <i className="bx bx-user"></i>
                  <span className="link_name">Vendor Payment</span>
                  </Link>
                </a>
              </li>
              <li>
                <a>
                  <i className="bx bx-user"></i>
                  <span className="link_name">View Vendor Payment</span>
                </a>
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
                <a>
                  <Link to={'/customerinvoice'}>
                  <i className="bx bx-user"></i>
                  <span className="link_name">Customer Invoice</span>
                  </Link>
                </a>
              </li>
              <li>
              <li>
                <a>
                  <Link to={'/vendorinvoice'}>
                  <i className="bx bx-user"></i>
                  <span className="link_name">Vendor Invoice</span>
                  </Link>
                </a>
              </li>
              <li>
                <a>
                  <Link to={'/customerinvoicemonthly'}>
                  <i className="bx bx-user"></i>
                  <span className="link_name">Customer Monthly Invoice</span>
                  </Link>
                </a>
              </li>
              <li>
                <a>
                  <Link to={'/vendorinvoicemonthly' }>
                  <i className="bx bx-user"></i>
                  <span className="link_name">Vendor Monthly Invoice</span>
                  </Link>
                </a>
                </li>
              </li>
            </ul>
          </li>


          <li class="profile">
            <div class="profile_details">
              <div class="profile_content">
              </div>
            </div>
            <i class="bx bx-log-out" id="log_out"></i>
          </li>

          {/* for addign profile and logout button  */}

          {/* <li class="profile">
        <div class="profile_details">
          <img src="profile.jpeg" alt="profile image"/>
          <div class="profile_content">
            <div class="name">Anna Jhon</div>
            <div class="designation">Admin</div>
          </div>
        </div>
        <i class="bx bx-log-out" id="log_out"></i>
      </li> */}

        </ul>

      </div>

    </>


  );
}

export default Sidebar;