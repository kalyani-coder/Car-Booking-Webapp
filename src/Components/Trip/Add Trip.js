import React, { useState, useEffect } from "react";
import "./AddTrip.css";
import Sidebar from "../Sidebar/Sidebar";

const AddTrip = () => {
  const initialPersonData = {
    name: "",
    mobile: "",
    vehicleNo: "",
  };

  const handlePersonChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedPeople = [...prevData.people];
      updatedPeople[index] = {
        ...updatedPeople[index],
        [name]: value,
      };
      return {
        ...prevData,
        people: updatedPeople,
      };
    });
  };

  const addPerson = () => {
    if (formData.people.length < 7) {
      setFormData((prevData) => ({
        members: prevData.members + 1,
        people: [
          ...prevData.people,
          {
            name: "",
            mobile: "",
            vehicleNo: "",
          },
        ],
      }));
    }
  };

  const initialFormData = {
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
    members: 1,
    people: [{ ...initialPersonData }],
  };

  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState("");
  const [customerList, setCustomerList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Fetch customer data from the API using useEffect hook
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        // Make a GET request to the API endpoint for customers
        const response = await fetch(
          "https://carbooking-backend-fo78.onrender.com/api/add-customers"
        );

        if (response.ok) {
          // If the response is successful, parse the JSON data and set the customer list
          const data = await response.json();
          setCustomerList(data);
        } else {
          // If there is an error in the response, log an error message
          console.error("Failed to fetch customers");
        }
      } catch (error) {
        // If there is an error in making the request, log an error message
        console.error("API request error:", error);
      }
    };

    // Call the fetchCustomers function when the component mounts
    fetchCustomers();
  }, []); // The empty dependency array ensures that this effect runs only once on mount

  // Use useEffect to update form data when a customer is selected
  useEffect(() => {
    if (selectedCustomer) {
      // Assuming selectedCustomer contains additional details like Cus_GSTIN, address, Cus_Mobile
      setFormData({
        customername: selectedCustomer.Cus_name || "",
        mobileno: selectedCustomer.Cus_Mobile || "",
        email: selectedCustomer.Cus_Email || "",
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
        // Add other fields based on your customer details
      });
    }
  }, [selectedCustomer]); // Run this effect whenever selectedCustomer changes

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (
      (name === "date1" && formData.time1) ||
      (name === "date" && formData.time)
    ) {
      const startDate = new Date(formData.date + " " + formData.time);
      const endDate = new Date(formData.date1 + " " + formData.time1);

      // Calculate total days
      const timeDifference = endDate.getTime() - startDate.getTime();
      const totalDays = Math.abs(
        Math.round(timeDifference / (1000 * 3600 * 24))
      );

      // Update form data with total days
      setFormData((prevData) => ({
        ...prevData,
        totaldays: totalDays.toString(),
      }));
    }

    if (
      (name === "time1" && formData.date1) ||
      (name === "time" && formData.date)
    ) {
      const startTime = new Date(formData.date + " " + formData.time);
      const endTime = new Date(formData.date1 + " " + formData.time1);

      // Calculate total hours
      const timeDifference = endTime.getTime() - startTime.getTime();
      const totalHours = Math.abs(Math.round(timeDifference / (1000 * 3600)));

      // Update form data with total hours
      setFormData((prevData) => ({
        ...prevData,
        hours: totalHours.toString(),
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      Object.values(formData).some((value) => value === "") ||
      parseInt(formData.members, 10) < 1
    ) {
      alert(
        "Please fill in all required fields and ensure the number of members is greater than 0."
      );
      return;
    }

    const data = { ...formData };

    try {
      // Send the data to the API
      const response = await fetch(
        "https://carbooking-backend-fo78.onrender.com/api/add-trip",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

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
              {/* <label htmlFor="customerid" className="form-label">
              Customer Id:
            </label>
            <input className="form-control-cust-inq-input" type="text" id="customerid" name="customerid" placeholder="Customer id" onChange={handleChange} value={formData.customerid} /> */}
            </div>
            <div className="trip-form-group">
              <label htmlFor="customername" className="trip-form-label">
                Customer Name:
              </label>
              <select
                className="form-control-add-trip-input"
                id="customername"
                name="customername"
                onChange={(e) => {
                  // Find the selected customer from the list
                  const selectedCustomer = customerList.find(
                    (customer) => customer.Cus_name === e.target.value
                  );
                  // Set the selected customer to state
                  setSelectedCustomer(selectedCustomer);
                }}
                value={selectedCustomer ? selectedCustomer.Cus_name : ""}
              >
                <option value="">Select Customer</option>
                {customerList.map((customer) => (
                  <option
                    key={customer._id}
                    value={customer.Cus_name}
                    onClick={() => setSelectedCustomer(customer)}
                  >
                    {customer.Cus_name}
                  </option>
                ))}
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
              <div>
                <div className="trip-form-group">
                  <label htmlFor="numberOfPeople" className="trip-form-label">
                    Number of People:
                  </label>
                  <select
                    className="form-control-add-trip-input1"
                    name="members"
                    onChange={handleChange}
                    value={formData.members}
                  >
                    {[1, 2, 3, 4, 5, 6, 7].map((number) => (
                      <option key={number} value={number}>
                        {number}
                      </option>
                    ))}
                  </select>
                </div>
                 {/* Add Person button */}
                <div>
        <button type="button" className="trip-btn-submit" onClick={addPerson}>
          Add Person
        </button>
      </div>
                {/* Add person details for each person */}
                <div className="d-flex flex-wrap gap-3">
                  {formData.people.map((person, index) => (
                    <div key={index} className="trip-person-row">
                      <div className="trip-form-group">
                        <label
                          htmlFor={`name${index}`}
                          className="trip-form-label"
                        >
                          Person {index + 1} Name:
                        </label>
                        <input
                          type="text"
                          className="form-control-add-trip-input1"
                          name={`name${index}`}
                          placeholder="Name"
                          onChange={(e) => handlePersonChange(index, e)}
                          value={person.name}
                        />
                      </div>
                      <div className="trip-form-group">
                        <label
                          htmlFor={`mobile${index}`}
                          className="trip-form-label"
                        >
                          Mobile No:
                        </label>
                        <input
                          type="number"
                          className="form-control-add-trip-input1"
                          name={`mobile${index}`}
                          placeholder="Mobile No."
                          onChange={(e) => handlePersonChange(index, e)}
                          value={person.mobile}
                        />
                      </div>
                      <div className="trip-form-group">
                        <label
                          htmlFor={`vehicleNo${index}`}
                          className="trip-form-label"
                        >
                          Vehicle No:
                        </label>
                        <input
                          type="text"
                          className="form-control-add-trip-input1"
                          name={`vehicleNo${index}`}
                          placeholder="Vehicle No."
                          onChange={(e) => handlePersonChange(index, e)}
                          value={person.vehicleNo}
                        />
                      </div>
                    </div>
                  ))}
                </div>
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
              readOnly
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
              readOnly
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
              <option value="Non-AC Bus 17-Seater">Non-AC Bus 17-Seater</option>
              <option value="Non-AC Bus 20-Seater">Non-AC Bus 20-Seater</option>
              <option value="Non-AC Bus 32-Seater">Non-AC Bus 32-Seater</option>
              <option value="Non-AC Bus 40-Seater">Non-AC Bus 40-Seater</option>
              <option value="Non-AC Bus 45-Seater">Non-AC Bus 45-Seater</option>
              <option value="Non-AC Bus 49-Seater">Non-AC Bus 49-Seater</option>
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
    </>
  );
};

export default AddTrip;
