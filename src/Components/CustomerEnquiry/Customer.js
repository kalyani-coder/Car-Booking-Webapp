import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';

const Customer = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const initialFormData = {
    customername: "",
    cus_Id: '',
    mobileno: "",
    email: "",
    address: "",
    triptype: "",
    subtype: "",
    pickup: "",
    date1: "",
    time1: "",
    dropoff: "",
    date2: "",
    time2: "",
    totaldays: "",
    totalhours: "",
    vehicle: "",
    formattedDate1: '',
    formattedDate2: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (selectedCustomer) {
      setFormData((prevData) => ({
        ...prevData,
        mobileno: selectedCustomer.Cus_Mobile,
        email: selectedCustomer.Cus_Email,
        address: selectedCustomer.address,
      }));
    }
  }, [selectedCustomer]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'date1' || name === 'date2' || name === 'time1' || name === 'time2') {
      updateTotal();
    }
  };

  const handleBlur = () => {
    updateTotal();
  };

  const handleDateChange = (event) => {
    handleChange(event);

    const { date1, time1, date2, time2 } = formData;

    if (date1 && time1 && date2 && time2) {
      const pickupDateTime = new Date(`${date1}T${time1}`);
      const dropoffDateTime = new Date(`${date2}T${time2}`);

      console.log('Selected Pickup Date and Time:', pickupDateTime);
      console.log('Selected Dropoff Date and Time:', dropoffDateTime);

      const timeDifference = dropoffDateTime - pickupDateTime;

      const totalDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
      const totalHours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

      setFormData((prevData) => ({
        ...prevData,
        totaldays: totalDays,
        totalhours: totalHours,
      }));
    }
  };

  const updateTotal = () => {
    const selectedDate1 = new Date(`${formData.date1}T${formData.time1}`);
    const selectedDate2 = new Date(`${formData.date2}T${formData.time2}`);

    if (!isNaN(selectedDate1) && !isNaN(selectedDate2)) {
      const timeDifference = selectedDate2 - selectedDate1;
      const totalDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
      const totalHours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

      const formattedDate1 = selectedDate1.toLocaleDateString('en-US');
      const formattedDate2 = selectedDate2.toLocaleDateString('en-US');

      setFormData((prevData) => ({
        ...prevData,
        totaldays: totalDays,
        totalhours: totalHours,
        formattedDate1: formattedDate1,
        formattedDate2: formattedDate2,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        totaldays: '',
        totalhours: '',
        formattedDate1: '',
        formattedDate2: '',
      }));
    }
  };

  return (
    <>
      <Sidebar />

      <div className="customer-inquiry-container">
        <div className="main-container">
          <div className="form-container">
            <h1>Addition of dates</h1>

            <div className="d-flex gap-3">
              <div>
                <div className="form-group">
                  <label htmlFor="pickup" className="form-label">
                    Pickup Location:
                  </label>
                  <input
                    type="text"
                    className="form-control cust-inq-input"
                    name="pickup"
                    placeholder="Pickup Location"
                    onChange={handleChange}
                    value={formData.pickup}
                  />
                </div>
              </div>
              <div>
                <div className="form-group">
                  <label htmlFor="date1" className="form-label">
                    Date 1:
                  </label>
                  <input
                    type="date"
                    className="form-control cust-inq-input"
                    name="date1"
                    onChange={handleDateChange}
                    onBlur={handleBlur}
                    value={formData.date1}
                  />
                  {formData.formattedDate1 && (
                    <p>Formatted Date 1: {formData.formattedDate1}</p>
                  )}
                </div>
              </div>
              <div>
                <div className="form-group">
                  <label htmlFor="time1" className="form-label">
                    Time 1:
                  </label>
                  <input
                    type="time"
                    className="form-control cust-inq-input"
                    name="time1"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={formData.time1}
                  />
                </div>
              </div>
            </div>
            <div className="d-flex gap-3">
              <div>
                <div className="form-group">
                  <label htmlFor="dropoff" className="form-label">
                    Dropoff Location:
                  </label>
                  <input
                    type="text"
                    className="form-control cust-inq-input"
                    name="dropoff"
                    placeholder="Enter Dropoff Location"
                    onChange={handleChange}
                    value={formData.dropoff}
                  />
                </div>
              </div>
              <div>
                <div className="form-group">
                  <label htmlFor="date2" className="form-label">
                    Date 2:
                  </label>
                  <input
                    type="date"
                    className="form-control cust-inq-input"
                    name="date2"
                    onChange={handleDateChange}
                    onBlur={handleBlur}
                    value={formData.date2}
                  />
                  {formData.formattedDate2 && (
                    <p>Formatted Date 2: {formData.formattedDate2}</p>
                  )}
                </div>
              </div>
              <div>
                <div className="form-group">
                  <label htmlFor="time2" className="form-label">
                    Time 2:
                  </label>
                  <input
                    type="time"
                    className="form-control cust-inq-input"
                    name="time2"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={formData.time2}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="totaldays" className="form-label">
                Total Days:
              </label>
              <div className="d-flex align-items-center">
                <input
                  type="text"
                  className="form-control-cust-inq-input"
                  name="totaldays"
                  placeholder="Total Days"
                  value={formData.totaldays}
                  readOnly
                />
                <span style={{ marginLeft: '5px' }}>Days</span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="totalhours" className="form-label">
                Total Hours:
              </label>
              <div className="d-flex align-items-center">
                <input
                  type="text"
                  className="form-control-cust-inq-input"
                  name="totalhours"
                  placeholder="Total Hours"
                  value={formData.totalhours}
                  readOnly
                />
                <span style={{ marginLeft: '5px' }}>Hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Customer;
