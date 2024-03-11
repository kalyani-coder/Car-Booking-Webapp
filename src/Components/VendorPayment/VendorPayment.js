import React, { useState, useEffect } from "react";
import "./VendorPayment.css";
import Sidebar from "../Sidebar/Sidebar";
import Alert from "../AddCustomer/Alert";

function VendorPayment() {
  const [formData, setFormData] = useState({
    company_Name: "",
    GST_No: "",
    vender_Name: "",
    mobile_Number: "",
    vehicle_type: "",
    vehicle_number: "",
    title: "",
    rate: "",
    hour: "",
    km: "",
    extra_km: "",
    extra_hour: "",
    total_km: "",
    total_hour: "",
    totalkm_amount: "",
    totalhour_amount: "",
    total_amount: "",
    payment: "",
    amount: "",
    tds: "",
    paid_amount: "",
    remaining_Amount: "",
    payment_Method: "",
  });
  const [vendors, setVendors] = useState([]);
  const [selectedVendorId, setSelectedVendorId] = useState("");
  const [successAlert, setSuccessAlert] = useState(null);
  const [errorAlert, setErrorAlert] = useState(null);

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const response = await fetch("http://localhost:7000/api/vender-rate");
      if (!response.ok) {
        throw new Error("Failed to fetch vendors");
      }
      const data = await response.json();
      setVendors(data);
    } catch (error) {
      console.error("Error fetching vendors:", error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleVendorChange = (e) => {
    const selectedId = e.target.value;
    setSelectedVendorId(selectedId);
    const selectedVendor = vendors.find((vendor) => vendor._id === selectedId);
    if (selectedVendor) {
      setFormData((prevData) => ({
        ...prevData,
        _id: selectedVendor._id,
        vender_Name: selectedVendor.vender_Name,
        company_Name: selectedVendor.company_Name,
        GST_No: selectedVendor.GST_No,
        mobile_Number: selectedVendor.mobile_Number,
        vehicle : selectedVendor.vehicle,
        rate_per_Km: selectedVendor.rate_per_Km,
        title: selectedVendor.title,
        rate: selectedVendor.rate,
        hour: selectedVendor.hour,
        km: selectedVendor.km,
        extra_km: selectedVendor.extra_km,
        extra_hour: selectedVendor.extra_hour

      }));
    }
  };

  const showAlert = (message, type) => {
    if (type === "success") {
      setSuccessAlert({ msg: message, type: type });
      setTimeout(() => {
        setSuccessAlert(null);
      }, 5000);
    } else if (type === "error") {
      setErrorAlert({ msg: message, type: type });
      setTimeout(() => {
        setErrorAlert(null);
      },);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:7000/api/vender-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          
          company_Name: formData.company_Name,
          GST_No: formData.GST_No,
          vender_Name: formData.vender_Name,
          mobile_Number: formData.mobile_Number,
          vehicle_type: formData.vehicle,
          vehicle_number: formData.vehicle_no,
          title: formData.title,
          rate: formData.rate,
          hour: formData.hour,
          km: formData.km,
          extra_km: formData.extra_km,
          extra_hour: formData.extra_hour,
          total_km: formData.total_km,
          total_hour: formData.total_hour,
          totalkm_amount: formData.totalkm_amount,
          totalhour_amount: formData.totalhour_amount,
          total_amount: formData.total_amount,
          payment: formData.payment,
          amount: formData.amount,
          tds: formData.tds,
          paid_amount: formData.paid_amount,
          remaining_Amount: formData.remaining_Amount,
          payment_Method: formData.payment_Method,
        }),
      });
  
      if (response.ok) {
        console.log("Data posted successfully!");
        showAlert("Data added successfully!" , "success");
      } else {
        console.error("Error posting data:", response.statusText);
        showAlert("Failed to add data. Please try again.", "danger");
      }
    } catch (error) {
      console.error("Error posting data:", error.message);
      showAlert("Failed to add data. Please try again.", "danger");
    }
  };
  
  return (
    <>
      <Sidebar />
      <div className="container-fluid">
        <div className="form-body">
          <div className="card-1">
            <div className="row justify-content-center">
              <div className="col-md-10">
                <div className="card-body mt-5">
                  <h2
                    style={{
                      fontSize: "2rem",
                      fontWeight: "bold",
                      marginBottom: "8px",
                    }}
                  >
                    Add Vendor Payment
                  </h2>
                  
            {successAlert && <Alert alert={successAlert} />}
      {errorAlert && <Alert alert={errorAlert} />}
            
                  <form onSubmit={handleSubmit}>
                    <div className="row grid-gap-5">
                      <div className="col-md">
                        <div className="form-group">
                          <label htmlFor="vender_Name" class="form-label">
                            Vendor Name:
                            <span className="required-asterisk">*</span>
                          </label>
                          <select
                            className="update-duty-form-control"
                            name="vender_Name"
                            id="vender_Name"
                            value={selectedVendorId}
                            onChange={handleVendorChange}
                          >
                            <option value="">Select Vendor</option>
                            {vendors.map((vendor) => (
                              <option key={vendor._id} value={vendor._id}>
                                {vendor.vender_Name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md">
                        <div className="form-group">
                          <label htmlFor="GST_No" class="form-label">
                            GST No:
                            <span className="required-asterisk">*</span>
                          </label>
                          <input
                            type="text"
                            className="update-duty-form-control"
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
                          <label htmlFor="company_Name" class="form-label">
                            Company Name:
                            <span className="required-asterisk">*</span>
                          </label>

                          <input
                            type="text"
                            className="update-duty-form-control"
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
                          <label htmlFor="mobile_Number" class="form-label">
                            Mobile Number:
                            <span className="required-asterisk">*</span>
                          </label>
                          <input
                            type="text"
                            className="update-duty-form-control"
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
                          <label htmlFor="vehicle" class="form-label">
                            Type Of Vehicle:
                            <span className="required-asterisk">*</span>
                          </label>
                          {/* <input type="text" className="form-control" placeholder="Vehicle" /> */}
                          <select
                            className="update-duty-form-control mb-2"
                            name="vehicle"
                            id="vehicle"
                            onChange={handleChange}
                            value={formData.vehicle}
                          >
                            <option value="">Vehicle</option>
                            <option value="Sedan Car">Sedan Car</option>
                            <option value="Mini Car">Mini Car</option>
                            <option value="SUV Car">SUV Car</option>
                            <option value="Ac Bus 13-Seater">
                              AC Bus 13-Seater
                            </option>
                            <option value="AC Bus 17-seater">
                              AC Bus 17-seater
                            </option>
                            <option value="AC Bus 20-seater">
                              AC Bus 20-seater
                            </option>
                            <option value="AC Bus 32-seater">
                              AC Bus 32-seater
                            </option>
                            <option value="AC Bus 35-seater">
                              AC Bus 35-seater
                            </option>
                            <option value="AC Bus 40-seater">
                              AC Bus 40-seater
                            </option>
                            <option value="AC Bus 45-seater">
                              AC Bus 45-seater
                            </option>
                            <option value="Non-AC Bus 17-Seater">
                              Non-AC Bus 17 Seater
                            </option>
                            <option value="Non-AC Bus 20-Seater">
                              Non-AC Bus 20 Seater
                            </option>
                            <option value="Non-AC Bus 32-Seater">
                              Non-AC Bus 32 Seater
                            </option>
                            <option value="Non-AC Bus 40-Seater">
                              Non-AC Bus 40 Seater
                            </option>
                            <option value="Non-AC Bus 45-Seater">
                              Non-AC Bus 45 Seater
                            </option>
                            <option value="Non-AC Bus 49-Seater">
                              Non-AC Bus 49 Seater
                            </option>
                          </select>
                        </div>
                      </div>

                      <div className="col-md">
                        <div className="form-group">
                          <label htmlFor="vehicleno" class="form-label">
                            Vehicle No:
                            <span className="required-asterisk">*</span>
                          </label>
                          <input
                            type="string"
                            className="update-duty-form-control"
                            name="vehicle_no"
                            placeholder="Vehicle Number"
                            onChange={handleChange}
                            value={formData.vehicle_no}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row grid-gap-5">
                      <div className="col-md">
                        <div className="d-flex gap-3">
                          <div>
                            <div className="form-group">
                              <label htmlFor="title" className="form-label">
                                Duty Type:
                                <span className="required-asterisk">*</span>
                              </label>
                              <select
                                className="rate-form-control-payment"
                                name="title"
                                id="title"
                                value={formData.title}
                                onChange={handleChange}
                              >
                                <option value="">Duty Type</option>
                                <option value="One Day / 80km">
                                  One Day /80km-Local Duty
                                </option>
                                <option value="One Day / 300km">
                                  One Day /300km-Outstation Duty
                                </option>
                                <option value="440km- Local Airport Transfer">
                                  440km-Local Airport Transfer{" "}
                                </option>
                                <option value="Pune-Mumbai Pickup Drop">
                                  Pune-Mumbai Pickup Dropoff
                                </option>
                              </select>
                            </div>
                          </div>
                          <div>
                            <div className="form-group">
                              <label htmlFor="rate" className="form-label">
                                Rate:
                                <span className="required-asterisk">*</span>
                              </label>
                              <input
                                className="rate-form-control-payment"
                                type="number"
                                id="rate"
                                name="rate"
                                placeholder="rate"
                                value={formData.rate}
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md">
                        <div className="form-group">
                          <label htmlFor="totalkms" class="form-label">
                            Total Kms:
                            <span className="required-asterisk">*</span>
                          </label>
                          <input
                            type="text"
                            className="update-duty-form-control"
                            name="total_km"
                            placeholder="Enter Total Kms"
                            onChange={handleChange}
                            value={formData.total_km}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row grid-gap-5">
                      <div className="col-md">
                        <div className="d-flex gap-3">
                          <div>
                            <div className="form-group">
                              <label htmlFor="km" className="form-label">
                                KM:
                                <span className="required-asterisk">*</span>
                              </label>
                              <input
                                className="rate-form-control-payment"
                                type="number"
                                id="km"
                                name="km"
                                placeholder="km"
                                value={formData.km}
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </div>
                          <div>
                            <div className="form-group">
                              <label htmlFor="extra_km" className="form-label">
                                (Rate Per Km)Extra KM:
                                <span className="required-asterisk">*</span>
                              </label>
                              <input
                                className="rate-form-control-payment"
                                type="number"
                                id="extra_km"
                                name="extra_km"
                                placeholder="extrakm"
                                value={formData.extra_km}
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md">
                        <div className="form-group">
                          <label htmlFor="totalhours" class="form-label">
                            Total Kms Amount:
                            <span className="required-asterisk">*</span>
                          </label>
                          <input
                            type="number"
                            className="update-duty-form-control"
                            name="totalkm_amount"
                            placeholder="Enter Kms Amount"
                            onChange={handleChange}
                            value={formData.totalkm_amount}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row grid-gap-5">
                      <div className="col-md">
                        <div className="d-flex gap-3">
                          <div>
                            <div className="form-group">
                              <label htmlFor="hour" className="form-label">
                                Hour:
                                <span className="required-asterisk">*</span>
                              </label>
                              <input
                                className="rate-form-control-payment"
                                type="number"
                                id="hour"
                                name="hour"
                                placeholder="hour"
                                value={formData.hour}
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </div>
                          <div>
                            <div className="form-group">
                              <label
                                htmlFor="extra_hour"
                                className="form-label"
                              >
                                (Rate Per Hour)Extra Hour:
                                <span className="required-asterisk">*</span>
                              </label>
                              <input
                                className="rate-form-control-payment"
                                type="number"
                                id="extra_hour"
                                name="extra_hour"
                                placeholder="Extra Hour"
                                value={formData.extra_hour}
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md">
                        <div className="form-group">
                          <label htmlFor="totalhoursamount" class="form-label">
                            Total Hours:
                            <span className="required-asterisk">*</span>
                          </label>
                          <input
                            type="number"
                            className="update-duty-form-control"
                            name="total_hour"
                            placeholder="Enter Total Hours"
                            onChange={handleChange}
                            value={formData.total_hour}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row grid-gap-5">
                      <div className="col-md">
                        <div className="form-group">
                          <label htmlFor="total_amount" class="form-label">
                            Total Hours Amount:
                            <span className="required-asterisk">*</span>
                          </label>
                          <input
                            type="number"
                            className="update-duty-form-control"
                            id="totalhour_amount"
                            name="totalhour_amount"
                            placeholder="Total Hours  Amount"
                            value={formData.totalhour_amount}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md">
                        <div className="form-group">
                          <label htmlFor="amount" class="form-label">
                            Amount:
                            <span className="required-asterisk">*</span>
                          </label>
                          <input
                            type="number"
                            className="update-duty-form-control"
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
                          <label htmlFor="payment" class="form-label">
                            Payment:
                            <span className="required-asterisk">*</span>
                          </label>
                          <select
                            className="update-duty-form-control"
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
                          <label htmlFor="total_amount" class="form-label">
                            Total Amount:
                            <span className="required-asterisk">*</span>
                          </label>
                          <input
                            type="number"
                            className="update-duty-form-control"
                            id="total_amount"
                            name="total_amount"
                            placeholder="Total Amount"
                            value={formData.total_amount}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row grid-gap-5">
                      <div className="col-md">
                        <div className="form-group">
                          <label htmlFor="tds" class="form-label">
                            TDS 1%:
                            <span className="required-asterisk">*</span>
                          </label>
                          <input
                            type="number"
                            className="update-duty-form-control"
                            id="tds"
                            name="tds"
                            placeholder="TDS 1% Amount"
                            value={formData.tds}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-md">
                        <div className="form-group">
                          <label htmlFor="total_Amount" class="form-label">
                            Paid Amount:
                            <span className="required-asterisk">*</span>
                          </label>
                          <input
                            type="number"
                            className="update-duty-form-control"
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
                          <label htmlFor="remaining_Amount" class="form-label">
                            Remaining Amount:
                            <span className="required-asterisk">*</span>
                          </label>
                          <input
                            type="number"
                            className="update-duty-form-control"
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
                          <label htmlFor="payment_Method" class="form-label">
                            Payment Method:
                            <span className="required-asterisk">*</span>
                          </label>
                          <select
                            className="update-duty-form-control"
                            id="payment_Method"
                            name="payment_Method"
                            value={formData.payment_Method}
                            onChange={handleChange}
                          >
                            <option value="">Payment Method</option>
                            <option value="Cash">Cash</option>
                            <option value="Cheque ">Cheque </option>
                            <option value="UPI / Wallet Payment">
                              UPI /Wallet Payment
                            </option>
                            <option value="Bank Transfer(NEFT)">
                              Bank Transfer(NEFT )
                            </option>
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
  );
}

export default VendorPayment;
