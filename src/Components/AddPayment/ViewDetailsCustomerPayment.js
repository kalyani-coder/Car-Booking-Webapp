import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';
import { FaTimes } from 'react-icons/fa'; // Import icons

export default function ViewDetailsCustomerPayment() {
  const custPayId = useParams();
  const [customerPayData, setCustomerPayData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async () => {
    const id = custPayId._id;

    try {
      const response = await axios.get(`https://carbooking-backend-fo78.onrender.com/api/customer-payment/${id}`);
      setCustomerPayData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [custPayId]);

  console.log(customerPayData);

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
      <div className="customer-Add-container">
        <div className="customer-main-container">
          <h1 className="text-2xl font-semibold mb-4">Customer Payment Details</h1>
          <input
            type="search"
            placeholder="Search By Customer Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 px-4 border rounded-lg shadow-md mb-4"
          />

          {customerPayData && (
            <div className="card">
              <div className="card-body">
                <button onClick={handleCancel} className="cancel-button">
                  <FaTimes />
                </button>
                <p>Company Name: {customerPayData.company_Name}</p>
                <p>GST No: {customerPayData.GST_No}</p>
                <p>Reporting Address: {customerPayData.reporting_Address}</p>
                <p>Date: {customerPayData.Date}</p>
                <p>Customer Name: {customerPayData.customer_Name}</p>
                <p>Vehicle Number: {customerPayData.vehicle_Number}</p>
                <p>Vehicle Type: {customerPayData.vehicle_Type}</p>
                <p>Quantity: {customerPayData.quantity}</p>
                <p>From: {customerPayData.from}</p>
                <p>To: {customerPayData.to}</p>
                <p>Closing KM: {customerPayData.closing_km}</p>
                <p>Closing Time: {customerPayData.closing_Time}</p>
                <p>Starting KM: {customerPayData.starting_Km}</p>
                <p>Starting Time: {customerPayData.starting_Time}</p>
                <p>Total KM: {customerPayData.total_Km}</p>
                <p>Title: {customerPayData.title}</p>
                <p>Title Amount: {customerPayData.title_Amount}</p>
                <p>Extra KM: {customerPayData.extra_Km}</p>
                <p>ExtraKM Amount: {customerPayData.extramkm_Amount}</p>
                <p>Extra Hours: {customerPayData.extra_Hours}</p>
                <p>ExtraHours Amount: {customerPayData.extrahours_Amount}</p>
                <p>SGST: {customerPayData.SGST}</p>
                <p>CGST: {customerPayData.CGST}</p>
                <p>Total Amount: {customerPayData.total_Amount}</p>
                <p>Advance Amount: {customerPayData.advance_Amount}</p>
                <p>Remaining Amount: {customerPayData.remaining_Amount}</p>
                <p>Payment Method: {customerPayData.payment_Method}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
