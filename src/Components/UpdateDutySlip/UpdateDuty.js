import React, { useState, useEffect } from "react";
import "./UpdateDuty.css";
import Sidebar from "../Sidebar/Sidebar";
import Alert from "../AddCustomer/Alert";
import axios from "axios";

const UpdateDuty = () => {
  // Initial form data state
  const initialFormData = {
    companyname: "",
    gstno: "",
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
        const response = await fetch("http://localhost:10000/api/add-trip");

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
          <div className="mb-3">
            <label className="form-label">Transaction ID:</label>
            <input
              type="text"
              className="form-control"
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

    const data = {
      companyname: companyName,
      gstno: gstNo,
      reportingaddress: reportingAddress,
      date: date,
      customername: selectedCustomer.customername,
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
    };
    // Log the data to be sent
    console.log("Submitting data:", data);

    try {
      const response = await axios.post("http://localhost:10000/api/update-duty", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 200) {
        showAlert("Data added successfully!" , "success");
        
        // Reset form fields here if needed
      } else {
        showAlert("Failed to add data. Please try again.", "danger");
      }
    } catch (error) {
      console.error("API request error:", error);
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
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                marginBottom: "8px",
              }}
            >
              Add Duty Slip
            </h2>

            {successAlert && <Alert alert={successAlert} />}
            {errorAlert && <Alert alert={errorAlert} />}

            <div className="d-flex gap-5">
              <div>
                {" "}
                <label htmlFor="companyname" className="update-duty-form-label">
                  Company Name:
                </label>
                <input
                  className="update-duty-form-control"
                  type="text"
                  id="companyname"
                  name="companyname"
                  placeholder="Company Name"
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
              <div>
                {" "}
                <label htmlFor="gstno" className="update-duty-form-label">
                  GST No:
                </label>
                <input
                  className="update-duty-form-control"
                  type="text"
                  id="gstno"
                  name="gstno"
                  placeholder="GST No."
                  onChange={(e) => setGstNo(e.target.value)}
                />
              </div>
            </div>
            <div className="d-flex gap-5">
              <div>
                <label
                  htmlFor="reportingaddress"
                  className="update-duty-form-label"
                >
                  Reporting Address:
                </label>
                <input
                  className="update-duty-form-control"
                  type="text"
                  id="reportingaddress"
                  name="reportingaddress"
                  placeholder="Reporting Address"
                  onChange={(e) => setReportingAddress(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="date" className="update-duty-form-label">
                  Date:
                </label>
                <input
                  className="update-duty-form-control"
                  type="date"
                  id="date"
                  name="date"
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>
            <div className="d-flex gap-5">
              <div>
                <label htmlFor="name" className="update-duty-form-label">
                  Customer Name:
                </label>
                <select
                  className="update-duty-form-control"
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
              <div>
                <label htmlFor="rate" className="update-duty-form-label">
                  Vehicle:
                </label>
                <input
                  className="update-duty-form-control"
                  type="vehicle"
                  id="vehicle"
                  name="vehicle"
                  // placeholder="vehicle"
                  onChange={handleChange}
                  value={selectedCustomer.vehicle}
                />
              </div>
            </div>
            <div className="d-flex gap-5">
              <div>
                <label
                  htmlFor="vehiclenumber"
                  className="update-duty-form-label"
                >
                  Vehicle Number:
                </label>
                <input
                  className="update-duty-form-control"
                  type="text"
                  id="vehiclenumber"
                  name="vehiclenumber"
                  placeholder="Vehicle Number"
                  onChange={(e) => setVehicleNumber(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="rate" className="update-duty-form-label">
                  Rate:
                </label>
                <input
                  className="update-duty-form-control"
                  type="number"
                  id="rate"
                  name="rate"
                  placeholder="Rate"
                  onChange={(e) => setRate(e.target.value)}
                />
              </div>
            </div>
            <div className="d-flex gap-5">
              <div>
                <label htmlFor="from" className="update-duty-form-label">
                  From:
                </label>
                <input
                  className="update-duty-form-control"
                  type="text"
                  id="from"
                  name="from"
                  placeholder="from"
                  onChange={handleChange}
                  value={selectedCustomer.pickup}
                />
              </div>
              <div>
                <label htmlFor="To" className="update-duty-form-label">
                  To:
                </label>
                <input
                  className="update-duty-form-control"
                  type="text"
                  id="to"
                  name="to"
                  placeholder="To"
                  onChange={handleChange}
                  value={selectedCustomer.dropoff}
                />
              </div>
            </div>

            {/* <div className="d-flex gap-5">
              <div>
                {" "}
                <label htmlFor="title" className="update-duty-form-label">
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
                  <option value="One Day / 80km">
                    One Day /80km-Local Duty
                  </option>
                  <option value="One Day / 300km">
                    One Day /300km-Outstation Duty
                  </option>
                  <option value="440km- Local Airport Transfer">
                    440km-Local Airport Transfer
                  </option>
                  <option value="Pune-Mumbai Pickup Drop">
                    Pune-Mumbai Pickup Dropoff{" "}
                  </option>
                </select>
              </div>
              <div>
                {" "}
                <label htmlFor="amount1" className="update-duty-form-label">
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
            </div> */}
            <div className="d-flex gap-5">
              <div>
                <label
                  htmlFor="startingtime"
                  className="update-duty-form-label"
                >
                  Starting Time:
                </label>
                <input
                  className="update-duty-form-control"
                  type="time"
                  id="startingtime"
                  name="startingtime"
                  onChange={handleChange}
                  value={selectedCustomer.time}
                />
              </div>
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
                  value={selectedCustomer.time1}
                />
              </div>
            </div>

            <div className="d-flex gap-5">
              <div>
                <label htmlFor="startingkm" className="update-duty-form-label">
                  Starting Kms:
                </label>
                <input
                  className="update-duty-form-control"
                  type="text"
                  id="startingkm"
                  name="startingkm"
                  placeholder="Starting KM"
                  onChange={(e) => setStartingKms(e.target.value)}
                />
              </div>
              <div>
                {" "}
                <label htmlFor="closingkm" className="update-duty-form-label">
                  Closing Kms:
                </label>
                <input
                  className="update-duty-form-control"
                  type="text"
                  id="closingkm"
                  name="closingkm"
                  placeholder="Closing KM"
                  onChange={(e) => setClosingKms(e.target.value)}
                />
              </div>
            </div>

            <div className="d-flex gap-5">
              <div>
                <label htmlFor="totalhour" className="update-duty-form-label">
                  Total Hours:
                </label>
                <input
                  className="update-duty-form-control"
                  type="text"
                  id="totalhour"
                  name="totalhour"
                  placeholder="Total Hour"
                  onChange={(e) => setHour(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="totalkm" className="update-duty-form-label">
                  Total Kms:
                </label>
                <input
                  className="update-duty-form-control"
                  type="text"
                  id="totalkm"
                  name="totalkm"
                  placeholder="Total KM"
                  onChange={(e) => setTotalKm(e.target.value)}
                />
              </div>
            </div>
            <div className="d-flex gap-5">
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
                  onChange={(e) => setExtraHour(e.target.value)}
                />
              </div>
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
                  onChange={(e) => setExtraHourAmount(e.target.value)}
                />
              </div>
            </div>

            <div className="d-flex gap-5">
              <div>
                {" "}
                <label htmlFor="extrakm" className="update-duty-form-label">
                  Extra KMS:
                </label>
                <input
                  className="update-duty-form-control"
                  type="text"
                  id="extrakm"
                  name="extrakm"
                  placeholder="Extra KM"
                  onChange={(e) => setExtraKm(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="amount2" className="update-duty-form-label">
                  Extra KMS Amount:
                </label>
                <input
                  className="update-duty-form-control"
                  type="text"
                  id="extrakmamount"
                  name="extrakmamount"
                  placeholder="Extra Km Amt"
                  onChange={(e) => setExtraKmAmount(e.target.value)}
                />
              </div>
            </div>

            <div className="d-flex gap-5">
              <div>
                <label htmlFor="totalamount" className="update-duty-form-label">
                  Total Amount:
                </label>
                <input
                  className="update-duty-form-control"
                  type="number"
                  id="totalamount"
                  name="totalamount"
                  placeholder="Total Amount"
                  onChange={(e) => setTotalAmount(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="advanceamount"
                  className="update-duty-form-label"
                >
                  Advance Amount:
                </label>
                <input
                  className="update-duty-form-control"
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
                className="update-duty-form-control"
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
