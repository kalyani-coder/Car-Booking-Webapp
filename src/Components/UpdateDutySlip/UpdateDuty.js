import React, { useState } from 'react';
import './UpdateDuty.css';
import Sidebar from '../Sidebar/Sidebar';
import Alert from "../AddCustomer/Alert";



const UpdateDuty = () => {
  // Initial form data state
  const initialFormData = {
    companyname: '',
    gstno: '',
    reportingaddress: '',
    date: '',
    name: '',
    vehicle: '',
    vehiclenumber: '',
    rate:'',
    from: '',
    to: '',
    title: '',
    amount: '',
    startingtime:'',
    closingtime: '',
    startingkm: '',
    closingkm: '',
    totalhour: '',
    totalkm: '',
    extrahour: '',
    extrahoursamount:'',
    extrakm: '',
    amount1: '',
    extrakmamount: '',
    subtotalamount: '',
    sgst:'',
    cgst:'',
    totalamount: '',
    advanceamount: '',
    remainingamount:'',
    paymentmethod: '',
    paymentmethod: '',
    chequeNo: '',
    ifscCode: '',
    upiId: '',
    cashReceiver: '',
    transactionId: '',
    TransactionNumber : '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [successAlert, setSuccessAlert] = useState(null);
  const [errorAlert, setErrorAlert] = useState(null);


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    //calculate the total km
    if (name === 'closingkm' || name === 'startingkm') {
      // Parse values as floats
      const closingKm = parseFloat(name === 'closingkm' ? value : formData.closingkm);
      const startingKm = parseFloat(name === 'startingkm' ? value : formData.startingkm);
  
      // Calculate the total kilometers
      if (!isNaN(closingKm) && !isNaN(startingKm)) {
        const totalKm = closingKm - startingKm;
        setFormData((prevData) => ({
          ...prevData,
          totalkm: totalKm.toString(), // Update the total_Km field
        }));
      }
    }

    //calculate the time(Total hour)

    if (name === 'startingtime' || name === 'closingtime') {
      const startingTimeStr = formData.startingtime;
      const closingTimeStr = formData.closingtime;
    
      const timeFormatRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    
      if (!timeFormatRegex.test(startingTimeStr) || !timeFormatRegex.test(closingTimeStr)) {
        console.log('Invalid time format');
        return;
      }
    
      const [startingHour, startingMinute] = startingTimeStr.split(':').map(Number);
      const [closingHour, closingMinute] = closingTimeStr.split(':').map(Number);
    
      // Calculate the time difference in minutes
      let timeDiffMinutes = (closingHour - startingHour) * 60 + (closingMinute - startingMinute);
    
      // Handle negative time difference (e.g., closing time is before starting time)
      if (timeDiffMinutes < 0) {
        console.log('Invalid time range');
        return;
      }
    
      // Convert minutes to hours and format with two decimal places
      const timeDiffHours = timeDiffMinutes / 60;
      const formattedTimeDiff = timeDiffHours.toFixed(2);
    
      setFormData((prevData) => ({
        ...prevData,
        totalhour: formattedTimeDiff,
      }));
    }
    

    if (name === 'title') {
     // Calculate rate per km based on the selected title
  let ratePerKm;
  switch (value) {
    case 'One Day / 80km':
      ratePerKm = 80;
      break;
    case 'One Day / 300km':
      ratePerKm = 300;
      break;
    case '440km- Local Airport Transfer':
      ratePerKm = 440; // Example rate, replace with your desired value
      break;
    // Add more cases for other options if needed
    default:
      ratePerKm = 0;
  }

      // Calculate the total amount
      const totalkm = parseFloat(formData.totalkm) || 0;
      const totalamount = (totalkm * ratePerKm).toFixed(2);
      setFormData((prevData) => ({
        ...prevData,
        amount: totalamount,
      }));
    }

    if (name === 'extrakm') {
      // Calculate extra kilometers amount
      const extrakm = parseFloat(value) || 0;
      const ratePerKm = formData.rateperkm || 0;
      const amount1 = (extrakm * ratePerKm).toFixed(2);
      setFormData((prevData) => ({
        ...prevData,
        amount1,
      }));

      // Update the total amount
      const totalamount = (parseFloat(formData.amount) || 0) + parseFloat(amount1);
      setFormData((prevData) => ({
        ...prevData,
        totalamount: totalamount.toFixed(2),
      }));
    }

    if (name === 'extrahour') {
      // Calculate extra hours amount
      const extrahour = parseFloat(value) || 0;
      const amount2 = (extrahour * 100).toFixed(2);
      setFormData((prevData) => ({
        ...prevData,
        amount2,
      }));

      // Update the total amount
      const totalamount = (parseFloat(formData.totalamount) || 0) + parseFloat(amount2);
      setFormData((prevData) => ({
        ...prevData,
        totalamount: totalamount.toFixed(2),
      }));
    }
  };

  const renderPaymentMethodFields = () => {
    if (formData.paymentmethod === "Cheque") {
      return (
        <>
          <div className="mb-3"style={{width : "50%"}}>
            <label className="form-label">Cheque Number:</label>
            <input
              type="text"
              className="form-control"
              value={formData.chequeNo}
              onChange={(e) => setFormData({ ...formData, chequeNo: e.target.value })}
            />
          </div>
          <div className="mb-3"style={{width : "50%"}}>
            <label className="form-label">IFSC Code:</label>
            <input
              type="text"
              className="form-control"
              value={formData.ifscCode}
              onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value })}
            />
          </div>

          <div className="mb-3" style={{width : "50%"}}>
            <label className="form-label">Transaction Number:</label>
            <input
              type="text"
              className="form-control"
              value={formData.TransactionNumber}
              onChange={(e) => setFormData({ ...formData, TransactionNumber: e.target.value})}
            />
          </div>
        </>
      );
    } else if (formData.paymentmethod === "UPI / Wallet Payment") {
      return (
        <>
          <div className="mb-3" style={{width : "50%"}}>
            <label className="form-label">UPI ID:</label>
            <input
              type="text"
              className="form-control"
              value={formData.upiId}
              onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
            />
          </div>
        </>
      );
    } else if (formData.paymentmethod === "Cash") {
      return (
        <>
          <div className="mb-3">
            <label className="form-label">Name to Whom Submitted Cash:</label>
            <input
              type="text"
              className="form-control"
              value={formData.cashReceiver}
              onChange={(e) => setFormData({ ...formData, cashReceiver: e.target.value })}
            />
          </div>
          {/* <div className="mb-3">
            <label className="form-label">Upload Receipt:</label>
            <input
              type="file"
              className="form-control"
              onChange={handleFileChange} // Assuming you have a handleFileChange function
            />
          </div> */}
        </>
      );
    } else if (formData.paymentmethod === "Bank Transfer(NEFT)") {
      return (
        <>
          <div className="mb-3" style={{width : "50%"}}>
            <label className="form-label">NEFT Number:</label>
            <input
              type="text"
              className="form-control"
              value={formData.neftnumber}
              onChange={(e) => setFormData({ ...formData, neftnumber: e.target.value })}
            />
          </div>

          <div className="mb-3" style={{width : "50%"}}>
            <label className="form-label">IFSC Code :</label>
            <input
              type="text"
              className="form-control"
              value={formData.ifscCode}
              onChange={(e) => setFormData({ ...formData, ifsccode: e.target.value })}
            />
          </div>

          <div className="mb-3" style={{width : "50%"}}>
            <label className="form-label">Account Number:</label>
            <input
              type="text"
              className="form-control"
              value={formData.accountnumber}
              onChange={(e) => setFormData({ ...formData, accountnumber: e.target.value })}
            />
          </div>

          <div className="mb-3" style={{width : "50%"}}>
            <label className="form-label">Branch Name:</label>
            <input
              type="text"
              className="form-control"
              value={formData.branchname}
              onChange={(e) => setFormData({ ...formData, branchname: e.target.value })}
            />
          </div>
        </>
      );
    } 
    else {
      return (
        <>
          <div className="mb-3">
            <label className="form-label">Transaction ID:</label>
            <input
              type="text"
              className="form-control"
              value={formData.transactionId}
              onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
            />
          </div>
        </>
      );
    }
  }

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
    // if (Object.values(formData).some((value) => value === '')) {
    //   alert('Please fill in all required fields.');
    //   return;
    // }

    const data = { ...formData };
    try {
      const response = await fetch('http://localhost:7000/api/update-duty', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        showAlert("Data added successfully!" , "success");
        setFormData(initialFormData);
      } else {
        showAlert("Failed to add data. Please try again.", "danger");
      }
    } catch (error) {
      console.error('API request error:', error);
      showAlert("Failed to add data. Please try again.", "danger");
    }
  };


  // Return JSX representing the component structure
  return (
    <>
      <Sidebar /> {/* Render the Sidebar component */}

      <div className="update-duty-container">
        <div className="update-duty-form">
          <div className="form-group">
          <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "8px" }}>Add Duty Slip</h2>
          
          {successAlert && <Alert alert={successAlert} />}
      {errorAlert && <Alert alert={errorAlert} />}
            
            <div className='d-flex gap-5'>
              <div>  <label htmlFor="companyname" className="update-duty-form-label">
                Company Name:
              </label>
                <input
                  className="update-duty-form-control"
                  type="text"
                  id="companyname"
                  name="companyname"
                  placeholder="Company Name"
                  onChange={handleChange}
                  value={formData.companyname}
                /></div>
              <div> <label htmlFor="gstno" className="update-duty-form-label">
                GST No:
              </label>
                <input
                  className="update-duty-form-control"
                  type="text"
                  id="gstno"
                  name="gstno"
                  placeholder="GST No."
                  onChange={handleChange}
                  value={formData.gstno}
                /></div>
            </div>
            <div className='d-flex gap-5'>
              <div><label htmlFor="reportingaddress" className="update-duty-form-label">
                Reporting Address:
              </label>
                <input
                  className="update-duty-form-control"
                  type="text"
                  id="reportingaddress"
                  name="reportingaddress"
                  placeholder="Reporting Address"
                  onChange={handleChange}
                  value={formData.reportingaddress}
                /></div>
              <div><label htmlFor="date" className="update-duty-form-label">
                Date:
              </label>
                <input
                  className="update-duty-form-control"
                  type="date"
                  id="date"
                  name="date"
                  onChange={handleChange}
                  placeholder="Date"
                  value={formData.date}
                /></div>
            </div>
            <div className='d-flex gap-5'>
              <div><label htmlFor="name" className="update-duty-form-label">
                Customer Name:
              </label>
                <input
                  className="update-duty-form-control"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Customer Name"
                  onChange={handleChange}
                  value={formData.name}
                /></div>
              <div>   <label htmlFor="vehicle" className="update-duty-form-label">
                Type Of Vehicle:
              </label>
                <select
                  className="update-duty-form-control"
                  name="vehicle"
                  id="vehicle"
                  onChange={handleChange}
                  value={formData.vehicle}
                >
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
                  
                  {/* Add other vehicle options */}
                </select></div>
            </div>
            <div className='d-flex gap-5'>
              <div><label htmlFor="vehiclenumber" className="update-duty-form-label">
                Vehicle Number:
              </label>
                <input
                  className="update-duty-form-control"
                  type="text"
                  id="vehiclenumber"
                  name="vehiclenumber"
                  placeholder="Vehicle Number"
                  onChange={handleChange}
                  value={formData.vehiclenumber}
                /></div>
              <div><label htmlFor="rate" className="update-duty-form-label">
                Rate:
              </label>
                <input
                  className="update-duty-form-control"
                  type="number"
                  id="rate"
                  name="rate"
                  // placeholder="rate"
                  onChange={handleChange}
                  value={formData.rate}
                /></div>
            </div>
            <div className='d-flex gap-5'>
              <div><label htmlFor="from" className="update-duty-form-label">
                From:
              </label>
                <input
                  className="update-duty-form-control"
                  type="text"
                  id="from"
                  name="from"
                  placeholder="from"
                  onChange={handleChange}
                  value={formData.from}
                /></div>
              <div><label htmlFor="To" className="update-duty-form-label">
                To:
              </label>
                <input
                  className="update-duty-form-control"
                  type="text"
                  id="to"
                  name="to"
                  placeholder="To"
                  onChange={handleChange}
                  value={formData.to}
                /></div>
            </div>
 
            <div className='d-flex gap-5'>
              
              <div>   <label htmlFor="title" className="update-duty-form-label">
                Duty Type:
              </label>
                <select
                  className="update-duty-form-control"
                  name="title"
                  id="title"
                  onChange={handleChange}
                  value={formData.title}
                >
                  <option value="">Duty Type</option>
                  <option value="One Day / 80km">One Day /80km-Local Duty</option>
                  <option value="One Day / 300km">One Day /300km-Outstation Duty</option>
                  <option value="440km- Local Airport Transfer">440km-Local Airport Transfer</option>
                      <option value="Pune-Mumbai Pickup Drop">Pune-Mumbai Pickup Dropoff </option>
                  {/* Add other vehicle options */}
                </select></div>
              <div> <label htmlFor="amount1" className="update-duty-form-label">
                Amount:
              </label>
                <input
                  className="update-duty-form-control"
                  type="text"
                  id="amount1"
                  name="amount1"
                  placeholder="Amount"
                  onChange={handleChange}
                  value={formData.amount1}
                />
              </div>
            </div>
          


            {/* starting Time */}
            <div className='d-flex gap-5'>
            <div><label htmlFor="startingtime" className="update-duty-form-label">
                Starting Time:
              </label>
                <input
                  className="update-duty-form-control"
                  type="time"
                  id="startingtime"
                  name="startingtime"
                  onChange={handleChange}
                  value={formData.startingtime}
                /></div>
              <div>
                <label htmlFor="closingtime" className="update-duty-form-label">
                  Closing Time:
                </label>
                <input
                  className="update-duty-form-control"
                  type="time"
                  id="closingtime"
                  name="closingtime"
                  placeholder="Closingtime Time"
                  onChange={handleChange}
                  value={formData.closingtime}
                />
              </div>
            </div>

            <div className='d-flex gap-5'>
              <div>
                <label htmlFor="startingkm" className="update-duty-form-label">
                  Starting KM:
                </label>
                <input
                  className="update-duty-form-control"
                  type="text"
                  id="startingkm"
                  name="startingkm"
                  placeholder="Starting KM"
                  onChange={handleChange}
                  value={formData.startingkm}
                /></div>
                   <div> <label htmlFor="closingkm" className="update-duty-form-label">
                Closing KM:
              </label>
                <input
                  className="update-duty-form-control"
                  type="text"
                  id="closingkm"
                  name="closingkm"
                  placeholder="Closing KM"
                  onChange={handleChange}
                  value={formData.closingkm}
                /></div>
            </div>
            

            <div className='d-flex gap-5'>
              <div>
                <label htmlFor="totalhour" className="update-duty-form-label">
                  Total Hour:
                </label>
                <input
                  className="update-duty-form-control"
                  type="text"
                  id="totalhour"
                  name="totalhour"
                  placeholder="Total Hour"
                  onChange={handleChange}
                  value={formData.totalhour}
                /></div>
              <div>
              <label htmlFor="totalkm" className="update-duty-form-label">
                Total KM:
              </label>
                <input
                  className="update-duty-form-control"
                  type="text"
                  id="totalkm"
                  name="totalkm"
                  placeholder="Total KM"
                  onChange={handleChange}
                  value={formData.totalkm}
                /></div>
            </div>
            <div className='d-flex gap-5'>
              <div>
                <label htmlFor="extrahour" className="update-duty-form-label">
                  Extra Hour:
                </label>
                <input
                  className="update-duty-form-control"
                  type="text"
                  id="extrahour"
                  name="extrahour"
                  placeholder="Extra Hour"
                  onChange={handleChange}
                  value={formData.extrahour}
                /></div>
              <div>
                <label htmlFor="totalamount" className="update-duty-form-label">
                  Extra Hours Amount:
                </label>
                <input
                  className="update-duty-form-control"
                  type="text"
                  id="extrahourasamount"
                  name="extrahoursamount"
                  placeholder=" Extra Hours Amount"
                  onChange={handleChange}
                  value={formData.extrahoursamount}
                /></div>
            </div>

            <div className='d-flex gap-5'>
              <div> <label htmlFor="extrakm" className="update-duty-form-label">
                Extra KMS:
              </label>
                <input
                  className="update-duty-form-control"
                  type="text"
                  id="extrakm"
                  name="extrakm"
                  placeholder="Extra KM"
                  onChange={handleChange}
                  value={formData.extrakm}
                /></div>
              <div>
                <label htmlFor="amount2" className="update-duty-form-label">
                  Extra KMS Amount:
                </label>
                <input
                  className="update-duty-form-control"
                  type="text"
                  id="extrakmamount"
                  name="extrakmamount"
                  placeholder="Amount"
                  onChange={handleChange}
                  value={formData.extrakmamount}
                /></div>
            </div>
            
            <div className='d-flex gap-5'>
              <div>
                <label htmlFor="subtotalamount" className="update-duty-form-label">
                  SubTotal Amount:
                </label>
                <input
                  className="update-duty-form-control"
                  type="text"
                  id="subtotalamount"
                  name="subtotalamount"
                  placeholder="Subtotal Amount"
                  onChange={handleChange}
                  value={formData.subtotalamount}
                /></div>
                <div>
                <label htmlFor="subtotalamount" className="update-duty-form-label">
                  SGST 2.5%:
                </label>
                <input
                  className="update-duty-form-control"
                  type="number"
                  id="sgst"
                  name="sgst"
                  placeholder="SGST Amount"
                  onChange={handleChange}
                  value={formData.sgst}
                /></div>
                </div>

                <div className='d-flex gap-5'>
                <div>
                <label htmlFor="subtotalamount" className="update-duty-form-label">
                  CGST 2.5%:
                </label>
                <input
                  className="update-duty-form-control"
                  type="number"
                  id="cgst"
                  name="cgst"
                  placeholder="CGST Amount"
                  onChange={handleChange}
                  value={formData.cgst}
                /></div>

                <div>
                <label htmlFor="subtotalamount" className="update-duty-form-label">
                  Total Amount:
                </label>
                <input
                  className="update-duty-form-control"
                  type="text"
                  id="totalamount"
                  name="totalamount"
                  placeholder="Total Amount"
                  onChange={handleChange}
                  value={formData.totalamount}
                /></div>
                </div>
           
            <div className='d-flex gap-5'>
              <div>
                <label htmlFor="advanceamount" className="update-duty-form-label">
                  Advanced Amount:
                </label>
                <input
                  className="update-duty-form-control"
                  type="text"
                  id="advanceamount"
                  name="advanceamount"
                  placeholder="Advance Amount"
                  onChange={handleChange}
                  value={formData.advanceamount}
                /></div>
                <div>
                <label htmlFor="advanceamount" className="update-duty-form-label">
                  Remaining Amount:
                </label>
                <input
                  className="update-duty-form-control"
                  type="number"
                  id="remainingamount"
                  name="remainingamount"
                  placeholder="Remaining Amount"
                  onChange={handleChange}
                  value={formData.remainingamount}
                /></div>
                </div>
              
                <div className="mb-3">
              <label htmlFor="paymentmethod" className="update-duty-form-label">
                Payment Method:
              </label>
              <select
                className="update-duty-form-control"
                name="paymentmethod"
                id="paymentmethod"
                onChange={handleChange}
                value={formData.paymentmethod}
              >
                <option value="">Payment Method</option>
                <option value="Cash">Cash</option>
                <option value="Cheque">Cheque</option>
                <option value="UPI / Wallet Payment">UPI /Wallet Payment</option>
                <option value="Bank Transfer(NEFT)">Bank Transfer(NEFT )</option>
              </select>
            </div>

            {/* Render payment method specific fields */}
            {renderPaymentMethodFields()}

          </div>
        </div>

        {/* Buttons for form actions */}
        <div className="button-container">
        <button type="button" className="customer-btn-submit" onClick={handleSubmit}>
            Save
          </button>
          {/* <button type="button" className="customer-btn-submit" onClick={generateTripDutySlip}>
            Print
          </button> */}
        </div>
      </div>
    </>
  );
};

// Export the component as the default export
export default UpdateDuty;
