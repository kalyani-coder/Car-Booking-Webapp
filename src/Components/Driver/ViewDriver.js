import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './ViewDriver.css'; // Make sure you have a CSS file for this component
import { FaEdit, FaTrash, FaTimes  } from 'react-icons/fa'; // Import icons

const TableView = ({ drivers, handleEditDriver, handleDeleteDriver }) => (
  <table className="table">
    <thead>
      <tr>
        <th>Driver Name</th>
        <th>Email</th>
        <th>Address</th>
        <th>Mobile No. 1</th>
        <th>Mobile No. 2</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {drivers.map((driver) => (
        <tr key={driver._id}>
          <td>{driver.driver_Name}</td>
          <td>{driver.driver_Email}</td>
          <td>{driver.address}</td>
          <td>{driver.driver_Mo1}</td>
          <td>{driver.driver_Mo2}</td>
          <td>
            <button className='btn btn-info' onClick={() => handleEditDriver(driver)}>
              <FaEdit/>
            </button>
            <button className='btn btn-danger' onClick={() => handleDeleteDriver(driver._id)}>
              <FaTrash/>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

const ViewDriver = () => {
  const [drivers, setDrivers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedDriver, setEditedDriver] = useState({});
  const [error,setError] = useState({});

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch('http://localhost:10000/api/add-Drivers');
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

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:10000/api/add-Drivers/${editedDriver._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedDriver),
      });

      if (response.ok) {
        setDrivers((prevDrivers) =>
          prevDrivers.map((driver) => (driver._id === editedDriver._id ? editedDriver : driver))
        );
        setIsEditing(false);
        alert('Driver information updated successfully');
      } else {
        console.error('Error updating driver:', response.status);
        alert('Error updating driver. Please try again.');
      }
    } catch (error) {
      console.error('Error updating driver:', error);
      alert('Error updating driver. Please try again.');
    }
  };

  const handleEditDriver = (driver) => {
    setEditedDriver(driver);
    setIsEditing(true);
  };

  const handleDeleteDriver = async (driverId) => {
    const confirmed = window.confirm("Are you sure you want to delete this driver?");
    if (confirmed) {
    try {
      const response = await fetch(`http://localhost:10000/api/add-Drivers/${driverId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

        setDrivers((prevDrivers) => prevDrivers.filter((driver) => driver._id !== driverId));
        alert('Driver deleted successfully');
      } catch (error) {
        console.error('Error deleting driver:', error);
        setError('Error deleting driver: ' + error.message);
      }
    }
  };
  

  return (
    <>
      <Sidebar />
      <div className="driver-Add-container">
        <div className="driver-main-container">
          <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "8px" }}>View Drivers</h2>
          <input
            type="search"
            placeholder="Search By Driver Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 px-4 border rounded-lg shadow-md mb-4"
          />
          <div className="table-responsive">
            <TableView drivers={filteredDrivers} handleEditDriver={handleEditDriver} handleDeleteDriver={handleDeleteDriver} />
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg w-96">
          <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold">Edit Driver</h2>
        <button onClick={() => setIsEditing(false)} className="close-icon">
          <FaTimes />
        </button>
      </div>
            <div className="form-container">
            <h5 className='fw-bold'>Driver Name</h5>
              <input
                type="text"
                value={editedDriver.driver_Name}
                onChange={(e) => setEditedDriver({ ...editedDriver, driver_Name: e.target.value })}
                className="w-full p-2 mb-2 border border-gray-300 rounded"
              />
              <h5 className='fw-bold'>Email</h5>
              <input
                type="text"
                value={editedDriver.driver_Email}
                onChange={(e) => setEditedDriver({ ...editedDriver, driver_Email: e.target.value })}
                className="w-full p-2 mb-2 border border-gray-300 rounded"
              />
              <h5 className='fw-bold'>Address</h5>
              <textarea
                value={editedDriver.address}
                onChange={(e) => setEditedDriver({ ...editedDriver, address: e.target.value })}
                rows="4"
                className="w-full p-2 mb-2 border border-gray-300 rounded"
              />
              <h5 className='fw-bold'>Mobile No</h5>
              <input
                type="text"
                value={editedDriver.driver_Mo1}
                onChange={(e) => setEditedDriver({ ...editedDriver, driver_Mo1: e.target.value })}
                className="w-full p-2 mb-2 border border-gray-300 rounded"
              />
              <h5 className='fw-bold'>Alternate Mobile No</h5>
              <input
                type="text"
                value={editedDriver.driver_Mo2}
                onChange={(e) => setEditedDriver({ ...editedDriver, driver_Mo2: e.target.value })}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
            </div>
            {/* <div className="button-container"> */}
              <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">
                Save
              </button>
              <button onClick={() => setIsEditing(false)} className="px-4 py-2 ml-2 bg-red-500 text-white rounded">
                Cancel
              </button>
              {/* </div> */}
            </div>
        </div>
      )}
    </>
  );
};

export default ViewDriver;
