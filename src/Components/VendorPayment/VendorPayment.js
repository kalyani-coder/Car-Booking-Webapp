import React, { useState, useEffect } from "react";
import "./VendorPayment.css";
import Sidebar from "../Sidebar/Sidebar";
import Alert from "../AddCustomer/Alert";
import axios from "axios";

function VendorPayment() {
  const initialFormData = useState({
    vender_id: "",
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
    total_amount: "",
    payment: "",
    amount: "",
    tds: "",
    paid_amount: "",
    remaining_Amount: "",
    payment_Method: "",
    from: "",
    to: "",
    date: "",
  });
  const [vendors, setVendors] = useState([]);
  const [selectedVendorId, setSelectedVendorId] = useState("");
  const [successAlert, setSuccessAlert] = useState(null);
  const [errorAlert, setErrorAlert] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [isPartialPayment, setIsPartialPayment] = useState(false);

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const response = await fetch("http://localhost:8787/api/vender-rate");
      if (!response.ok) {
        throw new Error("Failed to fetch vendors");
      }
      const data = await response.json();

      // Filter to get unique vendors by _id
      const uniqueVendors = [];
      const vendorMap = new Map();
      data.forEach((vendor) => {
        if (!vendorMap.has(vendor.vender_id)) {
          vendorMap.set(vendor.vender_id, true); // set any value to Map
          uniqueVendors.push(vendor);
        }
      });

      setVendors(uniqueVendors);
    } catch (error) {
      console.error("Error fetching vendors:", error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleVendorChange = (e) => {
    const selectedId = e.target.value;
    setSelectedVendorId(selectedId);
    const selectedVendor = vendors.find((vendor) => vendor._id === selectedId);
    if (selectedVendor) {
      const km = parseFloat(selectedVendor.km) || 0;
      const extra_km = parseFloat(selectedVendor.extra_km) || 0;
      const hour = parseFloat(selectedVendor.hour) || 0;
      const extra_hour = parseFloat(selectedVendor.extra_hour) || 0;
      const rate = parseFloat(selectedVendor.rate) || 0;

      const total_km = km + extra_km;
      const total_hour = hour + extra_hour;
      const total_hour_Amt = total_hour * 100;
      const total_amount = rate * total_km + total_hour_Amt;
      // Calculate TDS and paid amount
      const tds = total_amount * 0.01;
      const paid_amount = total_amount + tds;

      setFormData({
        ...formData,
        vender_id: selectedVendor._id,
        vender_Name: selectedVendor.vender_Name,
        company_Name: selectedVendor.company_Name,
        GST_No: selectedVendor.GST_No,
        mobile_Number: selectedVendor.mobile_Number,
        address: selectedVendor.address,
        vehicle: selectedVendor.vehicle,
        from: selectedVendor.from,
        to: selectedVendor.to,
        title: selectedVendor.title,
        rate: selectedVendor.rate,
        hour: selectedVendor.hour,
        km: selectedVendor.km,
        extra_km: selectedVendor.extra_km,
        extra_hour: selectedVendor.extra_hour,
        total_km: total_km,
        total_hour: total_hour,
        total_amount: total_amount,
        tds: tds,
        paid_amount: paid_amount,
        payment: formData.payment,
      });
    }
  };

  const renderPaymentMethodFields = () => {
    if (formData.payment_Method === "Cheque") {
      return (
        <>
          <div className="mb-3" style={{ width: "50%" }}>
            <label className="form-label">Cheque Number:</label>
            <input
              type="text"
              className="form-control"
              value={formData.chequeNo}
              onChange={(e) =>
                setFormData({ ...formData, chequeNo: e.target.value })
              }
            />
          </div>
          <div className="mb-3" style={{ width: "50%" }}>
            <label className="form-label">IFSC Code:</label>
            <input
              type="text"
              className="form-control"
              value={formData.ifscCode}
              onChange={(e) =>
                setFormData({ ...formData, ifscCode: e.target.value })
              }
            />
          </div>

          <div className="mb-3" style={{ width: "50%" }}>
            <label className="form-label">Transaction Number:</label>
            <input
              type="text"
              className="form-control"
              value={formData.TransactionNumber}
              onChange={(e) =>
                setFormData({ ...formData, TransactionNumber: e.target.value })
              }
            />
          </div>
        </>
      );
    } else if (formData.payment_Method === "UPI / Wallet Payment") {
      return (
        <>
          <div className="mb-3" style={{ width: "50%" }}>
            <label className="form-label">UPI ID:</label>
            <input
              type="text"
              className="form-control"
              value={formData.upiId}
              onChange={(e) =>
                setFormData({ ...formData, upiId: e.target.value })
              }
            />
          </div>
        </>
      );
    } else if (formData.payment_Method === "Cash") {
      return (
        <>
          <div className="mb-3">
            <label className="form-label">Name to Whom Submitted Cash:</label>
            <input
              type="text"
              className="form-control"
              value={formData.cashReceiver}
              onChange={(e) =>
                setFormData({ ...formData, cashReceiver: e.target.value })
              }
            />
          </div>
        </>
      );
    } else if (formData.payment_Method === "Bank Transfer(NEFT)") {
      return (
        <>
          <div className="mb-3" style={{ width: "50%" }}>
            <label className="form-label">NEFT Number:</label>
            <input
              type="text"
              className="form-control"
              value={formData.neftnumber}
              onChange={(e) =>
                setFormData({ ...formData, neftnumber: e.target.value })
              }
            />
          </div>

          <div className="mb-3" style={{ width: "50%" }}>
            <label className="form-label">IFSC Code :</label>
            <input
              type="text"
              className="form-control"
              value={formData.ifscCode}
              onChange={(e) =>
                setFormData({ ...formData, ifsccode: e.target.value })
              }
            />
          </div>

          <div className="mb-3" style={{ width: "50%" }}>
            <label className="form-label">Account Number:</label>
            <input
              type="text"
              className="form-control"
              value={formData.accountnumber}
              onChange={(e) =>
                setFormData({ ...formData, accountnumber: e.target.value })
              }
            />
          </div>

          <div className="mb-3" style={{ width: "50%" }}>
            <label className="form-label">Branch Name:</label>
            <input
              type="text"
              className="form-control"
              value={formData.branchname}
              onChange={(e) =>
                setFormData({ ...formData, branchname: e.target.value })
              }
            />
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="mb-3">
            <label className="form-label">Transaction ID:</label>
            <input
              type="text"
              className="form-control"
              value={formData.transactionId}
              onChange={(e) =>
                setFormData({ ...formData, transactionId: e.target.value })
              }
            />
          </div>
        </>
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      // Construct postData object with form data
      const postData = {
        vender_id: selectedVendorId,
        company_Name: selectedVehicle.company_Name,
        GST_No: selectedVehicle.GST_No,
        vender_Name: selectedVehicle.vender_Name,
        mobile_Number: selectedVehicle.mobile_Number,
        address: selectedVehicle.address,
        vehicle_type: selectedVehicle.vehicle,
        vehicle_number: formData.vehicle_no,
        title: selectedVehicle.title,
        rate: formData.rate,
        hour: formData.hour,
        km: formData.km,
        extra_km: formData.extra_km,
        extra_hour: formData.extra_hour,
        total_km: formData.total_km,
        total_hour: formData.total_hour,
        total_amount: formData.total_amount,
        payment: formData.payment,
        amount: formData.amount,
        tds: formData.tds,
        paid_amount: formData.paid_amount,
        remaining_Amount: formData.remaining_Amount,
        payment_Method: formData.payment_Method,
      };

      // Make POST request to API endpoint
      const response = await fetch("http://localhost:8787/api/vender-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      // Handle response
      if (response.ok) {
        console.log("Data posted successfully!");
        alert("Data added successfully!", "success");
        setFormData(initialFormData); // Reset form data after successful submission
      } else {
        console.error("Error posting data:", response.statusText);
        alert("Failed to add data. Please try again.", "danger");
      }
    } catch (error) {
      console.error("Error posting data:", error.message);
      alert("Failed to add data. Please try again.", "danger");
    }
  };

  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const fetchVehicleTypes = async (vendorId) => {
    console.log("Selected Vendor ID:", vendorId);
    try {
      const response = await fetch(
        `http://localhost:8787/api/vender-rate/venderid/${vendorId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch vehicle types");
      }
      const data = await response.json();
      setVehicleTypes(data);
    } catch (error) {
      console.error("Error fetching vehicle types:", error.message);
    }
  };

  useEffect(() => {
    if (selectedVendorId) {
      fetchVehicleTypes(selectedVendorId);
    }
  }, [selectedVendorId]);

  const handleVehicleChange = (event) => {
    const selectedVehicle = vehicleTypes.find(
      (vehicle) => vehicle.vehicle === event.target.value
    );
    if (selectedVehicle) {
      const total_km =
        parseFloat(selectedVehicle.km || 0) +
        parseFloat(selectedVehicle.extra_km || 0);
      const total_hour =
        parseFloat(selectedVehicle.hour || 0) +
        parseFloat(selectedVehicle.extra_hour || 0);
      // const total_amount = rate * total_km + total_hour_Amt;
      const total_hour_Amt = total_hour * 100;
      const total_amount =
        parseFloat(selectedVehicle.rate || 0) *
          parseFloat(selectedVehicle.total_km || 0) +
        parseFloat(total_hour_Amt);
      const tds = total_amount * 0.01;
      const paid_amount = parseFloat(total_amount || 0) + parseFloat(tds || 0);

      setSelectedVehicle(selectedVehicle);
      setFormData((prevData) => ({
        ...prevData,
        km: selectedVehicle.km || "",
        extra_km: selectedVehicle.extra_km || "",
        GST_No: selectedVehicle.GST_No || "",
        total_km,
        hour: selectedVehicle.hour || "",
        extra_hour: selectedVehicle.extra_hour || "",
        total_hour,
        tds: tds,
        rate: selectedVehicle.rate || "",
        total_amount,
        paid_amount,
      }));
    }
  };

  return (
    <>
      <div className="main-container-vendor-payment-section">
        <div className="mt-5">
          <h2 className="View-Corporate-Customer-Rate font-bold p-4 my-4">
            Add Vendor Payment
          </h2>
          {successAlert && <Alert alert={successAlert} />}
          {errorAlert && <Alert alert={errorAlert} />}

          <form onSubmit={handleSubmit}>
            <div className="main-container-div-for-vender-payment-section responsive-flex-column-required">
              <div className="col-md">
                <div className="form-group">
                  <label htmlFor="vender_Name" className="form-label">
                    Vendor Name:
                    <span className="required-asterisk">*</span>
                  </label>
                  <select
                    className="update-duty-form-control form-control"
                    name="vender_Name"
                    id="vender_Name"
                    value={selectedVendorId}
                    onChange={handleVendorChange}
                  >
                    <option value="">Select Vendor</option>
                    {vendors.map((vendor) => (
                      <option key={vendor._id} value={vendor.vender_id}>
                        {vendor.vender_Name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="vehicletype" className="form-label">
                  Vehicle Type:
                  <span className="required-asterisk">*</span>
                </label>
                <select
                  className="update-duty-form-control form-control"
                  name="vehicletype"
                  id="vehicletype"
                  onChange={handleVehicleChange}
                >
                  <option value="">Select Vehicle Type</option>
                  {vehicleTypes.map((vehicle, index) => (
                    <option key={index} value={vehicle.vehicle}>
                      {vehicle.vehicle}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md">
                <div className="form-group">
                  <label htmlFor="GST_No" className="form-label">
                    GST No:
                    <span className="required-asterisk">*</span>
                  </label>
                  <input
                    type="text"
                    className="update-duty-form-control form-control"
                    id="GST_No"
                    name="GST_No"
                    placeholder="Enter GST No"
                    value={selectedVehicle ? selectedVehicle.GST_No : ""}
                    onChange={handleChange}
                  />
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
                    className="update-duty-form-control form-control"
                    name="vehicle_no"
                    placeholder="Vehicle Number"
                    onChange={handleChange}
                    value={formData.vehicle_no}
                  />
                </div>
              </div>
            </div>

            <div className="main-container-div-for-vender-payment-section responsive-flex-column-required">
              <div className="col-md">
                <div className="form-group">
                  <label htmlFor="company_Name" class="form-label">
                    Company Name:
                    <span className="required-asterisk">*</span>
                  </label>

                  <input
                    type="text"
                    className="update-duty-form-control form-control"
                    id="company_Name"
                    name="company_Name"
                    placeholder="Enter Company Name"
                    value={selectedVehicle ? selectedVehicle.company_Name : ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md">
                <div className="form-group">
                  <label htmlFor="mobile_Number" class="form-label">
                    Vendor Mobile Number:
                    <span className="required-asterisk">*</span>
                  </label>
                  <input
                    type="text"
                    className="update-duty-form-control form-control"
                    id="mobile_Number"
                    name="mobile_Number"
                    placeholder="Enter Mobile Number"
                    value={selectedVehicle ? selectedVehicle.mobile_Number : ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="main-container-div-for-vender-payment-section responsive-flex-column-required">
              {/* <div className="col-md">
                        <div className="form-group">
                          <label htmlFor="vehicle" class="form-label">
                            Type Of Vehicle:
                            <span className="required-asterisk">*</span>
                          </label>
                          <select
                            className="update-duty-form-control form-control mb-2"
                            name="vehicle"
                            id="vehicle"
                            value={selectedVehicle ? selectedVehicle.vehicle : ''}
                            onChange={handleChange}
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
                      </div> */}
            </div>

            <div className="main-container-div-for-vender-payment-section responsive-flex-column-required">
              <div className="col-md">
                <div className="main-container-div-for-vender-payment-section responsive-flex-column-required">
                  <div>
                    <div className="form-group">
                      <label htmlFor="title" className="form-label">
                        Duty Type:
                        <span className="required-asterisk">*</span>
                      </label>
                      <select
                        className="update-duty-form-control form-control"
                        name="title"
                        id="title"
                        value={selectedVehicle ? selectedVehicle.title : ""}
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
                        className="update-duty-form-control form-control"
                        type="number"
                        id="rate"
                        name="rate"
                        placeholder="rate"
                        value={selectedVehicle ? selectedVehicle.rate : ""}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md">
                <div className="form-group">
                  <label htmlFor="address" class="form-label">
                    Vendor Address:
                    <span className="required-asterisk">*</span>
                  </label>
                  <input
                    type="text"
                    className="update-duty-form-control form-control"
                    id="address"
                    name="address"
                    placeholder="Enter address"
                    value={selectedVehicle ? selectedVehicle.address : ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="main-container-div-for-vender-payment-section responsive-flex-column-required">
              <div className="col-md">
                <div className="main-container-div-for-vender-payment-section responsive-flex-column-required">
                  <div>
                    <div className="form-group">
                      <label htmlFor="from" className="form-label">
                        From:
                        <span className="required-asterisk">*</span>
                      </label>
                      <input
                        className="update-duty-form-control form-control"
                        type="text"
                        id="from"
                        name="from"
                        placeholder="from"
                        value={selectedVehicle ? selectedVehicle.from : ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="form-group">
                      <label htmlFor="to" className="form-label">
                        To:
                        <span className="required-asterisk">*</span>
                      </label>
                      <input
                        className="update-duty-form-control form-control"
                        type="text"
                        id="to"
                        name="to"
                        placeholder="to"
                        value={selectedVehicle ? selectedVehicle.to : ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md">
                <div className="form-group">
                  <label htmlFor="date" class="form-label">
                    Payment Date:
                    <span className="required-asterisk">*</span>
                  </label>
                  <input
                    type="date"
                    className="update-duty-form-control form-control"
                    name="date"
                    onChange={handleChange}
                    value={formData.date}
                  />
                </div>
              </div>
            </div>

            <div className="main-container-div-for-vender-payment-section responsive-flex-column-required">
              <div className="col-md">
                <div className="main-container-div-for-vender-payment-section responsive-flex-column-required">
                  <div>
                    <div className="form-group">
                      <label htmlFor="km" className="form-label">
                        KM:
                        <span className="required-asterisk">*</span>
                      </label>
                      <input
                        className="update-duty-form-control form-control"
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
                        className="update-duty-form-control form-control"
                        type="number"
                        id="extra_km"
                        name="extra_km"
                        placeholder="extrakm"
                        value={selectedVehicle ? selectedVehicle.extra_km : ""}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md">
                <div className="form-group">
                  <label htmlFor="total_km" class="form-label">
                    Total Kms:
                    <span className="required-asterisk">*</span>
                  </label>
                  <input
                    type="number"
                    className="update-duty-form-control form-control"
                    id="total_km"
                    name="total_km"
                    placeholder="Enter Total KM"
                    value={formData.total_km}
                    readOnly
                  />
                </div>
              </div>
            </div>

            <div className="main-container-div-for-vender-payment-section responsive-flex-column-required">
              <div className="col-md">
                <div className="main-container-div-for-vender-payment-section responsive-flex-column-required">
                  <div>
                    <div className="form-group">
                      <label htmlFor="hour" className="form-label">
                        Hour:
                        <span className="required-asterisk">*</span>
                      </label>
                      <input
                        className="update-duty-form-control form-control"
                        type="number"
                        id="hour"
                        name="hour"
                        placeholder="hour"
                        value={selectedVehicle ? selectedVehicle.hour : ""}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <div className="form-group">
                      <label htmlFor="extra_hour" className="form-label">
                        (Rate Per Hour)Extra Hour:
                        <span className="required-asterisk">*</span>
                      </label>
                      <input
                        className="update-duty-form-control form-control"
                        type="number"
                        id="extra_hour"
                        name="extra_hour"
                        placeholder="Extra Hour"
                        value={
                          selectedVehicle ? selectedVehicle.extra_hour : ""
                        }
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md">
                <div className="form-group">
                  <label htmlFor="total_hour" className="form-label">
                    Total Hours:
                    <span className="required-asterisk">*</span>
                  </label>
                  <input
                    type="number"
                    className="update-duty-form-control form-control"
                    id="total_hour"
                    name="total_hour"
                    placeholder="Enter Total Hour"
                    value={formData.total_hour}
                    readOnly
                  />
                </div>
              </div>
            </div>

            <div className="main-container-div-for-vender-payment-section responsive-flex-column-required">
              <div className="col-md">
                <div className="form-group">
                  <label htmlFor="tds" class="form-label">
                    TDS 1%:
                    <span className="required-asterisk">*</span>
                  </label>
                  <input
                    type="number"
                    className="update-duty-form-control form-control"
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
                  <label htmlFor="total_Amount" class="form-label">
                    Paid Amount:
                    <span className="required-asterisk">*</span>
                  </label>
                  <input
                    type="number"
                    className="update-duty-form-control form-control"
                    id="paid_amount"
                    name="paid_amount"
                    placeholder="Enter Paid Amount"
                    value={formData.paid_amount}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div className="main-container-div-for-vender-payment-section responsive-flex-column-required">
              <div className="col-md">
                <div className="form-group">
                  <label htmlFor="payment" className="form-label">
                    Payment:
                    <span className="required-asterisk">*</span>
                  </label>
                  <select
                    className="update-duty-form-control form-control"
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

                {formData.payment === "Partial" && (
                  <div className="form-group">
                    <label htmlFor="remaining_Amount" className="form-label">
                      Remaining Amount:
                      <span className="required-asterisk">*</span>
                    </label>
                    <input
                      type="number"
                      className="update-duty-form-control form-control"
                      id="remaining_Amount"
                      name="remaining_Amount"
                      placeholder="Enter Remaining Amount"
                      value={formData.remaining_Amount}
                      onChange={handleChange}
                    />
                  </div>
                )}
              </div>
              <div className="col-md">
                <div className="form-group">
                  <label htmlFor="total_amount" class="form-label">
                    Total Pay Amount:
                    <span className="required-asterisk">*</span>
                  </label>
                  <input
                    type="number"
                    className="update-duty-form-control form-control"
                    id="total_amount"
                    name="total_amount"
                    placeholder="Total Amount"
                    value={formData.total_amount}
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div className="col-md">
              <div className="form-group">
                <label for="paymentmethod" className="form-label">
                  Payment Method:
                  <span className="required-asterisk">*</span>
                </label>
                <select
                  className="update-duty-form-control form-control"
                  name="payment_Method"
                  id="payment_Method"
                  onChange={handleChange}
                  value={formData.payment_Method}
                >
                  <option value="">Payment Method</option>
                  <option value="Cash">Cash</option>
                  <option value="Cheque">Cheque</option>
                  <option value="UPI / Wallet Payment">
                    UPI /Wallet Payment
                  </option>
                  <option value="Bank Transfer(NEFT)">
                    Bank Transfer(NEFT )
                  </option>
                </select>

                {/* Render payment method specific fields */}
                {renderPaymentMethodFields()}
              </div>
            </div>

            <div className="main-container-div-for-vender-payment-section responsive-flex-column-required">
              <div className="col-md"></div>

              <div className="main-container-div-for-vender-payment-section responsive-flex-column-required">
                <div className="col-md"></div>
              </div>
            </div>

            <br />
            <button className="customer-btn-submit" type="submit">
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default VendorPayment;
