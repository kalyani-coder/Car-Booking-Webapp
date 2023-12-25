import React, { useState } from 'react';
import './VendorPayment.css';
import Sidebar from '../Sidebar/Sidebar';

function VendorPayment() {
  const [formData, setFormData] = useState({
    company_Name: "",
    GST_No: "",
    vender_Name: "",
    mobile_Number: "",
    vehicle: "",
    vehicle_no: "",
    total_km: "",
    total_hour: "",
    totalkm_amount: "0",
    totalhour_amount: "",
    total_amount: "",
    extra_hour: "",
    extra_km: "",
    payment: "",
    amount: "",
    tds: "0.00",
    paid_amount: "",
    remaining_Amount: "",
    payment_Method: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setFormData((prevData) => {
      let updatedData;
  
      if (name === 'totalkm_amount' || name === 'totalhour_amount') {
        // Corrected variable names
        const totalkmAmount = parseFloat(prevData.totalkm_amount) ;
        const totalhourAmount = parseFloat(prevData.totalhour_amount)  ;
        const totalAmount = totalkmAmount + totalhourAmount;
  
        updatedData = {
          ...prevData,
          [name]: value,
          total_amount: totalAmount.toFixed(2),
        };
      } else {
        // For other fields, update the state as usual
        updatedData = {
          ...prevData,
          [name]: value,
        };
      }
  
      return updatedData;
    });
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
      <div className="container-fluid">
        <div className="form-body" >
          <div className="card-1">
            <div className="row justify-content-center">
              <div className="col-md-10">
                <div className="card-body mt-5">
                  <h2 style={{fontSize:"2rem",fontWeight:"bold",marginBottom:"8px"}}>Add Vendor Payment</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="row grid-gap-5">
                      <div className="col-md">
                        <div className="form-group">
                          <label htmlFor="company_Name" class="form-label">Company Name:
                          <span className="required-asterisk">*</span>
                          </label>
                          
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
                          <label htmlFor="GST_No" class="form-label">GST No:
                          <span className="required-asterisk">*</span>
                          </label>
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

                    <div className="row grid-gap-5">
                      <div className="col-md">
                        <div className="form-group">
                          <label htmlFor="vender_Name" class="form-label">Vendor Name:
                          <span className="required-asterisk">*</span>
                          </label>
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
                          <label htmlFor="mobile_Number" class="form-label">Mobile Number:
                          <span className="required-asterisk">*</span>
                          </label>
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


                    <div className="row grid-gap-5">
                      <div className="col-md">
                        <div className="form-group">
                          <label htmlFor="typeofvehicle"  class="form-label">Type Of Vehicle:
                          <span className="required-asterisk">*</span>
                          </label>
                          {/* <input type="text" className="form-control" placeholder="Vehicle" /> */}
                          <select className="form-control mb-2" name="vehicle_Type" id="vehicle_Type" onChange={handleChange} value={formData.vehicle_Type}>
                            <option value="">Vehicle</option>
                            <option value="Sedan Car">Sedan Car</option>
                            <option value="Mini Car">Mini Car</option>
                            <option value="SUV Car">SUV Car</option>
                            <option value="Ac Bus 13-Seater">AC Bus 13-Seater</option>
                            <option value="AC Bus 17-seater">AC Bus 17-seater</option>
                            <option value="AC Bus 20-seater">AC Bus 20-seater</option>
                            <option value="AC Bus 32-seater">AC Bus 32-seater</option>
                            <option value="AC Bus 35-seater">AC Bus 35-seater</option>
                            <option value="AC Bus 40-seater">AC Bus 40-seater</option>
                            <option value="AC Bus 45-seater">AC Bus 45-seater</option>
                            <option value="Non-AC Bus 17-Seater">Non-AC Bus 17 Seater</option>
                            <option value="Non-AC Bus 20-Seater">Non-AC Bus 20 Seater</option>
                            <option value="Non-AC Bus 32-Seater">Non-AC Bus 32 Seater</option>
                            <option value="Non-AC Bus 40-Seater">Non-AC Bus 40 Seater</option>
                            <option value="Non-AC Bus 45-Seater">Non-AC Bus 45 Seater</option>
                            <option value="Non-AC Bus 49-Seater">Non-AC Bus 49 Seater</option>
                          </select>
                        </div>
                      </div>


                      <div className="col-md">
                        <div className="form-group">
                          <label htmlFor="vehicleno"  class="form-label">Vehicle No:
                          <span className="required-asterisk">*</span>
                          </label>
                          <input type="string" className="form-control" name='vehicle_no' placeholder="Vehicle Number" onChange={handleChange} value={formData.vehicle_no} />
                        </div>
                      </div>
                    </div>

                    <div className="row grid-gap-5">
                      <div className="col-md">
                        <div className="form-group">
                          <label htmlFor="totalkms" class="form-label">Total Kms:
                          <span className="required-asterisk">*</span>
                          </label>
                          <input type="text" className="form-control"  name="total_km" placeholder="Enter  Total Kms" onChange={handleChange} value={formData.total_km} />

                        </div>
                      </div>
                      <div className="col-md">
                        <div className="form-group">
                          <label htmlFor="totalhours" class="form-label">Total Hours:
                          <span className="required-asterisk">*</span>
                          </label>
                          <input type="text" className="form-control" name="total_hour" placeholder="Enter  Total Hours" onChange={handleChange} value={formData.total_hour} />
                        </div>
                      </div>
                    </div>

                    <div className="row grid-gap-5">
                      <div className="col-md">
                        <div className="form-group">
                          <label htmlFor="totalkmsamount" class="form-label">Total Kms Amount:
                          <span className="required-asterisk">*</span>
                          </label>
                          <input type="text" className="form-control"  name="totalkm_amount" placeholder="Enter  Total Kms Amount" onChange={handleChange} value={formData.totalkm_amount} />

                        </div>
                      </div>
                      <div className="col-md">
                        <div className="form-group">
                          <label htmlFor="totalhoursamount" class="form-label">Total Hours Amount:
                          <span className="required-asterisk">*</span>
                          </label>
                          <input type="text" className="form-control" name="totalhour_amount" placeholder="Enter Total Hours" onChange={handleChange} value={formData.totalhour_amount} />
                        </div>
                      </div>
                    </div>

                    <div className="row grid-gap-5">
                    <div className="col-md">
                        <div className="form-group">
                          <label htmlFor="total_amount" class="form-label">Total Amount:
                          <span className="required-asterisk">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="total_amount"
                            name="total_amount"
                            placeholder="Total Amount"
                            value={formData.total_amount}
                            onChange={handleChange}
                            readOnly
                          />
                        </div>
                        </div>
                        </div>

                      <div className="row grid-gap-5">
                      <div className="col-md">
                        <div className="form-group">
                          <label htmlFor="payment" class="form-label">Payment:
                          <span className="required-asterisk">*</span>
                          </label>
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
                          <label htmlFor="amount" class="form-label">Amount:
                          <span className="required-asterisk">*</span>
                          </label>
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

                    <div className="row grid-gap-5">
                      <div className="col-md">
                        <div className="form-group">
                          <label htmlFor="tds" class="form-label">TDS 1%:
                          <span className="required-asterisk">*</span>
                          </label>
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
                          <label htmlFor="total_Amount" class="form-label">Paid Amount:
                          <span className="required-asterisk">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="paid_amount"
                            name="paid_amount"
                            placeholder="Enter Paid Amount"
                            value={formData.paid_amount}
                            onChange={handleChange}
                            
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row grid-gap-5">
                    <div className="col-md">
                        <div className="form-group">
                          <label htmlFor="remaining_Amount" class="form-label">Remaining Amount:
                          <span className="required-asterisk">*</span>
                          </label>
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
                    
                        <div className="col-md">
                      <div className="form-group">
                      <label htmlFor="payment_Method" class="form-label">Payment Method:
                          <span className="required-asterisk">*</span>
                          </label>
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
                    </div>
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
