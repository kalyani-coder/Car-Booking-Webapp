import React, { useState, useEffect } from "react";
import "./UpdateDuty.css";
import Sidebar from "../Sidebar/Sidebar";
import Alert from "../AddCustomer/Alert";
import axios from "axios";

const UpdateDuty = () => {
  // Initial form data state
  const initialFormData = {
    companyname: "",
    // gstno: "",
    reportingaddress: "",
    date: "",
    name: "",
    vehicle: "",
    vehiclenumber: "",
    rate: "",
    from: "",
    to: "",
    title: "",
    amount: "",
    startingtime: "",
    closingtime: "",
    startingkm: "",
    closingkm: "",
    totalhour: "",
    totalkm: "",
    extrahour: "",
    extrahoursamount: "",
    extrakm: "",
    amount1: "",
    extrakmamount: "",
    subtotalamount: "",
    sgst: "",
    cgst: "",
    totalamount: "",
    advanceamount: "",
    paymentmethod: "",
    paymentmethod: "",
    chequeNo: "",
    ifscCode: "",
    upiId: "",
    cashReceiver: "",
    transactionId: "",
    TransactionNumber: "",
    tripDutyNumber: "",
  };

  // const [formData, setFormData] = useState(initialFormData);
  const [successAlert, setSuccessAlert] = useState(null);
  const [errorAlert, setErrorAlert] = useState(null);
  const [customerList, setCustomerList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState({
    customername: "",
    vehicle: "",
    pickup: "",
    dropoff: "",
    time: "",
    time1: "",
  });
  const [companyName, setCompanyName] = useState("");
  const [gstNo, setGstNo] = useState("");
  const [reportingAddress, setReportingAddress] = useState("");
  const [date, setDate] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [rate, setRate] = useState("");
  const [startingKms, setStartingKms] = useState("");
  const [closingKms, setClosingKms] = useState("");
  const [hour, setHour] = useState("");
  const [totalKm, setTotalKm] = useState("");
  const [extraHour, setExtraHour] = useState("");
  const [extraKm, setExtraKm] = useState("");
  const [extraKmAmount, setExtraKmAmount] = useState("");
  const [extraHourAmount, setExtraHourAmount] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [advanceAmount, setAdvanceAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [formData, setFormData] = useState({
    chequeNo: "",
    ifscCode: "",
    TransactionNumber: "",
    upiId: "",
    cashReceiver: "",
    neftnumber: "",
    accountnumber: "",
    branchname: "",
    transactionId: "",
  });

  //fetch customer name
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://localhost:8787/api/add-trip");

        if (response.ok) {
          const data = await response.json();
          console.log("Fetched customer data:", data);

          if (Array.isArray(data)) {
            setCustomerList(data);
          } else {
            console.error("Invalid data format: expected an array");
          }
        } else {
          console.error("Failed to fetch customers");
        }
      } catch (error) {
        console.error("API request error:", error);
      }
    };

    fetchCustomers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  const renderPaymentMethodFields = () => {
    switch (paymentMethod) {
      case "Cheque":
        return (
          <>
            <div className="mb-3" style={{ width: "50%" }}>
              <label className="form-label">Cheque Number:</label>
              <input
                type="text"
                className="form-control"
                value={formData.chequeNo}
                onChange={(e) =>
                  setFormData({ ...formData, chequeNo: e.target.value })
                }
              />
            </div>
            <div className="mb-3" style={{ width: "50%" }}>
              <label className="form-label">IFSC Code:</label>
              <input
                type="text"
                className="form-control"
                value={formData.ifscCode}
                onChange={(e) =>
                  setFormData({ ...formData, ifscCode: e.target.value })
                }
              />
            </div>
            <div className="mb-3" style={{ width: "50%" }}>
              <label className="form-label">Transaction Number:</label>
              <input
                type="text"
                className="form-control"
                value={formData.TransactionNumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    TransactionNumber: e.target.value,
                  })
                }
              />
            </div>
          </>
        );
      case "UPI / Wallet Payment":
        return (
          <div className="mb-3" style={{ width: "50%" }}>
            <label className="form-label">UPI ID:</label>
            <input
              type="text"
              className="form-control"
              value={formData.upiId}
              onChange={(e) =>
                setFormData({ ...formData, upiId: e.target.value })
              }
            />
          </div>
        );
      case "Cash":
        return (
          <div className="mb-3">
            <label className="form-label">Name to Whom Submitted Cash:</label>
            <input
              type="text"
              className="form-control"
              value={formData.cashReceiver}
              onChange={(e) =>
                setFormData({ ...formData, cashReceiver: e.target.value })
              }
            />
          </div>
        );
      case "Bank Transfer(NEFT)":
        return (
          <>
            <div className="mb-3" style={{ width: "50%" }}>
              <label className="form-label">NEFT Number:</label>
              <input
                type="text"
                className="form-control"
                value={formData.neftnumber}
                onChange={(e) =>
                  setFormData({ ...formData, neftnumber: e.target.value })
                }
              />
            </div>
            <div className="mb-3" style={{ width: "50%" }}>
              <label className="form-label">IFSC Code:</label>
              <input
                type="text"
                className="form-control"
                value={formData.ifscCode}
                onChange={(e) =>
                  setFormData({ ...formData, ifscCode: e.target.value })
                }
              />
            </div>
            <div className="mb-3" style={{ width: "50%" }}>
              <label className="form-label">Account Number:</label>
              <input
                type="text"
                className="form-control"
                value={formData.accountnumber}
                onChange={(e) =>
                  setFormData({ ...formData, accountnumber: e.target.value })
                }
              />
            </div>
            <div className="mb-3" style={{ width: "50%" }}>
              <label className="form-label">Branch Name:</label>
              <input
                type="text"
                className="form-control"
                value={formData.branchname}
                onChange={(e) =>
                  setFormData({ ...formData, branchname: e.target.value })
                }
              />
            </div>
          </>
        );
      default:
        return (
          <div className="mb-3 ">
            <label className="form-label">Transaction ID:</label>
            <input
              type="text"
              className="form-control w-[100%] update-duty-form-control"
              value={formData.transactionId}
              onChange={(e) =>
                setFormData({ ...formData, transactionId: e.target.value })
              }
            />
          </div>
        );
    }
  };

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
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Check for required fields and show specific messages for companyName, from, and to fields
    if (!companyName) {
      alert('Please fill the company name');
      return;
    }
  
    if (!selectedCustomer?.pickup) {
      alert('Please fill the pickup location');
      return;
    }
  
    if (!selectedCustomer?.dropoff) {
      alert('Please fill the dropoff location');
      return;
    }
  
    // Check for other required fields
    const requiredFields = {
      reportingAddress: reportingAddress,
      date: date,
      customername: selectedCustomer?.customername,
      vehicle: selectedCustomer?.vehicle,
      vehicleNumber: vehicleNumber,
      startingKms: startingKms,
      closingKms: closingKms,
      hour: hour,
      tripDutyNumber: selectedCustomer?.trip_duty_number,
      totalamount: setTotalAmount,
    };
  
    const missingFields = Object.keys(requiredFields).filter(
      (field) => !requiredFields[field]
    );
  
    if (missingFields.length > 0) {
      alert('Please fill the required fields');
      return;
    }
  
    // Construct data object
    const data = {
      companyname: companyName,
      reportingaddress: reportingAddress,
      date: date,
      name: selectedCustomer.customername,
      vehicle: selectedCustomer.vehicle,
      vehiclenumber: vehicleNumber,
      rate: rate,
      from: selectedCustomer.pickup,
      to: selectedCustomer.dropoff,
      startingtime: selectedCustomer.time,
      closingtime: selectedCustomer.time1,
      startingkm: startingKms,
      closingkm: closingKms,
      totalhour: hour,
      totalkm: totalKm,
      extrahour: extraHour,
      extrahourasamount: extraHourAmount,
      extrakm: extraKm,
      extrakmamount: extraKmAmount,
      totalamount: totalAmount,
      advanceamount: advanceAmount,
      paymentmethod: paymentMethod,
      trip_duty_number: selectedCustomer.trip_duty_number,
    };
  
    try {
      const response = await axios.post(
        "http://localhost:8787/api/update-duty",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.status === 201) {
        alert(response.data.message);
        // Reset form fields
        resetForm();
      } else {
        alert("Failed to add data. Please try again.");
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        const errors = error.response.data.errors;
        const errorMessages = errors.join('\n');
        alert(`Validation Error:\n${errorMessages}`);
      } else {
        console.error("API request error:", error);
        alert("Failed to add data. Please try again.");
      }
    }
  };
  
  const resetForm = () => {
    const initialFormData = {
      companyname: "",
      reportingaddress: "",
      date: "",
      name: "",
      vehicle: "",
      vehiclenumber: "",
      rate: "",
      from: "",
      to: "",
      title: "",
      amount: "",
      startingtime: "",
      closingtime: "",
      startingkm: "",
      closingkm: "",
      totalhour: "",
      totalkm: "",
      extrahour: "",
      extrahoursamount: "",
      extrakm: "",
      amount1: "",
      extrakmamount: "",
      subtotalamount: "",
      sgst: "",
      cgst: "",
      totalamount: "",
      advanceamount: "",
      paymentmethod: "",
      chequeNo: "",
      ifscCode: "",
      upiId: "",
      cashReceiver: "",
      transactionId: "",
      TransactionNumber: "",
      tripDutyNumber: "",
    };
  
    setCompanyName(initialFormData.companyname);
    setReportingAddress(initialFormData.reportingaddress);
    setDate(initialFormData.date);
    setSelectedCustomer({});
    setVehicleNumber(initialFormData.vehiclenumber);
    setRate(initialFormData.rate);
    setStartingKms(initialFormData.startingkm);
    setClosingKms(initialFormData.closingkm);
    setHour(initialFormData.totalhour);
    setTotalKm(initialFormData.totalkm);
    setExtraHour(initialFormData.extrahour);
    setExtraHourAmount(initialFormData.extrahoursamount);
    setExtraKm(initialFormData.extrakm);
    setExtraKmAmount(initialFormData.extrakmamount);
    setTotalAmount(initialFormData.totalamount);
    setAdvanceAmount(initialFormData.advanceamount);
    setPaymentMethod(initialFormData.paymentmethod);
  };
  
  

  return (
    <>
      <h2 className="View-Corporate-Customer-Rate font-bold p-4 my-4 text-center">
        Add Duty Slip
      </h2>
      {/* <h4 className="font-bold text-danger text-center">
        Duity Slip Number {selectedCustomer.trip_duty_number}
      </h4> */}
      <div className="update-duty-container">
        <div className="update-duty-form">
          <div className="form-group">
            <div className="responsive-flex-column-required gap-for-div-section-container-label-and-input-add-duty-slip d-flex justify-between">
              <div className="width-set-for-the-div-section-container-label-and-input-add-duty-slip">
                {" "}
                <label htmlFor="companyname" className="update-duty-form-label">
                  Company Name:
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  className="update-duty-form-control form-control"
                  type="text"
                  id="companyname"
                  name="companyname"
                  placeholder="Company Name"
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
              <div className="width-set-for-the-div-section-container-label-and-input-add-duty-slip">
                {" "}
                <label htmlFor="Duty_slip_number" className="update-duty-form-label">
                  Duty Slip Number:
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  className="update-duty-form-control form-control"
                  type="text"
                  id="trip_duty_number"
                  name="trip_duty_number"
                  placeholder=""
                  onChange={handleChange}
                  value={selectedCustomer.trip_duty_number}
                />
              </div>
            </div>
            <div className="responsive-flex-column-required gap-for-div-section-container-label-and-input-add-duty-slip d-flex justify-between">
              <div className="width-set-for-the-div-section-container-label-and-input-add-duty-slip">
                <label
                  htmlFor="reportingaddress"
                  className="update-duty-form-label"
                >
                  Reporting Address:
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  className="update-duty-form-control form-control"
                  type="text"
                  id="reportingaddress"
                  name="reportingaddress"
                  placeholder="Reporting Address"
                  onChange={(e) => setReportingAddress(e.target.value)}
                />
              </div>
              <div className="width-set-for-the-div-section-container-label-and-input-add-duty-slip">
                <label htmlFor="date" className="update-duty-form-label">
                  Date:
                </label>
                <input
                  className="update-duty-form-control form-control"
                  type="date"
                  id="date"
                  name="date"
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>
            <div className="responsive-flex-column-required gap-for-div-section-container-label-and-input-add-duty-slip d-flex justify-between">
              <div className="width-set-for-the-div-section-container-label-and-input-add-duty-slip">
                <label htmlFor="name" className="update-duty-form-label">
                  Customer Name:
                  <span className="required-asterisk">*</span>
                </label>
                <select
                  className="form-control-add-trip-input-vender-rate-page"
                  id="customername"
                  name="customername"
                  onChange={(e) => {
                    const selectedCustomer = customerList.find(
                      (customer) => customer.customername === e.target.value
                    );
                    setSelectedCustomer(selectedCustomer);
                  }}
                  value={selectedCustomer ? selectedCustomer.customername : ""}
                >
                  <option value="">Select Customer</option>
                  {customerList?.length > 0 ? (
                    customerList.map((customer) => (
                      <option key={customer._id} value={customer.customername}>
                        {customer.customername}
                      </option>
                    ))
                  ) : (
                    <option value="">No Customers Available</option>
                  )}
                </select>
              </div>
              <div className="width-set-for-the-div-section-container-label-and-input-add-duty-slip">
                <label htmlFor="rate" className="update-duty-form-label">
                  Vehicle:
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  className="update-duty-form-control form-control"
                  type="vehicle"
                  id="vehicle"
                  name="vehicle"
                  // placeholder="vehicle"
                  onChange={handleChange}
                  value={selectedCustomer.vehicle}
                />
              </div>
            </div>
            <div className="responsive-flex-column-required gap-for-div-section-container-label-and-input-add-duty-slip d-flex justify-between">
              <div className="width-set-for-the-div-section-container-label-and-input-add-duty-slip">
                <label
                  htmlFor="vehiclenumber"
                  className="update-duty-form-label"
                >
                  Vehicle Number:
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  className="update-duty-form-control form-control"
                  type="text"
                  id="vehiclenumber"
                  name="vehiclenumber"
                  placeholder="Vehicle Number"
                  onChange={(e) => setVehicleNumber(e.target.value)}
                />
              </div>
              <div className="width-set-for-the-div-section-container-label-and-input-add-duty-slip">
                <label htmlFor="rate" className="update-duty-form-label">
                  Rate:
                </label>
                <input
                  className="update-duty-form-control form-control"
                  type="number"
                  id="rate"
                  name="rate"
                  placeholder="Rate"
                  onChange={(e) => setRate(e.target.value)}
                />
              </div>
            </div>
            <div className="responsive-flex-column-required gap-for-div-section-container-label-and-input-add-duty-slip d-flex justify-between">
              <div className="width-set-for-the-div-section-container-label-and-input-add-duty-slip">
                <label htmlFor="from" className="update-duty-form-label">
                  From:
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  className="update-duty-form-control form-control"
                  type="text"
                  id="from"
                  name="from"
                  placeholder="from"
                  onChange={handleChange}
                  value={selectedCustomer.pickup}
                />
              </div>
              <div className="width-set-for-the-div-section-container-label-and-input-add-duty-slip">
                <label htmlFor="To" className="update-duty-form-label">
                  To:
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  className="update-duty-form-control form-control"
                  type="text"
                  id="to"
                  name="to"
                  placeholder="To"
                  onChange={handleChange}
                  value={selectedCustomer.dropoff}
                />
              </div>
            </div>
            <div className="responsive-flex-column-required gap-for-div-section-container-label-and-input-add-duty-slip d-flex justify-between">
              <div className="width-set-for-the-div-section-container-label-and-input-add-duty-slip">
                <label
                  htmlFor="startingtime"
                  className="update-duty-form-label"
                >
                  Starting Time:
                </label>
                <input
                  className="update-duty-form-control form-control"
                  type="time"
                  id="startingtime"
                  name="startingtime"
                  onChange={handleChange}
                  value={selectedCustomer.time}
                />
              </div>
              <div className="width-set-for-the-div-section-container-label-and-input-add-duty-slip">
                <label htmlFor="closingtime" className="update-duty-form-label">
                  Closing Time:
                </label>
                <input
                  className="update-duty-form-control form-control"
                  type="time"
                  id="closingtime"
                  name="closingtime"
                  placeholder="Closingtime Time"
                  onChange={handleChange}
                  value={selectedCustomer.time1}
                />
              </div>
            </div>

            <div className="responsive-flex-column-required gap-for-div-section-container-label-and-input-add-duty-slip d-flex justify-between">
              <div className="width-set-for-the-div-section-container-label-and-input-add-duty-slip">
                <label htmlFor="startingkm" className="update-duty-form-label">
                  Starting Kms:
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  className="update-duty-form-control form-control"
                  type="text"
                  id="startingkm"
                  name="startingkm"
                  placeholder="Starting KM"
                  onChange={(e) => setStartingKms(e.target.value)}
                />
              </div>
              <div className="width-set-for-the-div-section-container-label-and-input-add-duty-slip">
                {" "}
                <label htmlFor="closingkm" className="update-duty-form-label">
                  Closing Kms:
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  className="update-duty-form-control form-control"
                  type="text"
                  id="closingkm"
                  name="closingkm"
                  placeholder="Closing KM"
                  onChange={(e) => setClosingKms(e.target.value)}
                />
              </div>
            </div>

            <div className="responsive-flex-column-required gap-for-div-section-container-label-and-input-add-duty-slip d-flex justify-between">
              <div className="width-set-for-the-div-section-container-label-and-input-add-duty-slip">
                <label htmlFor="totalhour" className="update-duty-form-label">
                  Total Hours:
                </label>
                <input
                  className="update-duty-form-control form-control"
                  type="text"
                  id="totalhour"
                  name="totalhour"
                  placeholder="Total Hour"
                  onChange={(e) => setHour(e.target.value)}
                />
              </div>
              <div className="width-set-for-the-div-section-container-label-and-input-add-duty-slip">
                <label htmlFor="totalkm" className="update-duty-form-label">
                  Total Kms:
                </label>
                <input
                  className="update-duty-form-control form-control"
                  type="text"
                  id="totalkm"
                  name="totalkm"
                  placeholder="Total KM"
                  onChange={(e) => setTotalKm(e.target.value)}
                />
              </div>
            </div>
            <div className="responsive-flex-column-required gap-for-div-section-container-label-and-input-add-duty-slip d-flex justify-between">
              <div className="width-set-for-the-div-section-container-label-and-input-add-duty-slip">
                <label htmlFor="extrahour" className="update-duty-form-label">
                  Extra Hour:
                </label>
                <input
                  className="update-duty-form-control form-control"
                  type="text"
                  id="extrahour"
                  name="extrahour"
                  placeholder="Extra Hour"
                  onChange={(e) => setExtraHour(e.target.value)}
                />
              </div>
              <div className="width-set-for-the-div-section-container-label-and-input-add-duty-slip">
                <label htmlFor="extrahourasamount" className="update-duty-form-label">
                  Extra Hours Amount:
                </label>
                <input
                  className="update-duty-form-control form-control"
                  type="text"
                  id="extrahourasamount"
                  name="extrahoursamount"
                  placeholder=" Extra Hours Amount"
                  onChange={(e) => setExtraHourAmount(e.target.value)}
                />
              </div>
            </div>

            <div className="responsive-flex-column-required gap-for-div-section-container-label-and-input-add-duty-slip d-flex justify-between">
              <div className="width-set-for-the-div-section-container-label-and-input-add-duty-slip">
                <label htmlFor="extrakm" className="update-duty-form-label">
                  Extra KMS:
                </label>
                <input
                  className="update-duty-form-control form-control"
                  type="text"
                  id="extrakm"
                  name="extrakm"
                  placeholder="Extra KM"
                  onChange={(e) => setExtraKm(e.target.value)}
                />
              </div>
              <div className="width-set-for-the-div-section-container-label-and-input-add-duty-slip">
                <label htmlFor="amount2" className="update-duty-form-label">
                  Extra KMS Amount:
                </label>
                <input
                  className="update-duty-form-control form-control"
                  type="text"
                  id="extrakmamount"
                  name="extrakmamount"
                  placeholder="Extra Km Amt"
                  onChange={(e) => setExtraKmAmount(e.target.value)}
                />
              </div>
            </div>

            <div className="responsive-flex-column-required gap-for-div-section-container-label-and-input-add-duty-slip d-flex justify-between ">
              <div className="width-set-for-the-div-section-container-label-and-input-add-duty-slip">
                <label htmlFor="totalamount" className="update-duty-form-label">
                  Total Amount:
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  className="update-duty-form-control form-control"
                  type="number"
                  id="totalamount"
                  name="totalamount"
                  placeholder="Total Amount"
                  onChange={(e) => setTotalAmount(e.target.value)}
                />
              </div>
              <div className="width-set-for-the-div-section-container-label-and-input-add-duty-slip">
                <label
                  htmlFor="advanceamount"
                  className="update-duty-form-label"
                >
                  Advance Amount:
                </label>
                <input
                  className="update-duty-form-control form-control"
                  type="number"
                  id="advanceamount"
                  name="advanceamount"
                  placeholder="Advance Amount"
                  onChange={(e) => setAdvanceAmount(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="paymentmethod" className="update-duty-form-label">
                Payment Method:
              </label>
              <select
                className="update-duty-form-control form-control"
                name="paymentmethod"
                id="paymentmethod"
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="">Payment Method</option>
                <option value="Cash">Cash</option>
                <option value="Cheque">Cheque</option>
                <option value="UPI / Wallet Payment">
                  UPI /Wallet Payment
                </option>
                <option value="Bank Transfer(NEFT)">
                  Bank Transfer(NEFT )
                </option>
              </select>
            </div>

            {/* Render payment method specific fields */}
            {renderPaymentMethodFields()}
          </div>
        </div>

        {/* Buttons for form actions */}
        <div className="button-container">
          <button
            type="submit"
            className="customer-btn-submit"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdateDuty;
