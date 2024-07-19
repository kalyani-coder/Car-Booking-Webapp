import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import * as XLSX from "xlsx";
import "./TripDetailsReport.css";
function MonthlyCustomerReport() {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [reportType, setReportType] = useState("all");

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [customers, reportType]);

  const fetchCustomers = () => {
    fetch(`http://localhost:8787/api/customer-payment`)
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

  const applyFilter = () => {
    let filteredData = [...customers];
    if (reportType === "outstanding") {
      filteredData = filteredData.map((customer) => ({
        Date: customer.Date,
        Customer_Name: customer.customer_Name,
        Total_Amount: customer.total_Amount,
        Payment_Method: customer.payment_Method,
      }));
    } else if (reportType === "gstDetails") {
      filteredData = filteredData.map((customer, index) => ({
        "Sr. No.": index + 1,
        Date: customer.Date,
        Customer_Name: customer.customer_Name,
        CGST: customer.CGST,
        SGST: customer.SGST,
        Total_GST: parseFloat(customer.CGST) + parseFloat(customer.SGST),
        Total_Amount: customer.total_Amount,
      }));
    } else if (reportType === "bookingStatistics") {
      filteredData = filteredData.map((customer) => ({
        Company_Name: customer.company_Name,
        GST_No: customer.GST_No,
        Reporting_Address: customer.reporting_Address,
        Date: customer.Date,
        Customer_Name: customer.customer_Name,
        Vehicle_Number: customer.vehicle_Number,
        Vehicle_Type: customer.vehicle_Type,
        Quantity: customer.quantity,
      }));
    }
    setFilteredCustomers(filteredData);
  };

  const handleFilterChange = (event) => {
    setReportType(event.target.value);
  };

  const downloadExcel = () => {
    if (filteredCustomers.length === 0) {
      console.error("No customers selected");
      return;
    }

    const customerData = filteredCustomers.map((customer, index) => ({
      ...customer,
      "Sr. No.": index + 1,
    }));

    const worksheet = XLSX.utils.json_to_sheet(customerData);

    // Set column widths
    const columnWidths = [
      { wch: 10 }, // Date
      { wch: 20 }, // Customer Name
      // Add more widths as needed
    ];

    worksheet["!cols"] = columnWidths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Customer Details");
    XLSX.writeFile(workbook, "customer_details.xlsx");
  };

  // Count occurrences of each vehicle type
  const countVehicleTypes = () => {
    const counts = {};
    filteredCustomers.forEach((customer) => {
      counts[customer.Vehicle_Type] = (counts[customer.Vehicle_Type] || 0) + 1;
    });
    return counts;
  };

  return (
    <>
      <div className="container-customer-invoice">
        <h2 className="View-Corporate-Customer-Rate font-bold p-4 my-4">
          Monthly Customer Report
        </h2>
        <div className="flex items-center div-contains-labl-dropdown-and-the-export-to-excel-button-monthly-customer-report">
          <label htmlFor="reportType" style={{ margin: "10px" }}>
            Select Report Type:
          </label>
          <select
            id="reportType"
            value={reportType}
            onChange={handleFilterChange}
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          >
            <option value="all">All</option>
            <option value="outstanding">Outstanding Payments Report</option>
            <option value="gstDetails">GST Details Report</option>
            <option value="bookingStatistics">Booking Statistics Report</option>
          </select>
          <i className="fas fa-filter ml-3"></i>
          <button
            className="rate-btn-submit ml-3 m-auto flex"
            onClick={downloadExcel}
            style={{ marginBottom: "20px" }}
          >
            Export to Excel
          </button>
        </div>
        <div className="table-for-monthly-customer-report-page">
          <table className="table table-for-monthly-customer-report-page-width-set-cc">
            <thead>
              {reportType === "all" && (
                <tr>
                  <th>Sr.No.</th>
                  <th className="w-32">Date</th>
                  <th>GST No.</th>
                  <th>Invoice No.</th>
                  <th>Customer Name</th>
                  <th>Vehicle Type</th>
                  <th>CGST</th>
                  <th>SGST</th>
                  <th>Total Amount</th>
                  <th>Count</th> {/* Add count column */}
                </tr>
              )}
              {reportType === "outstanding" && (
                <tr>
                  <th>Sr.No.</th>
                  <th>Date</th>
                  <th>GST No.</th>
                  <th>Invoice No.</th>
                  <th>Customer Name</th>
                  <th>Receivables Amount</th>
                </tr>
              )}
              {reportType === "gstDetails" && (
                <tr>
                  <th>Sr.No.</th>
                  <th>Date</th>
                  <th>GST No.</th>
                  <th>Invoice No.</th>
                  <th>Customer Name</th>
                  <th>CGST</th>
                  <th>SGST</th>
                  <th>Total GST</th>
                  <th>Total Amount</th>
                </tr>
              )}
              {reportType === "bookingStatistics" && (
                <tr>
                  <th>Sr.No.</th>
                  <th>Date</th>
                  <th>GST No.</th>
                  <th>Invoice No.</th>
                  <th>Company Name</th>
                  <th>Customer Name</th>
                  <th>Vehicle Type</th>
                  <th>Quantity</th>
                </tr>
              )}
            </thead>
            <tbody>
              {filteredCustomers.map((customer, index) => (
                <tr key={index}>
                  <td>{index + 1}</td> {/* Add Sr. No. column */}
                  {reportType === "all" && (
                    <>
                      <td>{customer.Date}</td>
                      <td>{customer.GST_No}</td>
                      <td></td>
                      <td>{customer.Customer_Name}</td>
                      <td>{customer.vehicle_Type}</td>
                      <td>{customer.CGST}</td>
                      <td>{customer.SGST}</td>
                      <td>{customer.Total_Amount}</td>
                      <td>
                        {/* Display count of vehicle type */}
                        <span>
                          {countVehicleTypes()[customer.vehicle_Type]}
                        </span>
                      </td>
                    </>
                  )}
                  {reportType === "outstanding" && (
                    <>
                      <td>{customer.Date}</td>
                      <td>{customer.GST_No}</td>
                      <td></td>
                      <td>{customer.Customer_Name}</td>
                      <td>{customer.Total_Amount}</td>
                    </>
                  )}
                  {reportType === "gstDetails" && (
                    <>
                      <td>{customer.Date}</td>
                      <td>{customer.GST_No}</td>
                      <td></td>
                      <td>{customer.Customer_Name}</td>
                      <td>{customer.CGST}</td>
                      <td>{customer.SGST}</td>
                      <td>{customer.Total_GST}</td>
                      <td>{customer.Total_Amount}</td>
                    </>
                  )}
                  {reportType === "bookingStatistics" && (
                    <>
                      <td>{customer.Date}</td>
                      <td>{customer.GST_No}</td>
                      <td></td>
                      <td>{customer.Company_Name}</td>
                      <td>{customer.customer_Name}</td>
                      <td>{customer.Vehicle_Type}</td>
                      <td>{customer.Quantity}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default MonthlyCustomerReport;
