import React, { useState, useEffect } from "react";
import "./AllocateTrip.css";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";
import Alert from "../AddCustomer/Alert";

function AllocateTrip() {
  const initialTripDetails = {
    customerId: "",
    customername: "",
    mobileno: "",
    pickup: "",
    date: "",
    time: "",
    dropoff: "",
    date1: "",
    time1: "",
    vehicle: "",
    triptype: "",
    subtype: "",
    drivername: "",
    mail: "",
    address: "",
    drivermobileno: "",
    vehicleno: "",
  };

  const [tripDetails, setTripDetails] = useState({
    drivername: "",
    mail: "",
    drivermobileno: "",
    address: "",
    vehicleno: "",
  });

  // const [tripDetails, setTripDetails] = useState(initialTripDetails);
  const [error, setError] = useState("");
  const [customerList, setCustomerList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // New state to track submission status
  const [successAlert, setSuccessAlert] = useState(null);
  const [errorAlert, setErrorAlert] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://localhost:8787/api/add-trip");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error("Error fetching customers:", error);
        setError("Error fetching customers: " + error.message);
      }
    };
    fetchCustomers();
  }, []);

  useEffect(() => {
    if (selectedCustomer) {
      setTripDetails({
        ...initialTripDetails,
        customerId: selectedCustomer._id, // Preserve customerId
        customername: selectedCustomer.customername,
        pickup: selectedCustomer.pickup || "",
        date: selectedCustomer.date || "",
        time: selectedCustomer.time || "",
        dropoff: selectedCustomer.dropoff || "",
        mobileno: selectedCustomer.mobileno || "",
        date1: selectedCustomer.date1 || "",
        time1: selectedCustomer.time1 || "",
        triptype: selectedCustomer.triptype || "",
        subtype: selectedCustomer.subtype || "",
        vehicle: selectedCustomer.vehicle || "",
      });
    }
  }, [selectedCustomer]);

  const fetchTripDetails = async (customerId) => {
    try {
      const response = await fetch(
        `http://localhost:8787/api/trip-details/${customerId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch trip details");
      }
      const tripData = await response.json();
      setTripDetails(tripData);
    } catch (error) {
      console.error("Error fetching trip details:", error);
      setError("Error fetching trip details: " + error.message);
    }
  };

  const handleFieldChange = (fieldName, value) => {
    setTripDetails((prevTripDetails) => ({
      ...prevTripDetails,
      [fieldName]: value,
    }));

    // If the selected field is 'customerId', fetch corresponding trip details
    if (fieldName === "customerId") {
      const selectedCustomer = customers.find(
        (customer) => customer.customername === value
      );
      setSelectedCustomer(selectedCustomer);
      fetchTripDetails(selectedCustomer._id);
    }
  };

  const [apiKey, setApiKey] = useState("8d8f316a636542f4b5f75a7faf1be48e");

  // const handleShareClick = async () => {
  //   try {
  //     await fetchTripDetails(selectedCustomer.customerId);
  //     console.log('Pickup Location:', tripDetails.pickup);
  //     console.log('Pickup Date:', tripDetails.date);
  //     console.log('Time:', tripDetails.time);
  //     console.log('Drop-off Location:', tripDetails.dropoff);
  //     console.log("customer Mobile number: ", tripDetails.mobileno);
  //     console.log('Drop-off Date:', tripDetails.date1);
  //     console.log('Drop-off Time:', tripDetails.time1);
  //     console.log('Type Of Vehicle:', tripDetails.vehicle);
  //     console.log('Trip Type:', tripDetails.triptype);
  //     console.log('Sub Type:', tripDetails.subtype);
  //     console.log('Driver Name:', tripDetails.drivername);
  //     console.log('Mail:', tripDetails.mail);
  //     console.log('Mobile No:', tripDetails.drivermobileno);
  //     console.log('Driver Address:', tripDetails.address);
  //     console.log('Vehicle Number:', tripDetails.vehicleno);
  //     const textMessage = `hello ${tripDetails.customername} your booking is done your booking id is
  //          ${tripDetails._id} your trip type is ${tripDetails.triptype} and your pickup location is ${tripDetails.pickup} and your drop location is ${tripDetails.dropoff}
  //          your driver details are driver name: ${tripDetails.drivername} and his mobile number: ${tripDetails.drivermobileno}`;

  //     console.log(textMessage)

  //     const Url = "http://api.paysmm.co.in/wapp/api/send";
  //     const mobileNumber = tripDetails.mobileno;

  //     const url = `${Url}?apikey=${apiKey}&mobile=${mobileNumber}&msg=${textMessage}`;

  //     // // Open the URL in a new browser window
  //     window.open(url, "_blank");

  //     // // Log the request details if needed
  //     console.log("Opening link:", url);
  //   } catch (error) {
  //     console.error('Error fetching trip details:', error);
  //     alert('Failed to share trip details. Please try again.');
  //   }
  // };

  const handleAllocateTrip = () => {
    // Construct payload object
    const payload = {
      customerId: selectedCustomer?._id,
      customername: selectedCustomer?.customername,
      customermobile: tripDetails.mobileno,
      pickuplocation: tripDetails.pickup,
      dropofflocation: tripDetails.dropoff,
      ...tripDetails,
    };

    // Make POST request to API endpoint
    axios
      .post("http://localhost:8787/api/trip-details", payload)
      .then((response) => {
        // Handle success
        alert("Allocate Trip added successfully!", "success");
        console.log("Trip allocated successfully:", response.data);
        // Optionally, you can reset form fields or show a success message
      })
      .catch((error) => {
        // Handle error
        alert("Failed to add data. Please try again.", "danger");
        // Optionally, show an error message to the user
      });
  };

  return (
    <>
      <div className="trip-details-container">
        <h2
          style={{ fontSize: "2rem", fontWeight: "bold" }}
          className="relative left-[22rem] mt-2 mb-2"
        >
          Allocate Trip Details
        </h2>
        <div className="d-flex gap-3" style={{ borderTop: "3px dashed black" }}>
          <div className="trip-details-section mt-4">
            {error && <p className="text-red-500">{error}</p>}
            <h2 className="trip-details-heading">Trip Details</h2>
            <div className="trip-details-form">
              <div className="pt-4 mb-1 grid-gap-2">
                <label htmlFor="triptype" className="trip-details-label">
                  Customer Name:
                </label>
                <span className="required-asterisk">*</span>
                <select
                  className="driver-details-input"
                  id="customerId"
                  name="customerId"
                  onChange={(e) => {
                    const selectedCustomer = customers.find(
                      (customer) => customer.customername === e.target.value
                    );
                    setSelectedCustomer(selectedCustomer);
                  }}
                  value={selectedCustomer ? selectedCustomer.customername : ""}
                >
                  <option value="">Select Customer</option>
                  {customers.map((customer) => (
                    <option key={customer._id} value={customer.customername}>
                      {customer.customername}
                    </option>
                  ))}
                </select>

                <div className="d-flex gap-3">
                  <div>
                    <label htmlFor="pickup" className="trip-details-label">
                      Pickup Location:
                    </label>
                    <span className="required-asterisk">*</span>
                    <input
                      type="text"
                      className="driver-details-input"
                      placeholder="Pickup Location"
                      value={tripDetails.pickup}
                      onChange={(e) =>
                        handleFieldChange("pickup", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="date" className="trip-details-label">
                      Pickup Date:
                    </label>
                    <span className="required-asterisk">*</span>
                    <input
                      type="date"
                      className="driver-details-input"
                      value={tripDetails.date}
                      onChange={(e) =>
                        handleFieldChange("date", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="time" className="trip-details-label">
                      Time:
                    </label>
                    <span className="required-asterisk">*</span>
                    <input
                      type="time"
                      className="driver-details-input"
                      value={tripDetails.time}
                      onChange={(e) =>
                        handleFieldChange("time", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="d-flex gap-3">
                  <div>
                    <label className="trip-details-label">
                      Dropoff Location:
                    </label>
                    <span className="required-asterisk">*</span>
                    <input
                      type="text"
                      className="driver-details-input"
                      placeholder="Drop-off Location"
                      value={tripDetails.dropoff}
                      onChange={(e) =>
                        handleFieldChange("dropoff", e.target.value)
                      }
                    />
                  </div>
                  <div className="drop-off">
                    <label htmlFor="dropoffDate" className="trip-details-label">
                      Drop-off Date:
                    </label>
                    <span className="required-asterisk">*</span>
                    <input
                      type="date"
                      className="driver-details-input"
                      value={tripDetails.date1}
                      onChange={(e) =>
                        handleFieldChange("date1", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="time1" className="trip-details-label">
                      {" "}
                      Time:
                    </label>
                    <span className="required-asterisk">*</span>
                    <input
                      type="time"
                      className="driver-details-input"
                      value={tripDetails.time1}
                      onChange={(e) =>
                        handleFieldChange("time1", e.target.value)
                      }
                    />
                  </div>
                </div>
                <label htmlFor="vehicle" className="trip-details-label">
                  Type Of Vehicle:
                </label>
                <span className="required-asterisk">*</span>
                <select
                  className="driver-details-input"
                  name="vehicle"
                  id="vehicle"
                  value={tripDetails.vehicle}
                  onChange={(e) => handleFieldChange("vehicle", e.target.value)}
                >
                  <option value="">Vehicle</option>
                  <option value="Sedan Car">Sedan Car</option>
                  <option value="Mini Car">Mini Car</option>
                  <option value="SUV Car">SUV Car</option>
                  <option value="Ac Bus 13-Seater">AC Bus 13-Seater</option>
                  <option value="AC Bus 17-Seater">AC Bus 17-Seater</option>
                  <option value="AC Bus 20-Seater">AC Bus 20-Seater</option>
                  <option value="AC Bus 32-Seater">AC Bus 32-Seater</option>
                  <option value="AC Bus 35-Seater">AC Bus 35-Seater</option>
                  <option value="AC Bus 40-Seater">AC Bus 40-Seater</option>
                  <option value="AC Bus 45-Seater">AC Bus 45-Seater</option>
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

                <label htmlFor="triptype" className="trip-details-label">
                  Trip Type:
                </label>
                <span className="required-asterisk">*</span>
                <select
                  className="driver-details-input"
                  id="triptype"
                  value={tripDetails.triptype}
                  onChange={(e) =>
                    handleFieldChange("triptype", e.target.value)
                  }
                >
                  <option value="">Trip Type</option>
                  <option value="One Way Trip">One Way Trip</option>
                  <option value="Return Trip">Return Trip</option>
                </select>

                <label htmlFor="subtype" className="trip-details-label">
                  Sub Type:
                </label>
                <span className="required-asterisk">*</span>
                <select
                  className="driver-details-input"
                  id="subtype"
                  value={tripDetails.subtype}
                  onChange={(e) => handleFieldChange("subtype", e.target.value)}
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
            </div>
          </div>

          <div className="driver-details-section mt-4">
            <h2 className="driver-details-heading">Driver Details</h2>
            <div className="driver-details-form">
              <div className="pt-4 mb-1 grid-gap-2">
                <label htmlFor="mobileno" className="driver-details-label">
                  Customer Mobile No:
                </label>
                <span className="required-asterisk">*</span>
                <input
                  type="number"
                  className="driver-details-input"
                  name="mobileno"
                  placeholder="Customer Mobile No"
                  value={tripDetails.mobileno}
                  onChange={(e) =>
                    handleFieldChange("mobileno", e.target.value)
                  }
                />
                <label htmlFor="drivername" className="driver-details-label">
                  Driver Name:
                </label>
                <span className="required-asterisk">*</span>
                <input
                  type="text"
                  className="driver-details-input"
                  name="drivername"
                  placeholder="Driver Name"
                  value={tripDetails.drivername}
                  onChange={(e) =>
                    handleFieldChange("drivername", e.target.value)
                  }
                />

                <label htmlFor="drivermail" className="driver-details-label">
                  Mail:
                </label>
                <input
                  type="email"
                  className="driver-details-input"
                  name="drivermail"
                  placeholder="Mail Id"
                  value={tripDetails.mail}
                  onChange={(e) => handleFieldChange("mail", e.target.value)}
                />

                <label
                  htmlFor="drivermobileno"
                  className="driver-details-label"
                >
                  Driver Mobile No:
                </label>
                <span className="required-asterisk">*</span>
                <input
                  type="number"
                  className="driver-details-input"
                  name="drivermobileno"
                  placeholder="Driver Mobile No."
                  value={tripDetails.drivermobileno}
                  onChange={(e) =>
                    handleFieldChange("drivermobileno", e.target.value)
                  }
                />

                <label htmlFor="address" className="driver-details-label">
                  Driver Address:
                </label>
                <input
                  type="text"
                  className="driver-details-input"
                  name="address"
                  placeholder="Driver Address"
                  value={tripDetails.address}
                  onChange={(e) => handleFieldChange("address", e.target.value)}
                />
                <label htmlFor="vehicleno" className="driver-details-label">
                  Vehicle Number:
                </label>
                <input
                  type="text"
                  className="driver-details-input"
                  name="vehicleno"
                  placeholder="Vehicle Number"
                  value={tripDetails.vehicleno}
                  onChange={(e) =>
                    handleFieldChange("vehicleno", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="custom-button-container text-center">
          <button
            className="custom-btn custom-allocate-btn"
            onClick={handleAllocateTrip}
          >
            Allocate
          </button>
          {/* <button className="custom-btn custom-generate-btn" onClick={handleShareClick}>
            Share
          </button> */}
        </div>
      </div>
    </>
  );
}

export default AllocateTrip;
