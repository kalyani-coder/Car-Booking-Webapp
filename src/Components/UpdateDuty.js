import React, {useState } from 'react';
import  './CustomerInquiry.css';
import Sidebar from '../Components/Sidebar';

const UpdateDuty = () => {
  const initialFormData = {
    companyname: '',
    dutyslipno: '',
    reportingaddress: '', 
    date: '',
    name: '',
    vehicle: '',
    vehiclenumber: '',
    from:'',
    to:'',
    closingkm:'',
    closingtime:'',
    startingkm:'',
    startingtime:'',
    totalkm: '',
    totalhours: '',
    title:'',
    amount:'',
    extrakm:'',
    amount1:'',
    extrahour:'',
    amount2:'',
    totalamount:'',
    advanceamount:'',
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

  return(
    <>
    <Sidebar />
    
    <div className="container">
    <div className="form">
        <div className="pt-4   grid-gap-2  col-6">
    <label htmlFor="companyname" className="form-label">Company Name:</label>
  <input className="form-control" type="text" id="companyname" name="companyname" onChange={handleChange} value={formData.companyname}/>
  <label htmlFor="reportingaddress" className="form-label">Reporting Address:</label>
  <input className="form-control" type="text" id="reportingaddress" name="reportingaddress" onChange={handleChange} value={formData.reportingaddress}/>
  </div>
  <div className="pt-4   grid-gap-2  col-6">
    <label htmlFor="dutyslipno" className="form-label">Duty Slip No:</label>
  <input className="form-control" type="text" id="dutyslipno" name="dutyslipno" onChange={handleChange} value={formData.dutyslipno}/>
  <label htmlFor="reportingaddress" className="form-label">Date:</label>
  <input className="form-control" type="date" id="reportingaddress" name="date" onChange={handleChange} value={formData.date}/>
  </div>
  </div>
  <div className="grid-gap-2  col-12">
  <label htmlFor="name" className="form-label">Name:</label>
  <input className="form-control" type="text" id="name" name="name" onChange={handleChange}value={formData.name}/>
  </div>

  <div className="form">
  <div className="grid-gap-2  col-6">
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
        <label htmlFor="From" className="form-label">From:</label>
        <input className="form-control" type="text" id="From" name="From" onChange={handleChange}value={formData.from}/>
        <label htmlFor="closingkm" className="form-label">Closing KM:</label>
        <input className="form-control" type="text" id="closingkm" name="closingkm" onChange={handleChange}value={formData.closingkm}/>
        <label htmlFor="startingkm" className="form-label">Starting KM:</label>
        <input className="form-control" type="text" id="startingkm" name="startingkm" onChange={handleChange}value={formData.startingkm}/>
        <label htmlFor="totalkm" className="form-label">Total KM:</label>
        <input className="form-control" type="text" id="totalkm" name="totalkm" onChange={handleChange}value={formData.totalkm}/>
        </div>
        <div className="grid-gap-2  col-6">
    <label htmlFor="vehiclenumber" className="form-label">Vehicle Number:</label>
  <input className="form-control" type="text" id="vehiclenumber" name="vehiclenumber" onChange={handleChange} value={formData.vehiclenumber}/>
  <label htmlFor="to" className="form-label">To:</label>
  <input className="form-control" type="text" id="to" name="to" onChange={handleChange} value={formData.to}/>
  <label htmlFor="closingtime" className="form-label">Closing Time:</label>
  <input className="form-control" type="text" id="closingtime" name="closingtimer" onChange={handleChange} value={formData.closingtime}/>
  <label htmlFor="startingtime" className="form-label">Starting Time:</label>
  <input className="form-control" type="text" id="startingtime" name="startingtime" onChange={handleChange} value={formData.startingtime}/>
  </div>
        </div>
       </div>
       </>
  )
}
export default UpdateDuty