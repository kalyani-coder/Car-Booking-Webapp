import React, { useState, useEffect } from "react";
import "./CustomerInvoice.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Sidebar from "../Sidebar/Sidebar";
import headerlogo from "../../Assets/images/shivpushpa_logo.png";

function CustomerInvoice() {
  const [formData, setFormData] = useState({
    tripid: "",
    invoiceno: "",
    companyName: "Shivpushpa Travels Invoice",
    GST_No: "",
    companyAddress: "332, Kasba Peth  Phadke Haud Chowk,  Pune 411 0111",
    contactno: "9325501950 / 9325501978",
    mail: "travelshivpushpa@gmail.com",
    kind_attn: "",
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
    const downloadConfirmed = window.confirm(
      "Do you want to download the invoice?"
    );

    if (downloadConfirmed) {
      const doc = new jsPDF({
        unit: "mm",
        format: "a4",
        compress: true,
        orientation: "portrait",
        height: 1000,
      });

      doc.setFillColor(60, 181, 205);
      doc.rect(0, 0, doc.internal.pageSize.getWidth(), 7, "F");

      // image
      const img = new Image();
      img.src = headerlogo;
      doc.addImage(img, "JPEG", 5, 10, 45, 32);

      doc.setFillColor(211, 211, 211);

      doc.setFontSize(11);
      doc.text("Shivpushpa Travels", 65, 15);
      doc.text("332, Kasba Peth Phadke Haud Chowk", 65, 20);
      doc.text("Pune 411 0111", 65, 25);
      doc.text("9325501950 / 9325501978", 65, 30);
      doc.text("travelshivpushpa@gmail.com", 65, 35);

      const currentDate = new Date();

      const formattedDate = currentDate.toLocaleDateString();
      invoiceCounter++;
      const invoiceNo = invoiceCounter.toString().padStart(3, "0");

      doc.setFontSize(11);
      doc.text(`Invoice No: ${invoiceNo}`, 150, 15);
      doc.text(`Invoice Date : ${formattedDate}`, 150, 20);

      doc.setDrawColor(0, 0, 255);
      doc.line(10, 45, 200, 45);

      doc.text("INVOICE TO:", 10, 55);
      const rows = [
        { label: "Customer Name", value: selectedCustomer.cus_name, yPos: 62 },
        { label: "Mobile No", value: selectedCustomer.mobile_no, yPos: 67 },
        { label: "GST No", value: selectedCustomer.GST_No, yPos: 72 },
      ];

      // Add the rows to the PDF
      rows.forEach((row) => {
        doc.text(`${row.label}: ${row.value}`, 10, row.yPos);
      });
      doc.line(10, 80, 200, 80);

      // Calculate totals and prepare table data
      const filteredCustomerList = customerList.filter(
        (customer) => customer.customerId === selectedCustomer.customerId
      );

      const tableData = filteredCustomerList.map((trip) => [
        `${trip.vehicle_Type} from ${trip.from} to ${trip.to} on ${trip.Date}`,
        trip.saccode || "",
        trip.total_Km || "",
        trip.total_Amount ? `Rs. ${trip.total_Amount.toLocaleString()}` : "", // Safely access total_Amount
        trip.total ? `Rs. ${trip.total.toLocaleString()}` : "", // Safely access total
        trip.SGST ? `Rs. ${trip.SGST.toLocaleString()}` : "", // Safely access SGST
        trip.CGST ? `Rs. ${trip.CGST.toLocaleString()}` : "", // Safely access CGST
      ]);

      // Calculate totals
      const subtotal = filteredCustomerList.reduce(
        (total, trip) => total + (trip.total_Amount || 0),
        0
      );
      const sgstTotal = filteredCustomerList.reduce(
        (total, trip) => total + (trip.SGST || 0),
        0
      );
      const cgstTotal = filteredCustomerList.reduce(
        (total, trip) => total + (trip.CGST || 0),
        0
      );
      const grandTotal = subtotal + sgstTotal + cgstTotal;

      // Convert total amount to words and capitalize
      const numberToWords = require("number-to-words");
      const totalAmountInWords = numberToWords.toWords(grandTotal || 0);
      const capitalizedTotalAmountInWords =
        totalAmountInWords.charAt(0).toUpperCase() +
        totalAmountInWords.slice(1);

      // Add subtotal, grand total, and total amount rows to the tableData array
      const subtotalRow = [
        "Subtotal",
        "",
        "",
        "",
        `Rs. ${subtotal.toLocaleString()}`,
        `Rs. ${sgstTotal.toLocaleString()}`,
        `Rs. ${cgstTotal.toLocaleString()}`,
      ];
      const grandTotalRow = [
        "Grand Total",
        "",
        "",
        "",
        `Rs. ${grandTotal.toLocaleString()}`,
        "",
        "",
      ];
      const totalAmountRow = [
        `Total Amount: Rs. ${capitalizedTotalAmountInWords}`,
        "",
        "",
        "",
      ];

      tableData.push(subtotalRow);
      tableData.push(grandTotalRow);
      tableData.push(totalAmountRow);

      // Add table to the PDF
      doc.autoTable({
        startY: 90, // Adjust as needed
        head: [
          ["Description", "Sac Code", "Kms", "Amount", "Total", "SGST", "CGST"],
        ], // Headers
        body: tableData,
        theme: "grid", // Theme for the table
        margin: { top: 90 }, // Margin top for the table
        didDrawPage: function (data) {
          // Check if a new page is being added
          if (data.pageNumber > 1) {
            // Adjust the margin top for subsequent pages
            data.settings.margin.top = 10; // Set your desired margin top for subsequent pages
          }
        },
      });

      // Bank Details section on the left side
      doc.setFontSize(10);
      doc.text("Bank Details:", 15, doc.autoTable.previous.finalY + 17);
      doc.text(
        "Bank Name: The Cosmos Co-operative Bank Ltd",
        15,
        doc.autoTable.previous.finalY + 24
      );
      doc.text(
        "Branch Name: Kasba Raviwar Branch, Pune 411 002",
        15,
        doc.autoTable.previous.finalY + 31
      );
      doc.text(
        "Account Number: 015204301220061",
        15,
        doc.autoTable.previous.finalY + 38
      );
      doc.text(
        "IFSC Code: COSB0000015",
        15,
        doc.autoTable.previous.finalY + 45
      );
      doc.text("MICR Code: 411164014", 15, doc.autoTable.previous.finalY + 52);
      // Additional details on the right side
      doc.text(
        "For Shivpushpa Travels",
        160,
        doc.autoTable.previous.finalY + 20
      );
      doc.text("Authorised Signatory", 160, doc.autoTable.previous.finalY + 30);

      // Save the PDF or open in a new tab
      doc.save(`Invoice_${selectedCustomer.customer_Name}.pdf`);
    }
  };

  return (
    <>
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
          <div className="form-group col-6 main-input-container-corporat-invoice-page">
            <label htmlFor="vendorName" className="form-label mb-2">
              Customer Name:
            </label>
            {/* Dropdown to select a customer */}
            <select
              className="form-control-cust-inq-input-corp-invoice-monthly w-[80%] p-2"
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
          <div className="form-group col-6 main-input-container-corporat-invoice-page">
            <label htmlFor="vendorAddress" className="form-label">
              Kind Attn:
            </label>
            <input
              className="form-control-cust-inq-input-corp-invoice-monthly w-[80%] p-2"
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
                        <td>
                          {trip.total_Km}
                          <br />
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
                        .reduce((total, trip) => total, 0)}
                    </td>
                    <td>
                      {customerList
                        .filter(
                          (customer) =>
                            customer.customerId === selectedCustomer.customerId
                        )
                        .reduce((total, trip) => total, 0)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          <div className="flex justify-center">
            <button
              className="btn btn-danger mt-2 flex justify-center"
              onClick={handleGenerate}
            >
              Generate
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerInvoice;
