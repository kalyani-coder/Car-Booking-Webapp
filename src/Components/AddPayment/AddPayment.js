import React, { useState } from 'react'
import './AddPayment.css';
import Sidebar from '../Sidebar/Sidebar';
function AddPayment() {
  const initialFormData = {
    company_Name: "",
    GST_No: "",
    reporting_Address: "",
    Date: "",
    customer_Name: "",
    vehicle_Number: "",
    vehicle_Type: "",
    quantity: "",
    from: "",
    to: "",
    closing_km: "",
    closing_Time: "",
    starting_Km: "",
    starting_Time: "",
    total_Km: "",
    total_hours:"",
    title: "",
    title_Amount: "",
    extra_Km: "",
    extramkm_Amount: "",
    extra_Hours: "",
    extrahours_Amount: "",
    SGST: "",
    CGST: "",
    total_Amount: "",
    advance_Amount: "",
    remaining_Amount: "",
    payment_Method: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if all fields are filled
    for (const key in formData) {
      if (formData[key] === '') {
        setError('All fields are required.');
        return;
      }
    }

    // Reset error if all fields are filled
    setError('');

    try {
      const response = await fetch('http://localhost:7000/api/customer-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Use formData directly
      });

      if (response.ok) {
        alert('Data saved successfully!');
        setFormData(initialFormData); // Reset the form
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
      <div className="container-container-adpayment ">


        <div className="form-body" >
          <div className="card-1">
            <div className="row justify-content-center">
              <div className="col-md-10">
                <div className="card-body mt-5">
                  <form>
                    <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "8px" }}>Add Customer Payment</h2>

                    <div className="row g-2">
                      <div className="col-md">
                        <div className="form-group">
                          <label>Company Name</label>
                          <input type="text" className="form-control" id="company_Name" name="company_Name" placeholder="Enter Company name" onChange={handleChange} value={formData.company_Name} />

                        </div>
                      </div>
                      <div className="col-md">
                        <div className="form-group">
                          <label >Gst No</label>
                          <input type="text" className="form-control" id="GST_No" name="GST_No" placeholder="Enter GST No" onChange={handleChange} value={formData.GST_No} />

                        </div>
                      </div>
                    </div>

                    <div className="row g-2">
                      <div className="col-md">
                        <div className="form-group">
                          <label >Reporting Address</label>
                          <input type="text" className="form-control" id="reporting_Address" name="reporting_Address" placeholder="Enter Reporting Address" onChange={handleChange} value={formData.reporting_Address} />

                        </div>
                      </div>
                      <div className="col-md">
                        <div className="form-group">
                          <label >Date</label>
                          <input type="date" className="form-control" id="Date" name="Date" placeholder="Enter Date" onChange={handleChange} value={formData.Date} />

                        </div>
                      </div>
                    </div>
                    <div className="row g-2">
                      <div className="col-md">
                        <div className="form-group">
                          <label >Customer Name</label>
                          <input type="text" className="form-control" id="customer_Name" name="customer_Name" placeholder="Enter Customer Name" onChange={handleChange} value={formData.customer_Name} />

                        </div>
                      </div>
                      <div className="col-md">
                        <div className="form-group">
                          <label >Vehicle Number</label>
                          <input type="text" className="form-control" id="vehicle_Number" name="vehicle_Number" placeholder="Enter  Vehicle Number" onChange={handleChange} value={formData.vehicle_Number} />

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
                          <input type="number" className="form-control" placeholder="Add Quantity" />

                        </div>
                      </div>
                    </div>





                    {/* <div className="row g-2">
                    <div className="col-md">
                    <div className="form-group">
                      <label> Vehicle Type :</label>
                      <select className="form-control mb-2" name="vehicle" id="vehicle">
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

                    </div> */}

                    <div className="row g-2">
                      <div className="col-md">
                        <div className="form-group">
                          <label>From</label>
                          <input type="text" className="form-control" id="from" name="from" placeholder="Enter Boarding Location" onChange={handleChange} value={formData.from} />

                        </div>
                      </div>
                      <div className="col-md">
                        <div className="form-group">
                          <label >To</label>
                          <input type="text" className="form-control" id="to" name="to" placeholder="Enter Destination Location" onChange={handleChange} value={formData.to} />

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
                          <label >Starting Kms</label>
                          <input type="text" className="form-control" id="starting_Km" name="starting_Km" placeholder="Enter  Starting Kms" onChange={handleChange} value={formData.starting_Km} />

                        </div>
                      </div>
                      <div className="col-md">
                        <div className="form-group">
                          <label >Starting Time</label>
                          <input type="time" className="form-control" id="starting_Time" name="starting_Time" placeholder="Enter Starting Time" onChange={handleChange} value={formData.starting_Time} />

                        </div>
                      </div>
                    </div>


                    <div className="row g-2">
                      <div className="col-md">
                        <div className="form-group">
                          <label >Total Kms</label>
                          <input type="text" className="form-control" id="total_Km" name="total_Km" placeholder="Enter  Total Kms" onChange={handleChange} value={formData.total_Km} />

                        </div>
                      </div>
                      <div className="col-md">
                        <div className="form-group">
                          <label >Total Hours</label>
                          <input type="Text" className="form-control" id="total_hours" name="total_hours" placeholder="Enter  Total Hours" onChange={handleChange} value={formData.total_hours} />

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
                            {/* Add other vehicle options */}
                          </select>

                        </div>
                      </div>
                      <div className="col-md">
                        <div className="form-group">
                          <label >Amount</label>
                          <input type="number" className="form-control" placeholder="Enter  Amount" />

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
                          <label >Amount</label>
                          <input type="number" className="form-control" placeholder="Enter  Amount" />

                        </div>
                      </div>
                    </div>


                    <div className="row g-2">
                      <div className="col-md">
                        <div className="form-group">
                          <label >Extra Hours</label>
                          <input type="text" className="form-control" id="extra_Hours" name="extra_Hours" placeholder="Enter  Extra Kms" onChange={handleChange} value={formData.extra_Hours} />

                        </div>
                      </div>
                      <div className="col-md">
                        <div className="form-group">
                          <label >Amount</label>
                          <input type="number" className="form-control" placeholder="Enter  Amount" />

                        </div>
                      </div>
                    </div>

                    <div className="row g-2">
                      <div className="col-md">
                        <div className="form-group">
                          <label >SGST 2.5%</label>
                          <input type="number" className="form-control" placeholder="Enter  SGST Amount" />

                        </div>
                      </div>
                      <div className="col-md">
                        <div className="form-group">
                          <label >CGST 2.5%</label>
                          <input type="number" className="form-control" placeholder="Enter CGST  Amount" />

                        </div>
                      </div>
                    </div>


                    <div className="row g-2">
                      <div className="col-md">
                        <div className="form-group">
                          <label >Total Amount</label>
                          <input type="number" className="form-control" placeholder="Enter Total Amount" />

                        </div>
                      </div>
                      <div className="col-md">
                        <div className="form-group">
                          <label > Advanced Amount</label>
                          <input type="number" className="form-control" placeholder="Enter Advance Amount" />

                        </div>
                      </div>
                    </div>



                    <div className="row g-2">
                      <div className="col-md">
                        <div className="form-group">
                          <label >Remaining Amount</label>
                          <input type="number" className="form-control" placeholder="Enter  Remaining Amount" />

                        </div>
                      </div>
                      <div className="col-md">
                        <div className="form-group">
                          <label >Payment Method</label>
                          <select
                            className="form-control"
                            name="payment_Method"
                            id="payment_Method"

                            onChange={handleChange} value={formData.payment_Method}
                          >
                            <option value="">Payment Method</option>
                            <option value="Bank Transfer">Bank Transfer</option>
                            <option value="Cash">Cash</option>
                            <option value="Google Pay">Google Pay</option>
                            <option value="Paytm">Paytm</option>
                            <option value="Phone Pay">Phone Pay</option>
                          </select>

                        </div>
                      </div>
                    </div>

                    <br></br>
                    <button id="btn1" className="btn btn-danger " >
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
  )
}

export default AddPayment;