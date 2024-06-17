import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";
import { FaTimes } from "react-icons/fa"; // Import icons

export default function ViewDetailsPayment() {
  const venPayId = useParams();
  const [vendorPayData, setVendorPayData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    const id = venPayId._id;

    try {
      const response = await axios.get(
        `http://localhost:8787/api/vender-payment/${id}`
      );
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
    // Attempt to close the window
    window.close();
  
    // If window.close() didn't work, you can try using the following:
    if (window.opener) {
      // If the window has an opener (likely opened with window.open()), close the opener
      window.opener = null;
      window.open('', '_self', '');
      window.close();
    } else {
      // If there is no opener (likely not opened with window.open()), navigate back in history
      window.history.back();
    }
  
    console.log("Cancel button clicked");
  };

  
  return (
    <>
      <Sidebar />
      <div className="vendor-Add-container">
        <div className="vendor-main-container">
          <h1 className="text-2xl font-semibold mb-4">
            Vendor Payment Details
          </h1>
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
                <p className="mb-2">
                  <strong>Company Name:</strong> {vendorPayData.company_Name}
                </p>
                <p className="mb-2">
                  <strong>GST No:</strong> {vendorPayData.GST_No}
                </p>
                <p className="mb-2">
                  <strong>Vendor Name:</strong> {vendorPayData.vender_Name}
                </p>
                <p className="mb-2">
                  <strong>Mobile Number:</strong> {vendorPayData.mobile_Number}
                </p>
                <p className="mb-2">
                  <strong>Payment:</strong> {vendorPayData.payment}
                </p>
                <p className="mb-2">
                  <strong>Amount:</strong> {vendorPayData.amount}
                </p>
                <p className="mb-2">
                  <strong>TDS:</strong> {vendorPayData.tds}
                </p>
                <p className="mb-2">
                  <strong>Total Amount:</strong> {vendorPayData.total_Amount}
                </p>
                <p className="mb-2">
                  <strong>Paid Amount:</strong> {vendorPayData.paid_Amount}
                </p>
                <p className="mb-2">
                  <strong>Remaining Amount:</strong>{" "}
                  {vendorPayData.remaining_Amount}
                </p>
                <p className="mb-2">
                  <strong>Payment Method:</strong>{" "}
                  {vendorPayData.payment_Method}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
