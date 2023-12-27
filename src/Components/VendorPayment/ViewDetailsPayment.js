import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';
import {FaTimes } from 'react-icons/fa'; // Import icons

export default function ViewDetailsPayment() {
  const venPayId = useParams();
  const [vendorPayData, setVendorPayData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  

  const fetchData = async () => {
    const id = venPayId._id;

    try {
      const response = await axios.get(`https://carbooking-backend-fo78.onrender.com/api/vender-payment/${id}`);
      setVendorPayData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [venPayId]);

  console.log(vendorPayData);

  const handleCancel = () => {
    // Add logic for cancel action here
    // For example, redirect to another page or go back in history
     // Close the current window
  window.close();
    console.log('Cancel button clicked');
    
  };

  return (
    <>
      <Sidebar />
      <div className="vendor-Add-container">
        <div className="vendor-main-container">
          <h1 className="text-2xl font-semibold mb-4">Vendor Payment Details</h1>
          <input
            type="search"
            placeholder="Search By Vendor Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 px-4 border rounded-lg shadow-md mb-4"
          />
          
          {vendorPayData && (
            <div className="card">
              <div className="card-body">
              <button onClick={handleCancel} className="cancel-button">
              <FaTimes />
            </button>
                <p>Company Name: {vendorPayData.company_Name}</p>
                <p>GST No: {vendorPayData.GST_No}</p>
                <p>Vendor Name: {vendorPayData.vender_Name}</p>
                <p>Mobile Number: {vendorPayData.mobile_Number}</p>
                <p>Payment: {vendorPayData.payment}</p>
                <p>Amount: {vendorPayData.amount}</p>
                <p>TDS: {vendorPayData.tds}</p>
                <p>Total Amount: {vendorPayData.total_Amount}</p>
                <p>Paid Amount: {vendorPayData.paid_Amount}</p>
                <p>Remaining Amount: {vendorPayData.remaining_Amount}</p>
                <p>Payment Method: {vendorPayData.payment_Method}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}