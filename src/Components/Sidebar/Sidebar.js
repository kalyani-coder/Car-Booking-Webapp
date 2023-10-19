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

      <div class="sidebar">
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


          <li className="has-submenu">
            <a>
              <i className="bx bx-user"></i>
              <span className="link_name">Cus Inqury</span>
            </a>
            <ul className="sub-menu">
              <li>
                <a>
                  <Link to={'/customerenquire'}>
                  <i className="bx bx-user"></i>
                  <span className="link_name">Add Cus IN</span>
                  </Link>
                </a>
              </li>
              <li>
                <a>
                  <i className="bx bx-user"></i>
                  <span className="link_name">View Cus IN</span>
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
                  <span className="link_name">Allocate Trip Details</span>
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




          <li>
            <a href="#">
              <i class="bx bx-chat"></i>
              <span class="link_name">Message</span>
            </a>
            <span class="tooltip">Message</span>
          </li>
          <li>
            <a href="#">
              <i class="bx bx-pie-chart-alt-2"></i>
              <span class="link_name">Analytics</span>
            </a>
            <span class="tooltip">Analytics</span>
          </li>
          <li>
            <a href="#">
              <i class="bx bx-folder"></i>
              <span class="link_name">File Manger</span>
            </a>
            <span class="tooltip">File Manger</span>
          </li>
          <li>
            <a href="#">
              <i class="bx bx-cart-alt"></i>
              <span class="link_name">Order</span>
            </a>
            <span class="tooltip">Order</span>
          </li>
          <li>
            <a href="#">
              <i class="bx bx-cog"></i>
              <span class="link_name">Settings</span>
            </a>
            <span class="tooltip">Settings</span>
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