import React, { useState } from 'react';
import './VendorPayment.css';
import Sidebar from '../Sidebar/Sidebar';

function VendorPayment() {
  const [formData, setFormData] = useState({
    company_Name: "",
    GST_No: "",
    vender_Name: "",
    mobile_Number: "",
    payment: "",
    amount: "",
    tds: "0.00",
    total_Amount: "",
    paid_Amount: "",
    remaining_Amount: "",
    payment_Method: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    

    if (name === 'paid_Amount') {
      // Parse advance amount and total amount as floats
      const paidAmount = parseFloat(value) || 0;
      const totalAmount = parseFloat(formData.total_Amount) || 0;

      // Calculate remaining amount
      const remainingAmount = totalAmount - paidAmount;

      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        remaining_Amount: remainingAmount.toFixed(2),
      }));
    } else if (name === "amount") {
      const tdsData = calculateTDS(parseFloat(value) || 0);
      const totalAmount = (parseFloat(value) || 0) + tdsData.TDS;

      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        tds: tdsData.TDS.toFixed(2),
        total_Amount: totalAmount.toFixed(2),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const calculateTDS = (amount) => {
    const taxRate = 1; // 1 % tax rate
    const tds = (amount * taxRate) / 100;

    return {
      TDS: tds,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const key in formData) {
      if (formData[key] === "") {
        window.alert("All fields are required");
        return;
      }
    }

    const response = await fetch("https://carbooking-backend-fo78.onrender.com/api/vender-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      console.log("Data posted successfully!");
      window.alert('Data post Successfully')
    } else {
      console.error("Error posting data:", response.statusText);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="container-fluid ">
        <div className="form-body" >
          <div className="card-1">
            <div className="row justify-content-center">
              <div className="col-md-10">
                <div className="card-body mt-5">
                  <h2 style={{fontSize:"2rem",fontWeight:"bold",marginBottom:"8px"}}>Add Vendor Payment</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="row g-2">
                      <div className="col-md">
                        <div className="form-group">
                          <label htmlFor="company_Name">Company Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="company_Name"
                            name="company_Name"
                            placeholder="Enter Company Name"
                            value={formData.company_Name}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md">
                        <div className="form-group">
                          <label htmlFor="GST_No">GST No</label>
                          <input
                            type="text"
                            className="form-control"
                            id="GST_No"
                            name="GST_No"
                            placeholder="Enter GST No"
                            value={formData.GST_No}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row g-2">
                      <div className="col-md">
                        <div className="form-group">
                          <label htmlFor="vender_Name">Vendor Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="vender_Name"
                            name="vender_Name"
                            placeholder="Enter Vendor Name"
                            value={formData.vender_Name}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md">
                        <div className="form-group">
                          <label htmlFor="mobile_Number">Mobile Number</label>
                          <input
                            type="text"
                            className="form-control"
                            id="mobile_Number"
                            name="mobile_Number"
                            placeholder="Enter Mobile Number"
                            value={formData.mobile_Number}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row g-2">
                      <div className="col-md">
                        <div className="form-group">
                          <label htmlFor="payment">Payment</label>
                          <select
                            className="form-control"
                            id="payment"
                            name="payment"
                            value={formData.payment}
                            onChange={handleChange}
                          >
                            <option value="">Select Payment</option>
                            <option value="Partial">Partial</option>
                            <option value="Full Payment">Full Payment</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md">
                        <div className="form-group">
                          <label htmlFor="amount">Amount</label>
                          <input
                            type="text"
                            className="form-control"
                            id="amount"
                            name="amount"
                            placeholder="Enter Amount"
                            value={formData.amount}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row g-2">
                      <div className="col-md">
                        <div className="form-group">
                          <label htmlFor="tds">TDS 1%</label>
                          <input
                            type="text"
                            className="form-control"
                            id="tds"
                            name="tds"
                            placeholder="TDS 1% Amount"
                            value={formData.tds}
                            onChange={handleChange}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-md">
                        <div className="form-group">
                          <label htmlFor="total_Amount">Total Amount</label>
                          <input
                            type="text"
                            className="form-control"
                            id="total_Amount"
                            name="total_Amount"
                            placeholder="Enter Total Amount"
                            value={formData.total_Amount}
                            onChange={handleChange}
                            
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row g-2">
                      <div className="col-md">
                        <div className="form-group">
                          <label htmlFor="paid_Amount">Paid Amount</label>
                          <input
                            type="text"
                            className="form-control"
                            id="paid_Amount"
                            name="paid_Amount"
                            placeholder="Enter Paid Amount"
                            value={formData.paid_Amount}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md">
                        <div className="form-group">
                          <label htmlFor="remaining_Amount">Remaining Amount</label>
                          <input
                            type="text"
                            className="form-control"
                            id="remaining_Amount"
                            name="remaining_Amount"
                            placeholder="Enter Remaining Amount"
                            value={formData.remaining_Amount}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="payment_Method">Payment Method</label>
                      <select
                        className="form-control"
                        id="payment_Method"
                        name="payment_Method"
                        value={formData.payment_Method}
                        onChange={handleChange}
                      >
                         <option value="">Payment Method</option>
                            <option value="Cash">Cash</option>
                            <option value="Cheque ">Cheque </option>
                            <option value="UPI / Wallet Payment">UPI /Wallet Payment</option>
                            <option value="Bank Transfer(NEFT)">Bank Transfer(NEFT )</option>
                            
                      </select>
                    </div>

                    <br />
                    <button className="customer-btn-submit" type="submit">
                      Save
                    </button>

                   
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default VendorPayment;
