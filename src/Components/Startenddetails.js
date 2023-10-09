import React, { useState } from 'react';
import './CustomerInquiry.css';

const Startenddetails = () => {
  const initialFormData = {
    pickuplocation: '',
    date: '',
    time: '',
    dropofflocation: '',
    date1: '',
    time1: '',
    totaldays: '',
    totalhours: '',
    triptype: '',
    subtype: '',
    drivername: '',
    mobileno:'',
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePrint = (event) => {
    event.preventDefault();
    console.log('Form data:', formData);
  };


  return (
    <div className="container">

      <div className="form">
      <div className=" pt-4  mb-2 grid-gap-2  col-4">
          <label htmlFor="pickuplocation" className="form-label">Pickup Location:</label>
          <input className="form-control" type="text" name="pickuplocation" value={formData.pickuplocation} onChange={handleChange}/>
        </div>
        <div className="pt-4  mb-2 grid-gap-2  col-4">
          <label htmlFor="date" className="form-label">Date:</label>
          <input className="form-control" type="date" name="date" value={formData.date} onChange={handleChange}/>
          </div>
          <div className="pt-4  mb-2 grid-gap-2  col-4">
          <label htmlFor="time" className="form-label">Time:</label>
          <input className="form-control" type="time" name="time" value={formData.time} onChange={handleChange} />
          </div>
        </div>
        <div className="form">
      <div className=" mb-2 grid-gap-2  col-4">
          <label htmlFor="dropofflocation" className="form-label">Dropoff Location:</label>
          <input className="form-control" type="text" name="dropofflocation" value={formData.dropofflocation} onChange={handleChange}/>
        </div>
        <div className="mb-2 grid-gap-2  col-4">
          <label htmlFor="date1" className="form-label">Date:</label>
          <input className="form-control" type="date" name="date1" value={formData.date1} onChange={handleChange}/>
          </div>
          <div className="mb-2 grid-gap-2  col-4">
          <label htmlFor="time1" className="form-label">Time:</label>
          <input className="form-control" type="time" name="time1" value={formData.time1} onChange={handleChange} />
          </div>
        </div>
        <div className="form">
        <div className="mb-2 grid-gap-2 col-6">
          <label htmlFor="totaldays" className="form-label">Total Days:</label>
          <input className="form-control" type="number" name="totaldays" value={formData.totaldays} onChange={handleChange} />
        </div>
        <div className="mb-2 grid-gap-2 col-6">
          <label htmlFor="totalhours" className="form-label">Total Hours:</label>
          <input className="form-control" type="text" name="totalHours" value={formData.totalhours} onChange={handleChange} />
        </div>
        </div>
        <div className="form">
  <div className="mb-2  grid gap-0 column-gap-3 col-6">
    <label htmlFor="triptype" className="form-label">Trip Type:</label>
        <select className="form-control mb-2  " name="Trip type" onChange={handleChange} value={formData.triptype} >
          <option value="">Trip Type</option>
          <option value="One Way Trip">One Way Trip</option>
          <option value="Return Trip">Return Trip</option>
        </select>
        </div>
        <div className=" mb-2  grid gap-0 column-gap-3 col-6">
        <label htmlFor="subtype" className="form-label">Sub Type:</label>
        <select className="form-control mb-2 " name="subtype"  onChange={handleChange} value={formData.subtype} >
          <option value="">Sub Type</option>
          <option value="Local Trip">Local Trip</option>
          <option value="Outstaion Trip">Outstation Trip</option>
          <option value="Outstaion Local Trip">Outstation Local Trip</option>
          <option value="Outstaion Outstation Trip">Outstation Outstation Trip</option>
        </select>
        </div>
        </div>
        <div className="form">
        <div className="  mb-2 grid-gap-2  col-6">
  <label htmlFor="customerid" className="form-label">Customer Id:</label>
  <input className="form-control" type="text" name="customername"onChange={handleChange} value={formData.customername}/>
  </div>
  <div className="  mb-2 grid-gap-2  col-6">
  <label htmlFor="mobileno" className="form-label">  Mobile No:</label>
  <input className="form-control" type="text" name="mobileno" onChange={handleChange} value={formData.mobileno} />
  </div>
  </div>


          <button type="button" className="btn btn-danger" onClick={handlePrint}>
            Print
          </button>
          <button type="button" className="btn btn-danger mx-2" onClick={() => alert('Add')}>
            Add
          </button>
        </div>

  );
}

export default Startenddetails;