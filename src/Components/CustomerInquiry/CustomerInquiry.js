import React, { useState, useEffect } from "react";
import "./CustomerInquiry.css";
import Sidebar from "../Sidebar/Sidebar";

const CustomerInquiry = () => {
  const initialFormData = {
    customername: "",
    cus_Id : '',
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
  };
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState('');
  const [customerList, setCustomerList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('http://localhost:7000/api/add-customers');
        if (response.ok) {
          const data = await response.json();
          setCustomerList(data);
        } else {
          console.error('Failed to fetch customers');
        }
      } catch (error) {
        console.error('API request error:', error);
      }
    };

    fetchCustomers();
  }, []);

  useEffect(() => {
    if (selectedCustomer) {
      setFormData((prevData) => ({
        ...prevData,
        mobileno: selectedCustomer.Cus_Mobile ,
        email: selectedCustomer.Cus_Email,
        address: selectedCustomer.address,
      }));
    }
  }, [selectedCustomer]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const apiData = {
      customer_id: selectedCustomer ? selectedCustomer._id : '',
      customer_name: formData.customername,
      mobileno: formData.mobileno,
      email: formData.email,
      tripe_type: formData.triptype,
      sub_type: formData.subtype,
      pic_up: formData.pickup,
      date: formData.date,
      time: formData.time,
      drop_of: formData.dropoff,
      date1: formData.date1,
      days: formData.totaldays,
      hours: formData.hours,
      vehicle: formData.vehicle,
      address:formData.address,
      time1:formData.time1,
      totaldays: formData.totaldays,
    };

    for (const key in apiData) {
      if (apiData[key] === '') {
        setError('All fields are required.');
        return;
      }
    }

    setError('');

    try {
      const response = await fetch('http://localhost:7000/api/customer-enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });

      if (response.ok) {
        alert('Data saved successfully!');
        setFormData(initialFormData);
      } else {
        alert('Failed to save data. Please try again.');
      }
    } catch (error) {
      console.error('API request error:', error);
      alert('Failed to save data. Please try again.');
    }
  };

  return (
    <>
      <Sidebar />
      <div className="customer-inquiry-container">
        <div className="main-container">
          <div className="form-container">
            <h2 style={{fontSize:"2rem",fontWeight:"bold",marginBottom:"8px"}}>Add Customer Enquiry</h2>
            <div className="form-group">
              <label htmlFor="customername" className="form-label">
                Customer Name:
              </label>
              <select
                className="form-control-cust-inq-input"
                id="customername"
                name="customername"
                onChange={(e) => {
                  const selectedCustomer = customerList.find(
                    (customer) => customer.Cus_name === e.target.value
                  );
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
            </label>
            <select className="form-control-cust-inq-input" id="triptype" name="triptype" onChange={handleChange} value={formData.triptype}>
              <option value="">Trip Type</option>
              <option value="One Way Trip">One Way Trip</option>
              <option value="Return Trip">Return Trip</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="subtype" className="form-label">
              Sub Type:
            </label>
            <select className="form-control-cust-inq-input" id="subtype" name="subtype" onChange={handleChange} value={formData.subtype}>
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
            </label>
            <input type="text" className="form-control cust-inq-input" name="pickup" placeholder="Pickup Location" onChange={handleChange} value={formData.pickup} />
          </div>
          </div>
          <div>
          <div className="form-group">
            <label htmlFor="date1" className="form-label">
              Date:
            </label>
            <input type="date" className="form-control cust-inq-input" name="date1" onChange={handleChange} value={formData.date1} />
          </div>
          </div>
          <div>
          <div className="form-group">
            <label htmlFor="time" className="form-label">
              Time:
            </label>
            <input type="time" className="form-control cust-inq-input" name="time" onChange={handleChange} value={formData.time} />
          </div>
          </div>
          </div>
          <div className="d-flex gap-3">
            <div>
          <div className="form-group">
            <label htmlFor="dropoff" className="form-label">
              Dropoff Location:
            </label>
            <input type="text" className="form-control cust-inq-input" name="dropoff" placeholder="Enter Dropoff Location" onChange={handleChange} value={formData.dropoff} />
          </div>
          </div>
          <div>
          <div className="form-group">
            <label htmlFor="date" className="form-label">
              Date:
            </label>
            <input type="date" className="form-control cust-inq-input" name="date" onChange={handleChange} value={formData.date} />
          </div>
          </div>
          <div>
          <div className="form-group">
            <label htmlFor="time1" className="form-label">
              Time:
            </label>
            <input type="time" className="form-control cust-inq-input" name="time1" onChange={handleChange} value={formData.time1} />
          </div>
          </div>
          </div>
         
          <div className="form-group">
            <label htmlFor="totaldays" className="form-label">
              Total Days:
            </label>
            <input type="number" className="form-control-cust-inq-input" name="totaldays" placeholder="Total Days" onChange={handleChange} value={formData.totaldays} />
          </div>
          <div className="form-group">
            <label htmlFor="hours" className="form-label">
              Total Hours:
            </label>
            <input type="text" className="form-control-cust-inq-input" name="hours" placeholder="Hours" onChange={handleChange} value={formData.hours} />
          </div>
          <div className="form-group">
            <label htmlFor="vehicle" className="form-label">
              Vehicle:
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

export default CustomerInquiry;
