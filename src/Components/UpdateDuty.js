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
    totalhour: '',
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
          <option value="Ac Bus 13-Seater">AC Bus 13-Seater</option>
          <option value="AC Bus 17-seater">AC Bus 17-seater</option>
          <option value="AC Bus 20-seater">AC Bus 20-seater</option>
          <option value="AC Bus 32-seater">AC Bus 32-seater</option>
          <option value="AC Bus 35-seater">AC Bus 35-seater</option>
          <option value="AC Bus 40-seater">AC Bus 40-seater</option>
          <option value="AC Bus 45-seater">AC Bus 45-seater</option>
          <option value="Non-AC Bus 17-Seater">Non-AC Bus 17 Seater</option>
          <option value="Non-AC Bus 20-Seater">Non-AC Bus 20 Seater</option>
          <option value="Non-AC Bus 32-Seater">Non-AC Bus 32 Seater</option>
          <option value="Non-AC Bus 40-Seater">Non-AC Bus 40 Seater</option>
          <option value="Non-AC Bus 45-Seater">Non-AC Bus 45 Seater</option>
          <option value="Non-AC Bus 49-Seater">Non-AC Bus 49 Seater</option>
        </select>
        <label htmlFor="From" className="form-label">From:</label>
        <input className="form-control" type="text" id="From" name="From" onChange={handleChange}value={formData.from}/>
        <label htmlFor="closingkm" className="form-label">Closing KM:</label>
        <input className="form-control" type="text" id="closingkm" name="closingkm" onChange={handleChange}value={formData.closingkm}/>
        <label htmlFor="startingkm" className="form-label">Starting KM:</label>
        <input className="form-control" type="text" id="startingkm" name="startingkm" onChange={handleChange}value={formData.startingkm}/>
        <label htmlFor="totalkm" className="form-label">Total KM:</label>
        <input className="form-control" type="text" id="totalkm" name="totalkm" onChange={handleChange}value={formData.totalkm}/>
        <label htmlFor="title" className="form-label">Title:</label>
        <input className="form-control" type="text" id="title" name="title" onChange={handleChange}value={formData.title}/>
        <label htmlFor="extrakm" className="form-label">Extra KM:</label>
        <input className="form-control" type="text" id="extrakm" name="extrakm" onChange={handleChange}value={formData.extrakm}/>
        <label htmlFor="extrahours" className="form-label">Extra Hour:</label>
        <input className="form-control" type="text" id="extrahour" name="extrahour" onChange={handleChange}value={formData.extrahour}/>
        <label htmlFor="totalamount" className="form-label">Total Amount:</label>
        <input className="form-control" type="text" id="totalamount" name="totalamount" onChange={handleChange}value={formData.totalamount}/>
        <label htmlFor="remningamount" className="form-label">Remaining Amount:</label>
        <input className="form-control" type="text" id="remningamount" name="remainingamount" onChange={handleChange}value={formData.remainingamount}/>
        </div>
        <div className="grid-gap-2  col-6">
    <label htmlFor="vehiclenumber" className="form-label">Vehicle Number:</label>
  <input className="form-control" type="text" id="vehiclenumber" name="vehiclenumber" onChange={handleChange} value={formData.vehiclenumber}/>
  <label htmlFor="to" className="form-label">To:</label>
  <input className="form-control" type="text" id="to" name="to" onChange={handleChange} value={formData.to}/>
  <label htmlFor="closingtime" className="form-label">Closing Time:</label>
  <input className="form-control" type="text" id="closingtime" name="closingtime" onChange={handleChange} value={formData.closingtime}/>
  <label htmlFor="startingtime" className="form-label">Starting Time:</label>
  <input className="form-control" type="text" id="startingtime" name="startingtime" onChange={handleChange} value={formData.startingtime}/>
  <label htmlFor="totalhour" className="form-label">Total Hour:</label>
  <input className="form-control" type="text" id="totalhour" name="totalhour" onChange={handleChange} value={formData.totalhour}/>
  <label htmlFor="amount" className="form-label">Amount:</label>
  <input className="form-control" type="text" id="amount" name="amount" onChange={handleChange} value={formData.amount}/>
  <label htmlFor="amount1" className="form-label">Amount:</label>
  <input className="form-control" type="text" id="amount1" name="amount1" onChange={handleChange} value={formData.amount1}/>
  <label htmlFor="amount2" className="form-label">Amount:</label>
  <input className="form-control" type="text" id="amount2" name="amount2" onChange={handleChange} value={formData.amount2}/>
  <label htmlFor="advanceamount" className="form-label">Advanced Amount:</label>
        <input className="form-control" type="text" id="advanceamount" name="advanceamount" onChange={handleChange}value={formData.advanceamount}/>
        <label htmlFor="paymentmethod" className="form-label">Payment Method:</label>
        <select className="form-control " name="paymentmethod" id="paymentmethod" onChange={handleChange} value={formData.paymentmethod} >
          <option value="">Payment Method</option>
          <option value="Bank Transfer">Bank Transfer</option>
          <option value="Cash">Cash</option>
          <option value="Google Pay">Google Pay</option>
          <option value="Paytm">Paytm</option>
          <option value="Phone Pay">Phone Pay</option>
          </select>
          </div>
        </div>
        <button  type="button" className="btn btn-danger" onClick={handleSubmit}>
         Save
     </button>
     <button  type="button" className="btn btn-danger" onClick={handleSubmit}>
         Print
     </button>
       </div>
       </>
  )
}
export default UpdateDuty;