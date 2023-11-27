import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './ViewVender.css'; // Make sure you have a CSS file for this component
import { FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const ViewVendor = () => {
  const [vendors, setVendors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedVendor, setEditedVendor] = useState({});
  const [viewType, setViewType] = useState('table');

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch('https://carbooking-backend-fo78.onrender.com/api/add-venders');
        if (!response.ok) {
          throw Error('Network response was not ok');
        }
        const data = await response.json();
        setVendors(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchVendors();
  }, []);

  const filteredVendors = vendors.filter((vendor) => {
    const vendorName = vendor.vender_Name || '';
    return vendorName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleDelete = async (vendorId) => {
    const confirmed = window.confirm("Are you sure you want to delete this vendor?");
    if (confirmed) {
      try {
        const response = await fetch(`https://carbooking-backend-fo78.onrender.com/api/add-venders/${vendorId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        setVendors((prevVendors) => prevVendors.filter((vendor) => vendor._id !== vendorId));
        alert('Vendor deleted successfully');
      } catch (error) {
        console.error('Error deleting vendor:', error);
      }
    }
  };

  const handleEditVendor = (vendor) => {
    setEditedVendor(vendor);
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`https://carbooking-backend-fo78.onrender.com/api/add-venders/${editedVendor._id}`, {
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
        setIsEditing(false);
      } else {
        console.error('Error updating vendor:', response.status);
      }
    } catch (error) {
      console.error('Error updating vendor:', error);
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
                <th>Email</th>
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
                  <td>{vendor.Vender_Email}</td>
                  <td>{vendor.address}</td>
                  <td>
                    <button className="btn btn-info" onClick={() => handleEditVendor(vendor)}>
                      <FaEdit /> 
                    </button>
                    <button className="btn btn-danger" onClick={() => handleDelete(vendor._id)}>
                      <FaTrash /> 
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      <Modal show={isEditing} onHide={() => setIsEditing(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Vendor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formVendorName">
              <Form.Label>Vendor Name</Form.Label>
              <Form.Control
                type="text"
                value={editedVendor.vender_Name}
                onChange={(e) => setEditedVendor({ ...editedVendor, vender_Name: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formCompanyName">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                value={editedVendor.company_Name}
                onChange={(e) => setEditedVendor({ ...editedVendor, company_Name: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formGSTNo">
              <Form.Label>GST No</Form.Label>
              <Form.Control
                type="text"
                value={editedVendor.GST_No}
                onChange={(e) => setEditedVendor({ ...editedVendor, GST_No: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formMobile">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="text"
                value={editedVendor.vender_Mobile}
                onChange={(e) => setEditedVendor({ ...editedVendor, vender_Mobile: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                value={editedVendor.Vender_Email}
                onChange={(e) => setEditedVendor({ ...editedVendor, Vender_Email: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                value={editedVendor.address}
                onChange={(e) => setEditedVendor({ ...editedVendor, address: e.target.value })}
              />
            </Form.Group>

            <button  onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">
              Save
            </button>
            <button  onClick={() => setIsEditing(false)} className="px-4 py-2 ml-2 bg-red-500 text-white rounded">
              Cancel
            </button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ViewVendor;
