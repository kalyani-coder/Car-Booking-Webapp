import React, { useState } from 'react';
import './CustomerInquiry.css';

const ShareDetails = ()=> {
const initialFormData = {
    tripid:'',
    vehicle:'',
    triptype:'',
    subtype:'',
    pickup:'',
    date:'',
    time:'',
    Dropoff:'',
    date1:'',
    time1:'',
    drivername:'',
    drivermail:'',
    mobileno:'',
    mobilrno1:'',
};

const [formData, setFormData] = useState (initialFormData);
const handleChange = (event) => {
const {name,value} = event.target;
setFormData((prevData) =>({
    ...prevData,
    [name]:value
}));
};
const handleShare =(event) => {
    event.preventDefault();
    console.log('form data:',formData);
};
return(
    <div className='container'>
      <div className="form">
        <div className="mb-2  pt-4 grid gap-0 column-gap-3 col-6">
        <label htmlFor="tripid" className="form-label">Trip Id:</label>
  <input type="text" className="form-control" name="tripid" placeholder="Trip Id" onChange={handleChange} value={formData.tripid}/>
  </div>
  <div className="mb-2 pt-4 grid gap-0 column-gap-3 col-6">
  <label htmlFor="vehicle" className="form-label">Vehicle:</label>
  <select className="form-control " name="vehicle" id="vehicle" onChange={handleChange} value={formData.vehicle} >
          <option value="">Vehicle</option>
          <option value="Sedan Car">Sedan Car</option>
          <option value="Mini Car">Mini Car</option>
          <option value="SUV Car">SUV Car</option>
          <option value="Tempo Traveller">Tempo Traveller</option>
          <option value="AC Bus">AC Bus</option>
          <option value="Non-AC Bus">Non-AC Bus</option>
        </select>
        </div>
        </div>
        <div className="form">
        <div className="mb-2 my-2 grid gap-0 column-gap-3 col-6">
        <select className="form-control mb-2 my-4" name="triptype" id="Trip type" onChange={handleChange} value={formData.triptype} >
          <option value="">Trip Type</option>
          <option value="One Way Trip">One Way Trip</option>
          <option value="Return Trip">Return Trip</option>
        </select>
        </div>
        <div className=" mb-2 my-2 grid gap-0 column-gap-3 col-6">
         <select className="form-control mb-2 my-4" name="subtype" id="subtype" onChange={handleChange} value={formData.subtype} >
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
  <label htmlFor="drivername" className="form-label">Driver Name:</label>
  <input type="text" className="form-control" name="drivername" placeholder="Driver Name" onChange={handleChange} value={formData.drivername}/>
  <label htmlFor="drivermail" className="form-label">Mail:</label>
  <input type="text" className="form-control"  name="drivermail" placeholder="Mail Id" onChange={handleChange} value={formData.drivermail} />
  </div>
  <div className="mb-2 grid gap-0 column-gap-3 col-6">
  <label htmlFor="mobileno" className="form-label">Mobile No:</label>
  <input type="text" className="form-control" name="mobileno" placeholder="Mobile No" onChange={handleChange} value={formData.mobileno}/>
  <label htmlFor="mobileno1" className="form-label">Mobile No:</label>
  <input type="text" className="form-control"  name="mobileno1" placeholder="Mobile No" onChange={handleChange} value={formData.mobileno1} />
  </div>
  </div>
  <button  type="button" className="btn btn-danger" onClick={handleShare}>
        Share
      </button>
    </div>
)};

export default ShareDetails;