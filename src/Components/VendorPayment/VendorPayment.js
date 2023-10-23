import React from 'react'
import './VendorPayment.css';
import Sidebar from '../Sidebar/Sidebar';
function VendorPayment() {
  return (
    <>
    <Sidebar/>
    <div className="container-fluid ">

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
        <input type="text" className="form-control" placeholder="Enter Company Name" />

      </div>
    </div>
    <div className="col-md">
      <div className="form-group">
      <label >GST No</label>
        <input type="text" className="form-control"  placeholder="Enter GST No" />

      </div>
    </div>
  </div>

  <div className="row g-2">
    <div className="col-md">
      <div className="form-group">
      <label >Vendor Name</label>
        <input type="text" className="form-control" placeholder="Enter Vendor Name" />

      </div>
    </div>
    <div className="col-md">
      <div className="form-group">
      <label >Mobile Number</label>
        <input type="text" className="form-control"  placeholder="Enter Mobile Number" />

      </div>
    </div>
  </div>
  <div className="row g-2">
    <div className="col-md">
      <div className="form-group">
      <label >Payment</label>
      <select
                  className="form-control"
                  name="title"
                  id="title"
                  // onChange={handleChange}
                  // value={formData.title}
                > 
                <option value="Payment">Payment</option>
                  <option value="Partial">Partial</option>
                  <option value="Full Payment">Full Payment</option>
                  {/* Add other vehicle options */}
                </select>

      </div>
    </div>
    <div className="col-md">
      <div className="form-group">
      <label >Amount</label>
        <input type="text" className="form-control"  placeholder="Enter your Amount" />

      </div>
    </div>
  </div>

  <div className="row g-2">
    <div className="col-md">
      <div className="form-group">
      <label >TDS 1%</label>
        <input type="text" className="form-control" placeholder="Enter  TDS 1% Amonut" />

      </div>
    </div>
    <div className="col-md">
      <div className="form-group">
      <label > Total Amount</label>
        <input type="text" className="form-control"  placeholder="Enter total Amount" />

      </div>
    </div>
  </div>

  <div className="row g-2">
    <div className="col-md">
      <div className="form-group">
      <label >Paid Amount</label>
        <input type="text" className="form-control" placeholder="Enter Paid Amount" />

      </div>
    </div>
    <div className="col-md">
      <div className="form-group">
      <label >Remaining Amount</label>
        <input type="text" className="form-control"  placeholder="Enter Remaining Amount" />

      </div>
    </div>
  </div>

  
  {/* </div> */}
  <div className="form-group">
  <label> Payment Method </label>
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
  <br></br>
  <button id="btn1" className="btn btn-danger " >
  Edit
  </button>
  <button id="btn2" className="btn btn-danger " >
  Save
  </button>
  <button id="btn3" className="btn btn-danger " >
Print
</button>
  </form>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </>
  )};

export default VendorPayment;