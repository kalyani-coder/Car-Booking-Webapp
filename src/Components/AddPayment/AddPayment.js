import React from 'react'
import './AddPayment.css';
import Sidebar from '../Sidebar/Sidebar';
function AddPayment() {
  return (

    <>
    <Sidebar/>
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
      <input type="text" className="form-control" placeholder="Enter your Company name" />
      
    </div>
  </div>
  <div className="col-md">
    <div className="form-group">
    <label >Duty Slip No</label>
      <input type="text" className="form-control"  placeholder="Enter your Duty slip" />
      
    </div>
  </div>
</div>

<div className="row g-2">
  <div className="col-md">
    <div className="form-group">
    <label >Reporting Address</label>
      <input type="text" className="form-control" placeholder="Enter your Reporting Address" />
      
    </div>
  </div>
  <div className="col-md">
    <div className="form-group">
    <label >Date</label>
      <input type="date" className="form-control"  placeholder="Enter your Date" />
      
    </div>
  </div>
</div>
<div className="row g-2">
  <div className="col-md">
    <div className="form-group">
    <label >Name</label>
      <input type="text" className="form-control" placeholder="Enter your Name" />
      
    </div>
  </div>
  <div className="col-md">
    <div className="form-group">
    <label >Vehicle Number</label>
      <input type="number" className="form-control"  placeholder="Enter your Vehicle Number" />
      
    </div>
  </div>
</div>





<div className="form-group">
<label className='addpayment-lable'> Vehicle Type :</label>
{/* <label htmlFor="vehicle" className="form-label">Vehicle:</label> */}
        <select className="form-control mb-2 addpayment-lable" name="vehicle" id="vehicle">
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
      <input type="text" className="form-control" placeholder="Enter your From" />
      
    </div>
  </div>
  <div className="col-md">
    <div className="form-group">
    <label >To</label>
      <input type="text" className="form-control"  placeholder="Enter your To" />
      
    </div>
  </div>
</div>


<div className="row g-2">
  <div className="col-md">
    <div className="form-group">
    <label >Closing Kms</label>
      <input type="text" className="form-control" placeholder="Enter your Closing Kms" />
      
    </div>
  </div>
  <div className="col-md">
    <div className="form-group">
    <label >Closing Time</label>
      <input type="Time" className="form-control"  placeholder="Enter your Closing Time" />
      
    </div>
  </div>
</div>


<div className="row g-2">
  <div className="col-md">
    <div className="form-group">
    <label >Starting Kms</label>
      <input type="text" className="form-control" placeholder="Enter your Starting Kms" />
      
    </div>
  </div>
  <div className="col-md">
    <div className="form-group">
    <label >Reporting Kms</label>
      <input type="Text" className="form-control"  placeholder="Enter your Reporting Kms" />
      
    </div>
  </div>
</div>


<div className="row g-2">
  <div className="col-md">
    <div className="form-group">
    <label >Total Kms</label>
      <input type="text" className="form-control" placeholder="Enter your Total Kms" />
      
    </div>
  </div>
  <div className="col-md">
    <div className="form-group">
    <label >Total Hours</label>
      <input type="Text" className="form-control"  placeholder="Enter your Total Hours" />
      
    </div>
  </div>
</div>


<div className="row g-2">
  <div className="col-md">
    <div className="form-group">
    <label >8 Hrs.  80Kms.@</label>
      <input type="text" className="form-control" placeholder="Enter your 8 Hrs.  80Kms.@" />
      
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
    <label >Extra Kms</label>
      <input type="text" className="form-control" placeholder="Enter your Extra Kms" />
      
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
    <label >Extra Hours</label>
      <input type="text" className="form-control" placeholder="Enter your Extra Kms" />
      
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
    <label >1 Day 300 kms</label>
      <input type="text" className="form-control" placeholder="Enter your 1 Day 300 kms" />
      
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
    <label >Advance Payment</label>
      <input type="number" className="form-control"  placeholder="Enter your Advance Payment" />
      
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