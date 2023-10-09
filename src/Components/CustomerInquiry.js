import React, {useState } from 'react';
import  './CustomerInquiry.css';

const CustomerInquiry = () => {
  const initialFormData = {
    customerid: '',
    customername: '',
    mobileno: '', 
    email: '',
    address: '',
    triptype: '',
    subtype: '',
    pickup:'',
    date:'',
    time:'',
    dropoff:'',
    date1:'',
    time1:'',
    days: '',
    hours: '',
    vehicle:'',
  };
const [formData, setFormData] = useState(initialFormData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form data:', formData);
  };

  return (
    <div className="container-cust-inquiry">
      <div className="form">
  <div className=" pt-4  mb-2 grid-gap-2  col-6">
  <label htmlFor="customerid" className="form-label">Customer Id:</label>
  <input className="form-control" type="text" id="customerid"/>
  <label htmlFor="customername" className="form-label">Customer Name:</label>
  <input className="form-control" type="text" id="customername"/>
  </div>
   <div className=" pt-4 mb-2 grid-gap-2  col-6">
  <label htmlFor="mobileno" className="form-label">  Mobile No:</label>
  <input className="form-control" type="text" id="mobileno"/>
  <label htmlFor="emailid" className="form-label">Email Id:</label>
  <input className="form-control" type="text" id="email"/>
  </div>
  </div>
  <div className="  col-12">
  <label htmlFor="address" className="form-label">Address:</label>
  <input className="form-control" type="text" id="address" onChange={handleChange} value={formData.address}/>
  </div>
  <div className="form">
  <div className="mb-2  grid gap-0 column-gap-3 col-6">
    <label htmlFor="triptype" className="form-label">Trip Type:</label>
        <select className="form-control mb-2 my-4 mt-1 " id="Trip type" onChange={handleChange} value={formData.triptype} >
          <option value="">Trip Type</option>
          <option value="One Way Trip">One Way Trip</option>
          <option value="Return Trip">Return Trip</option>
        </select>
        </div>
        <div className=" mb-2  grid gap-0 column-gap-3 col-6">
        <label htmlFor="subtype" className="form-label">Sub Type:</label>
        <select className="form-control mb-2 my-4 mt-1" id="subtype"  onChange={handleChange} value={formData.subtype} >
          <option value="">Sub Type</option>
          <option value="Local Trip">Local Trip</option>
          <option value="Outstaion Trip">Outstation Trip</option>
          <option value="Outstaion Local Trip">Outstation Local Trip</option>
          <option value="Outstaion Outstation Trip">Outstation Outstation Trip</option>
        </select>
        </div>
        </div>
        <div className="form">
        <div className="mb-2  grid gap-0 column-gap-3 col-4">
        <label htmlFor="pickup" className="form-label">Pickup Location:</label>
  <input type="text" className="form-control" name="pickup" placeholder="Pickup Location" onChange={handleChange} value={formData.pickup}/>
  <label htmlFor="dropoff" className="form-label">Dropoff Location:</label>
  <input type="text" className="form-control"  name="dropoff" placeholder="Enter Dropoff Location" onChange={handleChange} value={formData.dropoff} />
  </div>
  <div className="mb-2  grid gap-0 column-gap-3 col-4">
  <label htmlFor="date" className="form-label">Date:</label>
  <input type="date" className="form-control"  name="date" placeholder="Date" onChange={handleChange} value={formData.date} />
  <label htmlFor="date1" className="form-label">Date:</label>
  <input type="date" className="form-control"  name="date1" placeholder="Date" onChange={handleChange} value={formData.date1} />
  </div>
  <div className="mb-2  grid gap-0 column-gap-3 col-4">
  <label htmlFor="time" className="form-label">Time:</label>
  <input type="time" className="form-control"  name="time" placeholder="Time" onChange={handleChange} value={formData.time} />
  <label htmlFor="time1" className="form-label">Time:</label>
  <input type="time" className="form-control"  name="time1" placeholder="Time" onChange={handleChange} value={formData.time1} />
  </div>
  </div>
   <div className="form">
  <div className="mb-2 grid gap-0 column-gap-3 col-6">
  <label htmlFor="time" className="form-label">Total Day:</label>
  <input type="number" className="form-control" name="totaldays" placeholder="Total Days" onChange={handleChange} value={formData.totaldays}/>
  </div>
  <div className=" mb-2 grid gap-0 column-gap-3 col-6">
  <label htmlFor="hours" className="form-label">Total Hours:</label>
  <input type="text" className="form-control"  name="hours" placeholder="Hours" onChange={handleChange} value={formData.hours} />
  </div>
  </div>
  <div className="mb-2grid gap-0 column-gap-3 col-12">
  <label htmlFor="vehicle" className="form-label">Vehicle:</label>
        <select className="form-control mb-2" name="vehicle" id="vehicle" onChange={handleChange} value={formData.vehicle} >
          <option value="">Vehicle</option>
          <option value="Sedan Car">Sedan Car</option>
          <option value="Mini Car">Mini Car</option>
          <option value="SUV Car">SUV Car</option>
          <option value="Tempo Traveller">Tempo Traveller</option>
          <option value="AC Bus">AC Bus</option>
          <option value="Non-AC Bus">Non-AC Bus</option>
        </select>
    </div>
 <button  type="button" className="btn btn-danger" onClick={handleSubmit}>
         Submit
     </button>
    </div>
)};

export default CustomerInquiry;
