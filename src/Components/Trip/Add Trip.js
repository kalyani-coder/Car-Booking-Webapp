import React, { useState, useEffect } from "react";
import "./AddTrip.css";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";
import { json } from "react-router-dom";
import Alert from "../AddCustomer/Alert";

const AddTrip = () => {
  const initialFormData = {
    customerId: "",
    customername: "",
    mobileno: "",
    email: "",
    address: "",
    triptype: "",
    subtype: "",
    pickup: "",
    date: "",
    time: "",
    dropoff: "",
    date1: "",
    time1: "",
    totaldays: "",
    hours: "",
    vehicle: "",
    Person_1: "",
    Mobile_Number_1: "",
    Person_2: "",
    Mobile_Number_2: "",
    Person_3: "",
    Mobile_Number_3: "",
    Person_4: "",
    Mobile_Number_4: "",
    Person_5: "",
    Mobile_Number_5: "",
    Person_6: "",
    Mobile_Number_6: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState("");
  const [customerList, setCustomerList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [mobilenoError, setMobilenoError] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState(0);
  const [apiKey, setApiKey] = useState("8d8f316a636542f4b5f75a7faf1be48e");
  const [successAlert, setSuccessAlert] = useState(null);
  const [errorAlert, setErrorAlert] = useState(null);

 

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://localhost:7000/api/add-customers");

        if (response.ok) {
          const data = await response.json();
          console.log("Fetched customer data:", data);

          if (Array.isArray(data)) {
            setCustomerList(data);
          } else {
            console.error("Invalid data format: expected an array");
          }
        } else {
          console.error("Failed to fetch customers");
        }
      } catch (error) {
        console.error("API request error:", error);
      }
    };

    fetchCustomers();
  }, []);

  useEffect(() => {
    if (selectedCustomer) {
      setFormData({
        ...formData,
        customername: selectedCustomer.cus_name || "",
        mobileno: selectedCustomer.cus_mobile || "",
        email: selectedCustomer.cus_email || "",
        address: selectedCustomer.address || "",
        triptype: "",
        subtype: "",
        pickup: "",
        date: "",
        time: "",
        dropoff: "",
        date1: "",
        time1: "",
        totaldays: "",
        hours: "",
        vehicle: "",
      });
    }
  }, [selectedCustomer]);

  const fetchTripDetails = async (customerId) => {
    try {
      const response = await fetch(`http://localhost:7000/api/add-trip/${customerId}`);

      if (response.ok) {
        const tripDetails = await response.json();
        console.log("Fetched trip details:", tripDetails);
        return tripDetails;
      } else {
        console.error("Failed to fetch trip details");
        return null;
      }
    } catch (error) {
      console.error("API request error:", error);
      return null;
    }
  };

  
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    let newData = { ...formData, [name]: value };
  
    // Calculate total days and hours if both dates and times are provided
  if ((name === "date" || name === "date1" || name === "time" || name === "time1") && formData.date && formData.date1 && formData.time && formData.time1) {
    const startDate = new Date(`${formData.date}T${formData.time}`);
    const endDate = new Date(`${formData.date1}T${formData.time1}`);
    const timeDifference = endDate.getTime() - startDate.getTime();
    const totalDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
    const hours = Math.floor(timeDifference / (1000 * 3600));
    newData = { ...newData, totaldays: totalDays.toString(), hours: hours.toString() };
  }

  setFormData(newData);
};
  

  const handleAddPerson = () => {
    if (numberOfPeople < 6) {
      setNumberOfPeople(numberOfPeople + 1);
    }
  };

  const renderInputs = (start, end) => {
    const inputs = [];
    for (let i = start; i <= end; i++) {
      inputs.push(
        <div key={i}>
          <div className="trip-form-group">
            <label htmlFor={`Person_${i}`} className="trip-form-label">
              Person {i}:
            </label>
            <input
              type="text"
              className="form-control add-trip-input"
              name={`Person_${i}`}
              placeholder={`Enter Person ${i}`}
              onChange={handleChange}
              value={formData[`Person_${i}`] || ''}
            />
          </div>
          <div className="trip-form-group">
            <label htmlFor={`Mobile_Number_${i}`} className="trip-form-label">
              Mobile No. {i}:
            </label>
            <input
              type="number"
              className="form-control add-trip-input"
              name={`Mobile_Number_${i}`}
              placeholder={`Enter Mobile No. ${i}`}
              onChange={handleChange}
              value={formData[`Mobile_Number_${i}`] || ''}
            />
          </div>
        </div>
      );
    }
    return inputs;
  };
  const renderRows = () => {
    const rows = [];
    for (let i = 1; i <= numberOfPeople; i += 3) {
      rows.push(
        <div className="d-flex gap-3" key={i}>
          {renderInputs(i, Math.min(i + 2, numberOfPeople))}
        </div>
      );
    }
    return rows;
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

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!selectedCustomer || !selectedCustomer._id) {
      showAlert("Please select a customer before adding a trip.", "danger");
      return;
    }
  
    const dataWithCustomerId = {
      ...formData,
      customerId: selectedCustomer._id,
    };
  
    try {
      const response = await fetch("http://localhost:7000/api/add-trip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataWithCustomerId),
      });
  
      if (response.ok) {
        showAlert("Data added successfully!" , "success");
        setFormData(initialFormData);
  
        // Share trip details with the customer via WhatsApp API
        const customerTextMessage = `Hello ${selectedCustomer.cus_name}, your booking is done. Your booking ID is ${formData.customerId}. Your trip type is ${formData.triptype} and your pickup location is ${formData.pickup} and your drop location is ${formData.dropoff}.`;
  
        const urlCustomer = `http://api.paysmm.co.in/wapp/api/send?apikey=${apiKey}&mobile=${selectedCustomer.mobileno}&msg=${customerTextMessage}`;
        window.open(urlCustomer, "_blank");
        console.log("Sending WhatsApp message to customer:", selectedCustomer.customername, "Mobile:", selectedCustomer.mobileno);
        console.log("Opening link:", urlCustomer);
  
        // Share trip details with each person via WhatsApp API
        for (let i = 1; i <= 6; i++) {
          const personName = formData[`Person_${i}`];
          const mobileNumber = formData[`Mobile_Number_${i}`];
  
          if (personName && mobileNumber) {
            const personTextMessage = `Hello ${personName}, your booking is done. Your booking ID is ${response.customerId}. Your trip type is ${formData.triptype} and your pickup location is ${formData.pickup} and your drop location is ${formData.dropoff}.`;
  
            const urlPerson = `http://api.paysmm.co.in/wapp/api/send?apikey=${apiKey}&mobile=${mobileNumber}&msg=${personTextMessage}`;
            window.open(urlPerson, "_blank");
            console.log("Sending WhatsApp message to person:", personName, "Mobile:", mobileNumber);
            console.log("Opening link:", urlPerson);
          }
        }
      } else {
        showAlert("Failed to add data. Please try again.", "danger");
      }
    } catch (error) {
      console.error("API request error:", error);
      showAlert("Failed to add data. Please try again.", "danger");
    }
  };
  
  return (
    <>
      <Sidebar />
      <div className="add-trip-container">
        <div className="trip-main-container">
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            Add Trip
          </h2>
          
          {successAlert && <Alert alert={successAlert} />}
      {errorAlert && <Alert alert={errorAlert} />}
            
          <div className="trip-form-container">
            {error && <p className="trip-text-red-500">{error}</p>}
            <div className="trip-form-group">
              <label htmlFor="customername" className="trip-form-label">
                Customer Name:
              </label>
              <select
                className="form-control-add-trip-input"
                id="customername"
                name="customername"
                onChange={(e) => {
                  const selectedCustomer = customerList.find(
                    (customer) => customer.cus_name === e.target.value
                  );
                  setSelectedCustomer(selectedCustomer);
                }}
                value={selectedCustomer ? selectedCustomer.cus_name : ""}
              >
                <option value="">Select Customer</option>
                {customerList?.length > 0 ? (
                  customerList.map((customer) => (
                    <option key={customer._id} value={customer.cus_name}>
                      {customer.cus_name}
                    </option>
                  ))
                ) : (
                  <option value="">No Customers Available</option>
                )}
              </select>
            </div>
            <div className="trip-form-group">
              <label htmlFor="mobileno" className="trip-form-label">
                Mobile No:
              </label>
              <input
                className="form-control-add-trip-input"
                type="number"
                id="mobileno"
                name="mobileno"
                placeholder="Mobile No."
                onChange={handleChange}
                value={formData.mobileno}
              />
            </div>
            <div className="trip-form-group">
              <label htmlFor="email" className="trip-form-label">
                Email Id:
              </label>
              <input
                className="form-control-add-trip-input"
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                value={formData.email}
              />
            </div>
            <div className="trip-form-group">
              <label htmlFor="address" className="trip-form-label">
                Address:
              </label>
              <input
                className="form-control-add-trip-input"
                type="text"
                id="address"
                name="address"
                placeholder="Address"
                onChange={handleChange}
                value={formData.address}
              />
            </div>
            <div className="trip-form-group">
              <label htmlFor="triptype" className="trip-form-label">
                Trip Type:
              </label>
              <select
                className="form-control-add-trip-input"
                id="triptype"
                name="triptype"
                onChange={handleChange}
                value={formData.triptype}
              >
                <option value="">Trip Type</option>
                <option value="One Way Trip">One Way Trip</option>
                <option value="Return Trip">Return Trip</option>
              </select>
            </div>
            <div className="trip-form-group">
              <label htmlFor="subtype" className="trip-form-label">
                Sub Type:
              </label>
              <select
                className="form-control-add-trip-input"
                id="subtype"
                name="subtype"
                onChange={handleChange}
                value={formData.subtype}
              >
                <option value="">Sub Type</option>
                <option value="Local Trip">Local Trip</option>
                <option value="Outstation Trip">Outstation Trip</option>
                <option value="Outstation Local Trip">
                  Outstation Local Trip
                </option>
                <option value="Outstation Outstation Trip">
                  Outstation Outstation Trip
                </option>
              </select>
            </div>
            <div>
            <div>
      {renderRows()}
      {numberOfPeople < 6 && <button className="trip-btn-submit" onClick={handleAddPerson}>Add Person 6</button>}
    </div>
    </div>



            <div className="d-flex gap-3">
              <div>
                <div className="trip-form-group">
                  <label htmlFor="pickup" className="trip-form-label">
                    Pickup Location:
                  </label>
                  <input
                    type="text"
                    className="form-control add-trip-input"
                    name="pickup"
                    placeholder="Enter Pickup Location"
                    onChange={handleChange}
                    value={formData.pickup}
                  />
                </div>
              </div>
              <div>
                <div className="trip-form-group">
                  <label htmlFor="date" className="trip-form-label">
                    Date:
                  </label>
                  <input
                    type="date"
                    className="form-control add-trip-input"
                    name="date"
                    onChange={handleChange}
                    value={formData.date}
                  />
                </div>
              </div>
              <div>
                <div className="trip-form-group">
                  <label htmlFor="time" className="trip-form-label">
                    Time:
                  </label>
                  <input
                    type="time"
                    className="form-control add-trip-input"
                    name="time"
                    onChange={handleChange}
                    value={formData.time}
                  />
                </div>
              </div>
            </div>
            <div className="d-flex gap-3">
              <div>
                <div className="trip-form-group">
                  <label htmlFor="dropoff" className="trip-form-label">
                    Dropoff Location:
                  </label>
                  <input
                    type="text"
                    className="form-control add-trip-input"
                    name="dropoff"
                    placeholder="Enter Dropoff Location"
                    onChange={handleChange}
                    value={formData.dropoff}
                  />
                </div>
              </div>
              <div>
                <div className="trip-form-group">
                  <label htmlFor="date1" className="trip-form-label">
                    Date:
                  </label>
                  <input
                    type="date"
                    className="form-control add-trip-input"
                    name="date1"
                    onChange={handleChange}
                    value={formData.date1}
                  />
                </div>
              </div>
              <div>
                <div className="trip-form-group">
                  <label htmlFor="time1" className="trip-form-label">
                    Time:
                  </label>
                  <input
                    type="time"
                    className="form-control add-trip-input"
                    name="time1"
                    onChange={handleChange}
                    value={formData.time1}
                  />
                </div>
              </div>
            </div>
            <div className="trip-form-group">
              <label htmlFor="totaldays" className="trip-form-label">
                Total Days:
                <span className="days" >Days</span>
              </label>
              <input
                type="number"
                className="form-control-add-trip-input"
                name="totaldays"
                // placeholder="Total Days"
                onChange={handleChange}
                value={formData.totaldays}
              />
            </div>
            <div className="trip-form-group">
              <label htmlFor="hours" className="trip-form-label">
                Total Hours:
                <span className="days" >Hours</span>
              </label>
              <input
                type="number"
                className="form-control-add-trip-input"
                name="hours"
                // placeholder="Hours"
                onChange={handleChange}
                value={formData.hours}
              />
            </div>

            <div className="trip-form-group">
              <label htmlFor="vehicle" className="trip-form-label">
                Type Of Vehicle:
              </label>
              <select
                className="form-control-add-trip-input"
                name="vehicle"
                id="vehicle"
                onChange={handleChange}
                value={formData.vehicle}
              >
                <option value="">Vehicle</option>
                <option value="Sedan Car">Sedan Car</option>
                <option value="Mini Car">Mini Car</option>
                <option value="SUV Car">SUV Car</option>
                <option value="AC Bus 13-Seater">AC Bus 13-Seater</option>
                <option value="AC Bus 17-Seater">AC Bus 17-Seater</option>
                <option value="AC Bus 20-Seater">AC Bus 20-Seater</option>
                <option value="AC Bus 32-Seater">AC Bus 32-Seater</option>
                <option value="AC Bus 35-Seater">AC Bus 35-Seater</option>
                <option value="AC Bus 40-Seater">AC Bus 40-Seater</option>
                <option value="AC Bus 45-Seater">AC Bus 45-Seater</option>
                <option value="Non-AC Bus 17-Seater">
                  Non-AC Bus 17-Seater
                </option>
                <option value="Non-AC Bus 20-Seater">
                  Non-AC Bus 20-Seater
                </option>
                <option value="Non-AC Bus 32-Seater">
                  Non-AC Bus 32-Seater
                </option>
                <option value="Non-AC Bus 40-Seater">
                  Non-AC Bus 40-Seater
                </option>
                <option value="Non-AC Bus 45-Seater">
                  Non-AC Bus 45-Seater
                </option>
                <option value="Non-AC Bus 49-Seater">
                  Non-AC Bus 49-Seater
                </option>
              </select>
            </div>
            <button
              type="button"
              className="trip-btn-submit"
              onClick={handleSubmit}
            >
              Add
            </button>
            {/* <button
              type="button"
              className="trip-btn-submit ml-3"
              onClick={handleShareClick}
            >
              Share With Customer
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTrip;
