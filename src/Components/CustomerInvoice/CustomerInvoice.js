import React, { useState, useEffect } from "react";
import "./CustomerInvoice.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Sidebar from "../Sidebar/Sidebar";
import Customer from "./../CustomerEnquiry/Customer";

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
          "http://localhost:10000/api/customer-payment"
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

  const handleGenerate = () => {
    const downloadConfirmed = window.confirm(
      "Do you want to download the invoice?"
    );

    if (downloadConfirmed) {
      const doc = new jsPDF();

      // Add content to the PDF
      doc.setFontSize(12);

      // Header Section
      doc.text("Shivpushpa Travels Invoice", 10, 10);
      doc.text("332, Kasba Peth Phadke Haud Chowk, Pune 411 0111", 10, 20);
      doc.text("Contact No: 9325501950 / 9325501978", 10, 30);
      doc.text("Mail: travelshivpushpa@gmail.com", 10, 40);

      // Title Section
      doc.setFontSize(16);
      doc.text("Invoice", 140, 20, { className: "uppercase-text" });

      // Invoice Details Section
      doc.setFontSize(10);
      doc.text("PO No: ", 140, 30);
      const updatedInvoiceNumber = invoiceNumber + 1;
      setInvoiceNumber(updatedInvoiceNumber); // Increment the invoice number

      setFormData({
        ...formData,
        invoiceno: `INV-${updatedInvoiceNumber}`, // Update the invoice number in the form data
      });

      doc.text("Invoice No: ", 140, 40);
      doc.text("Date:" + (selectedCustomer.Date || ''), 140, 50);
      doc.text("Customer ID:" + (selectedCustomer.customerId || ''), 140, 60);
      doc.text("GST No:" + (selectedCustomer.GST_No || ''), 140, 70);

      // Customer Information Section
      // Customer Information Section
      if (selectedCustomer) {
        doc.text("Customer Name: " + (selectedCustomer.customer_Name || ''), 10, 80);
        doc.text("Customer Address: " + (selectedCustomer.reporting_Address || ''), 10, 90);
        doc.text("GST No:" + (selectedCustomer.GST_No || ''), 10, 100);
      }

      // Add table with trip details
      const tableData = customerList
        .filter(
          (customer) => customer.customerId === selectedCustomer.customerId
        )
        .map((trip) => [
          `${trip.vehicle_Type} from ${trip.from} to ${trip.to} on ${trip.Date}
          \nTotal Km
          \nTotal Hours 
          \nExtra Km
          \nExtra Hours
          \nToll Parking`,
          trip.saccode,
          `${trip.total_Km}\n${trip.total_hours}\n${trip.extra_Km}\n${trip.extra_Hours}\n${trip.toll_Parking}`,
          trip.total_Amount,
          trip.total,
          trip.SGST,
          trip.CGST,
        ]);

      // Add table headers
      const headers = [
        "Description",
        "Sac Code",
        "Kms",
        "Amount",
        "Total",
        "SGST",
        "CGST",
      ];
      tableData.unshift(headers);

      doc.autoTable({
        head: tableData.slice(0, 1),
        body: tableData.slice(1),
        startY: 120,
        theme: "plain",
      });

      // Add subtotal, SGST, CGST, and grand total row
      const subtotal = customerList
        .filter(
          (customer) => customer.customerId === selectedCustomer.customerId
        )
        .reduce((total, trip) => total + trip.total_Amount, 0);

      const sgstTotal = customerList
        .filter(
          (customer) => customer.customerId === selectedCustomer.customerId
        )
        .reduce((total, trip) => total + trip.SGST, 0);

      const cgstTotal = customerList
        .filter(
          (customer) => customer.customerId === selectedCustomer.customerId
        )
        .reduce((total, trip) => total + trip.CGST, 0);

      doc.autoTable({
        head: [["", "Subtotal", sgstTotal, cgstTotal]],
        body: [["", subtotal, sgstTotal, cgstTotal]],
        startY: doc.autoTable.previous.finalY + 10,
      });

      // Add Bank Details Section
      doc.text("Bank Details:", 10, doc.autoTable.previous.finalY + 20);
      doc.text(
        "Bank Name: " + formData.bankname,
        10,
        doc.autoTable.previous.finalY + 30
      );
      doc.text(
        "Branch Name: " + formData.branchname,
        10,
        doc.autoTable.previous.finalY + 40
      );
      doc.text(
        "Account Holder Name: " + formData.accountHoldername,
        10,
        doc.autoTable.previous.finalY + 50
      );
      doc.text(
        "Account Number: " + formData.accountNumber,
        10,
        doc.autoTable.previous.finalY + 60
      );
      doc.text(
        "IFSC Code: " + formData.ifsccode,
        10,
        doc.autoTable.previous.finalY + 70
      );
      doc.text(
        "MICR Code: " + formData.micrcode,
        10,
        doc.autoTable.previous.finalY + 80
      );

      // Footer Section
      doc.text(
        "For Shivpushpa Travels",
        150,
        doc.autoTable.previous.finalY + 30
      );
      doc.text("Authorised Signatory", 150, doc.autoTable.previous.finalY + 60);

      doc.save("invoice.pdf");
      doc.save(`invoice_${updatedInvoiceNumber}.pdf`);
    }
  };

  return (
    <>
      <Sidebar />

      <div className="container-customer-invoice">
        <h2
          style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "8px" }}
        >
          Single Customer Invoice
        </h2>

        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "5px",
          }}
        >
          Invoice To :
        </h2>

        <div className="form-vendor-invoice">
          <div className="grid-gap-2 col-6">
            <label htmlFor="vendorName" className="form-label">
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
          <div className="mb-2 grid-gap-2 col-6">
            <label htmlFor="vendorAddress" className="form-label">
              Kind Attn:
            </label>
            <input
      className="form-control-vendor-invoice"
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
                          <br/>
                          Total Hours
                          <br />
                          Extra Km <br/>
                          Extra Hours 
                          <br/>
                        <strong>Toll Parking</strong>
                        </td>
                        <td>{trip.saccode}</td>
                        <td>{trip.total_Km}<br/>
                        {trip.total_hours}
                        <br/>
                        
                        {trip.extra_Km}
                        <br/>
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
