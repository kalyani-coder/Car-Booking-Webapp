import React, { useState, useEffect } from "react";
import "./CustomerInvoice.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Sidebar from "../Sidebar/Sidebar";
import Customer from "./../CustomerEnquiry/Customer";
import headerlogo from "../../assects/images/shivpushpa_logo.png"

function CustomerInvoice() {
  const [formData, setFormData] = useState({
    tripid: "",
    invoiceno: "",
    companyName: "Shivpushpa Travels Invoice",
    GST_No: "",
    companyAddress: "332, Kasba Peth  Phadke Haud Chowk,  Pune 411 0111",
    contactno: "9325501950 / 9325501978",
    mail: "travelshivpushpa@gmail.com",
    kind_attn: '',
    Date: "",
    to: "",
    customer_Name: "",
    CustomerAddress: "",
    CustomerGSTNo: "",
    discount: "",
    kms: "",
    amount: "",
    cgst: "",
    sgst: "",
    totalAmount: "",
    bankname: "The Cosmos Co-operative Bank Ltd",
    branchname: "Kasba Raviwar Branch, Pune 411 002",
    accountNumber: "015204301220061",
    accountHoldername: "",
    ifsccode: "COSB0000015",
    micrcode: "411164014",
  });

  const [invoiceNumber, setInvoiceNumber] = useState(101); // Initialize with the starting invoice number
  const [customerList, setCustomerList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(
          "http://localhost:8787/api/customer-payment"
        );
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

  const handleChange = (e) => {
    const selectedCustomer = customerList.find(
      (customer) => customer.customer_Name === e.target.value
    );
    setSelectedCustomer(selectedCustomer);
  };

  let invoiceCounter = 100;
  const handleGenerate = () => {
    const downloadConfirmed = window.confirm("Do you want to download the invoice?");

    if (downloadConfirmed) {
      const doc = new jsPDF({
        unit: "mm",
        format: "a4",
        compress: true,
        orientation: "portrait",
        height: 800,
      });

      // Header Section
      doc.setFillColor(60, 181, 205);
      doc.rect(0, 0, doc.internal.pageSize.getWidth(), 7, 'F');

      const img = new Image();
      img.src = headerlogo;  // Make sure headerlogo is defined and accessible
      doc.addImage(img, 'JPEG', 5, 10, 45, 32);

      doc.setFontSize(11);
      doc.text('Shivpushpa Travels', 65, 15);
      doc.text('332, Kasba Peth Phadke Haud Chowk', 65, 20);
      doc.text('Pune 411 0111', 65, 25);
      doc.text('9325501950 / 9325501978', 65, 30);
      doc.text('travelshivpushpa@gmail.com', 65, 35);

      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString();
      invoiceCounter++;
      const invoiceNo = invoiceCounter.toString().padStart(3, '0');

      doc.text(`Invoice No: ${invoiceNo}`, 150, 15);
      doc.text(`Invoice Date: ${formattedDate}`, 150, 20);

      doc.setDrawColor(0, 0, 255);
      doc.line(10, 60, 200, 60);

      doc.text('INVOICE TO:', 10, 68);

      // Customer Information Section
      if (selectedCustomer) {
        doc.text("Customer Name: " + (selectedCustomer.customer_Name || ''), 10, 75);
        doc.text("Mobile No: " + (selectedCustomer.mobile_no || ''), 10, 80);
        doc.text("GST No: " + (selectedCustomer.GST_No || ''), 10, 85);
        doc.text("Vehicle Type: " + (selectedCustomer.vehicle_Type || ''), 10, 90);
        doc.text("Vehicle Number: " + (selectedCustomer.vehicle_Number || ''), 10, 95);
      }

      doc.line(10, 105, 200, 105);

      const numberToWords = require('number-to-words');

      // Convert total amount to words
      const totalAmountInWords = numberToWords.toWords(selectedCustomer.total_Amount || 0);

      // Function to capitalize the first letter of each word
      function capitalizeFirstLetter(str) {
        return str.toLowerCase().replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });
      }

      // Capitalize the totalAmountInWords
      const capitalizedTotalAmountInWords = capitalizeFirstLetter(totalAmountInWords);

      // Create the table data
      const headers = ["Description", "Sac Code", "Kms", "Amount", "Total", "SGST", "CGST"];
      const tableData = customerList
        .filter(customer => customer.customerId === selectedCustomer.customerId)
        .map(trip => [
          `${trip.vehicle_Type} from ${trip.from} to ${trip.to} on ${trip.Date}
            \nTotal Km: ${trip.total_Km}
            \nTotal Hours: ${trip.total_hours}
            \nExtra Km: ${trip.extra_Km}
            \nExtra Hours: ${trip.extra_Hours}
            \nToll Parking: ${trip.toll_Parking}
            \nSub Total: ${trip.subtotal}
            \nGrand Total: ${trip.grandTotal}
            \nTotal Amount: ${trip.capitalizedTotalAmountInWords} `,
          trip.saccode || '',
          trip.total_Km || '',
          trip.total_Amount || '',
          trip.total || '',
          trip.SGST || '',
          trip.CGST || '',
        ]);

      // Calculate totals
      const subtotal = customerList
        .filter(customer => customer.customerId === selectedCustomer.customerId)
        .reduce((total, trip) => total + trip.total_Amount, 0);
      const sgstTotal = customerList
        .filter(customer => customer.customerId === selectedCustomer.customerId)
        .reduce((total, trip) => total + trip.SGST, 0);
      const cgstTotal = customerList
        .filter(customer => customer.customerId === selectedCustomer.customerId)
        .reduce((total, trip) => total + trip.CGST, 0);
      const grandTotal = subtotal + sgstTotal + cgstTotal;

      // Add table to the PDF
      const marginTop = 110;
      doc.autoTable({
        startY: marginTop,
        head: [headers],
        body: tableData,
        theme: 'grid',
        margin: { top: marginTop },
      });

      // Add totals to the PDF
      doc.autoTable({
        body: [
          ['', '', '', 'Subtotal', `Rs. ${subtotal.toLocaleString()}`, `Rs. ${sgstTotal.toLocaleString()}`, `Rs. ${cgstTotal.toLocaleString()}`],
          ['', '', '', 'Grand Total', `Rs. ${grandTotal.toLocaleString()}`, `Rs. ${sgstTotal.toLocaleString()}`, `Rs. ${cgstTotal.toLocaleString()}`],
          ['', '', '', `Total Amount: Rs. ${capitalizedTotalAmountInWords}`, '', '', '']
        ],
        startY: doc.autoTable.previous.finalY + 10,
        theme: 'plain',
        margin: { top: marginTop },
      });

      // Bank Details section on the left side
      doc.setFontSize(10);
      doc.text('Bank Details:', 20, doc.autoTable.previous.finalY + 20);
      doc.text('Bank Name: The Cosmos Co-operative Bank Ltd', 20, doc.autoTable.previous.finalY + 30);
      doc.text('Branch Name: Kasba Raviwar Branch, Pune 411 002', 20, doc.autoTable.previous.finalY + 40);
      doc.text('Account Number: 015204301220061', 20, doc.autoTable.previous.finalY + 50);
      doc.text('IFSC Code: COSB0000015', 20, doc.autoTable.previous.finalY + 60);
      doc.text('MICR Code: 411164014', 20, doc.autoTable.previous.finalY + 70);

      // Additional details on the right side
      doc.text("For Shivpushpa Travels", 150, doc.autoTable.previous.finalY + 20);
      doc.text("Authorised Signatory", 150, doc.autoTable.previous.finalY + 30);

      // Save the PDF or open in a new tab
      doc.save(`Invoice_${selectedCustomer.customer_Name}.pdf`);
    }
  };



  return (
    <>
      <Sidebar />

      <div className="container-customer-invoice">
        <h2
          style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}
          className="text-center mt-[1rem]"
        >
          Single Customer Invoice
        </h2>

        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          Invoice To :
        </h2>

        <div className="form-row">
          <div className="form-group col-6">
            <label htmlFor="vendorName" className="form-label mb-2">
              Customer Name:
            </label>
            {/* Dropdown to select a customer */}
            <select
              className="form-control-cust-inq-input"
              id="customername"
              name="customerName"
              onChange={(e) => {
                const selectedCustomer = customerList.find(
                  (customer) => customer.customer_Name === e.target.value
                );
                setSelectedCustomer(selectedCustomer);
              }}
              value={selectedCustomer ? selectedCustomer.customer_Name : ""}
            >
              <option value="">Select Customer</option>
              {customerList.map((customer) => (
                <option key={customer._id} value={customer.customer_Name}>
                  {customer.customer_Name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group col-6">
            <label htmlFor="vendorAddress" className="form-label">
              Kind Attn:
            </label>
            <input
              className="form-control-vendor-invoice w-[80%] p-2 mt-2"
              type="text"
              placeholder="Kind Attn"
              name="kind_attn"
              value={formData.kind_attn}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          {selectedCustomer && (
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
                  {customerList
                    .filter(
                      (customer) =>
                        customer.customerId === selectedCustomer.customerId
                    )
                    .map((trip) => (
                      <tr key={trip._id}>
                        <td>
                          {`${trip.vehicle_Type} from ${trip.from} to ${trip.to} on ${trip.Date}`}
                          <br />
                          Total Km
                          <br />
                          Total Hours
                          <br />
                          Extra Km <br />
                          Extra Hours
                          <br />
                          <strong>Toll Parking</strong>
                        </td>
                        <td>{trip.saccode}</td>
                        <td>{trip.total_Km}<br />
                          {trip.total_hours}
                          <br />

                          {trip.extra_Km}
                          <br />
                          {trip.extra_Hours}
                        </td>
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
                      {customerList
                        .filter(
                          (customer) =>
                            customer.customerId === selectedCustomer.customerId
                        )
                        .reduce((total, trip) => total + trip.total_Amount, 0)}
                    </td>
                    <td>
                      {customerList
                        .filter(
                          (customer) =>
                            customer.customerId === selectedCustomer.customerId
                        )
                        .reduce((total, trip) => total + trip.SGST, 0)}
                    </td>
                    <td>
                      {customerList
                        .filter(
                          (customer) =>
                            customer.customerId === selectedCustomer.customerId
                        )
                        .reduce((total, trip) => total + trip.CGST, 0)}
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>Grand Total</td>
                    <td>
                      {customerList
                        .filter(
                          (customer) =>
                            customer.customerId === selectedCustomer.customerId
                        )
                        .reduce(
                          (total, trip) =>
                            total + trip.total_Amount + trip.SGST + trip.CGST,
                          0
                        )}
                    </td>
                    <td>
                      {customerList
                        .filter(
                          (customer) =>
                            customer.customerId === selectedCustomer.customerId
                        )
                        .reduce((total, trip) => total + trip.SGST, 0)}
                    </td>
                    <td>
                      {customerList
                        .filter(
                          (customer) =>
                            customer.customerId === selectedCustomer.customerId
                        )
                        .reduce((total, trip) => total + trip.CGST, 0)}
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

export default CustomerInvoice;
