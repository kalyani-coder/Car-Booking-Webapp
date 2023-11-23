import React, { useState } from 'react';
import './AddPayment.css';
import Sidebar from '../Sidebar/Sidebar';

function AddPayment() {
  const initialFormData = {
    company_Name: '',
    GST_No: '',
    reporting_Address: '',
    Date: '',
    customer_Name: '',
    vehicle_Number: '',
    vehicle_Type: '',
    quantity: '',
    from: '',
    to: '',
    closing_km: '',
    closing_Time: '',
    starting_Km: '',
    starting_Time: '',
    total_Km: '',
    total_hours: '',
    title: '',
    title_Amount: 0,
    extra_Km: '',
    extramkm_Amount: 0,
    extra_Hours: '',
    extrahours_Amount: 0,
    subtotal_Amount: 0,
    SGST: 0,
    CGST: 0,
    total_Amount: 0,
    advance_Amount: 0,
    remaining_Amount: 0,
    payment_Method: '',
  };
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState('');

  const handleChange = (event) => {
  const { name, value } = event.target;

  if (name === 'advance_Amount') {
    // Parse advance amount as a float
    const advanceAmount = parseFloat(value);

    // Calculate remaining amount
    const remainingAmount = formData.total_Amount - advanceAmount;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      remaining_Amount: remainingAmount,
    }));
  } else {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }


  

  if (name === 'closing_km' || name === 'starting_Km') {
    // Parse values as floats
    const closingKm = parseFloat(name === 'closing_km' ? value : formData.closing_km);
    const startingKm = parseFloat(name === 'starting_Km' ? value : formData.starting_Km);

    // Calculate the total kilometers
    if (!isNaN(closingKm) && !isNaN(startingKm)) {
      const totalKm = closingKm - startingKm;
      setFormData((prevData) => ({
        ...prevData,
        total_Km: totalKm.toString(), // Update the total_Km field
      }));
    }
  } else if (name === 'closing_Time' || name === 'starting_Time') {
    // Calculate the total hours
    const closingTime = formData.closing_Time;
    const startingTime = formData.starting_Time;

    if (closingTime && startingTime) {
      const closingDateTime = new Date(`2000-01-01T${closingTime}`);
      const startingDateTime = new Date(`2000-01-01T${startingTime}`);
      const timeDiff = closingDateTime - startingDateTime;

      if (timeDiff > 0) {
        const totalHours = (timeDiff / 3600000).toFixed(2); // 3600000 milliseconds in an hour
        setFormData((prevData) => ({
          ...prevData,
          total_hours: totalHours,
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          total_hours: 'Invalid Time',
        }));
      }
    }
  }

};



    

  const calculateSubTotal = () => {
    const {
      title_Amount,
      extramkm_Amount,
      extrahours_Amount,
    } = formData;

    const subtotal = parseFloat(title_Amount) + parseFloat(extramkm_Amount) + parseFloat(extrahours_Amount);

    return subtotal;
  };


  const calculateSGST_CGST = (subtotal) => {
    const taxRate = 2.5; // 2.5% tax rate
    const sgst = (subtotal * taxRate) / 100;
    const cgst = (subtotal * taxRate) / 100;
  
    return {
      SGST: sgst,
      CGST: cgst,
    };
  };


  const handleSubtotalChange = () => {
    const subtotal = calculateSubTotal();
    const { SGST, CGST } = calculateSGST_CGST(subtotal);
    const totalAmount = subtotal + SGST + CGST;
    const remainingAmount = totalAmount - parseFloat(formData.advance_Amount); 
    setFormData((prevData) => ({
      ...prevData,
      subtotal_Amount: subtotal,
      SGST: SGST,
      CGST: CGST,
      total_Amount: totalAmount,
      remaining_Amount: remainingAmount,
      
    }));
    
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form Data:', formData);

    for (const key in formData) {
      if (formData[key] === '' || (typeof formData[key] === 'number' && isNaN(formData[key]))) {
        setError('All fields are required and must be valid numbers.');
        return;
      }
    }

    setError('');

    try {
      const response = await fetch('https://carbooking-backend-fo78.onrender.com/api/customer-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        window.alert('Data Added');
        setFormData(initialFormData);
      } else {
        console.error('Failed to save data:', response.status, response.statusText);
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
      <div className="container-container-adpayment">
        <div className="form-body">
          <div className="card-1">
            <div className="row justify-content-center">
              <div className="col-md-10">
                <div className="card-body mt-5">
                  <form>
                    <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '8px' }}>Add Customer Payment</h2>

                    <div className="row g-2">
                      <div className="col-md">
                        <div className="form-group">
                          <label>Company Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="company_Name"
                            placeholder="Enter Company name"
                            value={formData.company_Name}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md">
                        <div className="form-group">
                          <label>GST No</label>
                          <input
                            type="text"
                            className="form-control"
                            name="GST_No"
                            placeholder="Enter GST No"
                            value={formData.GST_No}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  
                    <div className="row g-2">
                      <div className="col-md">
                        <div className="form-group">
                          <label>Reporting Address</label>
                          <input
                            type="text"
                            className="form-control"
                            name="reporting_Address"
                            placeholder="Enter Reporting Address"
                            value={formData.reporting_Address}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md">
                        <div className="form-group">
                          <label>Date</label>
                          <input
                            type="Date"
                            className="form-control"
                            name="Date"
                            placeholder="Date"
                            value={formData.Date}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>


                    <div className="row g-2">
                      <div className="col-md">
                        <div className="form-group">
                          <label>Customer Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="customer_Name"
                            placeholder="Enter Customer Name"
                            value={formData.customer_Name}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md">
                        <div className="form-group">
                          <label>Vehicle Number</label>
                          <input
                            type="text"
                            className="form-control"
                            name="vehicle_Number"
                            placeholder="Enter Vehicle Number"
                            value={formData.vehicle_Number}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                   
                    <div className="row g-2">
                      <div className="col-md">
                        <div className="form-group">
                          <label >Vehicle</label>
                          {/* <input type="text" className="form-control" placeholder="Vehicle" /> */}
                          <select className="form-control mb-2" name="vehicle_Type" id="vehicle_Type" onChange={handleChange} value={formData.vehicle_Type}>
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
                        </div>
                      </div>


                      <div className="col-md">
                        <div className="form-group">
                          <label >Quantity</label>
                          <input type="number" className="form-control" name='quantity' placeholder="Add Quantity" onChange={handleChange} value={formData.quantity} />

                        </div>
                      </div>
                    </div>

                    <div className="row g-2">
                      <div className="col-md">
                        <div className="form-group">
                          <label>From</label>
                          <input
                            type="text"
                            className="form-control"
                            name="from"
                            placeholder="From"
                            value={formData.from}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md">
                        <div className="form-group">
                          <label>To</label>
                          <input
                            type="text"
                            className="form-control"
                            name="to"
                            placeholder="To"
                            value={formData.to}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>


                    <div className="row g-2">
                      <div className="col-md">
                        <div className="form-group">
                          <label >Starting Kms</label>
                          <input type="text" className="form-control"  name="starting_Km" placeholder="Enter  Starting Kms" onChange={handleChange} value={formData.starting_Km} />

                        </div>
                      </div>
                      <div className="col-md">
                        <div className="form-group">
                          <label >Starting Time</label>
                          <input type="time" className="form-control"  name="starting_Time" placeholder="Enter Starting Time" onChange={handleChange} value={formData.starting_Time} />

                        </div>
                      </div>
                    </div>

                    <div className="row g-2">
                      <div className="col-md">
                        <div className="form-group">
                          <label >Closing Kms</label>
                          <input type="text" className="form-control" id="closing_km" name="closing_km" placeholder="Enter  Closing Kms" onChange={handleChange} value={formData.closing_km} />

                        </div>
                      </div>
                      <div className="col-md">
                        <div className="form-group">
                          <label >Closing Time</label>
                          <input type="Time" className="form-control" id="closing_Time" name="closing_Time"  placeholder="Enter  Closing Time" onChange={handleChange} value={formData.closing_Time} />

                        </div>
                      </div>
                    </div>


                    <div className="row g-2">
                      <div className="col-md">
                        <div className="form-group">
                          <label >Total Kms</label>
                          <input type="text" className="form-control"  name="total_Km" placeholder="Enter  Total Kms" onChange={handleChange} value={formData.total_Km} />

                        </div>
                      </div>
                      <div className="col-md">
                        <div className="form-group">
                          <label >Total Hours</label>
                          <input type="Text" className="form-control" name="total_hours" placeholder="Enter  Total Hours" onChange={handleChange} value={formData.total_hours}readOnly />

                        </div>
                      </div>
                    </div>



                    
                    <div className="row g-2">
                      <div className="col-md">
                        <div className="form-group">
                        <label>
                            Title:
                          </label>
                          <select
                            className="form-control"
                            name="title"
                            id="title"
                            onChange={handleChange} value={formData.title}
                          >
                            <option value="">Title</option>
                            <option value="One Day / 80km">One Day /80km</option>
                            <option value="One Day / 300km">One Day /300km</option>
                          </select>
                          </div>
                          </div>

                          <div className="col-md">
                         <div className="form-group">
                          <label>Title Amount</label>
                          <input
                            type="number"
                            className="form-control"
                            name="title_Amount"
                            placeholder="Enter Title Amount"
                            value={formData.title_Amount}
                            onChange={handleChange}
                            onBlur={handleSubtotalChange}
                          />
                        </div>
                      </div>
                      </div>
                 
                         <div className="row g-2">
                      <div className="col-md">
                        <div className="form-group">
                        <label >Extra Kms</label>
                          <input type="text" className="form-control" id="extra_Km" name="extra_Km" placeholder="Enter  Extra Kms" onChange={handleChange} value={formData.extra_Km} />

                        </div>
                      </div>
                      <div className="col-md">
                        <div className="form-group">
                          <label>Extra Kms Amount</label>
                          <input
                            type="number"
                            className="form-control"
                            name="extramkm_Amount"
                            placeholder="Enter Extra Kms Amount"
                            value={formData.extramkm_Amount}
                            onChange={handleChange}
                            onBlur={handleSubtotalChange}
                          />
                        </div>
                      </div>
                    </div>


                    <div className="row g-2">
                      <div className="col-md">
                        <div className="form-group">
                          <label >Extra Hours</label>
                          <input type="text" className="form-control" id="extra_Hours" name="extra_Hours" placeholder="Enter  Extra Hours" onChange={handleChange} value={formData.extra_Hours} />

                        </div>
                      </div>
                      <div className="col-md">
                        <div className="form-group">
                          <label > Extra Hours Amount</label>
                          <input type="number" className="form-control" name='extrahours_Amount' placeholder="Enter Extra Hours Amount"
                           value={formData.extrahours_Amount}
                           onChange={handleChange}
                           onBlur={handleSubtotalChange}
                         />

                        </div>
                      </div>
                    </div>

                    {/* Display the SubTotal */}
                    <div className="col-md">
                      <div className="form-group">
                        <label>SubTotal</label>
                        <input
                          type="number"
                          className="form-control"
                          name="subtotal_Amount"
                          placeholder="SubTotal Amount"
                          value={formData.subtotal_Amount}
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="row g-2">
                      <div className="col-md">
                        <div className="form-group">
                          <label >SGST 2.5%</label>
                          <input type="number" className="form-control"  name='SGST'  placeholder="Enter  SGST Amount" value={formData.SGST}
        onChange={handleChange}
      /> 

                        </div>
                      </div>
                      <div className="col-md">
                        <div className="form-group">
                          <label >CGST 2.5%</label> 
                          <input type="number" className="form-control" name='CGST' placeholder="Enter CGST  Amount" value={formData.CGST}
        onChange={handleChange} />

                        </div>
                      </div>
                    </div>


                    <div className="row g-2">
                      <div className="col-md">
                        <div className="form-group">
                          <label>Total Amount</label>
                          <input
                            type="number"
                            className="form-control"
                            name="total_Amount"
                            placeholder="Total Amount"
                            value={formData.total_Amount}
                            onChange={handleChange}readOnly
                          />
                        </div>
                      </div>
                      <div className="col-md">
                        <div className="form-group">
                          <label>Advance Amount</label>
                          <input
  type="number"
  className="form-control"
  name="advance_Amount"
  placeholder="Enter Advance Amount"
  value={formData.advance_Amount}
  onChange={handleChange}
/>

                        </div>
                      </div>
                    </div>

                    <div className="row g-2">
                      <div className="col-md">
                        <div className="form-group">
                          <label>Remaining Amount</label>
                          <input
                            type="number"
                            className="form-control"
                            name="remaining_Amount"
                            placeholder="Enter Remaining Amount"
                            value={formData.remaining_Amount}
                            onChange={handleChange}readOnly
                          />
                        </div>
                      </div>
                      <div className="col-md">
                        <div className="form-group">
                          <label>Payment Method</label>
                          <select
                            className="form-control"
                            name="payment_Method"
                            value={formData.payment_Method}
                            onChange={handleChange}
                          >
                            <option value="">Payment Method</option>
                            <option value="Cash">Cash</option>
                            <option value="Cheque ">Cheque </option>
                            <option value="UPI / Wallet Payment">UPI /Wallet Payment</option>
                            <option value="Bank Transfer(NEFT)">Bank Transfer(NEFT )</option>
                            
                            {/* <option value="Paytm">Paytm</option> */}
                            {/* <option value="Phone Pay">Phone Pay</option> */}
                          </select>
                        </div>
                      </div>
                    </div>

                    <br />
                    <button id="btn1" className="btn btn-danger">
                      Edit
                    </button>
                    <button id="btn2" className="add-payment-submit" onClick={handleSubmit}>
                      Save
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddPayment;
