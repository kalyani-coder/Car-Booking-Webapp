import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";
import "./AddRate.css";

const CustomerRate = () => {
  const [customerType, setCustomerType] = useState("");
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerDetails, setCustomerDetails] = useState({
    gst_no: "",
    cus_mobile: "",
  });
  const [formData, setFormData] = useState({
    Cus_Type: "",
    Cus_name: "",
    type_of_vehicle: "",
    duty_type: "",
    rate: "",
    from: "",
    to: "",
    km: "",
    extra_km: "",
    hours: "",
    extra_hours: "",
  });
  const [mobilenoError, setMobilenoError] = useState("");

  const initialFormData = {
    Cus_Type: "",
    Cus_name: "",
    type_of_vehicle: "",
    duty_type: "",
    rate: "",
    from: "",
    to: "",
    km: "",
    extra_km: "",
    hours: "",
    extra_hours: "",
  };
 

  const handleCustomerTypeChange = async (e) => {
    const selectedType = e.target.value;
    setCustomerType(selectedType);
    setFormData({ ...formData, Cus_Type: selectedType });

    if (selectedType) {
      try {
        const response = await axios.get(
          `http://localhost:8787/api/add-customers/customer/${selectedType}`
        );
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    } else {
      setCustomers([]);
    }
  };

  const handleCustomerNameChange = (e) => {
    const selectedCusName = e.target.value;
    const customer = customers.find(
      (cust) => cust.cus_name === selectedCusName
    );
    setSelectedCustomer(customer || {});
    setCustomerDetails({
      gst_no: customer?.gst_no || "",
      cus_mobile: customer?.cus_mobile || "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate input based on field name
    if (name === "from" || name === "to" || name === "add_vehicle") {
      // Allow only alphabets and spaces
      if (/^[A-Za-z\s]*$/.test(value)) {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    } else if (
      name === "km" ||
      name === "extra_km" ||
      name === "hours" ||
      name === "extra_hours" ||
      name === "rate"
    ) {
      // Allow only numbers
      if (/^\d*$/.test(value)) {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    } else {
      // For other fields, accept any input
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    // Additional validation for mobile_Number
    if (name === "mobile_Number") {
      if (!/^\d{10}$/.test(value)) {
        setMobilenoError("Mobile number must be 10 digits");
      } else {
        setMobilenoError("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validation: Check if all required fields are filled
    if (
      !formData.type_of_vehicle ||
      !formData.duty_type ||
      !formData.rate ||
      !formData.km ||
      !formData.extra_km ||
      !formData.hours ||
      !formData.extra_hours
    ) {
      alert("All fields required.");
      return;
    }
  
    if (!selectedCustomer) {
      window.alert("Please select a customer");
      return;
    }
  
    const formDataWithCustomer = {
      ...formData,
      Cus_name: selectedCustomer.cus_name,
      customerId: selectedCustomer._id,
      gst_no: selectedCustomer.gst_no,
      Cus_Mobile: selectedCustomer.cus_mobile,
      type_of_vehicle: formData.type_of_vehicle,
      rate_per_km: selectedCustomer.rate_per_km,
      duty_type: formData.duty_type,
      rate: formData.rate,
      km: formData.km,
      extra_km: formData.extra_km,
      hours: formData.hours,
      extra_hours: formData.extra_hours,
    };
  
    let apiEndpoint = "";
    let customerType = "";
    if (formData.Cus_Type === "Corporate") {
      apiEndpoint = "http://localhost:8787/api/corporate-customer";
      customerType = "Corporate";
    } else if (formData.Cus_Type === "Indivisual") {
      apiEndpoint = "http://localhost:8787/api/indivisual-customer";
      customerType = "Indivisual";
    } else {
      console.log("Invalid customer type");
      window.alert("Invalid customer type");
      return;
    }
  
    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataWithCustomer),
      });
  
      if (response.ok) {
        console.log("Customer data added successfully");
        alert(`${customerType} customer Rate added successfully!`, "success");
        setFormData({
          Cus_Type: "",
          Cus_name: "",
          gst_no: "",
          cus_mobile: "",
          type_of_vehicle: "",
          duty_type: "",
          from: "",
          to: "",
          rate: "",
          km: "",
          extra_km: "",
          hours: "",
          extra_hours: "",
        });
        setCustomerType(""); // Clear the customer type
        setSelectedCustomer(null);
        setCustomerDetails({
          gst_no: "",
          cus_mobile: "",
        });
      } else {
        alert("Failed to add data. Please try again.", "danger");
      }
    } catch (error) {
      alert("Failed to add data. Please try again.", "danger");
    }
  };
  
  const [vehicleList, setVehicleList] = useState([]);
  const [dutyTypeList, setDutyTypeList] = useState([]);
  const [rateList, setRateList] = useState([]);

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      try {
        const response = await fetch("http://localhost:8787/api/masterrate");
        if (response.ok) {
          const data = await response.json();
          setVehicleList(data.map((item) => item.add_vehicle));
          setDutyTypeList(data.map((item) => item.add_duty_type));
          setRateList(data.map((item) => item.add_rate));
        } else {
          console.error("Failed to fetch vehicle details");
        }
      } catch (error) {
        console.error("API request error:", error);
      }
    };

    if (customerType === "Corporate") {
      fetchVehicleDetails();
    }
  }, [customerType]);

  return (
    <>
      <div className="rate-Add-container">
        <div className="rate-main-container">
          <div className="rate-form-container-vender-rate-cc relative ">
            <h2 className="View-Corporate-Customer-Rate font-bold">
              Corporate Customer
            </h2>
            <form
              onSubmit={handleSubmit}
              className="corporate-customer-form-section-width-set-cc"
            >
              <div className="form-group">
                <label htmlFor="Cus_Type" className="form-label">
                  Customer Type:
                  <span className="required-asterisk">*</span>
                </label>
                <select
                  className="form-control-add-trip-input-vender-rate-page"
                  name="Cus_Type"
                  id="Cus_Type"
                  value={customerType}
                  onChange={handleCustomerTypeChange}
                >
                  <option value="">Customer</option>
                  <option value="Corporate">Corporate Customer</option>
                  <option value="Indivisual">Indivisual Customer</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="Cus_name" className="form-label">
                  Customer Name/ Company Name:
                  <span className="required-asterisk">*</span>
                </label>
                <select
                  className="form-control-add-trip-input-vender-rate-page"
                  name="Cus_name"
                  id="Cus_name"
                  onChange={handleCustomerNameChange}
                >
                  <option value="">Select Customer</option>
                  {customers.map((customer) => (
                    <option key={customer._id} value={customer.cus_name}>
                      {customer.cus_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="gst_no" className="form-label">
                  GST No:
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  className="form-control-add-trip-input-vender-rate-page"
                  type="text"
                  id="gst_no"
                  name="gst_no"
                  placeholder="GST No."
                  value={customerDetails.gst_no}
                  readOnly
                />
              </div>

              <div className="form-group">
                <label htmlFor="Cus_Mobile" className="form-label">
                  Mobile Number:
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  className="form-control-add-trip-input-vender-rate-page"
                  type="text"
                  id="cus_mobile"
                  name="Cus_Mobile"
                  placeholder="Mobile Number"
                  value={customerDetails.cus_mobile}
                  readOnly
                />
              </div>

              {customerType === "Corporate" && (
                <>
                  <div className="form-group">
                    <label htmlFor="type_of_vehicle" className="form-label">
                      Type of Vehicle:
                      <span className="required-asterisk">*</span>
                    </label>
                    <select
                      className="form-control-add-trip-input-vender-rate-page"
                      id="type_of_vehicle"
                      name="type_of_vehicle"
                      value={formData.type_of_vehicle}
                      onChange={handleChange}
                    >
                      <option value="">Select Vehicle</option>
                      <option value="">Vehicle</option>
                      <option value="Ac Bus 13-Seater">AC Bus 13-Seater</option>
                      <option value="AC Bus 17-seater">AC Bus 17-seater</option>
                      <option value="AC Bus 20-seater">AC Bus 20-seater</option>
                      <option value="AC Bus 32-seater">AC Bus 32-seater</option>
                      <option value="AC Bus 35-seater">AC Bus 35-seater</option>
                      <option value="AC Bus 40-seater">AC Bus 40-seater</option>
                      <option value="AC Bus 45-seater">AC Bus 45-seater</option>
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
                      <option value="Non-AC Bus 49-Seater"></option>
                      {vehicleList.map((vehicle, index) => (
                        <option key={index} value={vehicle}>
                          {vehicle}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="d-flex gap-3 responsive-flex-column-required">
                    <div className="w-[50%] res-width-100-percent">
                      <div className="form-group">
                        <label htmlFor="duty_type" className="form-label">
                          Duty Type:
                          <span className="required-asterisk">*</span>
                        </label>
                        <select
                          className="form-control-add-trip-input-vender-rate-page"
                          id="duty_type"
                          name="duty_type"
                          value={formData.duty_type}
                          onChange={handleChange}
                        >
                          <option value="">Select Duty Type</option>
                          <option value="One Day / 80km">
                            One Day /80km-Local Duty
                          </option>
                          <option value="One Day / 300km">
                            One Day /300km-Outstation Duty
                          </option>
                          <option value="440km- Local Airport Transfer">
                            440km-Local Airport Transfer
                          </option>
                          <option value="Pune-Mumbai Pickup Drop">
                            Pune-Mumbai Pickup Dropoff
                          </option>
                          {dutyTypeList.map((duty, index) => (
                            <option key={index} value={duty}>
                              {duty}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="w-[50%] res-width-100-percent">
                      <div className="form-group">
                        <label htmlFor="rate" className="form-label">
                          Rate:
                          <span className="required-asterisk">*</span>
                        </label>
                        <select
                          className="form-control-add-trip-input-vender-rate-page"
                          id="rate"
                          name="rate"
                          value={formData.rate}
                          onChange={handleChange}
                        >
                          <option value="">Select Rate</option>
                          {rateList.map((rate, index) => (
                            <option key={index} value={rate}>
                              {rate}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {customerType === "Indivisual" && (
                <>
                  <div className="form-group">
                    <label htmlFor="type_of_vehicle" className="form-label">
                      Type of Vehicle:
                      <span className="required-asterisk">*</span>
                    </label>
                    <select
                      className="form-control-add-trip-input-vender-rate-page"
                      name="type_of_vehicle"
                      id="type_of_vehicle"
                      onChange={handleChange}
                      value={formData.type_of_vehicle}
                    >
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
                      <option value="Non-AC Bus 49-Seater"></option>
                    </select>
                  </div>
                  <div className="d-flex gap-3 responsive-flex-column-required">
                    <div className="w-[50%] res-width-100-percent">
                      <div className="form-group">
                        <label htmlFor="duty_type" className="form-label">
                          Duty Type:
                          <span className="required-asterisk">*</span>
                        </label>
                        <select
                          className="form-control-add-trip-input-vender-rate-page"
                          name="duty_type"
                          id="duty_type"
                          onChange={handleChange}
                          value={formData.duty_type}
                        >
                          <option value="">Duty Type</option>
                          <option value="One Day / 80km">
                            One Day /80km-Local Duty
                          </option>
                          <option value="One Day / 300km">
                            One Day /300km-Outstation Duty
                          </option>
                          <option value="440km- Local Airport Transfer">
                            440km-Local Airport Transfer
                          </option>
                          <option value="Pune-Mumbai Pickup Drop">
                            Pune-Mumbai Pickup Dropoff
                          </option>
                        </select>
                      </div>
                    </div>
                    <div className="w-[50%] res-width-100-percent">
                      <div className="form-group">
                        <label htmlFor="rate" className="form-label">
                          Rate:
                          <span className="required-asterisk">*</span>
                        </label>
                        <input
                          className="form-control-add-trip-input-vender-rate-page"
                          type="text"
                          id="rate"
                          name="rate"
                          placeholder="Enter rate"
                          value={formData.rate}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
              <div className="d-flex gap-3 responsive-flex-column-required">
                <div className="w-[50%] res-width-100-percent">
                  <div className="form-group">
                    <label htmlFor="from" className="form-label">
                      From:
                      <span className="required-asterisk">*</span>
                    </label>
                    <input
                      className="form-control-add-trip-input-vender-rate-page"
                      type="text"
                      id="from"
                      name="from"
                      placeholder="From"
                      value={formData.from}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="w-[50%] res-width-100-percent">
                  <div className="form-group">
                    <label htmlFor="to" className="form-label">
                      To:
                      <span className="required-asterisk">*</span>
                    </label>
                    <input
                      className="form-control-add-trip-input-vender-rate-page"
                      type="text"
                      id="to"
                      name="to"
                      placeholder="To"
                      value={formData.to}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex gap-3 responsive-flex-column-required">
                <div className="w-[50%] res-width-100-percent">
                  <div className="form-group">
                    <label htmlFor="km" className="form-label">
                      KM:
                      <span className="required-asterisk">*</span>
                    </label>
                    <input
                      className="form-control-add-trip-input-vender-rate-page"
                      type="text"
                      id="km"
                      name="km"
                      placeholder="KM"
                      value={formData.km}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="w-[50%] res-width-100-percent">
                  <div className="form-group">
                    <label htmlFor="extra_km" className="form-label">
                      Extra KM:
                      <span className="required-asterisk">*</span>
                    </label>
                    <input
                      className="form-control-add-trip-input-vender-rate-page"
                      type="text"
                      id="extra_km"
                      name="extra_km"
                      placeholder="Extra KM"
                      value={formData.extra_km}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex gap-3 responsive-flex-column-required">
                <div className="w-[50%] res-width-100-percent">
                  <div className="form-group">
                    <label htmlFor="hours" className="form-label">
                      Hours:
                      <span className="required-asterisk">*</span>
                    </label>
                    <input
                      className="form-control-add-trip-input-vender-rate-page"
                      type="text"
                      id="hours"
                      name="hours"
                      placeholder="Hours"
                      value={formData.hours}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="w-[50%] res-width-100-percent">
                  <div className="form-group">
                    <label htmlFor="extra_hours" className="form-label">
                      Extra Hours:
                      <span className="required-asterisk">*</span>
                    </label>
                    <input
                      className="form-control-add-trip-input-vender-rate-page"
                      type="text"
                      id="extra_hours"
                      name="extra_hours"
                      placeholder="Extra Hours"
                      value={formData.extra_hours}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="m-auto">
                <button type="submit" className="rate-btn-submit flex">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerRate;
