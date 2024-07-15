import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import { Table, Button, Modal, Form } from "react-bootstrap";
import "./ViewVender.css";

const ViewVendor = () => {
  const [vendors, setVendors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedVendor, setEditedVendor] = useState({});
  const [validationMessages, setValidationMessages] = useState({});
  const [filteredVendors, setFilteredVendors] = useState([]);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch("http://localhost:8787/api/add-venders");
        if (!response.ok) {
          throw Error("Network response was not ok");
        }
        const data = await response.json();
        setVendors(data);
        setFilteredVendors(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchVendors();
  }, []);

  useEffect(() => {
    const filtered = vendors.filter((vendor) => {
      const vendorName = vendor.vender_Name || "";
      return vendorName.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredVendors(filtered);
  }, [searchTerm, vendors]);

  const handleEditVendor = (vendor) => {
    setEditedVendor(vendor);
    setIsEditing(true);
  };

  const handleDelete = async (vendorId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this vendor?"
    );
    if (confirmed) {
      try {
        const response = await fetch(
          `http://localhost:8787/api/add-venders/${vendorId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        setVendors((prevVendors) =>
          prevVendors.filter((vendor) => vendor._id !== vendorId)
        );
        setFilteredVendors((prevVendors) =>
          prevVendors.filter((vendor) => vendor._id !== vendorId)
        );
        alert("Vendor deleted successfully");
      } catch (error) {
        console.error("Error deleting vendor:", error);
        alert("Error deleting vendor: " + error.message);
      }
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8787/api/add-venders/${editedVendor._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedVendor),
        }
      );

      const responseData = await response.json(); // Parse the JSON response

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
        alert(responseData.message); // Display success message
      } else {
        console.error("Error updating vendor:", response.status);
        alert(responseData.message); // Display error message
      }
    } catch (error) {
      console.error("Error updating vendor:", error);
      alert("Error updating vendor. Please try again.");
    }
  };

  // Validation functions
  const handleAlphaInputChange = (callback) => (event) => {
    const value = event.target.value;
    if (/^[A-Za-z\s]*$/.test(value)) {
      callback(value);
    }
  };

  const handleGstInputChange = (callback) => (event) => {
    const value = event.target.value.toUpperCase();
    const gstRegex = /^\d{2}[A-Z]{5}\d{4}[A-Z][A-Z\d]Z[A-Z\d]$/;

    if (value.length <= 15) {
      callback(value);
      if (value.length === 15 && gstRegex.test(value)) {
        setValidationMessages((prevMessages) => ({
          ...prevMessages,
          GST_No: "",
        }));
      } else {
        setValidationMessages((prevMessages) => ({
          ...prevMessages,
          GST_No:
            "GST number must be exactly 15 characters, alphanumeric, capital letters",
        }));
      }
    }
  };

  const handleNumericChange = (e) => {
    const { name, value } = e.target;

    if (/^\d{0,10}$/.test(value)) {
      setEditedVendor({
        ...editedVendor,
        [name]: value,
      });

      if (name === "vender_Mobile") {
        setValidationMessages(value); // You should define the validateMobileNumber function
      }
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  return (
    <>
      <div className="vendor-Add-container">
        <div className="vendor-main-container">
          <h2 className="View-Corporate-Customer-Rate font-bold">
            View Vendors
          </h2>
          <input
            type="search"
            placeholder="Search By Vendor Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 px-4 border rounded-lg shadow-md mb-4"
          />
          <div className="responsive-over-flow-x-scroll-table">
            <Table>
              <thead>
                <tr>
                  <th>Sr. No.</th>
                  <th>Vendor Name</th>
                  <th>Company Name</th>
                  <th>GST No</th>
                  <th>Mobile</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVendors.map((vendor, index) => (
                  <tr key={vendor._id}>
                    <td>{index + 1}</td>
                    <td>{vendor.vender_Name}</td>
                    <td>{vendor.company_Name}</td>
                    <td>{vendor.GST_No}</td>
                    <td>{vendor.vender_Mobile}</td>
                    <td>{vendor.address}</td>
                    <td>
                      <div className="d-flex align-items-center gap-1">
                        <button
                          className="btn btn-info"
                          onClick={() => handleEditVendor(vendor)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(vendor._id)}
                        >
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
      </div>

      <Modal show={isEditing}>
        <Modal.Header className="d-flex justify-content-between align-items-center mb-2">
          <h2 className="text-2xl font-bold">Edit Vendor</h2>
          <div className="close-icon" onClick={() => setIsEditing(false)}>
            <FaTimes />
          </div>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSave}>
            <Form.Group controlId="formVendorName" className="my-2">
              <Form.Label>Vendor Name</Form.Label>
              <Form.Control
                type="text"
                value={editedVendor.vender_Name}
                onChange={handleAlphaInputChange((value) =>
                  setEditedVendor({
                    ...editedVendor,
                    vender_Name: value,
                  })
                )}
                className={`w-full p-2 mb-2 border`}
              />
            </Form.Group>

            <Form.Group controlId="formCompanyName" className="my-2">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                value={editedVendor.company_Name}
                onChange={handleAlphaInputChange((value) =>
                  setEditedVendor({
                    ...editedVendor,
                    company_Name: value,
                  })
                )}
                className={`w-full p-2 mb-2 border`}
              />
            </Form.Group>

            <Form.Group controlId="formGSTNo" className="my-2">
              <Form.Label>GST No</Form.Label>
              <Form.Control
                type="text"
                value={editedVendor.GST_No}
                onChange={handleGstInputChange((value) =>
                  setEditedVendor({
                    ...editedVendor,
                    GST_No: value,
                  })
                )}
                className={`w-full p-2 mb-2 border`}
              />
            </Form.Group>

            <Form.Group controlId="formMobile" className="my-2">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="text"
                name="vender_Mobile"
                value={editedVendor.vender_Mobile}
                onChange={handleNumericChange}
                className={`w-full p-2 mb-2 border`}
              />
            </Form.Group>
            <Form.Group controlId="formMobile" className="my-2">
              <Form.Label>Email Id</Form.Label>
              <Form.Control
                type="text"
                name="Vender_Email"
                value={editedVendor.Vender_Email}
                onChange={(e) =>
                  setEditedVendor({
                    ...editedVendor,
                    Vender_Email: e.target.value,
                  })
                }
                className={`w-full p-2 mb-2 border`}
              />
            </Form.Group>

            <Form.Group controlId="formAddress" className="my-2">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={editedVendor.address}
                onChange={(e) =>
                  setEditedVendor({
                    ...editedVendor,
                    address: e.target.value,
                  })
                }
                className={`w-full p-2 mb-2 border`}
              />
            </Form.Group>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 ml-2 bg-red-500 text-white rounded"
            >
              Cancel
            </button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ViewVendor;
