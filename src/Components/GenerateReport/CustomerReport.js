import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import * as XLSX from "xlsx";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";

function CustomerReport() {
  const [customers, setCustomers] = useState([]);
  const [filterByAmount, setFilterByAmount] = useState("");
  const [filterBySubtotal, setFilterBySubtotal] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [vehicleTypeCounts, setVehicleTypeCounts] = useState({});

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    calculateVehicleTypeCounts();
  }, [customers]);

  const handleFieldChange = (field, value) => {
   if (field === "subtotal_Amount") {
      setFilterBySubtotal(value);
    } else if (field === "Amount") {
      setFilterByAmount(value);
    } 
    else if (field === "total_Amount") {
      setFilterByAmount(value);
    }
  };
  

  const fetchCustomers = () => {
    fetch(`http://localhost:7000/api/customer-payment`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCustomers(data);
      })
      .catch((error) => console.error("Error fetching customers:", error));
  };

  const calculateVehicleTypeCounts = () => {
    const counts = customers.reduce((acc, customer) => {
      acc[customer.vehicle_Type] = (acc[customer.vehicle_Type] || 0) + 1;
      return acc;
    }, {});
    setVehicleTypeCounts(counts);
  };

  const downloadExcel = () => {
    if (customers.length === 0) {
      console.error("No customers selected");
      return;
    }

    const customerData = customers.map((customer, index) => ({
      "Sr. No.": index + 1,
      Date: customer.Date,
      GSTIN: customer.GST_No,
      "Customer Name": customer.customer_Name,
      // "Company Name": customer.company_Name,
      "Details": `${customer.reporting_Address}, From: ${customer.from}, To: ${customer.to}`,
      // "Vehicle Number": customer.vehicle_Number,
      // "Vehicle Type": customer.vehicle_Type,
      // Quantity: customer.quantity,
     
      // "Closing Km": customer.closing_km,
      // "Closing Time": customer.closing_Time,
      // "Starting Km": customer.starting_Km,
      // "Starting Time": customer.starting_Time,
      // "Total Km": customer.total_Km,
      // "Total Hours": customer.total_hours,
      // Title: customer.title,
      // "Title Amount": customer.title_Amount,
      // "Extra Km": customer.extra_Km,
      // "Extra Km Amount": customer.extramkm_Amount,
      // "Extra Hours": customer.extra_Hours,
      // "Extra Hours Amount": customer.extrahours_Amount,
      // "Subtotal Amount": customer.subtotal_Amount,
      CGST: customer.CGST,
      SGST: customer.SGST,
      TotalGST: customer.CGST + customer.SGST,
      "Total Amount": customer.total_Amount,
      // "Advance Amount": customer.advance_Amount,
      // "Remaning  Amount": customer.remaining_Amount,
      "Payment Method": customer.payment_Method,
      // CustomerId: customer.customerId,
    }));

    const worksheet = XLSX.utils.json_to_sheet(customerData);

    const columnWidths = [
      { wch: 8 }, // Sr. No.
      { wch: 10}, // Customer Name
      { wch: 15 }, // GSTIN
      // { wch: 15 }, // Mobile No.
      // { wch: 25 }, // Company Name
      { wch: 15 }, // Amount
      { wch: 43 }, // TDS
      { wch: 15 }, // Total Amt
      { wch: 15 }, // Advance Amount
      { wch: 15 }, // Remaining Amount
      { wch: 15 }, // Payment
      { wch: 20 }, // Payment Method
      { wch: 15 }, // Date
    ];

    worksheet["!cols"] = columnWidths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Customer Details");
    XLSX.writeFile(workbook, "customer_details.xlsx");
  };

  const filteredCustomers = customers.filter((customer) => {
    const amount = customer.total_Amount
      ? customer.total_Amount.toString()
      : "";
    const date = customer.date ? customer.date.toString() : "";
    const subtotal = customer.subtotal_Amount
      ? customer.subtotal_Amount.toString()
      : "";
    const payment = customer.payment ? customer.payment.toString() : "";
    return (
      amount.includes(filterByAmount) &&
      (subtotal === filterBySubtotal || !filterBySubtotal)
    );
  });

  const sortAsc = (field) => {
    return filteredCustomers.sort((a, b) => (a[field] > b[field] ? 1 : -1));
  };

  const sortDesc = (field) => {
    return filteredCustomers.sort((a, b) => (a[field] > b[field] ? -1 : 1));
  };

  const toggleSort = (field) => {
    if (field === "Amount") {
      setCustomers(sortAsc("total_Amount"));
    } else if (field === "Date") {
      setCustomers(sortAsc("date"));
    } else if (field === "Subtotal") {
      setCustomers(sortAsc("subtotal_Amount"));
    }
  };

  const IconSortAmountDown = () => (
    <FaSortAmountDown onClick={() => toggleSort("Amount")} />
  );

  const IconSortAmountUp = () => (
    <FaSortAmountUp onClick={() => toggleSort("Amount")} />
  );

  const IconSortDateDown = () => (
    <FaSortAmountDown onClick={() => toggleSort("Date")} />
  );

  const IconSortDateUp = () => (
    <FaSortAmountUp onClick={() => toggleSort("Date")} />
  );

  const IconSortSubtotalDown = () => (
    <FaSortAmountDown onClick={() => toggleSort("Subtotal")} />
  );

  const IconSortSubtotalUp = () => (
    <FaSortAmountUp onClick={() => toggleSort("Subtotal")} />
  );

  return (
    <>
      <Sidebar />
      <div className="container-vendor-invoice">
        <h2
          style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "8px" }}
        >
          Customer Report
        </h2>
        <div className="filters">
          <div className="filter-input">
            <input
              type="text"
              placeholder="Filter by Total Amount"
              value={filterByAmount}
              onChange={(e) =>
                handleFieldChange("total_Amount", e.target.value)
              }
            />
            <i className="fas fa-filter"></i>
          </div>
         
          <div className="filter-input">
            <input
              type="text"
              placeholder="Filter by Subtotal Amount"
              value={filterBySubtotal}
              onChange={(e) =>
                handleFieldChange("subtotal_Amount", e.target.value)
              }
            />
            <i className="fas fa-filter"></i>
          </div>

          <select
            className="trip-details-input"
            name="vehicle"
            id="vehicle"
            value={selectedVehicle}
            onChange={(e) => handleFieldChange("vehicle", e.target.value)}
          >
            <option value="">Vehicle</option>
            {Object.keys(vehicleTypeCounts).map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
          <button onClick={downloadExcel} className="btn btn-primary mt-2 ml-2">
            Export to Excel
          </button>
        </div>{" "}
        {/* Close filters div */}
        {/* Display vehicle type counts */}
        <div className="vehicle-type-counts">
          {Object.keys(vehicleTypeCounts).map((type, index) => (
            <div key={index}>
              {type}: {vehicleTypeCounts[type]}
            </div>
          ))}
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>
                Date{" "}
                <span>
                  {IconSortDateDown()}
                  {IconSortDateUp()}
                </span>
              </th>
              <th>GSTIN</th>
              <th>Customer Name</th>
              <th>Company Name</th>
              <th>Vehicle Type</th>
              <th>
                Subtotal Amt{" "}
                <span>
                  {IconSortSubtotalDown()}
                  {IconSortSubtotalUp()}
                </span>
              </th>
              <th>CGST</th>
              <th>SGST</th>
              <th>Total GST</th>
              {/* <th>Advance Amt</th>
              <th>Remaining Amt</th>*/}
              <th>Debits(Drs)</th>
              <th>Credits(Crs)</th>
              <th>
                Total Amt{" "}
                <span>
                  {IconSortAmountDown()}
                  {IconSortAmountUp()}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer, index) => (
              <tr key={customer._id}>
                <td>{index + 1}</td>
                <td>{customer.Date}</td>
                <td>{customer.GST_No}</td>
                <td>{customer.customer_Name}</td>
                <td>{customer.company_Name}</td>
                <td>{customer.vehicle_Type}</td>
                <td>{customer.subtotal_Amount}</td>
                <td>{customer.CGST}</td>
                <td>{customer.SGST}</td>
                <td>{parseFloat(customer.CGST) + parseFloat(customer.SGST)}</td>
                {/* <td>{customer.advance_Amount}</td>
                <td>{customer.remaining_Amount}</td>  */}
                <td></td>
                <td></td>
                <td>{customer.total_Amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>{" "}
    </>
  );
}
export default CustomerReport;
