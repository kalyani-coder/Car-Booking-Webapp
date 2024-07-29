import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Sidebar from "../Sidebar/Sidebar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import headerlogo from "../../Assets/images/shivpushpa_logo.png";
import numberToWords from "number-to-words";
import "./CustomerInvoice.css";

function CorporateInvoiceMonthly() {
  const [formData, setFormData] = useState({
    tripid: "",
    invoiceno: "",
    companyName: "Shivpushpa Travels Invoice",
    GST_No: "",
    companyAddress: "332, Kasba Peth Phadke Haud Chowk, Pune 411 0111",
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
  const [customerData, setCustomerData] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [customers, setcustomers] = useState([]);

  console.log("mmmm", customerData);

  // Get the current date
  const currentDate = new Date();

  // Extract day, month, and year
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Month is zero-indexed, so we add 1
  const year = currentDate.getFullYear();

  // Pad single-digit day and month with leading zeros if needed
  const formattedDay = day < 10 ? "0" + day : day;
  const formattedMonth = month < 10 ? "0" + month : month;

  // Concatenate day, month, and year in the desired format
  const formattedDate = `${formattedDay}-${formattedMonth}-${year}`;

  // Show the formatted date in the console
  console.log("Current date in dd-mm-yyyy format:", formattedDate);

  useEffect(() => {
    if (selectedCustomer) {
      const fetchCustomerData = async () => {
        try {
          let response;
          if (selectedDate) {
            const formattedDate = formatDate(selectedDate);
            response = await axios.get(
              `http://localhost:8787/api/customer-payment/customer/${selectedCustomer.customerId}/date/${formattedDate}`
            );
          } else {
            response = await axios.get(
              `http://localhost:8787/api/customer-payment/customer/${selectedCustomer.customerId}`
            );
          }
          if (response.status === 200) {
            setCustomerData(response.data);
            console.log("Fetched customer data:", response.data);
          } else {
            console.error("Failed to fetch customer data");
          }
        } catch (error) {
          console.error("API request error:", error);
        }
      };
      fetchCustomerData();
    }
  }, [selectedCustomer, selectedDate]);

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8787/api/corporate-customer"
        );
        if (response.status === 201) {
          setCustomerList(response.data);
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
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Define a global variable to track the invoice number
  let invoiceCounter = 100;
  const handleGenerateInvoice = () => {
    const downloadConfirmed = window.confirm(
      "Do you want to download the invoice?"
    );
    if (downloadConfirmed) {
      if (selectedCustomer) {
        console.log("Selected customer data:", selectedCustomer);

        const doc = new jsPDF({
          unit: "mm",
          format: "a4",
          compress: true,
          orientation: "portrait",
        });

        doc.setFillColor(60, 181, 205);
        doc.rect(0, 0, doc.internal.pageSize.getWidth(), 7, "F");

        const img = new Image();
        img.src = headerlogo;
        doc.addImage(img, "JPEG", 5, 10, 45, 32);

        doc.setFillColor(211, 211, 211);

        doc.setFontSize(12);
        doc.text("Shivpushpa Travels", 55, 15);
        doc.text("332, Kasba Peth Phadke Haud Chowk", 55, 20);
        doc.text("Pune 411 0111", 55, 25);
        doc.text("Contact No: 9325501950 / 9325501978", 55, 30);
        doc.text("Mail: travelshivpushpa@gmail.com", 55, 35);

        doc.setFontSize(16);
        doc.text("Invoice", 140, 15);

        doc.setFontSize(10);
        const formattedDate = new Date().toLocaleDateString();
        const invoiceNo = (invoiceNumber + 1).toString().padStart(3, "0");
        setInvoiceNumber(invoiceNumber + 1);

        doc.text(`Invoice No: ${invoiceNo}`, 140, 20);
        doc.text(`Invoice Date: ${formattedDate}`, 140, 27);
        doc.text(`Customer ID: ${selectedCustomer.customerId}`, 140, 34);
        doc.text(`GST No: ${selectedCustomer.GST_No}`, 140, 41);

        doc.setDrawColor(0, 0, 255);
        doc.line(10, 60, 200, 60);

        doc.text("INVOICE TO:", 10, 68);

        doc.text(`Customer Name: ${selectedCustomer.Cus_name}`, 10, 80);
        doc.text(
          `Customer Address: ${selectedCustomer.reporting_Address}`,
          10,
          90
        );
        doc.text(`GST No: ${selectedCustomer.GST_No}`, 10, 100);

        doc.line(10, 105, 200, 105);

        const tripDetails = customerData.map((trip) => [
          `${trip.vehicle_Type}\n${trip.from}, ${trip.to} - ${trip.Date}`,
          trip.saccode,
          trip.total_Km,
          trip.total_Amount,
          trip.SGST,
          trip.CGST,
        ]);

        const headers = [
          "Description",
          "Sac Code",
          "Total KM",
          "Amount",
          "SGST",
          "CGST",
        ];

        const subtotal = customerData.reduce(
          (total, trip) => total + trip.total_Amount,
          0
        );
        const sgstTotal = customerData.reduce(
          (total, trip) => total + trip.SGST,
          0
        );
        const cgstTotal = customerData.reduce(
          (total, trip) => total + trip.CGST,
          0
        );
        const grandTotal = subtotal + sgstTotal + cgstTotal;

        tripDetails.push([
          {
            content: "Sub Total:",
            styles: { fillColor: [169, 169, 169], textColor: [0, 0, 0] },
          },
          "",
          "",
          `Rs. ${subtotal.toLocaleString()}`,
          `Rs. ${sgstTotal.toLocaleString()}`,
          `Rs. ${cgstTotal.toLocaleString()}`,
        ]);
        tripDetails.push([
          {
            content: "Total Amount:",
            styles: { fillColor: [169, 169, 169], textColor: [0, 0, 0] },
          },
          "",
          "",
          `Rs. ${grandTotal.toLocaleString()}`,
        ]);
        // tripDetails.push([
        //   { content: `Total Amount: Rs. ${capitalizedTotalAmountInWords}`, styles: { textColor: [0, 0, 0] } }, '', '', '', '', '']);

        doc.autoTable({
          head: [headers],
          body: tripDetails,
          startY: 120,
          theme: "grid",
          styles: { overflow: "linebreak" },
          columnStyles: {
            0: { cellWidth: "wrap" },
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
        doc.text(
          "MICR Code: 411164014",
          15,
          doc.autoTable.previous.finalY + 52
        );

        doc.text(
          "For Shivpushpa Travels",
          160,
          doc.autoTable.previous.finalY + 20
        );
        doc.text(
          "Authorised Signatory",
          160,
          doc.autoTable.previous.finalY + 30
        );

        doc.save(`Invoice_${selectedCustomer.customerId}.pdf`);
      } else {
        console.error("Customer not found.");
      }
    }
  };

  return (
    <div>
      <div className="container-customer-invoice">
        <h2 className="View-Corporate-Customer-Rate font-bold p-4 my-4">
          Corporate Customer Invoice
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

        <div className="form-row container-for-corporate-customer-monthly-invoice-page-responsive-cc">
          <div className="grid-gap-2 col-6 main-input-container-corporat-invoice-page">
            <label htmlFor="vendorName" className="form-label mb-2">
              Customer Name:
            </label>
            <select
              className="form-control-cust-inq-input-corp-invoice-monthly w-[80%] p-2"
              id="customername"
              name="customerName"
              onChange={(e) => {
                const selectedCustomer = customerList.find(
                  (customer) => customer.Cus_name === e.target.value
                );
                setSelectedCustomer(selectedCustomer);
              }}
              value={selectedCustomer ? selectedCustomer.Cus_name : ""}
            >
              <option value="">Select Customer</option>
              {customerList.map((customer) => (
                <option key={customer.customerId} value={customer.Cus_name}>
                  {customer.Cus_name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group col-6 main-input-container-corporat-invoice-page">
            <label htmlFor="kind_attn" className="form-label">
              Kind Attn:
            </label>
            <input
              type="text"
              className="form-control-cust-inq-input-corp-invoice-monthly w-[80%] p-2"
              name="kind_attn"
              placeholder="Kind Attn"
              value={formData.kind_attn}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-6 main-input-container-corporat-invoice-page">
            <label htmlFor="invoiceDate" className="form-label">
              Invoice Date:
            </label>
            <input
              type="date"
              className="form-control-cust-inq-input-corp-invoice-monthly w-[80%] p-2"
              name="invoiceDate"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
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
                  </tr>
                </thead>
                <tbody>
                  {customerData.map((trip) => (
                    <tr key={trip._id}>
                      <td>
                        {`${trip.vehicle_Type} from ${trip.from} - ${trip.to} on ${trip.Date}`}
                        <br />
                      </td>
                      <td>996601</td>
                      <td>
                        {trip.total_Km}
                        <br />
                        {trip.hours}
                        <br />
                        {trip.extra_km}
                        <br />
                        {trip.extra_hours}
                      </td>
                      <td>{trip.total_Amount}</td>
                      <td>{trip.total}</td>
                      <td>{trip.SGST}</td>
                      <td>{trip.CGST}</td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>Subtotal</td>
                    <td>
                      {customerData.reduce(
                        (total, trip) => total + trip.total_Amount,
                        0
                      )}
                    </td>
                    <td>
                      {customerData.reduce(
                        (total, trip) => total + trip.SGST,
                        0
                      )}
                    </td>
                    <td>
                      {customerData.reduce(
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
                      {customerData.reduce(
                        (total, trip) =>
                          total + trip.total_Amount + trip.SGST + trip.CGST,
                        0
                      )}
                    </td>
                    <td>{customerData.reduce((total, trip) => total, 0)}</td>
                    <td>{customerData.reduce((total, trip) => total, 0)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="flex justify-center">
          <button
            className="btn btn-danger mt-2 flex justify-center"
            onClick={handleGenerateInvoice}
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
}

export default CorporateInvoiceMonthly;
