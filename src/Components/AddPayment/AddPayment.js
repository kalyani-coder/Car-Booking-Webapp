import React, { useState, useEffect } from "react";
import "./AddPayment.css";
import Sidebar from "../Sidebar/Sidebar";

function AddPayment() {
  const [customerList, setCustomerList] = useState([]);


  useEffect(() => {
    const fetchCustomerNames = async () => {
      try {
        const response = await fetch("http://localhost:7000/api/add-trip");

        if (response.ok) {
          const data = await response.json();
          // Ensure data is an array before setting it in the state
          if (Array.isArray(data)) {
            // Log customer IDs
            data.forEach(customer => {

            });

            // Set the customer list in the state
            setCustomerList(data);
          } else {
            console.error("Invalid data format: expected an array");
          }
        } else {
          console.error("Failed to fetch customer names");
        }
      } catch (error) {
        console.error("API request error:", error);
      }
    };

    fetchCustomerNames(); // Call the fetch function when the component mounts

  }, []); // The empty dependency array ensures that this effect runs only once when the component mounts




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
    total_hours: "",
    title: "",
    title_Amount: 0,
    extra_Km: "",
    extramkm_Amount: 0,
    extra_Hours: "",
    extrahours_Amount: 0,
    subtotal_Amount: 0,
    SGST: 0,
    CGST: 0,
    total_Amount: 0,
    advance_Amount: 0,
    remaining_Amount: 0,
    payment_Method: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log("Selected Customer ID:", value); // Corrected to log the selected value

    if (name === "advance_Amount") {
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

    if (name === "closing_km" || name === "starting_Km") {
      // Parse values as floats
      const closingKm = parseFloat(
        name === "closing_km" ? value : formData.closing_km
      );
      const startingKm = parseFloat(
        name === "starting_Km" ? value : formData.starting_Km
      );

      // Calculate the total kilometers
      if (!isNaN(closingKm) && !isNaN(startingKm)) {
        const totalKm = closingKm - startingKm;
        setFormData((prevData) => ({
          ...prevData,
          total_Km: totalKm.toString(), // Update the total_Km field
        }));
      }
    } else if (name === "closing_Time" || name === "starting_Time") {
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
            total_hours: "Invalid Time",
          }));
        }
      }
    }
  };


  const calculateSubTotal = () => {
    const { title_Amount, extramkm_Amount, extrahours_Amount } = formData;

    const subtotal =
      parseFloat(title_Amount) +
      parseFloat(extramkm_Amount) +
      parseFloat(extrahours_Amount);

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
    console.log("Form Data:", formData);

    // Ensure that customerId is present in formData
    if (!formData.customername) {
      setError("Please select a customer.");
      return;
    }

    // Validate other fields
    for (const key in formData) {
      if (
        key !== "customername" &&
        (formData[key] === "" ||
          (typeof formData[key] === "number" && isNaN(formData[key])))
      ) {
        setError("All fields are required and must be valid numbers.");
        return;
      }
    }

    setError("");

    try {
      // Add customerId to formData
      const dataToSend = { ...formData, customerId: formData.customer_Name };

      const response = await fetch("http://localhost:7000/api/customer-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        window.alert("Data Added");
        setFormData(initialFormData);
      } else {
        console.error("Failed to save data:", response.status, response.statusText);
        alert("Failed to save data. Please try again.");
      }
    } catch (error) {
      console.error("API request error:", error);
      alert("Failed to save data. Please try again.");
    }
  };


  return (
    <>
      <Sidebar />
      <div className="container-fluid">
        <div className="form-body">
          <div className="card-1">
            <div className="row justify-content-center">
              <div className="col-md-10">
                <div className="card-body mt-5">
                  <form>
                    <h2
                      style={{
                        fontSize: "2rem",
                        fontWeight: "bold",
                        marginBottom: "8px",
                      }}
                    >
                      Add Customer Payment
                    </h2>

                    <div className="row grid-gap-5">
                      <div className="col-md">
                        <div className="form-group">
                          <label for="companyname" class="form-label">
                            Company Name:
                            <span className="required-asterisk">*</span>
                          </label>
                          <input
                            type="text"
                            className="update-duty-form-control"
                            name="company_Name"
                            placeholder="Enter Company name"
                            value={formData.company_Name}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md">
                        <div className="form-group">
                          <label for="gstno" class="form-label">
                            GST No:
                            <span className="required-asterisk">*</span>
                          </label>
                          <input
                            type="text"
                            className="update-duty-form-control"
                            name="GST_No"
                            placeholder="Enter GST No"
                            value={formData.GST_No}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row grid-gap-5">
                      <div className="col-md">
                        <div className="form-group">
                          <label for="reportingaddress" className="form-label">
                            Reporting Address:
                            <span className="required-asterisk">*</span>
                          </label>
                          <input
                            type="text"
                            className="update-duty-form-control"
                            name="reporting_Address"
                            placeholder="Enter Reporting Address"
                            value={formData.reporting_Address}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md">
                        <div className="form-group">
                          <label for="date" className="form-label">
                            Date:
                            <span className="required-asterisk">*</span>
                          </label>
                          <input
                            type="Date"
                            className="update-duty-form-control"
                            name="Date"
                            placeholder="Date"
                            value={formData.Date}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row grid-gap-5">
                      <div className="col-md">
                        <label for="vehiclenumber" className="form-label">
                          Customer Name:
                          <span className="required-asterisk">*</span>
                        </label>
                        <select
                          className="update-duty-form-control"
                          name="customer_Name"
                          value={formData.customer_Name}
                          onChange={handleChange}
                        >
                          <option value="">Select Customer</option>
                          {customerList.map((customer) => (
                            <option key={customer._id} value={customer.customerId}>
                              {customer.customername}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md">
                        <div className="form-group">
                          <label for="vehiclenumber" className="form-label">
                            Vehicle Number:
                            <span className="required-asterisk">*</span>
                          </label>
                          <input
                            type="text"
                            className="update-duty-form-control"
                            name="vehicle_Number"
                            placeholder="Enter Vehicle Number"
                            value={formData.vehicle_Number}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row grid-gap-5">
                      <div className="col-md">
                        <div className="form-group">
                          <label for="typeofvehicle" className="form-label">
                            Type Of Vehicle:
                            <span className="required-asterisk">*</span>
                          </label>
                          {/* <input type="text" className="form-control" placeholder="Vehicle" /> */}
                          <select
                            className="update-duty-form-control mb-2"
                            name="vehicle_Type"
                            id="vehicle_Type"
                            onChange={handleChange}
                            value={formData.vehicle_Type}
                          >
                            <option value="">Vehicle</option>
                            <option value="Sedan Car">Sedan Car</option>
                            <option value="Mini Car">Mini Car</option>
                            <option value="SUV Car">SUV Car</option>
                            <option value="Ac Bus 13-Seater">
                              AC Bus 13-Seater
                            </option>
                            <option value="AC Bus 17-seater">
                              AC Bus 17-seater
                            </option>
                            <option value="AC Bus 20-seater">
                              AC Bus 20-seater
                            </option>
                            <option value="AC Bus 32-seater">
                              AC Bus 32-seater
                            </option>
                            <option value="AC Bus 35-seater">
                              AC Bus 35-seater
                            </option>
                            <option value="AC Bus 40-seater">
                              AC Bus 40-seater
                            </option>
                            <option value="AC Bus 45-seater">
                              AC Bus 45-seater
                            </option>
                            <option value="Non-AC Bus 17-Seater">
                              Non-AC Bus 17 Seater
                            </option>
                            <option value="Non-AC Bus 20-Seater">
                              Non-AC Bus 20 Seater
                            </option>
                            <option value="Non-AC Bus 32-Seater">
                              Non-AC Bus 32 Seater
                            </option>
                            <option value="Non-AC Bus 40-Seater">
                              Non-AC Bus 40 Seater
                            </option>
                            <option value="Non-AC Bus 45-Seater">
                              Non-AC Bus 45 Seater
                            </option>
                            <option value="Non-AC Bus 49-Seater">
                              Non-AC Bus 49 Seater
                            </option>
                          </select>
                        </div>
                      </div>

                      <div className="col-md">
                        <div className="form-group">
                          <label for="quantity" className="form-label">
                            Quantity:
                            <span className="required-asterisk">*</span>
                          </label>
                          <input
                            type="number"
                            className="update-duty-form-control"
                            name="quantity"
                            placeholder="Add Quantity"
                            onChange={handleChange}
                            value={formData.quantity}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row grid-gap-5">
                      <div className="col-md">
                        <div className="form-group">
                          <label for="from" className="form-label" l>
                            From:
                            <span className="required-asterisk">*</span>
                          </label>
                          <input
                            type="text"
                            className="update-duty-form-control"
                            name="from"
                            placeholder="From"
                            value={formData.from}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md">
                        <div className="form-group">
                          <label for="to" className="form-label">
                            To:
                            <span className="required-asterisk">*</span>
                          </label>
                          <input
                            type="text"
                            className="update-duty-form-control"
                            name="to"
                            placeholder="To"
                            value={formData.to}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row grid-gap-5">
                      <div className="col-md">
                        <div className="form-group">
                          <label for="startingkms" className="form-label">
                            Starting Kms:
                            <span className="required-asterisk">*</span>
                          </label>
                          <input
                            type="text"
                            className="update-duty-form-control"
                            name="starting_Km"
                            placeholder="Enter  Starting Kms"
                            onChange={handleChange}
                            value={formData.starting_Km}
                          />
                        </div>
                      </div>
                      <div className="col-md">
                        <div className="form-group">
                          <label for="startingtime" className="form-label">
                            Starting Time:
                            <span className="required-asterisk">*</span>
                          </label>
                          <input
                            type="time"
                            className="update-duty-form-control"
                            name="starting_Time"
                            placeholder="Enter Starting Time"
                            onChange={handleChange}
                            value={formData.starting_Time}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row grid-gap-5">
                      <div className="col-md">
                        <div className="form-group">
                          <label for="closingkms" className="form-label">
                            Closing Kms:
                            <span className="required-asterisk">*</span>
                          </label>
                          <input
                            type="text"
                            className="update-duty-form-control"
                            id="closing_km"
                            name="closing_km"
                            placeholder="Enter  Closing Kms"
                            onChange={handleChange}
                            value={formData.closing_km}
                          />
                        </div>
                      </div>
                      <div className="col-md">
                        <div className="form-group">
                          <label for="closingtime" className="form-label">
                            Closing Time:
                            <span className="required-asterisk">*</span>
                          </label>
                          <input
                            type="Time"
                            className="update-duty-form-control"
                            id="closing_Time"
                            name="closing_Time"
                            placeholder="Enter  Closing Time"
                            onChange={handleChange}
                            value={formData.closing_Time}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row grid-gap-5">
                      <div className="col-md">
                        <div className="form-group">
                          <label for="totalkms" className="form-label">
                            Total Kms:
                            <span className="required-asterisk">*</span>
                          </label>
                          <input
                            type="text"
                            className="update-duty-form-control"
                            name="total_Km"
                            placeholder="Enter  Total Kms"
                            onChange={handleChange}
                            value={formData.total_Km}
                          />
                        </div>
                      </div>
                      <div className="col-md">
                        <div className="form-group">
                          <label for="totalhours" className="form-label">
                            Total Hours:
                            <span className="required-asterisk">*</span>
                          </label>
                          <input
                            type="Text"
                            className="update-duty-form-control"
                            name="total_hours"
                            placeholder="Enter  Total Hours"
                            onChange={handleChange}
                            value={formData.total_hours}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row grid-gap-5">
                      <div className="col-md">
                        <div className="form-group">
                          <label for="dutytype" className="form-label">
                            Duty Type:
                            <span className="required-asterisk">*</span>
                          </label>
                          <select
                            className="update-duty-form-control"
                            name="title"
                            id="duty_type"
                            value={formData.title}
                            onChange={handleChange}
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
                              Pune-Mumbai Pickup Dropoff
                            </option>
                          </select>
                        </div>
                      </div>

                      <div className="col-md">
                        <div className="form-group">
                          <label for="titleamount" className="form-label">
                            Title Amount:
                            <span className="required-asterisk">*</span>
                          </label>
                          <input
                            type="number"
                            className="update-duty-form-control"
                            name="title_Amount"
                            placeholder="Enter Title Amount"
                            value={formData.title_Amount}
                            onChange={handleChange}
                            onBlur={handleSubtotalChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row grid-gap-5">
                      <div className="col-md">
                        <div className="form-group">
                          <label for="extrakms" className="form-label">
                            Extra Kms:
                            <span className="required-asterisk">*</span>
                          </label>
                          <input
                            type="text"
                            className="update-duty-form-control"
                            id="extra_Km"
                            name="extra_Km"
                            placeholder="Enter  Extra Kms"
                            onChange={handleChange}
                            value={formData.extra_Km}
                          />
                        </div>
                      </div>
                      <div className="col-md">
                        <div className="form-group">
                          <label for="extrakmsamount" className="form-label">
                            Extra Kms Amount:
                            <span className="required-asterisk">*</span>
                          </label>
                          <input
                            type="number"
                            className="update-duty-form-control"
                            name="extramkm_Amount"
                            placeholder="Enter Extra Kms Amount"
                            value={formData.extramkm_Amount}
                            onChange={handleChange}
                            onBlur={handleSubtotalChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row grid-gap-5">
                      <div className="col-md">
                        <div className="form-group">
                          <label for="extrahours" className="form-label">
                            Extra Hours:
                            <span className="required-asterisk">*</span>
                          </label>
                          <input
                            type="text"
                            className="update-duty-form-control"
                            id="extra_Hours"
                            name="extra_Hours"
                            placeholder="Enter  Extra Hours"
                            onChange={handleChange}
                            value={formData.extra_Hours}
                          />
                        </div>
                      </div>
                      <div className="col-md">
                        <div className="form-group">
                          <label for="extrahoursamount" className="form-label">
                            {" "}
                            Extra Hours Amount:
                            <span className="required-asterisk">*</span>
                          </label>
                          <input
                            type="number"
                            className="update-duty-form-control"
                            name="extrahours_Amount"
                            placeholder="Enter Extra Hours Amount"
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
                        <label for="subtotal" className="form-label">
                          SubTotal:
                          <span className="required-asterisk">*</span>
                        </label>
                        <input
                          type="number"
                          className="update-duty-form-control"
                          name="subtotal_Amount"
                          placeholder="SubTotal Amount"
                          value={formData.subtotal_Amount}
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="row grid-gap-5">
                      <div className="col-md">
                        <div className="form-group">
                          <label for="sgst2.5%" className="form-label">
                            SGST 2.5%:
                            <span className="required-asterisk">*</span>
                          </label>
                          <input
                            type="number"
                            className="update-duty-form-control"
                            name="SGST"
                            placeholder="Enter  SGST Amount"
                            value={formData.SGST}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md">
                        <div className="form-group">
                          <label for="cgst2.5%" className="form-label">
                            CGST 2.5%:
                            <span className="required-asterisk">*</span>
                          </label>
                          <input
                            type="number"
                            className="update-duty-form-control"
                            name="CGST"
                            placeholder="Enter CGST  Amount"
                            value={formData.CGST}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row grid-gap-5">
                      <div className="col-md">
                        <div className="form-group">
                          <label for="totalamount" className="form-label">
                            Total Amount:
                            <span className="required-asterisk">*</span>
                          </label>
                          <input
                            type="number"
                            className="update-duty-form-control"
                            name="total_Amount"
                            placeholder="Total Amount"
                            value={formData.total_Amount}
                            onChange={handleChange}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-md">
                        <div className="form-group">
                          <label for="advanceamount" className="form-label">
                            Advance Amount:
                            <span className="required-asterisk">*</span>
                          </label>
                          <input
                            type="number"
                            className="update-duty-form-control"
                            name="advance_Amount"
                            placeholder="Enter Advance Amount"
                            value={formData.advance_Amount}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row grid-gap-5">
                      <div className="col-md">
                        <div className="form-group">
                          <label for="remainingamount" className="form-label">
                            Remaining Amount:
                            <span className="required-asterisk">*</span>
                          </label>
                          <input
                            type="number"
                            className="update-duty-form-control"
                            name="remaining_Amount"
                            placeholder="Enter Remaining Amount"
                            value={formData.remaining_Amount}
                            onChange={handleChange}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-md">
                        <div className="form-group">
                          <label for="paymentmethod" className="form-label">
                            Payment Method:
                            <span className="required-asterisk">*</span>
                          </label>
                          <select
                            className="update-duty-form-control"
                            name="payment_Method"
                            value={formData.payment_Method}
                            onChange={handleChange}
                          >
                            <option value="">Payment Method</option>
                            <option value="Cash">Cash</option>
                            <option value="Cheque ">Cheque </option>
                            <option value="UPI / Wallet Payment">
                              UPI /Wallet Payment
                            </option>
                            <option value="Bank Transfer(NEFT)">
                              Bank Transfer(NEFT )
                            </option>

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
                    <button
                      id="btn2"
                      className="add-payment-submit"
                      onClick={handleSubmit}
                    >
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
