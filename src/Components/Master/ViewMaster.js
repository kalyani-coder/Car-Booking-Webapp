import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { FaEdit, FaTrash, FaTimes } from 'react-icons/fa';

const ViewMaster = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedMaster, setEditedMaster] = useState({
    _id: '',
    add_vehicle: '',
    add_duty_type: '',
    add_rate: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:8787/api/masterrate')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const handleEdit = (master) => {
    setEditedMaster(master);
    setIsEditing(true);
  };

  const handleSaveMaster = async () => {
    try {
      if (!editedMaster._id) {
        throw new Error('No _id field found on editedMaster');
      }
  
      // Optimistically update the local state immediately
      setData((prevData) =>
        prevData.map((master) => (master._id === editedMaster._id ? editedMaster : master))
      );
  
      const response = await fetch(`http://localhost:8787/api/masterrate/${editedMaster._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedMaster),
      });
  
      if (response.ok) {
        const updatedMaster = await response.json();
  
        // Update local state with the server's response to ensure consistency
        setData((prevData) =>
          prevData.map((master) => (master._id === updatedMaster._id ? updatedMaster : master))
        );
  
        setIsEditing(false);
        // setSuccessMessage('Master data updated successfully');
        setErrorMessage('');
  
        // Assuming you want to display an alert or toast for success
        alert('Master data updated successfully');
      } else {
        const errorResponse = await response.text(); // Log server response text
        console.error('Error updating master:', response.status, errorResponse);
        setErrorMessage('Error updating master. Please try again.');
        setSuccessMessage('');
  
        // Revert the optimistic update if server update fails
        setData((prevData) =>
          prevData.map((master) => (master._id === editedMaster._id ? prevData.find(m => m._id === editedMaster._id) : master))
        );
      }
    } catch (error) {
      console.error('Error updating master:', error);
      // setErrorMessage('Error updating master. Please try again.');
      setSuccessMessage('');
  
      // Revert the optimistic update if an exception occurs
      setData((prevData) =>
        prevData.map((master) => (master._id === editedMaster._id ? prevData.find(m => m._id === editedMaster._id) : master))
      );
    }
  };
  
  
  
  
  
  

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this master?");
    if (confirmed) {
      try {
        const response = await fetch(`http://localhost:8787/api/masterrate/${id}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          setData((prevData) => prevData.filter((master) => master._id !== id));
          alert('Master deleted successfully');
        } else {
          const errorResponse = await response.text(); // Log server response text
          console.error('Error deleting master:', response.status, errorResponse);
          setErrorMessage('Error deleting master. Please try again.');
        }
      } catch (error) {
        console.error('Error deleting master:', error);
        setErrorMessage('Error deleting master: ' + error.message);
      }
    }
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Sidebar />
      <div className="customer-Add-container">
        <div className="customer-main-container">
          <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "8px" }}>View Master</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Sr No</th>
                <th>Vehicle</th>
                <th>Duty Type</th>
                <th>Rate</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.add_vehicle}</td>
                  <td>{item.add_duty_type}</td>
                  <td>{item.add_rate}</td>
                  <td>
                    <div className="d-flex align-items-center gap-1">
                      <button className='btn btn-info' onClick={() => handleEdit(item)}>
                        <FaEdit />
                      </button>
                      <button className='btn btn-danger' onClick={() => handleDelete(item._id)}>
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isEditing && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg w-96">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-2xl font-bold">Edit Master</h2>
              <button onClick={() => setIsEditing(false)} className="close-icon">
                <FaTimes />
              </button>
            </div>
            <h5 className='fw-bold my-2'>Vehicle</h5>
            <input
              type="text"
              value={editedMaster.add_vehicle}
              onChange={(e) => setEditedMaster({ ...editedMaster, add_vehicle: e.target.value })}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
            <h5 className='fw-bold my-2'>Duty Type</h5>
            <input
              type="text"
              value={editedMaster.add_duty_type}
              onChange={(e) => setEditedMaster({ ...editedMaster, add_duty_type: e.target.value })}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
            <h5 className='fw-bold my-2'>Rate</h5>
            <input
              type="text"
              value={editedMaster.add_rate}
              onChange={(e) => setEditedMaster({ ...editedMaster, add_rate: e.target.value })}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
            <button onClick={handleSaveMaster} className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
            <button onClick={() => setIsEditing(false)} className="px-4 py-2 ml-2 bg-red-500 text-white rounded">Cancel</button>
            {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
            {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
          </div>
        </div>
      )}
    </>
  );
};

export default ViewMaster;
