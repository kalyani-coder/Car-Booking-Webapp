import React from 'react'
import './AddPayment.css';
import Sidebar from '../Sidebar/Sidebar';
function AddPayment() {
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

                    <div className="row g-2">
                      <div className="col-md">
                        <div className="form-group">
                          <label >Company Name</label>
                          <input type="text" className="form-control" placeholder="Enter Company name" />

                        </div>
                      </div>
                      <div className="col-md">
                        <div className="form-group">
                          <label >Gst No</label>
                          <input type="text" className="form-control" placeholder="Enter GST No" />

                        </div>
                      </div>
                    </div>

                    <div className="row g-2">
                      <div className="col-md">
                        <div className="form-group">
                          <label >Reporting Address</label>
                          <input type="text" className="form-control" placeholder="Enter Reporting Address" />

                        </div>
                      </div>
                      <div className="col-md">
                        <div className="form-group">
                          <label >Date</label>
                          <input type="date" className="form-control" placeholder="Enter Date" />

                        </div>
                      </div>
                    </div>
                    <div className="row g-2">
                      <div className="col-md">
                        <div className="form-group">
                          <label >Customer Name</label>
                          <input type="text" className="form-control" placeholder="Enter Customer Name" />

                        </div>
                      </div>
                      <div className="col-md">
                        <div className="form-group">
                          <label >Vehicle Number</label>
                          <input type="number" className="form-control" placeholder="Enter  Vehicle Number" />

                        </div>
                      </div>
                    </div>





                    <div className="form-group">
                      <label> Vehicle Type :</label>
                      {/* <label htmlFor="vehicle" className="form-label">Vehicle:</label> */}
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

                    <div className="row g-2">
                      <div className="col-md">
                        <div className="form-group">
                          <label >From</label>
                          <input type="text" className="form-control" placeholder="Enter Boarding Location" />

                        </div>
                      </div>
                      <div className="col-md">
                        <div className="form-group">
                          <label >To</label>
                          <input type="text" className="form-control" placeholder="Enter Destination Location" />

                        </div>
                      </div>
                    </div>


                    <div className="row g-2">
                      <div className="col-md">
                        <div className="form-group">
                          <label >Closing Kms</label>
                          <input type="text" className="form-control" placeholder="Enter  Closing Kms" />

                        </div>
                      </div>
                      <div className="col-md">
                        <div className="form-group">
                          <label >Closing Time</label>
                          <input type="Time" className="form-control" placeholder="Enter  Closing Time" />

                        </div>
                      </div>
                    </div>


                    <div className="row g-2">
                      <div className="col-md">
                        <div className="form-group">
                          <label >Starting Kms</label>
                          <input type="text" className="form-control" placeholder="Enter  Starting Kms" />

                        </div>
                      </div>
                      <div className="col-md">
                        <div className="form-group">
                          <label >Starting Time</label>
                          <input type="time" className="form-control" placeholder="Enter Starting Time" />

                        </div>
                      </div>
                    </div>


                    <div className="row g-2">
                      <div className="col-md">
                        <div className="form-group">
                          <label >Total Kms</label>
                          <input type="text" className="form-control" placeholder="Enter  Total Kms" />

                        </div>
                      </div>
                      <div className="col-md">
                        <div className="form-group">
                          <label >Total Hours</label>
                          <input type="Text" className="form-control" placeholder="Enter  Total Hours" />

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
                  // onChange={handleChange}
                  // value={formData.title}
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
                          <input type="text" className="form-control" placeholder="Enter  Amount" />

                        </div>
                      </div>
                    </div>


                    <div className="row g-2">
                      <div className="col-md">
                        <div className="form-group">
                          <label >Extra Kms</label>
                          <input type="text" className="form-control" placeholder="Enter  Extra Kms" />

                        </div>
                      </div>
                      <div className="col-md">
                        <div className="form-group">
                          <label >Amount</label>
                          <input type="text" className="form-control" placeholder="Enter  Amount" />

                        </div>
                      </div>
                    </div>


                    <div className="row g-2">
                      <div className="col-md">
                        <div className="form-group">
                          <label >Extra Hours</label>
                          <input type="text" className="form-control" placeholder="Enter  Extra Kms" />

                        </div>
                      </div>
                      <div className="col-md">
                        <div className="form-group">
                          <label >Amount</label>
                          <input type="text" className="form-control" placeholder="Enter  Amount" />

                        </div>
                      </div>
                    </div>




                    <div className="row g-2">
                      <div className="col-md">
                        <div className="form-group">
                          <label >Total Amount</label>
                          <input type="text" className="form-control" placeholder="Enter Total Amount" />

                        </div>
                      </div>
                      <div className="col-md">
                        <div className="form-group">
                          <label > AQdvanced Amount</label>
                          <input type="text" className="form-control" placeholder="Enter Advance Amount" />

                        </div>
                      </div>
                    </div>



                    <div className="row g-2">
                      <div className="col-md">
                        <div className="form-group">
                          <label >Remaining Amount</label>
                          <input type="text" className="form-control" placeholder="Enter  Remaining Amount" />

                        </div>
                      </div>
                      <div className="col-md">
                        <div className="form-group">
                          <label >Payment Method</label>
                <select
                  className="form-control"
                  name="paymentmethod"
                  id="paymentmethod"
                  // onChange={handleChange}
                  // value={formData.paymentmethod}
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
                    <button id="btn2" className="btn btn-danger " >
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

export default AddPayment