import React, { useState, useEffect } from "react";
import "./CustomerEnquiry.css";
import Sidebar from "../Sidebar/Sidebar";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const CustomerEnquiry = () => {
  const initialFormData = {
    customername: "",
    cus_Id: "",
    mobileno: "",
    email: "",
    address: "",
    triptype: "",
    subtype: "",
    pickup: "",
    date1: "",
    time1: "",
    dropoff: "",
    date2: "",
    time2: "",
    totaldays: "",
    totalhours: "",
    vehicle: "",

  };
  //Function to format the date as dd/mm/yy
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2); // Take only the last two digits of the year
    return `${day}/${month}/${year}`;
  };
  const [formData, setFormData] = useState(initialFormData);
  // const [selectedDate, setSelectedDate] = useState(null);
  const [error, setError] = useState("");
  const [customerList, setCustomerList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("https://carbooking-backend-fo78.onrender.com/api/add-customers");
        if (response.ok) {
          const data = await response.json();
          setCustomerList(data);
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
      setFormData((prevData) => ({
        ...prevData,
        customername: selectedCustomer.Cus_name,
        mobileno: selectedCustomer.Cus_Mobile,
        email: selectedCustomer.Cus_Email,
        address: selectedCustomer.address,
      }));
    }
  }, [selectedCustomer]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    

    const apiData = {
      customer_id: selectedCustomer ? selectedCustomer._id : "",
      customer_name: formData.customername,
      mobileno: formData.mobileno,
      email: formData.email,
      tripe_type: formData.triptype,
      sub_type: formData.subtype,
      pic_up: formData.pickup,
      date1: formData.date1,
      time1: formData.time1,
      drop_of: formData.dropoff,
      date2: formData.date2,
      time2: formData.time2,
      days: formData.totaldays,
      hours: formData.totalhours,
      vehicle: formData.vehicle,
      address: formData.address,
    };

    for (const key in apiData) {
      if (apiData[key] === "") {
        setError("All fields are required.");
        return;
      }
    }

    setError("");

    try {
      const response = await fetch("https://carbooking-backend-fo78.onrender.com/api/customer-enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
      });

      if (response.ok) {
        const responseData = await response.json();
        setApiResponse(responseData);
        alert("Data saved successfully!");
        setFormData(initialFormData);
      } else {
        alert("Failed to save data. Please try again.");
      }
    } catch (error) {
      console.error("API request error:", error);
      alert("Failed to save data. Please try again.");
    }
  };

  const handleDateChange = (event) => {
    handleChange(event);
   
    

    const { date1,date2, } = formData;

    if (date1 &&  date2) {
      const pickupDate = new Date(`${date1}`);
      const dropoffDate = new Date(`${date2}`);

      // console.log("Selected Pickup Date :", pickupDate);
      // console.log("Selected Dropoff Date:", dropoffDate);

      const timeDifference = dropoffDate - pickupDate;

      const totalDays = Math.abs(Math.round(timeDifference / (1000 * 3600 * 24)));
      const totalHours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

      setFormData((prevData) => ({
        ...prevData,
        totaldays: totalDays,
        totalhours: totalHours,
      }));
    }
  };
 

  const updateTotal = () => {
    const selectedDate1 = new Date(`${formData.date1}`);
    const selectedDate2 = new Date(`${formData.date2}`);
  
    if (!isNaN(selectedDate1) && !isNaN(selectedDate2)) {
      const timeDifference = selectedDate2 - selectedDate1;
      const totalDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
      const totalHours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
      // const formattedDate1 = formatDate(selectedDate1);
      // const formattedDate2 = formatDate(selectedDate2);
  
      setFormData((prevData) => ({
        ...prevData,
        totaldays: totalDays,
        totalhours: totalHours,
        // formattedDate1: formattedDate1,
        // formattedDate2: formattedDate2,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        totaldays: "",
        totalhours: "",
        formattedDate1: "",
        formattedDate2: "",
      }));
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "date1" || name === "date2" ) {
      updateTotal();
    }
  };

  const handleBlur = () => {
    updateTotal();
  };

  return (
    <>
      <Sidebar />
      <div className="customer-inquiry-container">
        <div className="main-container">
          <div className="form-container">
            <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "8px" }}>Add Customer Enquiry</h2>
            {error && <div className="error-message">{error}</div>}
            {apiResponse && (
              <div className={`api-response-message ${apiResponse.success ? "success" : "error"}`}>
                {apiResponse.message}
              </div>
            )}
            <div className="form-group">
              <label htmlFor="customername" className="form-label">
                Customer Name:
              </label>
              <select
                className="form-control-cust-inq-input"
                id="customername"
                name="customername"
                onChange={(e) => {
                  const selectedCustomer = customerList.find((customer) => customer.Cus_name === e.target.value);
                  setSelectedCustomer(selectedCustomer);
                  handleChange(e);
                }}
                value={formData.customername}
              >
                <option value="">Select Customer</option>
                {customerList.map((customer) => (
                  <option key={customer._id} value={customer.Cus_name}>
                    {customer.Cus_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="mobileno" className="form-label">
                Mobile No:
              </label>
              <input
                className="form-control-cust-inq-input"
                type="text"
                id="mobileno"
                name="mobileno"
                placeholder="Mobile No."
                onChange={handleChange}
                value={formData.mobileno}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Id:
              </label>
              <input
                className="form-control-cust-inq-input"
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                value={formData.email}
              />
            </div>
            <div className="form-group">
              <label htmlFor="address" className="form-label">
                Address:
              </label>
              <input
                className="form-control-cust-inq-input"
                type="text"
                id="address"
                name="address"
                placeholder="Address"
                onChange={handleChange}
                value={formData.address}
              />
            </div>

            <div className="form-group">
              <label htmlFor="triptype" className="form-label">
                Trip Type:
              <span className="required-asterisk">*</span>
              </label>
              <select
                className="form-control-cust-inq-input"
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
            <div className="form-group">
              <label htmlFor="subtype" className="form-label">
                Sub Type:
              <span className="required-asterisk">*</span>
              </label>
              <select
                className="form-control-cust-inq-input"
                id="subtype"
                name="subtype"
                onChange={handleChange}
                value={formData.subtype}
              >
                <option value="">Sub Type</option>
                <option value="Local Trip">Local Trip</option>
                <option value="Outstation Trip">Outstation Trip</option>
                <option value="Outstation Local Trip">Outstation Local Trip</option>
                <option value="Outstation Outstation Trip">Outstation Outstation Trip</option>
              </select>
            </div>
            <div className="d-flex gap-3">
              <div>
                <div className="form-group">
                  <label htmlFor="pickup" className="form-label">
                    Pickup Location:
                  <span className="required-asterisk">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control cust-inq-input"
                    name="pickup"
                    placeholder="Pickup Location"
                    onChange={handleChange}
                    value={formData.pickup}
                  />
                </div>
              </div>
              <div>
              <div className="form-group">
                  <label htmlFor="date" className="form-label">
                    Date :
                    <span className="required-asterisk">*</span>
                  </label>
                  <DatePicker
                  placeholderText="dd/mm/yyyy"
                    className="form-control cust-inq-input"
                    selected={formData.date1 ? new Date(formData.date1) : null}
                    onChange={(date) => handleChange({ target: { name: "date1", value: date } })}
                    dateFormat="dd/MM/yyyy" // Set the desired date format
                    calendarIcon={<i className="fas fa-calendar-alt"></i>} // Use your preferred icon
                  />
                 {/* {formData.date1 && (
                  <p>Formatted Date : {formatDate(new Date(formData.date1))}</p>
                  )} */}
                </div>
                
              </div>
              <div>
                <div className="form-group">
                  <label htmlFor="time1" className="form-label">
                    Time :
                  <span className="required-asterisk">*</span>
                  </label>
                  <input
                    type="time"
                    className="form-control cust-inq-input"
                    name="time1"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={formData.time1}
                  />
                </div>
              </div>
            </div>
            <div className="d-flex gap-3">
              <div>
                <div className="form-group">
                  <label htmlFor="dropoff" className="form-label">
                    Dropoff Location:
                  <span className="required-asterisk">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control cust-inq-input"
                    name="dropoff"
                    placeholder="Enter Dropoff Location"
                    onChange={handleChange}
                    value={formData.dropoff}
                  />
                </div>
              </div>
              <div>
              <div className="form-group">
                  <label htmlFor="date2" className="form-label">
                    Date :
                    <span className="required-asterisk">*</span>
                  </label>
                  <DatePicker
                  placeholderText="dd/mm/yyyy"
                    className="form-control cust-inq-input"
                    selected={formData.date2 ? new Date(formData.date2) : null}
                    onChange={(date) => handleChange({ target: { name: "date2", value: date } })}
                    dateFormat="dd/MM/yyyy" // Set the desired date format
                    calendarIcon={<i className="fas fa-calendar-alt"></i>} // Use your preferred icon
                  />
                 {/* {formData.date1 && (
                  <p>Formatted Date : {formatDate(new Date(formData.date1))}</p>
                  )} */}
                </div>
              </div>
              <div>
                <div className="form-group">
                <label htmlFor="time2" className="form-label">
                    Time :
                <span className="required-asterisk">*</span>
                  </label>
                  <input
                    type="time"
                    className="form-control cust-inq-input"
                    name="time2"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={formData.time2}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="totaldays" className="form-label">
              {/* <span className="required-asterisk">*</span> */}
                Total Days:
                <span className="days" >Days</span>
              </label>
              <input
                type="number"
                className="form-control-cust-inq-input"
                name="totaldays"
                // placeholder="Total Days"
                onChange={handleChange}
                value={formData.totaldays}
                readOnly
            
              />
            </div>
            <div className="form-group">
              <label htmlFor="hours" className="form-label">
              {/* <span className="required-asterisk">*</span> */}
                Total Hours:
                <span className="days" >Hours</span>
              </label>
              <input
                  type="text"
                  className="form-control-cust-inq-input"
                  name="totalhours"
                  // placeholder="Total Hours"
                  value={formData.totalhours}
                  readOnly
                />
            </div>
            <div className="form-group">
              <label htmlFor="vehicle" className="form-label">
                Type Of Vehicle:
              <span className="required-asterisk">*</span>
              </label>
              <select className="form-control-cust-inq-input" name="vehicle" id="vehicle" onChange={handleChange} value={formData.vehicle}>
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
            <button type="button" className="btn-submit" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerEnquiry;
