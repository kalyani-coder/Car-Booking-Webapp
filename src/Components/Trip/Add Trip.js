import React, { useState, useEffect } from "react";
import "./AddTrip.css";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";

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
  const [isAddPeopleOpen, setIsAddPeopleOpen] = useState(false);

  const toggleAddPeople = () => {
    setIsAddPeopleOpen((prevState) => !prevState); // Toggle the state
  };

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "mobileno") {
      if (!/^\d{10}$/.test(value)) {
        setMobilenoError("Mobile number must be 10 digits");
      } else {
        setMobilenoError("");
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if a customer is selected
    if (!selectedCustomer || !selectedCustomer._id) {
      alert("Please select a customer before adding a trip.");
      return;
    }

    // Update data with the selected customer's ID
    const dataWithCustomerId = {
      ...formData,
      customerId: selectedCustomer._id, // Assuming the customer ID is available in the selectedCustomer object
    };

    try {
      // Send the data to the API
      const response = await fetch("http://localhost:7000/api/add-trip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataWithCustomerId),
      });

      if (response.ok) {
        alert("Data added successfully!");
        setFormData(initialFormData); // Reset the form
      } else {
        alert("Failed to add data. Please try again.");
      }
    } catch (error) {
      console.error("API request error:", error);
      alert("Failed to add data. Please try again.");
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
            <div className="d-flex gap-3">
              {[1, 2, 3].map((index) => (
                <div key={index}>
                  <div className="trip-form-group">
                    <label htmlFor={`Person_${index}`} className="trip-form-label">
                      Person {index}:
                    </label>
                    <input
                      type="text"
                      className="form-control add-trip-input"
                      name={`Person_${index}`}
                      placeholder={`Enter Person ${index}`}
                      onChange={handleChange}
                      value={formData[`Person_${index}`]}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="d-flex gap-3">
              {[1, 2, 3].map((index) => (
                <div key={index}>
                  <div className="trip-form-group">
                    <label htmlFor={`Mobile_Number_${index}`} className="trip-form-label">
                      Mobile No. {index}:
                    </label>
                    <input
                      type="number"
                      className="form-control add-trip-input"
                      name={`Mobile_Number_${index}`}
                      placeholder={`Enter Mobile No. ${index}`}
                      onChange={handleChange}
                      value={formData[`Mobile_Number_${index}`]}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div onClick={toggleAddPeople}>
              <button className="btn btn-primary mb-3">
                {isAddPeopleOpen ? "Close People" : "Add People"}
              </button>
              {isAddPeopleOpen && (
                <div>
                  <div className="d-flex gap-3">
                    {[4, 5, 6].map((index) => (
                      <div key={index}>
                        <div className="trip-form-group">
                          <label htmlFor={`Person_${index}`} className="trip-form-label">
                            Person {index}:
                          </label>
                          <input
                            type="text"
                            className="form-control add-trip-input"
                            name={`Person_${index}`}
                            placeholder={`Enter Person ${index}`}
                            onChange={handleChange}
                            value={formData[`Person_${index}`]}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="d-flex gap-3">
                    {[4, 5, 6].map((index) => (
                      <div key={index}>
                        <div className="trip-form-group">
                          <label htmlFor={`Mobile_Number_${index}`} className="trip-form-label">
                            Mobile No. {index}:
                          </label>
                          <input
                            type="number"
                            className="form-control add-trip-input"
                            name={`Mobile_Number_${index}`}
                            placeholder={`Enter Mobile No. ${index}`}
                            onChange={handleChange}
                            value={formData[`Mobile_Number_${index}`]}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
              </label>
              <input
                type="text"
                className="form-control-add-trip-input"
                name="totaldays"
                placeholder="Total Days"
                onChange={handleChange}
                value={formData.totaldays}
              />
            </div>
            <div className="trip-form-group">
              <label htmlFor="hours" className="trip-form-label">
                Total Hours:
              </label>
              <input
                type="text"
                className="form-control-add-trip-input"
                name="hours"
                placeholder="Hours"
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
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTrip;
