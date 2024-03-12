import React, { useState, useEffect } from "react";
import "./AddPayment.css";
import Sidebar from "../Sidebar/Sidebar";
import Alert from "../AddCustomer/Alert";

function AddPayment() {
  const [customerList, setCustomerList] = useState([]);

  const initialFormData = {
    customerId: "",
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
    totalkm: "",
    total_hours: "",
    title: "",
    title_Amount: 0,
    ratePerKm: 0,
    extra_Km: 0,
    extramkm_Amount: 0,
    extrakm_CGST: "",
    extrakm_SGST: "",
    ratePerHour: 0, // Initial value for rate per hour
    extra_Hours: 0,
    extrahours_Amount: 0,
    subtotal_Amount: "",
    toll:'',
    SGST: "",
    CGST: "",
    total_Amount: "",
    advance_Amount: "",
    remaining_Amount: "",
    payment_Method: "",
  };
  
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [successAlert, setSuccessAlert] = useState(null);
  const [errorAlert, setErrorAlert] = useState(null);


  const fetchTripDetails = async (customerId) => {
    try {
      const response = await fetch(`http://localhost:7000/api/add-trip/${customerId}`);

      if (response.ok) {
        const tripDetails = await response.json();
        console.log("Fetched trip details:", tripDetails);
        return tripDetails;
      } else {
        console.error("Failed to fetch trip details");
        return null;
      }
    } catch (error) {
      console.error("API request error:", error);
      return null;
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: parseFloat(value) });
    console.log("Selected Customer ID:", value); // Corrected to log the selected value

     // Convert value to float
  const parsedValue = parseFloat(value);

  // Update form data with parsed value
  setFormData((prevData) => ({
    ...prevData,
    [name]: parsedValue,
  }));

   // Calculate CGST and SGST
   if (name === "extramkm_Amount") {
    const cgst = (parsedValue * 2.5) / 100; // Calculate CGST
    const sgst = (parsedValue * 2.5) / 100; // Calculate SGST

    // Update form data with calculated values
    setFormData((prevData) => ({
      ...prevData,
      extrakm_CGST: cgst.toFixed(2), // Round to 2 decimal places
      extrakm_SGST: sgst.toFixed(2), // Round to 2 decimal places
    }));
  }

  

    //calculate the total km ,Extra km
    if (name === "closingkm" || name === "startingkm") {
      const closingKm = parseFloat(
        name === "closingkm" ? value : formData.closing_km
      );
      const startingKm = parseFloat(
        name === "startingkm" ? value : formData.starting_Km
      );
  
      if (!isNaN(closingKm) && !isNaN(startingKm)) {
        const totalKm = closingKm - startingKm;
        const extraKm = totalKm - 8; // Calculate extra_Km
        setFormData((prevData) => ({
          ...prevData,
          totalkm: totalKm.toString(),
          extra_Km: extraKm.toString(), // Update extra_Km field
        }));
      }
    }

    //calculate the time(Total hour)
    if (name === "startingtime" || name === "closingtime") {
      const startingTimeStr = formData.starting_Time;
      const closingTimeStr = formData.closing_Time;

      const timeFormatRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

      if (
        !timeFormatRegex.test(startingTimeStr) ||
        !timeFormatRegex.test(closingTimeStr)
      ) {
        console.log("Invalid time format");
        return;
      }

      const [startingHour, startingMinute] = startingTimeStr
        .split(":")
        .map(Number);
      const [closingHour, closingMinute] = closingTimeStr
        .split(":")
        .map(Number);

      // Calculate the time difference in minutes
      let timeDiffMinutes =
        (closingHour - startingHour) * 60 + (closingMinute - startingMinute);

      // Handle negative time difference (e.g., closing time is before starting time)
      if (timeDiffMinutes < 0) {
        console.log("Invalid time range");
        return;
      }

      // Convert minutes to hours and format with two decimal places
      const timeDiffHours = timeDiffMinutes / 60;
      const formattedTimeDiff = timeDiffHours.toFixed(2);

      setFormData((prevData) => ({
        ...prevData,
        totalhour: formattedTimeDiff,
      }));
    }

   
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
        const extraKm = totalKm > 80 ? totalKm - 80 : 0; // Calculate extra_Km based on flat rate

        // const ratePerKm = 13; // Example rate per km
    // Calculate extramkm_Amount
  const extramkm_Amount = formData.extra_Km * formData.ratePerKm;

        setFormData((prevData) => ({
          ...prevData,
          total_Km: totalKm.toString(), // Update the total_Km field
          extra_Km: extraKm.toString(), // Update extra_Km field
          extramkm_Amount: extramkm_Amount.toFixed(2), // Update extramkm_Amount field


          
        }));
      }
    } 
    if (name === "ratePerHour") {
      // Update the rate per hour
      setFormData((prevData) => ({
        ...prevData,
        [name]: parseFloat(value), // Convert input value to a number
      }));
    } 
    else if (name === "closing_Time" || name === "starting_Time") {
      // Calculate the total hours
      const closingTime = formData.closing_Time;
      const startingTime = formData.starting_Time;
    
      if (closingTime && startingTime) {
        const closingDateTime = new Date(`2000-01-01T${closingTime}`);
        const startingDateTime = new Date(`2000-01-01T${startingTime}`);
        const timeDiff = closingDateTime - startingDateTime;
    
        if (timeDiff > 0) {
          const totalHours = (timeDiff / 3600000).toFixed(2); // 3600000 milliseconds in an hour
          let extraHours = (totalHours - 8).toFixed(2); // Calculate extra hours
          // extraHours = Math.max(extraHours, 0); // Ensure extraHours is not negative

          // Retrieve ratePerHour from form data
        const ratePerHour = parseFloat(formData.ratePerHour);
        if (!isNaN(ratePerHour)) {
          const extraHoursAmount = extraHours * ratePerHour; // Calculate extra hours amount

          setFormData((prevData) => ({
            ...prevData,
            total_hours: totalHours,
            extra_Hours: extraHours,
            extraHoursAmount: extraHoursAmount.toFixed(2), // Update extra hours amount field
          }));
        } else {
          console.log("Invalid rate per hour");
        }
      } else {
        setFormData((prevData) => ({
          ...prevData,
          total_hours: "Invalid Time",
        }));
      }
    }
  } else {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
};

// Calculate extramkm_Amount whenever extraKm or ratePerKm changes
React.useEffect(() => {
  setFormData((prevData) => ({
    ...prevData,
    extramkm_Amount: prevData.extra_Km * prevData.ratePerKm,
  }));
}, [formData.extra_Km, formData.ratePerKm]);

 // Calculate extrahours_Amount whenever extraHours or ratePerHour changes
 React.useEffect(() => {
  setFormData((prevData) => ({
    ...prevData,
    extrahours_Amount: prevData.extra_Hours * prevData.ratePerHour,
  }));
}, [formData.extra_Hours, formData.ratePerHour]);

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
      },);
    }
  };

 
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form Data:", formData);

    // Ensure that customerId is present in formData
    if (!formData.customer_Name) {
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

      const response = await fetch(
        "http://localhost:7000/api/customer-payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );

      if (response.ok) {
        showAlert("Customer Payment added successfully!" , "success");
        setFormData(initialFormData);
      } else {
        console.error(
          "Failed to save data:",
          response.status,
          response.statusText
        );
        showAlert("Failed to add data. Please try again.", "danger");
      }
    } catch (error) {
      console.error("API request error:", error);
      showAlert("Failed to add data. Please try again.", "danger");
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

                    {successAlert && <Alert alert={successAlert} />}
      {errorAlert && <Alert alert={errorAlert} />}
            
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
                            Payment Date:
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
  <label htmlFor="customername" className="form-label">
    Customer Name:
  </label>
  <select
    className="form-control-add-trip-input"
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
    {customerList && customerList.length > 0 ? (
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
                            Pickup Location:
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
                            Dropoff Location:
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
                          <label htmlFor="starting_Time" className="form-label">
                            Starting Time:
                            <span className="required-asterisk">*</span>
                          </label>
                          <input
                            className="update-duty-form-control"
                            type="time"
                            id="starting_Time"
                            name="starting_Time"
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
                          <label for="closing_Time" className="form-label">
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
                            Total Km:
                            <span className="required-asterisk">*</span>
                          </label>
                          <input
                            type="text"
                            className="update-duty-form-control"
                            name="total_Km"
                            placeholder="Enter  Total Km"
                            onChange={handleChange}
                            value={formData.total_Km}
                          />
                        </div>
                      </div>
                      <div className="col-md">
                        <div className="form-group">
                          <label for="total_hours" className="form-label">
                            Total Hour:
                            <span className="required-asterisk">*</span>
                          </label>
                          <input
                            type="number"
                            className="update-duty-form-control"
                            name="total_hours"
                            placeholder="Enter  Total Hour"
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
                          <label for="extra_Km" className="form-label">
                            Extra Km:
                            <span className="required-asterisk">*</span>
                          </label>
                          <input
        type="number"
        className="update-duty-form-control"
        name="extra_Km"
        placeholder="Enter Extra KMs"
        value={formData.extra_Km}
        onChange={handleChange}
      />
                        </div>
                      </div>
                      <div className="col-md">
                        <div className="form-group">
                          <label for="ratePerKm" className="form-label">
                            (Rate Per KM)Extra Km Amount:
                            <span className="required-asterisk">*</span>
                          </label>
                          <input
        type="number"
        className="update-duty-form-control"
        name="ratePerKm"
        placeholder="Enter Rate Per Km"
        value={formData.ratePerKm}
        onChange={handleChange}
      />
       <div>
        {/* Display the calculated amount */}
        {/* The amount for extra kilometers is: ${formData.extra_Km * formData.ratePerKm} */}
      </div>
                        </div>
                      </div>
                    </div>

                    <div className="row grid-gap-5">
                      <div className="col-md">
                        <div className="form-group">
                          <label for="extrahours" className="form-label">
                            Extra Hour:
                            <span className="required-asterisk">*</span>
                          </label>
                          <input
                            type="number"
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
                          <label for="ratePerHour" className="form-label">
                            {" "}
                            (Rate Per Hour)Extra Hour Amount:
                            <span className="required-asterisk">*</span>
                          </label>
                          <input
                            type="number"
                            className="update-duty-form-control"
                            name="ratePerHour"
                            placeholder="Enter Rate Per Hours Amount"
                            value={formData.ratePerHour}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row grid-gap-5">
  {/* Column 1 */}
  <div className="col-md">
    <div className="form-group">
      <label htmlFor="extrakm_Amount" className="form-label">
        Extra KMs Amount:
        <span className="required-asterisk">*</span>
      </label>
      <input
        type="number"
        className="update-duty-form-control"
        name="extramkm_Amount"
        placeholder="Enter Extra KMs Amount"
        value={formData.extramkm_Amount}
        onChange={handleChange}
      />
    </div>
    <div className="form-group">
      <label htmlFor="extrakm_CGST" className="form-label">
        Extra Km CGST (2.5%):
        <span className="required-asterisk">*</span>
      </label>
      <input
    type="number"
    className="update-duty-form-control"
    name="extrakm_CGST"
    placeholder="Enter Extra Km CGST"
    onChange={handleChange} // Remove the value attribute
  />
    </div>
    <div className="form-group">
      <label htmlFor="extrakm_SGST" className="form-label">
        Extra Km SGST (2.5%):
        <span className="required-asterisk">*</span>
      </label>
      <input
    type="number"
    className="update-duty-form-control"
    name="extrakm_SGST"
    placeholder="Enter Extra Km SGST"
    onChange={handleChange} // Remove the value attribute
  />
    </div>
  </div>

  {/* Column 2 */}
  <div className="col-md">
    <div className="form-group">
      <label htmlFor="extrahours_Amount" className="form-label">
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
      />
    </div>
    <div className="form-group">
      <label htmlFor="extrahours_CGST" className="form-label">
        Extra Hour CGST (2.5%):
        <span className="required-asterisk">*</span>
      </label>
      <input
        type="number"
        className="update-duty-form-control"
        name="extrahours_CGST"
        placeholder="Enter Extra Hour CGST"
        value={formData.extrahours_CGST}
        onChange={handleChange}
      />
    </div>
    <div className="form-group">
      <label htmlFor="extrahours_SGST" className="form-label">
        Extra Hour SGST (2.5%):
        <span className="required-asterisk">*</span>
      </label>
      <input
        type="number"
        className="update-duty-form-control"
        name="extrahours_SGST"
        placeholder="Enter Extra Hour SGST"
        value={formData.extrahours_SGST}
        onChange={handleChange}
      />
    </div>
  </div>
</div>

                    <div className="row grid-gap-5">
  {/* First field - Toll Parking */}
  <div className="col-md">
    <div className="form-group">
      <label htmlFor="toll" className="form-label">
        Toll Parking:
        <span className="required-asterisk">*</span>
      </label>
      <input
        type="number"
        className="update-duty-form-control"
        name="toll"
        placeholder="Enter Toll Parking"
        value={formData.toll}
        onChange={handleChange}
      />
    </div>
  </div>
  
  {/* Second field - CGST */}
  <div className="col-md mr-3">
    <div className="form-group">
      <label htmlFor="cgst2.5%" className="form-label">
        CGST 2.5%:
        <span className="required-asterisk">*</span>
      </label>
      <input
        type="number"
        className="add-payment-form-control"
        name="CGST"
        placeholder="Enter CGST Amount"
        value={formData.CGST}
        onChange={handleChange}
      />
    </div>
  </div>
  
  {/* Third field - SGST */}
  <div className="col-md">
    <div className="form-group">
      <label htmlFor="sgst2.5%" className="form-label">
        SGST 2.5%:
        <span className="required-asterisk">*</span>
      </label>
      <input
        type="number"
        className="add-payment-form-control"
        name="SGST"
        placeholder="Enter SGST Amount"
        value={formData.SGST}
        onChange={handleChange}
      />
    </div>
  </div>
</div>


<div className="row grid-gap5">
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
</div>
                    <div className="row grid-gap-5">
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
                    </div>

                    <div className="row grid-gap-5">
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
                      <div className="col-md">
                        
                      </div>
                    </div>
                    <div className="row grid-gap-5">
 

 
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
