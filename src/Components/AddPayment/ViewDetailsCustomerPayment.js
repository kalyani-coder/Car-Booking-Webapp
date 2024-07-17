import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";
import { FaTimes } from "react-icons/fa"; // Import icons

export default function ViewDetailsCustomerPayment() {
  const custPayId = useParams();
  const [customerPayData, setCustomerPayData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();


  const fetchData = async () => {
    const id = custPayId._id;

    try {
      const response = await axios.get(
        `http://localhost:8787/api/customer-payment/${id}`
      );
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
    // Navigate back to the viewvendorpayment page
    navigate("/viewcustomerpayment");
  };

  return (
    <>
      <div className="customer-Add-container">
        <div className="customer-main-container">
          <h1 className="text-2xl font-semibold mb-4">
            Customer Payment Details
          </h1>
          {customerPayData && (
            <div className="card">
              <div className="card-body">
                <button onClick={handleCancel} className="cancel-button">
                  <FaTimes />
                </button>
                <p className="mb-2">
                  <strong>Customer Name:</strong> {customerPayData.cus_name}
                </p>
                <p className="mb-2" p>
                  <strong>GST No:</strong> {customerPayData.GST_No}
                </p>
                <p className="mb-2">
                  <strong>Reporting Address:</strong>{" "}
                  {customerPayData.reporting_Address}
                </p>
                <p className="mb-2">
                  <strong>Date:</strong> {customerPayData.Date}
                </p>
                <p className="mb-2">
                  <strong>Customer Name:</strong>{" "}
                  {customerPayData.customer_Name}
                </p>
                <p className="mb-2">
                  <strong>Vehicle Number:</strong>{" "}
                  {customerPayData.vehicle_Number}
                </p>
                <p className="mb-2">
                  <strong>Vehicle Type:</strong> {customerPayData.vehicle_Type}
                </p>
                <p className="mb-2">
                  <strong>Quantity:</strong> {customerPayData.quantity}
                </p>
                <p className="mb-2">
                  <strong>From:</strong> {customerPayData.from}
                </p>
                <p className="mb-2">
                  <strong>To:</strong> {customerPayData.to}
                </p>
                <p className="mb-2">
                  <strong>Closing KM:</strong> {customerPayData.closing_km}
                </p>
                <p className="mb-2">
                  <strong>Closing Time:</strong> {customerPayData.closing_Time}
                </p>
                <p className="mb-2">
                  <strong>Starting KM:</strong> {customerPayData.starting_Km}
                </p>
                <p className="mb-2">
                  <strong>Starting Time:</strong>{" "}
                  {customerPayData.starting_Time}
                </p>
                <p className="mb-2">
                  <strong>Total KM:</strong> {customerPayData.total_Km}
                </p>
                <p className="mb-2">
                  <strong>Total Hour:</strong> {customerPayData.total_hours}
                </p>
                <p className="mb-2">
                  <strong>Title:</strong> {customerPayData.title}
                </p>
                <p className="mb-2">
                  <strong>Title Amount:</strong> {customerPayData.title_Amount}
                </p>
                <p className="mb-2">
                  <strong>Extra KM:</strong> {customerPayData.extra_Km}
                </p>
                <p className="mb-2">
                  <strong>ExtraKM Amount:</strong>{" "}
                  {customerPayData.extramkm_Amount}
                </p>
                <p className="mb-2">
                  <strong>Extra Hours:</strong> {customerPayData.extra_Hours}
                </p>
                <p className="mb-2">
                  <strong>ExtraHours Amount:</strong>{" "}
                  {customerPayData.extrahours_Amount}
                </p>
                <p className="mb-2">
                  <strong>SGST:</strong> {customerPayData.SGST}
                </p>
                <p className="mb-2">
                  <strong>CGST:</strong> {customerPayData.CGST}
                </p>
                <p className="mb-2">
                  <strong>Total Amount:</strong> {customerPayData.total_Amount}
                </p>
                <p className="mb-2">
                  <strong>Advance Amount:</strong>{" "}
                  {customerPayData.advance_Amount}
                </p>
                <p className="mb-2">
                  <strong>Remaining Amount:</strong>{" "}
                  {customerPayData.remaining_Amount}
                </p>
                <p className="mb-2">
                  <strong>Payment Method:</strong>{" "}
                  {customerPayData.payment_Method}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
