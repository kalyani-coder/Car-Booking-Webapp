import React from 'react'
import Sidebar from '../Sidebar/Sidebar';
import { Link } from 'react-router-dom';

const IndivisualCustomers = () => {
  return (
    <>
    
    <Sidebar />
    <div className="customer-Add-container">
        <div className="customer-main-container">
          <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "8px" }}>View Indivisual Customer</h2>


          <div class="dropdown">
            <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              Customers List
            </a>

            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <Link class="dropdown-item"
                   to='/viewcompanyrate'>View Company Rate
                  
                  </Link>
                {/* <a class="dropdown-item" href="#">Corporate Customers</a> */}
                </li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </div>


    </div>
    </div>
    
    </>
  )
}

export default IndivisualCustomers