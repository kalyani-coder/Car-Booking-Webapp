import React, { useState, useEffect } from "react";
import "./CustomerEnquiry.css";
import Sidebar from "../Sidebar/Sidebar";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import Alert from "../AddCustomer/Alert";
import axios from 'axios';

const CustomerEnquiry = () => {
  const initialFormData = {
    customername: "",
    cus_Id: "",
    mobileno: "",
    email: "",
    address: "",
    tripe_type: "",
    sub_type: "",
    pic_up: "",
    date1: "",
    time1: "",
    drop_of: "",
    date2: "",
    time2: "",
    totalDays: "",
    totalHours: "",
    vehicle: "",
  };

  // Function to format the date as dd/mm/yy
  const formatDate = (date) => {
    return date ? moment(date).format("DD/MM/YYYY") : "";
  };

  // Function to format the date as yyyy-mm-dd for POST request
  const formatDateForPost = (date) => {
    return date ? moment(date).format("YYYY-MM-DD") : null;
  };

  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState("");
  const [customerList, setCustomerList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);
  const [successAlert, setSuccessAlert] = useState(null);
  const [errorAlert, setErrorAlert] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://localhost:8787/api/add-customers");
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
        customername: selectedCustomer.cus_name || "",
        mobileno: selectedCustomer.cus_mobile || "",
        email: selectedCustomer.cus_email || "",
        address: selectedCustomer.address || "",
      }));
    }
  }, [selectedCustomer]);

  const updateTotal = () => {
    const selectedDate1 = new Date(formData.date1);
    const selectedDate2 = new Date(formData.date2);

    if (!isNaN(selectedDate1) && !isNaN(selectedDate2)) {
      const timeDifference = selectedDate2 - selectedDate1;
      const totalDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
      const totalHours = Math.floor(timeDifference / (1000 * 60 * 60)); // Calculate total hours

      setFormData((prevData) => ({
        ...prevData,
        totalDays: totalDays.toString(),
        totalHours: totalHours.toString(),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        totalDays: "",
        totalHours: "",
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


  const handleSubmit = async (event) => {
    event.preventDefault();

    const apiData = {
      customer_id: selectedCustomer ? selectedCustomer._id : "",
      customer_name: formData.customername,
      mobileno: formData.mobileno,
      email: formData.email,
      tripe_type: formData.tripe_type,
      sub_type: formData.sub_type,
      pic_up: formData.pic_up,
      date1: formatDateForPost(formData.date1),
      date2: formatDateForPost(formData.date2),
      time1: formData.time1,
      drop_of: formData.drop_of,
      time2: formData.time2,
      vehicle: formData.vehicle,
      totalDays: formData.totalDays,
      totalHours: formData.totalHours,
      address: formData.address,
    };

    try {
      console.log("Sending API request with data:", apiData);
      const response = await axios.post("http://localhost:8787/api/customer-enquiry", apiData, {
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (response.status === 200 || response.status === 201) {
        const responseData = response.data;
        alert("Customer Enquiry Added successfully!", "success");
        console.log("Data submitted successfully:", responseData);
        setFormData(initialFormData); // Clear form after successful submission
      } else {
        showAlert(`Failed to add data. ${response.statusText}`, "error");
        console.error("Failed to submit data:", response.statusText);
      }
    } catch (error) {
      console.error("API request error:", error);
      showAlert("Failed to add data. Please try again.", "error");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    let newData = { ...formData, [name]: value };

    if (
      (name === "date1" ||
        name === "date2" ||
        name === "time1" ||
        name === "time2") &&
      newData.date1 &&
      newData.date2 &&
      newData.time1 &&
      newData.time2
    ) {
      let startDate = new Date(`${newData.date1}T${newData.time1}`);
      let endDate = new Date(`${newData.date2}T${newData.time2}`);

      if (startDate.getTime() === endDate.getTime()) {
        newData = {
          ...newData,
          totalDays: "0",
          totalHours: "0",
          totalMinutes: "0",
        };
      } else {
        if (endDate < startDate) {
          endDate.setDate(endDate.getDate() + 1);
        }

        const timeDifference = endDate - startDate;
        let totalHours = timeDifference / (1000 * 60 * 60);
        let totalMinutes = (totalHours - Math.floor(totalHours)) * 60;

        // Handle rounding effect for 5:30
        if (totalHours <= 0 && totalHours > -1) {
          totalHours = 1;
          totalMinutes = 30;
        }

        newData = {
          ...newData,
          totalDays: Math.floor(totalHours / 24).toString(),
          totalHours: (totalHours + (totalMinutes / 60)).toFixed(2),
          totalMinutes: totalMinutes.toFixed(2).split('.')[1].padStart(2, '0'),
          // Optional: totalHoursWithMinutes can be kept for consistency with the first version
          totalHoursWithMinutes: (totalHours + (totalMinutes / 60)).toFixed(2),
        };
      }
    }

    setFormData(newData);
    setError("");
  };

  const handleBlur = () => {
    // updateTotal();
  };

  return (
    <>
      <Sidebar />
      <div className="customer-inquiry-container">
        <div className="main-container relative left-[6rem] mt-4">
          <div className="form-container">
            <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem" }}>Add Customer Enquiry</h2>

            {successAlert && <Alert alert={successAlert} />}
            {errorAlert && <Alert alert={errorAlert} />}

            <div className="form-group">
              <label htmlFor="customername" className="form-label">
                Customer Name / Company Name:
                <span className="required-asterisk">*</span>
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
                id="tripe_type"
                name="tripe_type"
                onChange={handleChange}
                value={formData.tripe_type}
              >
                <option value="">Trip Type</option>
                <option value="One Way Trip">One Way Trip</option>
                <option value="Return Trip">Return Trip</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="sub_type" className="form-label">
                Sub Type:
                <span className="required-asterisk">*</span>
              </label>
              <select
                className="form-control-cust-inq-input"
                id="sub_type"
                name="sub_type"
                onChange={handleChange}
                value={formData.sub_type}
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
                  <label htmlFor="pic_up" className="form-label">
                    Pickup Location:
                    <span className="required-asterisk">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control cust-inq-input"
                    name="pic_up"
                    placeholder="Pickup Location"
                    onChange={handleChange}
                    value={formData.pic_up}
                  />
                </div>
              </div>
              <div>
                <div className="form-group">
                  <label htmlFor="date1" className="form-label">
                    Date :
                    <span className="required-asterisk">*</span>
                  </label>

                  <input
                    type="date"
                    className="form-control add-trip-input"
                    name="date1"
                    onChange={handleChange}
                    value={formData.date1}
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
                  <label htmlFor="drop_of" className="form-label">
                    Dropoff Location:
                    <span className="required-asterisk">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control cust-inq-input"
                    name="drop_of"
                    placeholder="Enter Dropoff Location"
                    onChange={handleChange}
                    value={formData.drop_of}
                  />
                </div>
              </div>
              <div>
                <div className="form-group">
                  <label htmlFor="date2" className="form-label">
                    Date :
                    <span className="required-asterisk">*</span>
                  </label>
                  <input
                    type="date"
                    className="form-control add-trip-input"
                    name="date2"
                    onChange={handleChange}
                    value={formData.date2}
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
              <label htmlFor="totalDays" className="form-label">
                {/* <span className="required-asterisk">*</span> */}
                Total Days:
                <span className="days" >Days</span>
              </label>
              <input
                type="number"
                className="form-control-cust-inq-input"
                name="totalDays"
                // placeholder="Total Days"
                onChange={handleChange}
                value={formData.totalDays}
              />
            </div>
            <div className="form-group">
              <label htmlFor="totalHours" className="form-label">
                {/* <span className="required-asterisk">*</span> */}
                Total Hours:
                {/* <span className="days" >  Hours</span> */}
              </label>
              <input
                type="number"
                className="form-control-cust-inq-input"
                name="totalHours"
                // placeholder="Total Days"
                onChange={handleChange}
                value={formData.totalHours}
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
