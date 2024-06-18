import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './ViewVender.css'; // Make sure you have a CSS file for this component
import { FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const ViewVendor = () => {
  const [vendors, setVendors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedVendor, setEditedVendor] = useState({});
  const [viewType, setViewType] = useState('table');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [filteredVendors, setFilteredVendors] = useState([]);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch('http://localhost:8787/api/add-venders');
        if (!response.ok) {
          throw Error('Network response was not ok');
        }
        const data = await response.json();
        setVendors(data);
        // Initialize filteredVendors with all vendors on first load
        setFilteredVendors(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchVendors();
  }, []);

  // Update filteredVendors when searchTerm changes
  useEffect(() => {
    const filtered = vendors.filter((vendor) => {
      const vendorName = vendor.vender_Name || '';
      return vendorName.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredVendors(filtered);
  }, [searchTerm, vendors]); // Include vendors as a dependency here

  const handleEditVendor = (vendor) => {
    setEditedVendor(vendor);
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:8787/api/add-venders/${editedVendor._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedVendor),
      });

      if (response.ok) {
        setVendors((prevVendors) =>
          prevVendors.map((vendor) =>
            vendor._id === editedVendor._id ? editedVendor : vendor
          )
        );
        setFilteredVendors((prevFilteredVendors) =>
          prevFilteredVendors.map((vendor) =>
            vendor._id === editedVendor._id ? editedVendor : vendor
          )
        );
        setIsEditing(false);
        alert('Vendor data updated successfully');
        setErrorMessage('');
      } else {
        console.error('Error updating vendor:', response.status);
        setSuccessMessage('');
        setErrorMessage('Error updating vendor. Please try again.');
      }
    } catch (error) {
      console.error('Error updating vendor:', error);
      setSuccessMessage('');
      setErrorMessage('Error updating vendor. Please try again.');
    }
  };

  const handleDelete = async (vendorId) => {
    console.log(`Attempting to delete vendor with ID: ${vendorId}`); // Log vendor ID being deleted
    const confirmed = window.confirm('Are you sure you want to delete this vendor?');
    if (confirmed) {
      try {
        console.log('User confirmed deletion. Sending DELETE request...');
        const response = await axios.delete(`http://localhost:8787/api/add-venders/${vendorId}`);
    
        console.log('DELETE request sent. Awaiting response...');
        if (response.status !== 200) {
          console.log(`Unexpected response status: ${response.status}`);
          throw new Error('Network response was not ok');
        }
    
        console.log('Vendor deleted successfully on server.');
        // Update vendors state to remove the deleted vendor
        setVendors((prevVendors) => {
          console.log('Updating vendors state...');
          return prevVendors.filter((vendor) => vendor._id !== vendorId);
        });
        setFilteredVendors((prevFilteredVendors) => {
          console.log('Updating filtered vendors state...');
          return prevFilteredVendors.filter((vendor) => vendor._id !== vendorId);
        });
        alert('Vendor deleted successfully');
      } catch (error) {
        console.error('Error deleting vendor:', error);
        alert('Error deleting vendor. Please check console for details.');
  
        // Optionally, revert the state changes if deletion fails
        // You can handle this based on your application's requirements
        // Fetch vendors again or update state to reflect the actual server state
      }
    } else {
      console.log('User canceled the deletion.');
    }
  };
  
  


  return (
    <>
      <Sidebar />
      <div className="vendor-Add-container">
        <div className="vendor-main-container">
          <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "8px" }}>View Vendors</h2>
          <input
            type="search"
            placeholder="Search By Vendor Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 px-4 border rounded-lg shadow-md mb-4"
          />

          <Table>
            <thead>
              <tr>
                <th>Vendor Name</th>
                <th>Company Name</th>
                <th>GST No</th>
                <th>Mobile</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVendors.map((vendor) => (
                <tr key={vendor._id}>
                  <td>{vendor.vender_Name}</td>
                  <td>{vendor.company_Name}</td>
                  <td>{vendor.GST_No}</td>
                  <td>{vendor.vender_Mobile}</td>
                  <td>{vendor.address}</td>
                  <td>
                    <div className="d-flex align-items-center gap-1">
                      <button className="btn btn-info" onClick={() => handleEditVendor(vendor)}>
                        <FaEdit />
                      </button>
                      <button className="btn btn-danger" onClick={() => handleDelete(vendor._id)}>
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      <Modal show={isEditing}>
        <Modal.Header className="d-flex justify-content-between align-items-center mb-2">
          <h2 className="text-2xl font-bold">Edit Vendor</h2>
          <div className="close-icon" onClick={() => setIsEditing(false)}>
            <FaTimes />
          </div>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formVendorName" className="my-2">
              <Form.Label>Vendor Name</Form.Label>
              <Form.Control
                type="text"
                value={editedVendor.vender_Name}
                onChange={(e) => setEditedVendor({ ...editedVendor, vender_Name: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formCompanyName" className="my-2">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                value={editedVendor.company_Name}
                onChange={(e) => setEditedVendor({ ...editedVendor, company_Name: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formGSTNo" className="my-2">
              <Form.Label>GST No</Form.Label>
              <Form.Control
                type="text"
                value={editedVendor.GST_No}
                onChange={(e) => setEditedVendor({ ...editedVendor, GST_No: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formMobile" className="my-2">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="text"
                value={editedVendor.vender_Mobile}
                onChange={(e) => setEditedVendor({ ...editedVendor, vender_Mobile: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="my-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                value={editedVendor.Vender_Email}
                onChange={(e) => setEditedVendor({ ...editedVendor, Vender_Email: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formAddress" className="my-2">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                value={editedVendor.address}
                onChange={(e) => setEditedVendor({ ...editedVendor, address: e.target.value })}
              />
            </Form.Group>

            <Button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">
              Save
            </Button>
            <Button onClick={() => setIsEditing(false)} className="px-4 py-2 ml-2 bg-red-500 text-white rounded">
              Cancel
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Display success message */}
      {successMessage && (
        <div className="alert alert-success fixed bottom-4 right-4">
          {successMessage}
        </div>
      )}
    </>
  );
};

export default ViewVendor;
