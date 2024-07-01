import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Sidebar from "../Sidebar/Sidebar";

function CustomerInvoiceMonthly() {
  const [formData, setFormData] = useState({
    tripid: "",
    invoiceno: "",
    companyName: 'Shivpushpa Travels Invoice',
    GST_No: "",
    companyAddress: '332, Kasba Peth  Phadke Haud Chowk,  Pune 411 0111',
    mail: 'travelshivpushpa@gmail.com',
    kind_attn:"",
    Date: "",
    contactno: "9325501950 / 9325501978",
    to: "",
    CustomerName: "",
    CustomerAddress: "",
    CustomerGSTNo: "",
    discount: "",
    kms: "",
    amount: "",
    cgst: "",
    sgst: "",
    totalAmount: "",
    bankname: 'The Cosmos Co-operative Bank Ltd',
    branchname: 'Kasba Raviwar Branch, Pune 411 002',
    accountNumber: '015204301220061',
    accountHoldername: '',
    ifsccode: 'COSB0000015',
    micrcode: '411164014',
  });

  const [invoiceNumber, setInvoiceNumber] = useState(101);
  const [customerList, setCustomerList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [invoicesForSelectedDate, setInvoicesForSelectedDate] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://localhost:8787/api/customer-payment");
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
    setInvoiceNumber(101);
    fetchCustomers();
  }, []);

  

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const formattedDate = selectedDate.toISOString().split("T")[0];
        const response = await fetch(`http://localhost:8787/api/customer-payment/by-date/${formattedDate}`);
        
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


  const handleChange = (e) => {
    const selectedCustomer = customerList.find(
      (customer) => customer.customer_Name === e.target.value
    );
    setSelectedCustomer(selectedCustomer);
  };

  const handleGenerate = () => {
    const downloadConfirmed = window.confirm("Do you want to download the invoice?");

    if (downloadConfirmed) {
        const doc = new jsPDF();

        // Set initial Y position and page margins
        let startY = 20;
        const margin = 10;

        // Add content to the PDF
        doc.setFontSize(12);

        // Header Section
        doc.text("Shivpushpa Travels Invoice", margin, startY);
        doc.text("332, Kasba Peth Phadke Haud Chowk, Pune 411 0111", margin, startY + 10);
        doc.text("Contact No: 9325501950 / 9325501978", margin, startY + 20);
        doc.text("Mail: travelshivpushpa@gmail.com", margin, startY + 30);

        // Title Section
        doc.setFontSize(16);
        doc.text("Invoice", 140, startY);

        // Invoice Details Section
        doc.setFontSize(10);
        doc.text("PO No: ", 140, startY + 10);
        doc.text("Invoice No: ", 140, startY + 20);
        doc.text("Date: ", 140, startY + 30);
        doc.text("Customer ID: ", 140, startY + 40);
        doc.text("GST No: ", 140, startY + 50);

        // Customer Information Section
        if (selectedCustomer) {
            doc.text("Customer Name: " + (selectedCustomer.customer_Name || ''), margin, startY + 60);
            doc.text("Customer Address: " + (selectedCustomer.reporting_Address || ''), margin, startY + 70);
            doc.text("GST No: " + (selectedCustomer.GST_No || ''), margin, startY + 80);
        }

        // Move startY down to prepare for the table
        startY += 100;

        // Add table with trip details
        const headers = ["Description", "Sac Code", "Kms", "Amount", "Total", "SGST", "CGST"];
        const tableData = invoicesForSelectedDate.map(trip => [
            `${trip.vehicle_Type} from ${trip.from} to ${trip.to}`,
            trip.saccode || '',
            trip.total_Km || '',
            trip.total_Amount || '',
            trip.total || '',
            trip.SGST || '',
            trip.CGST || '',
        ]);

        // Insert headers at the beginning of the tableData
        tableData.unshift(headers);

        // Function to check if content height exceeds the page and add a new page
        const addPageIfExceeds = () => {
            const totalPages = doc.internal.getNumberOfPages();
            const currentY = doc.autoTable.previous.finalY + margin;

            if (currentY > 250) { // Adjust this height based on your layout
                doc.addPage();
                startY = margin;
            }
        };

        // Add autoTable with options for table formatting
        doc.autoTable({
            head: [tableData[0]],
            body: tableData.slice(1),
            startY: startY,
            theme: "grid",
            styles: { halign: 'center' },
            columnStyles: { 0: { cellWidth: 'wrap' } }, // Adjust cellWidth based on content
            addPageContent: addPageIfExceeds,
        });

        // Calculate subtotal, SGST, CGST, and grand total row
        const subtotal = invoicesForSelectedDate.reduce((total, trip) => total + (trip.total_Amount || 0), 0);
        const sgstTotal = invoicesForSelectedDate.reduce((total, trip) => total + (trip.SGST || 0), 0);
        const cgstTotal = invoicesForSelectedDate.reduce((total, trip) => total + (trip.CGST || 0), 0);

        // Add table for subtotal and totals
        doc.autoTable({
            head: [["", "Subtotal", "SGST Total", "CGST Total"]],
            body: [["", subtotal.toString(), sgstTotal.toString(), cgstTotal.toString()]],
            startY: doc.autoTable.previous.finalY + margin,
            theme: "grid",
            styles: { halign: 'center' },
        });

        // Add Bank Details Section
        doc.text("Bank Details:", margin, doc.autoTable.previous.finalY + margin + 10);
        doc.text("Bank Name: " + (formData.bankname || ''), margin, doc.autoTable.previous.finalY + margin + 20);
        doc.text("Branch Name: " + (formData.branchname || ''), margin, doc.autoTable.previous.finalY + margin + 30);
        doc.text("Account Holder Name: " + (formData.accountHoldername || ''), margin, doc.autoTable.previous.finalY + margin + 40);
        doc.text("Account Number: " + (formData.accountNumber || ''), margin, doc.autoTable.previous.finalY + margin + 50);
        doc.text("IFSC Code: " + (formData.ifsccode || ''), margin, doc.autoTable.previous.finalY + margin + 60);
        doc.text("MICR Code: " + (formData.micrcode || ''), margin, doc.autoTable.previous.finalY + margin + 70);

        // Footer Section
        doc.text("For Shivpushpa Travels", 150, doc.internal.pageSize.height - 20);
        doc.text("Authorised Signatory", 150, doc.internal.pageSize.height - 10);

        // Save the PDF
        doc.save("invoice.pdf");
    }
};



  // Function to filter trips for the selected date and customer
  const filterTripsForSelectedDate = () => {
    if (selectedCustomer && selectedDate) {
      const filteredTrips = customerList
        .filter((customer) => customer.customerId === selectedCustomer.customerId)
        .filter((trip) => new Date(trip.Date).toDateString() === selectedDate.toDateString());

      setInvoicesForSelectedDate(filteredTrips);
    }
  };

  // Call the filter function whenever the selected customer or date changes
  useEffect(() => {
    filterTripsForSelectedDate();
  }, [selectedCustomer, selectedDate, customerList]);

  return (
    <>
      <Sidebar />

      <div className="container-customer-invoice">
        <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }} className="text-center mt-[1rem]">
          Monthly Customer Invoice By Date
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
      </div>
        </div>
        <div>
        {invoicesForSelectedDate && invoicesForSelectedDate.length > 0 && (
        <div>
          <h3>Customer Trip Details:</h3>
          <table className="invoice-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Sac Code</th>
                <th>Kms</th>
                <th>Amount</th>
                <th>Total</th>
                <th>SGST</th>
                <th>CGST</th>
                {/* Add more headers as needed */}
              </tr>
            </thead>

            <tbody>
              {invoicesForSelectedDate.map((trip) => (
                <tr key={trip._id}>
                  <td>{`${trip.vehicle_Type} from ${trip.from} to ${trip.to}`}</td>
                  <td>{trip.saccode}</td>
                  <td>{trip.total_Km}</td>
                  <td>{trip.total_Amount}</td>
                  <td>{trip.total}</td>
                  <td>{trip.SGST}</td>
                  <td>{trip.CGST}</td>
                  {/* Add more rows as needed */}
                </tr>
              ))}
              {/* Add subtotal, SGST, CGST, and grand total row */}
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>Subtotal</td>
                <td>
                  {invoicesForSelectedDate.reduce(
                    (total, trip) => total + trip.total_Amount,
                    0
                  )}
                </td>
                <td>
                  {invoicesForSelectedDate.reduce(
                    (total, trip) => total + trip.SGST,
                    0
                  )}
                </td>
                <td>
                  {invoicesForSelectedDate.reduce(
                    (total, trip) => total + trip.CGST,
                    0
                  )}
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>Grand Total</td>
                <td>
                  {invoicesForSelectedDate.reduce(
                    (total, trip) =>
                      total + trip.total_Amount + trip.SGST + trip.CGST,
                    0
                  )}
                </td>
                <td>
                  {invoicesForSelectedDate.reduce(
                    (total, trip) => total + trip.SGST,
                    0
                  )}
                </td>
                <td>
                  {invoicesForSelectedDate.reduce(
                    (total, trip) => total + trip.CGST,
                    0
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
          <button className="btn btn-danger mt-2" onClick={handleGenerate}>
            Generate
          </button>
        </div>
      </div>
    </>
  );
}

export default CustomerInvoiceMonthly;
