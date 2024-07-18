import React, { useEffect, useState } from "react";
import { useParams, useNavigate  } from "react-router-dom";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";
import { FaTimes } from "react-icons/fa"; 


const ViewDetailsPayment = () =>{ 
  const venPayId = useParams();
  const [vendorPayData, setVendorPayData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

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
    // Navigate back to the viewvendorpayment page
    navigate("/viewvendorpayment");
  };

  return (
    <>
      <div className="vendor-Add-container">
        <div className="vendor-main-container">
          <h2 className="View-Corporate-Customer-Rate font-bold p-4 my-4">
            Vendor Payment Details
          </h2>
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
export default ViewDetailsPayment;