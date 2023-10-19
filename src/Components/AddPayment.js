import React from 'react';
import './AddPayment.css';
import Sidebar from './Sidebar';

function AddPayment() {
  return (
    <>
      <Sidebar />
      <div className="add-payment-container">
        <div className="add-payment-form-body">
          <div className="add-payment-card">
            <div className="add-payment-content">
              <div className="add-payment-content-wrapper">
                <form className="add-payment-form">
                  {/* First Column */}
                  <div className="add-payment-column">
                    {/* Company Name */}
                    <div className="add-payment-field-group">
                      <label className="add-payment-label">Company Name</label>
                      <input type="text" className="add-payment-input" placeholder="Enter your Company name" />
                    </div>

                    {/* Duty Slip No */}
                    <div className="add-payment-field-group">
                      <label className="add-payment-label">Duty Slip No</label>
                      <input type="text" className="add-payment-input" placeholder="Enter your Duty slip" />
                    </div>

                    {/* Reporting Address */}
                    <div className="add-payment-field-group">
                      <label className="add-payment-label">Reporting Address</label>
                      <input type="text" className="add-payment-input" placeholder="Enter your Reporting Address" />
                    </div>

                    {/* Date */}
                    <div className="add-payment-field-group">
                      <label className="add-payment-label">Date</label>
                      <input type="date" className="add-payment-input" placeholder="Enter your Date" />
                    </div>

                    {/* Name */}
                    <div className="add-payment-field-group">
                      <label className="add-payment-label">Name</label>
                      <input type="text" className="add-payment-input" placeholder="Enter your Name" />
                    </div>

                    {/* Vehicle Number */}
                    <div className="add-payment-field-group">
                      <label className="add-payment-label">Vehicle Number</label>
                      <input type="number" className="add-payment-input" placeholder="Enter your Vehicle Number" />
                    </div>
                  </div>

                  {/* Second Column */}
                  <div className="add-payment-column">
                    {/* Vehicle Type */}
                    <div className="add-payment-field-group">
                      <label className="add-payment-label">Vehicle Type:</label>
                      <select className="add-payment-input" name="vehicle" id="vehicle">
                        <option value="">Vehicle</option>
                        <option value="Sedan Car">Sedan Car</option>
                        <option value="Mini Car">Mini Car</option>
                        {/* ... other options ... */}
                      </select>
                    </div>

                    {/* From */}
                    <div className="add-payment-field-group">
                      <label className="add-payment-label">From</label>
                      <input type="text" className="add-payment-input" placeholder="Enter your From" />
                    </div>

                    {/* To */}
                    <div className="add-payment-field-group">
                      <label className="add-payment-label">To</label>
                      <input type="text" className="add-payment-input" placeholder="Enter your To" />
                    </div>

                    {/* Closing Kms */}
                    <div className="add-payment-field-group">
                      <label className="add-payment-label">Closing Kms</label>
                      <input type="text" className="add-payment-input" placeholder="Enter your Closing Kms" />
                    </div>

                    {/* Closing Time */}
                    <div className="add-payment-field-group">
                      <label className="add-payment-label">Closing Time</label>
                      <input type="Time" className="add-payment-input" placeholder="Enter your Closing Time" />
                    </div>

                    {/* Starting Kms */}
                    <div className="add-payment-field-group">
                      <label className="add-payment-label">Starting Kms</label>
                      <input type="text" className="add-payment-input" placeholder="Enter your Starting Kms" />
                    </div>

                    {/* Reporting Kms */}
                    <div className="add-payment-field-group">
                      <label className="add-payment-label">Reporting Kms</label>
                      <input type="Text" className="add-payment-input" placeholder="Enter your Reporting Kms" />
                    </div>

                    {/* Total Kms */}
                    <div className="add-payment-field-group">
                      <label className="add-payment-label">Total Kms</label>
                      <input type="text" className="add-payment-input" placeholder="Enter your Total Kms" />
                    </div>

                    {/* Total Hours */}
                    <div className="add-payment-field-group">
                      <label className="add-payment-label">Total Hours</label>
                      <input type="Text" className="add-payment-input" placeholder="Enter your Total Hours" />
                    </div>

                    {/* 8 Hrs. 80Kms.@ */}
                    <div className="add-payment-field-group">
                      <label className="add-payment-label">8 Hrs. 80Kms.@</label>
                      <input type="text" className="add-payment-input" placeholder="Enter your 8 Hrs. 80Kms.@" />
                    </div>

                    {/* Amount */}
                    <div className="add-payment-field-group">
                      <label className="add-payment-label">Amount</label>
                      <input type="number" className="add-payment-input" placeholder="Enter your Amount" />
                    </div>

                    {/* Extra Kms */}
                    <div className="add-payment-field-group">
                      <label className="add-payment-label">Extra Kms</label>
                      <input type="text" className="add-payment-input" placeholder="Enter your Extra Kms" />
                    </div>

                    {/* Extra Hours */}
                    <div className="add-payment-field-group">
                      <label className="add-payment-label">Extra Hours</label>
                      <input type="text" className="add-payment-input" placeholder="Enter your Extra Kms" />
                    </div>

                    {/* 1 Day 300 kms */}
                    <div className="add-payment-field-group">
                      <label className="add-payment-label">1 Day 300 kms</label>
                      <input type="text" className="add-payment-input" placeholder="Enter your 1 Day 300 kms" />
                    </div>

                    {/* Total Amount */}
                    <div className="add-payment-field-group">
                      <label className="add-payment-label">Total Amount</label>
                      <input type="text" className="add-payment-input" placeholder="Enter your Total Amount" />
                    </div>

                    {/* Advance Payment */}
                    <div className="add-payment-field-group">
                      <label className="add-payment-label">Advance Payment</label>
                      <input type="number" className="add-payment-input" placeholder="Enter your Advance Payment" />
                    </div>
                  </div>

                  {/* Buttons */}

                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <button className="add-payment-btn" id="btn1">
        Edit
      </button>
      <button className="add-payment-btn" id="btn2">
        Save
      </button>
    </>
  );
}

export default AddPayment;
