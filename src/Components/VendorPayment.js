import React from 'react'
import './VendorPayment.css';
import Sidebar from './Sidebar';
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
      <label >Vendor Name</label>
        <input type="text" className="form-control" placeholder="Enter your Vendor Name" />

      </div>
    </div>
    <div className="col-md">
      <div className="form-group">
      <label >Vendor Address</label>
        <input type="text" className="form-control"  placeholder="Enter your Vendor Address" />

      </div>
    </div>
  </div>

  <div className="row g-2">
    <div className="col-md">
      <div className="form-group">
      <label >Vendor Mail</label>
        <input type="text" className="form-control" placeholder="Enter your Vendor Mail" />

      </div>
    </div>
    <div className="col-md">
      <div className="form-group">
      <label >Vendor  Number</label>
        <input type="Number" className="form-control"  placeholder="Enter your Vendor Number" />

      </div>
    </div>
  </div>
  <div className="row g-2">
    <div className="col-md">
      <div className="form-group">
      <label >Partial Payment</label>
        <input type="text" className="form-control" placeholder="Enter your Partial Payment" />

      </div>
    </div>
    <div className="col-md">
      <div className="form-group">
      <label >Amount</label>
        <input type="number" className="form-control"  placeholder="Enter your Amount" />

      </div>
    </div>
  </div>

  <div className="row g-2">
    <div className="col-md">
      <div className="form-group">
      <label >TDS 1%</label>
        <input type="text" className="form-control" placeholder="Enter your TDS 1%" />

      </div>
    </div>
    <div className="col-md">
      <div className="form-group">
      <label >Amount</label>
        <input type="number" className="form-control"  placeholder="Enter your Amount" />

      </div>
    </div>
  </div>

  <div className="row g-2">
    <div className="col-md">
      <div className="form-group">
      <label >Total Amount</label>
        <input type="text" className="form-control" placeholder="Enter your Total Amount" />

      </div>
    </div>
    <div className="col-md">
      <div className="form-group">
      <label >Amount</label>
        <input type="number" className="form-control"  placeholder="Enter your Amount" />

      </div>
    </div>
  </div>

  <div className="row g-2">
    <div className="col-md">
      <div className="form-group">
      <label >Paid Amount</label>
        <input type="text" className="form-control" placeholder="Enter your Paid Amount" />

      </div>
    </div>
    <div className="col-md">
      <div className="form-group">
      <label >Amount</label>
        <input type="text" className="form-control"  placeholder="Enter your Amount" />

      </div>
    </div>
  </div>
  <div className="form-group">
  <label> Payment Method </label>
  <input type="text" className="form-control"  placeholder="Enter your Payment Method" />

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