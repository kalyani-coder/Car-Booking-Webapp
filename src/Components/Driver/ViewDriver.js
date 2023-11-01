import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './ViewDriver.css'; // Make sure you have a CSS file for this component

const ViewDriver = () => {
  const [drivers, setDrivers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch('http://localhost:7000/api/add-Drivers');
        if (!response.ok) {
          throw Error('Network response was not ok');
        }
        const data = await response.json();
        setDrivers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDrivers();
  }, []);

  const filteredDrivers = drivers.filter((driver) => {
    const driverName = driver.driver_Name || '';
    const Email = driver.email || '';
    const Address = driver.address || '';
    const MobileNo = driver.mobileno || '';
    const Mobileno = driver.mobileno || '';
    return (
      driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      Email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <Sidebar />
      <div className="driver-Add-container">
        <div className="driver-main-container">
        <h2 style={{fontSize:"2rem",fontWeight:"bold",marginBottom:"8px"}}>View Drivers</h2>
          <input
            type="search"
            placeholder="Search By Driver Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 px-4 border rounded-lg shadow-md mb-4"
          />
          <div className="grid grid-cols-3 gap-4">
            {filteredDrivers.map((driver) => (
              <div
                key={drivers._id}
                className="custom-card bg-white shadow-md rounded-lg overflow-hidden"
              >
                <div className="custom-card-body p-4">
                  <p className=" font-semibold ">
                    Driver Name: {driver.driver_Name}
                  </p>
                  <p className="custom-card-subtitle mb-2">
                    Email: {driver.driver_Email}
                  </p>
                  <p className="custom-card-subtitle mb-2">Address: {driver.address}</p>
                  <p className="custom-card-subtitle mb-2">Mobile No: {driver.driver_Mo1}</p>
                  <p className="custom-card-subtitle mb-2">Mobile No: {driver.driver_Mo2}</p>
                  
                  <div className="flex justify-between">
                        

                        <button className='btn btn-info'>Edit</button>
                        <button className='btn btn-danger'>Save</button>
                        <button className='btn btn-success'>Delete</button>
                     
                      </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewDriver;
