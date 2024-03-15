import React, { useState, useEffect } from "react";
import "./AddRate.css";
import Sidebar from "../Sidebar/Sidebar";
import Alert from "../AddCustomer/Alert";

const initialFormData = {
  Cus_Type: "",
  Cus_name: "",
  company_name: "",
  gst_no: "",
  Cus_Mobile: "",
  type_of_vehicle: "",
  rate_per_km: "",
  duty_type: "",
  rate: "",
  km: "",
  // extra_km: "",
  hours: "",
  extra_hours: "",
};

const CustomerRate = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [mobilenoError, setMobilenoError] = useState("");
  const [customerList, setCustomerList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [customerListByType, setCustomerListByType] = useState([]);
  const [vehicleList, setVehicleList] = useState([]);
  const [dutyTypeList, setDutyTypeList] = useState([]);
  const [rateList, setRateList] = useState([]);
  const [successAlert, setSuccessAlert] = useState(null);
  const [errorAlert, setErrorAlert] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const endpoint =
          formData.Cus_Type === "Corporate Customer"
            ? "https://carbookingbackend.onrender.com/api/corporate-customer"
            : formData.Cus_Type === "Indivisual Customer"
            ? "https://carbookingbackend.onrender.com/api/indivisual-customer"
            : "";

        if (endpoint) {
          const response = await fetch(endpoint);

          if (response.ok) {
            const data = await response.json();
            setCustomerList(data);
          } else {
            console.error("Failed to fetch customers");
          }
        }
      } catch (error) {
        console.error("API request error:", error);
      }
    };

    fetchCustomers();
  }, [formData.Cus_Type]);

  useEffect(() => {
    if (formData.Cus_Type === "Corporate Customer") {
      setCustomerListByType(
        customerList.filter(
          (customer) => customer.Cus_Type === "Corporate Customer"
        )
      );
    } else if (formData.Cus_Type === "Indivisual Customer") {
      setCustomerListByType(
        customerList.filter(
          (customer) => customer.Cus_Type === "Indivisual Customer"
        )
      );
    }
  }, [formData.Cus_Type, customerList]);

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      try {
        const response = await fetch("https://carbookingbackend.onrender.com/api/masterrate");
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

    fetchVehicleDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "Cus_Mobile" && value.length > 10) {
      setMobilenoError("Mobile number must be 10 digits");
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Check if the changed field is "Cus_name" (Customer Name)
    // If it is, find the selected customer from the customerList array
    if (name === "Cus_name") {
      const selectedCustomerId = e.target.value;
      setSelectedCustomer(
        customerList.find((customer) => customer._id === selectedCustomerId)
      );
    }

    if (name === "Cus_Mobile") {
      if (!/^\d{10}$/.test(value)) {
        setMobilenoError("Mobile number must be 10 digits");
      } else {
        setMobilenoError("");
      }
    }
  };

  // const validateForm = () => {
  //   const errors = {};

  //   for (const key in formData) {
  //     if (!formData[key] || formData[key].trim() === "") {
  //       errors[key] = "This field is required";
  //     }
  //   }

  //   setFormErrors(errors);

  //   return Object.keys(errors).length === 0 && !mobilenoError;
  // };
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

    if (!selectedCustomer) {
      window.alert("Please select a customer");
      return;
    }

    //  if (!validateForm()) {
    //   window.alert("Please fill in all required fields");
    //   return;
    // }
 
    const formDataWithCustomer = {
      ...formData,
      customerId: selectedCustomer._id,
      Cus_Type: selectedCustomer.Cus_Type,
      Cus_name: selectedCustomer.Cus_name,
      company_name: selectedCustomer.company_name,
      gst_no: selectedCustomer.gst_no,
      Cus_Mobile: selectedCustomer.Cus_Mobile,
      type_of_vehicle: selectedCustomer.type_of_vehicle,
      rate_per_km: selectedCustomer.rate_per_km,
      duty_type: selectedCustomer.duty_type,
      rate: selectedCustomer.rate,
      km: selectedCustomer.km,
      extra_km: selectedCustomer.extra_km,
      hours: selectedCustomer.hours,
      extra_hours: selectedCustomer.extra_hours,
    };

    let apiEndpoint = "";
    let customerType = "";
    if (formData.Cus_Type === "Corporate Customer") {
      apiEndpoint = "https://carbookingbackend.onrender.com/api/corporate-customer";
      customerType = "Corporate";
    } else if (formData.Cus_Type === "Indivisual Customer") {
      apiEndpoint = "https://carbookingbackend.onrender.com/api/indivisual-customer";
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
        showAlert(`${customerType} customer data added successfully!`, "success");
        setFormData(initialFormData);
        setSelectedCustomer(null);
        // window.alert("Data added successfully!");
      } else {
        showAlert("Failed to add data. Please try again.", "danger");
      }
    } catch (error) {
      showAlert("Failed to add data. Please try again.", "danger");
    }
  };

  return (
    <>
      <Sidebar />
      <div className="rate-Add-container">
        <div className="rate-main-container">
          <div className="rate-form-container">
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                marginBottom: "8px",
              }}
            >
              Corporate Customer
            </h2>
            
            {successAlert && <Alert alert={successAlert} />}
      {errorAlert && <Alert alert={errorAlert} />}
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="Cus_Type" className="form-label">
                  Customer Type:
                  <span className="required-asterisk">*</span>
                </label>
                <select
                  className="form-control-cust-add-input"
                  name="Cus_Type"
                  id="Cus_Type"
                  onChange={handleChange}
                  value={formData.Cus_Type}
                >
                  <option value="">Customer</option>
                  <option value="Corporate Customer">Corporate Customer</option>
                  <option value="Indivisual Customer">
                    Indivisual Customer
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="Cus_name" className="form-label">
                  Customer Name/ Company Name:
                  <span className="required-asterisk">*</span>
                </label>
                <select
                  className="form-control-rate-add-input"
                  name="Cus_name"
                  id="Cus_name"
                  onChange={(e) => {
                    const selectedCustomerId = e.target.value;
                    setSelectedCustomer(
                      customerList.find(
                        (customer) => customer._id === selectedCustomerId
                      )
                    );
                  }}
                  value={selectedCustomer ? selectedCustomer._id : ""}
                >
                  <option value="">Select Customer</option>
                  {customerList.map((customer) => (
                    <option key={customer._id} value={customer._id}>
                      {customer.Cus_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* <div className="rate-form-group">
                <label htmlFor="company_name" className="form-label">
                  Company Name:
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  className="form-control-rate-add-input"
                  type="text"
                  id="company_name"
                  name="company_name"
                  placeholder="Company Name"
                  value={formData.company_name}
                  onChange={handleChange}
                />
              </div> */}
              <div className="form-group">
                <label htmlFor="gst_no" className="form-label">
                  GST No:
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  className="form-control-rate-add-input"
                  type="text"
                  id="gst_no"
                  name="gst_no"
                  placeholder="GST No."
                  value={formData.gst_no}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Cus_Mobile" className="form-label">
                  Mobile No:
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  className="form-control-cust-add-input"
                  type="tel"
                  id="Cus_Mobile"
                  name="Cus_Mobile"
                  placeholder="Mobile No."
                  onChange={handleChange}
                  value={formData.Cus_Mobile}
                />
                {mobilenoError && (
                  <p className="error-message">{mobilenoError}</p>
                )}
              </div>
             
              <div className="form-group">
                <label htmlFor="type_of_vehicle" className="form-label">
                  Add Type Of Vehicle:
                  <span className="required-asterisk">*</span>
                </label>
                <select
                  className="form-control-cust-add-input"
                  name="type_of_vehicle"
                  id="type_of_vehicle"
                  onChange={handleChange}
                  value={formData.type_of_vehicle}
                >
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
              <div className="d-flex gap-3">
                <div>
                  <div className="form-group">
                    <label htmlFor="duty_type" className="form-label">
                      Add Duty Type:
                      <span className="required-asterisk">*</span>
                    </label>
                    <select
                      className="rate-form-control"
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
                      {dutyTypeList.map((dutyType, index) => (
                        <option key={index} value={dutyType}>
                          {dutyType}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <div className="form-group">
                    <label htmlFor="rate" className="form-label">
                      Add Rate:
                      <span className="required-asterisk">*</span>
                    </label>
                    <select
                      className="rate-form-control"
                      name="rate"
                      id="rate"
                      onChange={handleChange}
                      value={formData.rate}
                    >
                      <option value="">Rate</option>
                      {rateList.map((rate, index) => (
                        <option key={index} value={rate}>
                          {rate}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="d-flex gap-3">
                <div>
                  <div className="form-group">
                    <label htmlFor="km" className="form-label">
                      KM:
                      <span className="required-asterisk">*</span>
                    </label>
                    <input
                      className="rate-form-control"
                      type="km"
                      id="km"
                      name="km"
                      placeholder="km"
                      value={formData.km}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <div className="form-group">
                    <label htmlFor="rate_per_Km" className="form-label">
                      (Rate Per Km) Extra KM:
                      <span className="required-asterisk">*</span>
                    </label>
                    <input
                      className="rate-form-control"
                      type="number"
                      id="rate_per_Km"
                      name="rate_per_Km"
                      placeholder="Extra KM"
                      value={formData.rate_per_km}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex gap-3">
                <div>
                  <div className="form-group">
                    <label htmlFor="hours" className="form-label">
                      Hour:
                      <span className="required-asterisk">*</span>
                    </label>
                    <input
                      className="rate-form-control"
                      type="number"
                      id="hours"
                      name="hours"
                      placeholder="hours"
                      value={formData.hours}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <div className="form-group">
                    <label htmlFor="extra_hours" className="form-label">
                      (Rate Per Hour) Extra Hour:
                      <span className="required-asterisk">*</span>
                    </label>
                    <input
                      className="rate-form-control"
                      type="number"
                      id="extra_hours"
                      name="extra_hours"
                      placeholder="Extra hours"
                      value={formData.extra_hours}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <button type="submit" className="rate-btn-submit">
                Submit
              </button>
            </form>
            {successMessage && (
              <p className="success-message">{successMessage}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerRate;
