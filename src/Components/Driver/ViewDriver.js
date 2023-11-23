import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './ViewDriver.css'; // Make sure you have a CSS file for this component

const ViewDriver = () => {
  const [drivers, setDrivers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedDriver, setEditedDriver] = useState({});

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch('https://carbooking-backend-fo78.onrender.com/api/add-Drivers');
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
    const Email = driver.driver_Email || '';
    const Address = driver.address || '';
    const MobileNo1 = driver.driver_Mo1 || '';
    const MobileNo2 = driver.driver_Mo2 || '';
    return (
      driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      Email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleEditDriver = (driver) => {
    setEditedDriver(driver);
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`https://carbooking-backend-fo78.onrender.com/api/add-Drivers/${editedDriver._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedDriver),
      });

      if (response.ok) {
        setDrivers(prevDrivers =>
          prevDrivers.map(driver =>
            driver._id === editedDriver._id ? editedDriver : driver
          )
        );
        setIsEditing(false);
      } else {
        console.error('Error updating driver:', response.status);
      }
    } catch (error) {
      console.error('Error updating driver:', error);
    }
  };

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
                key={driver._id}
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
                    <button className='btn btn-info' onClick={() => handleEditDriver(driver)}>Edit</button>
                    {/* <button className='btn btn-danger'>Save</button> */}
                    <button className='btn btn-success'>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-2">Edit Driver</h2>
            <input
              type="text"
              value={editedDriver.driver_Name}
              onChange={(e) => setEditedDriver({ ...editedDriver, driver_Name: e.target.value })}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              value={editedDriver.driver_Email}
              onChange={(e) => setEditedDriver({ ...editedDriver, driver_Email: e.target.value })}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
            <textarea
              value={editedDriver.address}
              onChange={(e) => setEditedDriver({ ...editedDriver, address: e.target.value })}
              rows="4"
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              value={editedDriver.driver_Mo1}
              onChange={(e) => setEditedDriver({ ...editedDriver, driver_Mo1: e.target.value })}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              value={editedDriver.driver_Mo2}
              onChange={(e) => setEditedDriver({ ...editedDriver, driver_Mo2: e.target.value })}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
            <button onClick={() => setIsEditing(false)} className="px-4 py-2 ml-2 bg-red-500 text-white rounded">Cancel</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewDriver;
