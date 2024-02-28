import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Sidebar from "../Sidebar/Sidebar";
import * as XLSX from "xlsx";


function MonthlyCustomerReport() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [invoicesForSelectedDate, setInvoicesForSelectedDate] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [filterAmount, setFilterAmount] = useState(""); // Filter by amount
  const [filterCustomer, setFilterCustomer] = useState(""); // Filter by customer

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://localhost:7000/api/customer-payment");
        if (response.ok) {
          const data = await response.json();
          setCustomerList(data);
        } else {
          console.error("Failed to fetch customers");
        }
      } catch (error) {
        console.error("API request error:", error);
      }
    };

    fetchCustomers();
  }, []);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const formattedDate = selectedDate.toISOString().split("T")[0];
        const response = await fetch(`http://localhost:7000/api/customer-payment/by-date/${formattedDate}`);
        
        if (response.ok) {
          const data = await response.json();
          setInvoicesForSelectedDate(data);
        } else {
          console.error("Failed to fetch invoices");
        }
      } catch (error) {
        console.error("API request error:", error);
      }
    };

    fetchInvoices();
  }, [selectedDate]);

  // Function to filter invoices based on the selected customer
  const filterInvoicesByCustomer = (invoices) => {
    if (!filterCustomer) return invoices;
    return invoices.filter((invoice) => invoice.CustomerName === filterCustomer);
  };

  // Function to filter invoices based on the selected amount range
  const filterInvoicesByAmount = (invoices) => {
    if (!filterAmount) return invoices;
    switch (filterAmount) {
      case "lessThan1000":
        return invoices.filter((invoice) => invoice.totalAmount < 1000);
      case "1000to5000":
        return invoices.filter((invoice) => invoice.totalAmount >= 1000 && invoice.totalAmount <= 5000);
      case "moreThan5000":
        return invoices.filter((invoice) => invoice.totalAmount > 5000);
      default:
        return invoices;
    }
  };

// Function to handle generating the report in Excel format
const handleGenerate = () => {
  const ws = XLSX.utils.json_to_sheet(invoicesForSelectedDate);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Monthly Customer Report");

  // Customize styles
  const headerCellStyle = {
    font: { bold: true },
    alignment: { horizontal: "center", vertical: "center" },
    fill: { bgColor: { indexed: 22 } },
    border: { top: { style: "thin" }, bottom: { style: "thin" }, left: { style: "thin" }, right: { style: "thin" } }
  };

  // Set column widths
  const columnWidths = [
    { wch: 15 }, // Date
    { wch: 15 }, // GST No.
    { wch: 40 }, // Description
    { wch: 10 }, // Kms
    { wch: 15 }, // Amount
    { wch: 15 }, // Total
    { wch: 15 }, // SGST
    { wch: 15 } // CGST
  ];

  // Apply styles and column widths
  ws["!cols"] = columnWidths;
  ws["!rows"] = [{}, ...invoicesForSelectedDate.map(() => ({ hpt: 30 }))]; // Increase row heights
  ws["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 7 } }]; // Merge header cells

  // Apply header cell style
  const range = XLSX.utils.decode_range(ws["!ref"]);
  for (let c = range.s.c; c <= range.e.c; ++c) {
    const headerCell = XLSX.utils.encode_cell({ r: 0, c: c });
    ws[headerCell].s = headerCellStyle;
  }

  // Save the file
  XLSX.writeFile(wb, "monthly_customer_report.xlsx");
};


  return (
    <>
      <Sidebar />

      <div className="container-vendor-invoice">
        <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "8px" }}>
          Monthly Customer Report
        </h2>

        <div className="form-vendor-invoice">
          <div className="grid-gap-2 col-6">
            <div className="form-group">
              {/* Date picker to select a date */}
              <label htmlFor="Date" className="form-label">
                Select Date:
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="dd-MM-yyyy"
                className="form-control"
              />
            </div>

          
           

            {/* Generate report button */}
            <button className="btn btn-primary" onClick={handleGenerate}>
              Generate Report
            </button>
          </div>
        </div>

        <div>
          {invoicesForSelectedDate && invoicesForSelectedDate.length > 0 && (
            <div>
              <h3>Customer Trip Details:</h3>
              <table className="table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>GST No.</th>
                    <th>Description</th>
                    <th>Kms</th>
                    <th>Amount</th>
                    <th>Total</th>
                    <th>SGST</th>
                    <th>CGST</th>
                    {/* Add more headers as needed */}
                  </tr>
                </thead>

                <tbody>
                  {filterInvoicesByAmount(filterInvoicesByCustomer(invoicesForSelectedDate)).map((trip) => (
                    <tr key={trip._id}>
                      <td>{trip.Date}</td>
                      <td>{trip.GST_No}</td>
                      <td>{`${trip.vehicle_Type} from ${trip.from} to ${trip.to}`}</td>
                      <td>{trip.total_Km}</td>
                      <td>{trip.total_Amount}</td>
                      <td>{trip.total}</td>
                      <td>{trip.SGST}</td>
                      <td>{trip.CGST}</td>
                      {/* Add more rows as needed */}
                    </tr>
                  ))}
                  {/* Add subtotal, SGST, CGST, and grand total row */}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MonthlyCustomerReport;
