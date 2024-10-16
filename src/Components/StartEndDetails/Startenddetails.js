import React, { useState, useEffect } from "react";
import "./StartEndDeteails.css";
import Sidebar from "../Sidebar/Sidebar";
import Alert from "../AddCustomer/Alert";

const StartEndDetails = () => {
  const [formData, setFormData] = useState({
    toll: "",
    allowance: "",
    nightstay: "",
  });

  const [totalDays, setTotalDays] = useState(0);
  const [totalHours, setTotalHours] = useState(0);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [successAlert, setSuccessAlert] = useState(null);
  const [errorAlert, setErrorAlert] = useState(null);
  const [selectedCustomerDetails, setSelectedCustomerDetails] = useState({
    customername: "",
    cus_Mobile: "",
    pickuplocation: "",
    date: "",
    time: "",
    dropofflocation: "",
    date1: "",
    time1: "",
    vehicle: "",
    triptype: "",
    subtype: "",
    drivername: "",
    mail: "",
    drivermobileno: "",
    address: "",
    vehicleno: "",
    totalDays: "",
    totalHours: "",
  });

  useEffect(() => {
    // Fetch data from the API endpoint
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8787/api/share-details");
        const data = await response.json();
        // Log the fetched data to check if customer names are present
        console.log("Fetched Data:", data);
        // Update the customers state with the fetched data
        setCustomers(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleCustomerChange = (customerName) => {
    // Find the selected customer details based on the customer name
    const customerDetails = customers.find(
      (trip) => trip.customername === customerName
    );

    // Log selected customer details to the console
    console.log("Selected Customer Name:", customerName);
    console.log("Selected Customer Details:", customerDetails);

    // Set the selected customer details in the state
    setSelectedCustomerDetails(customerDetails || {});
    setSelectedCustomer(customerName);

    // Recalculate total days and hours based on the new customer details
    if (customerDetails) {
      const pickupDateTime = new Date(
        `${customerDetails.date}T${customerDetails.time}`
      );
      const dropoffDateTime = new Date(
        `${customerDetails.date1}T${customerDetails.time1}`
      );

      if (
        !isNaN(pickupDateTime.getTime()) &&
        !isNaN(dropoffDateTime.getTime())
      ) {
        const diffTime = Math.abs(dropoffDateTime - pickupDateTime);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor(
          (diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );

        setTotalDays(diffDays);
        setTotalHours(diffHours);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update formData state with the changed field
    setFormData({ ...formData, [name]: value });

    // Calculate total days and total hours if relevant fields change
    if (
      name === "date" ||
      name === "time" ||
      name === "date1" ||
      name === "time1"
    ) {
      const pickupDateTime = new Date(
        selectedCustomerDetails.date + "T" + selectedCustomerDetails.time
      );
      const dropoffDateTime = new Date(
        selectedCustomerDetails.date1 + "T" + selectedCustomerDetails.time1
      );

      if (
        !isNaN(pickupDateTime.getTime()) &&
        !isNaN(dropoffDateTime.getTime())
      ) {
        const diffTime = Math.abs(dropoffDateTime - pickupDateTime);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor(
          (diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );

        setTotalDays(diffDays);
        setTotalHours(diffHours);
      } else {
        // Handle invalid dates/times if needed
        console.error("Invalid date/time format");
      }
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
      });
    }
  };

  const handleSave = async () => {
    try {
      // Make a POST request to the share-details API with the selected customer details
      const response = await fetch(
        "http://localhost:8787/api/getDetails-fromDriver",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // Adjust the property names based on your API schema
            customerId: selectedCustomerDetails.customerId,
            customername: selectedCustomerDetails.customername,
            customermobile: selectedCustomerDetails.customermobile,
            vehicle: selectedCustomerDetails.vehicle,
            triptype: selectedCustomerDetails.triptype,
            subtype: selectedCustomerDetails.subtype,
            pickup: selectedCustomerDetails.pickup,
            date: selectedCustomerDetails.date,
            time: selectedCustomerDetails.time,
            Dropoff: selectedCustomerDetails.Dropoff,
            date1: selectedCustomerDetails.date1,
            time1: selectedCustomerDetails.time1,
            drivername: selectedCustomerDetails.drivername,
            mobileno: selectedCustomerDetails.mobileno,
            vehicleno: selectedCustomerDetails.vehicleno,
            toll: formData.toll,
            allowance: formData.allowance,
            nightstay: formData.nightstay,
            Customer_Number: selectedCustomerDetails.Customer_Number
          }),
        }
      );

      if (response.ok) {
        console.log("Details saved successfully!");
        alert("Details added successfully!", "success");
        // Clear all fields after successful save
      setSelectedCustomerDetails({
        customerId: '',
        customername: '',
        customermobile: '',
        vehicle: '',
        triptype: '',
        subtype: '',
        pickup: '',
        date: '',
        time: '',
        Dropoff: '',
        date1: '',
        time1: '',
        drivername: '',
        mobileno: '',
        vehicleno: '',
        Customer_Number: ''
      });

      setFormData({
        toll: '',
        allowance: '',
        nightstay: ''
      });
      } else {
        showAlert("Failed to add data. Please try again.", "danger");
      }
    } catch (error) {
      showAlert("Failed to add data. Please try again.", "danger");
    }
  };

  return (
    <>
      <h2 className="View-Corporate-Customer-Rate font-bold p-4 my-4">
        Get Start And End Details
      </h2>
      <div className="start-end-details-container">
        {successAlert && <Alert alert={successAlert} />}
        {errorAlert && <Alert alert={errorAlert} />}

        <div className="start-end-details-form">
          <div className="start-end-details-row">
            <div className="start-end-details-column">
              <div className="share-details-form-group">
                <label htmlFor="vehicle" className="start-end-details-label">
                  Customer Name:
                </label>
                <select
                  className="share-details-input"
                  value={selectedCustomer}
                  onChange={(e) => handleCustomerChange(e.target.value)}
                >
                  {/* Default option */}
                  <option value="" disabled>
                    Select a customer
                  </option>
                  {/* Map over the customers array to populate the dropdown */}
                  {customers.map((customer, index) => (
                    <option key={index} value={customer.customername}>
                      {customer.customername}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="start-end-details-column">
              <div className="start-end-details-form-group">
                <label
                  htmlFor="customermobile"
                  className="start-end-details-label"
                >
                  Customer Mobile No:
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  className="share-details-input"
                  type="number"
                  name="customermobile"
                  placeholder="Enter Customer Mobile No."
                  value={selectedCustomerDetails.customermobile}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="start-end-details-row">
            <div className="start-end-details-column">
              <div className="responsive-flex-column-required d-flex gap-3">
                <div>
                  <div className="form-group">
                    <label htmlFor="pickup" className="form-label">
                      Pickup Location:
                      <span className="required-asterisk">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control startenddetails-input"
                      name="pickup"
                      placeholder="Pickup Location"
                      value={selectedCustomerDetails.pickup}
                      readOnly
                    />
                  </div>
                </div>
                <div>
                  <div className="form-group">
                    <label htmlFor="date1" className="form-label">
                      Pickup Date :<span className="required-asterisk">*</span>
                    </label>

                    <input
                      type="date"
                      className="form-control startenddetails-input"
                      name="date"
                      value={selectedCustomerDetails.date}
                      readOnly
                    />
                  </div>
                </div>
                <div>
                  <div className="form-group">
                    <label htmlFor="time1" className="form-label">
                      Pickup Time :<span className="required-asterisk">*</span>
                    </label>
                    <input
                      type="time"
                      className="form-control startenddetails-input"
                      name="time"
                      value={selectedCustomerDetails.time}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="start-end-details-column">
              <div className="start-end-details-form-group">
                <label
                  htmlFor="tripsubtype"
                  className="start-end-details-label"
                >
                  Sub Type:
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  className="share-details-input"
                  placeholder="Subtype"
                  value={selectedCustomerDetails.subtype}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="start-end-details-row">
            <div className="start-end-details-column">
              <div className="responsive-flex-column-required d-flex gap-3">
                <div>
                  <div className="form-group">
                    <label htmlFor="dropoff" className="form-label">
                      Dropoff Location:
                      <span className="required-asterisk">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control startenddetails-input"
                      name="dropoff"
                      placeholder="Dropoff Location"
                      value={selectedCustomerDetails.Dropoff}
                      readOnly
                    />
                  </div>
                </div>
                <div>
                  <div className="form-group">
                    <label htmlFor="date1" className="form-label">
                      Dropoff Date :<span className="required-asterisk">*</span>
                    </label>

                    <input
                      type="date"
                      className="form-control startenddetails-input"
                      name="date1"
                      value={selectedCustomerDetails.date1}
                      readOnly
                    />
                  </div>
                </div>
                <div>
                  <div className="form-group">
                    <label htmlFor="time1" className="form-label">
                      Dropoff Time :<span className="required-asterisk">*</span>
                    </label>
                    <input
                      type="time"
                      className="form-control startenddetails-input"
                      name="time1"
                      value={selectedCustomerDetails.time1}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="start-end-details-column">
              <div className="responsive-flex-column-required d-flex gap-2">
                <div className="form-group">
                  <label htmlFor="toll" className="form-label">
                    Total Days:
                  </label>
                  <input
                    className="share-details-input"
                    type="number"
                    name="totalDays"
                    placeholder="Enter Total Days"
                    value={totalDays}
                    readOnly
                  />
                </div>

                <div>
                  <div className="form-group">
                    <label htmlFor="totalDays" className="form-label">
                      Total Hours:
                    </label>
                    <input
                      className="share-details-input"
                      type="number"
                      name="totalDays"
                      // placeholder="Enter Total Hours "
                      value={totalHours}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="start-end-details-row">
            <div className="start-end-details-column">
              <div className="start-end-details-form-group">
                <label htmlFor="vehicle" className="start-end-details-label">
                  Type Of Vehicle:
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  className="share-details-input"
                  type="text"
                  name="vehicle"
                  placeholder="Enter Vehicle"
                  value={selectedCustomerDetails.vehicle}
                  readOnly
                />
              </div>
            </div>
            <div className="start-end-details-column">
              <div className="start-end-details-form-group">
                <label htmlFor="triptype" className="start-end-details-label">
                  Trip Type:
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  className="share-details-input"
                  type="text"
                  name="triptype"
                  placeholder="Enter Trip Type"
                  value={selectedCustomerDetails.triptype}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="start-end-details-row">
            <div className="start-end-details-column">
              <div className="start-end-details-form-group">
                <label htmlFor="drivername" className="start-end-details-label">
                  Driver Name:
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  className="share-details-input"
                  type="text"
                  name="drivername"
                  placeholder="Enter Driver Name"
                  value={selectedCustomerDetails.drivername}
                  readOnly
                />
              </div>
            </div>
            <div className="start-end-details-column">
              <div className="start-end-details-form-group">
                <label
                  htmlFor="mobileNumber"
                  className="start-end-details-label"
                >
                  Driver Mobile No:
                </label>
                <input
                  x
                  className="share-details-input"
                  type="text"
                  name="mobileNumber"
                  placeholder="Enter Driver Mobile No."
                  value={selectedCustomerDetails.mobileno}
                  readOnly
                />
              </div>
            </div>
          </div>

          <div className="start-end-details-row">
            <div className="start-end-details-column">
              <div className="start-end-details-form-group">
                <label htmlFor="allowance" className="start-end-details-label">
                  Allowance:
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  className="share-details-input"
                  type="text"
                  name="allowance"
                  placeholder="Enter Allowance"
                  value={formData.allowance}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="start-end-details-column">
              <div className="responsive-flex-column-required d-flex gap-2">
                <div className="width-setfor-nght-stay-and-toll-park-inputs">
                  <div className="form-group">
                    <label htmlFor="toll" className="form-label">
                      Toll Parking:
                    </label>
                    <input
                      className="share-details-input"
                      type="number"
                      name="toll"
                      placeholder="Enter Toll Parking"
                      value={formData.toll}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="width-setfor-nght-stay-and-toll-park-inputs">
                  <div className="form-group">
                    <label htmlFor="nightstay" className="form-label">
                      Night Stay:
                    </label>
                    <input
                      className="share-details-input"
                      type="number"
                      name="nightstay"
                      placeholder="Enter Night Stay"
                      value={FormData.nightstay}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="start-end-details-button-row">
            {/* <button
              type="button"
              className="customer-btn-submit mx-2"
            >
              Print
            </button> */}
            <button
              type="button"
              className="customer-btn-submit mx-2"
              onClick={handleSave}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StartEndDetails;
