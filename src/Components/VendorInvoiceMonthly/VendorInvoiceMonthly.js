import React, { useState, useEffect } from "react";
import "./VendorInvoiceMonthly.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Sidebar from "../Sidebar/Sidebar";
import headerlogo from "../../assects/images/shivpushpa_logo.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

function VendorInvoiceMonthly() {
  const [formData, setFormData] = useState({
    vendorId: "",
    vender_Name: "",
    address: "",
    tripid: "",
    invoiceno: "",
    companyName: "Shivpushpa Travels Invoice",
    GST_No: "",
    companyAddress: "332, Kasba Peth Phadke Haud Chowk, Pune 411 0111",
    contactno: "9325501950 / 9325501978",
    mail: "travelshivpushpa@gmail.com",
    kind_attn: "",
    date: "",
    to: "",
    vendorName: "",
    vendorAddress: "",
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
    venderTripDetails: [],
  });

  const [vendors, setVendors] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [venderTripDetails, setvenderTripDetails] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [vendorList, setVendorList] = useState([]);
  const [selectedVendorId, setSelectedVendorId] = useState("");

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const response = await fetch("http://localhost:8787/api/vender-payment");
      if (!response.ok) {
        throw new Error("Failed to fetch vendors");
      }
      const data = await response.json();

      // Filter to get unique vendors by _id
      const uniqueVendors = [];
      const vendorMap = new Map();
      data.forEach(vendor => {
        if (!vendorMap.has(vendor.vender_id)) {
          vendorMap.set(vendor.vender_id, true);
          uniqueVendors.push(vendor);
        }
      });

      setVendors(uniqueVendors);
    } catch (error) {
      console.error("Error fetching vendors:", error.message);
    }
  };


  const handleChange = async (e) => {
    setSelectedVendorId(e.target.value);
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

  };

  // Define a function to format the date
  function formatDate(dateString) {
    const date = new Date(dateString);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const formattedDate = `${monthNames[date.getMonth()]}, ${date.getDate()}`;
    return formattedDate;
  }
  // Assuming formData is already populated with venderTripDetails
  const updatedVenderTripDetails = formData.venderTripDetails.map((trip) => ({
    ...trip,
    formattedDate: formatDate(trip.current_Date),
  }));

  // Update formData with the new venderTripDetails containing formattedDate
  formData.venderTripDetails = updatedVenderTripDetails;

  const handleGenerate = () => {
    // Calculate total values and TDS
    let totalKm = 0;
    let totalHour = 0;
    let extraKm = 0;
    let extraHour = 0;
    let totalAmount = 0;

    formData.venderTripDetails.forEach((trip) => {
      totalKm += trip.kms;
      totalHour += trip.total_hour;
      extraKm += trip.extra_km;
      extraHour += trip.extra_hour;
      totalAmount += trip.amount;
    });

    const subtotal = totalAmount;
    const tds = subtotal * 0.01;
    const finalAmount = subtotal - tds;

    const downloadConfirmed = window.confirm(
      "Do you want to download the invoice?"
    );
    if (downloadConfirmed) {
      const doc = new jsPDF({
        unit: "mm",
        format: "a4",
        compress: true,
        orientation: "portrait",
        height: 800, // Increase the height as needed
      });

      // Header Background
      doc.setFillColor(60, 181, 205);
      doc.rect(0, 0, doc.internal.pageSize.getWidth(), 7, "F");

      // Header Logo
      const img = new Image();
      img.src = headerlogo;
      doc.addImage(img, "JPEG", 5, 10, 45, 32);

      // Header Company Information
      doc.setFontSize(11);
      doc.text(formData.companyName, 65, 15);
      doc.text(formData.companyAddress, 65, 20);
      doc.text(formData.contactno, 65, 25);
      doc.text(formData.mail, 65, 30);

      // Invoice Information
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString();

      doc.setFontSize(11);
      doc.text(`Invoice Date: ${formattedDate}`, 65, 35);

      // Separator Line
      doc.setDrawColor(0, 0, 255);
      doc.line(10, 45, 200, 45);

      // Invoice To Section
      doc.text("INVOICE TO:", 10, 55);

      // Vendor Information
      const vendorRows = [
        { label: "Vendor Name", value: selectedVendor.vender_Name, yPos: 62 },
        { label: "Vendor Address", value: selectedVendor.address, yPos: 67 },
        { label: "Vendor GST No", value: selectedVendor.GST_No, yPos: 72 },
        { label: "Contact No", value: selectedVendor.mobile_Number, yPos: 77 },
      ];

      vendorRows.forEach((row) => {
        doc.text(`${row.label}: ${row.value}`, 10, row.yPos);
      });

      doc.line(10, 80, 200, 80);

      const marginLeft = 10;
      const marginTop = 90;

      // Prepare trip details data including summary
      const tripDetails = formData.venderTripDetails.map((trip) => [
        trip.Description,
        trip.kms,
        trip.amount,
        trip.totalAmount,
        trip.tds,
      ]);

      // Add summary rows to tripDetails array
      tripDetails.push([
        { content: 'Sub Total:', styles: { fillColor: [169, 169, 169], textColor: [0, 0, 0] } },
        '',
        '',
        `Rs. ${subtotal.toLocaleString()}`,
        '', // Assuming sgstTotal and cgstTotal are not defined in your provided context
      ]);
      tripDetails.push([
        { content: 'TDS (1%)', styles: { fillColor: [169, 169, 169], textColor: [0, 0, 0] } },
        '',
        '',
        `Rs. ${tds.toFixed(2).toLocaleString()}`,
        '',
      ]);
      tripDetails.push([
        { content: 'Total Amount:', styles: { fillColor: [169, 169, 169], textColor: [0, 0, 0] } },
        '',
        '',
        `Rs. ${finalAmount.toFixed(2).toLocaleString()}`,
        '',
      ]);
      

      doc.autoTable({
        startY: marginTop,
        head: [
          [
            { content: "DESCRIPTION", },
            { content: "Kms", },
            { content: "Amount", },
            { content: "Total",  },
            { content: "TDS", },
          ],
        ],
        body: tripDetails,
        theme: "grid",
        margin: { left: marginLeft },
      });

      // Bank Details
      doc.setFontSize(10);
      doc.text("Bank Details:", 10, doc.autoTable.previous.finalY + 17);
      doc.text(
        `Bank Name: ${formData.bankname}`, 10, doc.autoTable.previous.finalY + 24);
      doc.text(
        `Branch Name: ${formData.branchname}`,
        10,
        doc.autoTable.previous.finalY + 31
      );
      doc.text(
        `Account Number: ${formData.accountNumber}`,
        10,
        doc.autoTable.previous.finalY + 38
      );
      doc.text(
        `IFSC Code: ${formData.ifsccode}`,
        10,
        doc.autoTable.previous.finalY + 45
      );
      doc.text(
        `MICR Code: ${formData.micrcode}`,
        10,
        doc.autoTable.previous.finalY + 52
      );

      // Authorised Signatory
      doc.text(
        "For Shivpushpa Travels",
        160,
        doc.autoTable.previous.finalY + 20
      );
      doc.text("Authorised Signatory", 160, doc.autoTable.previous.finalY + 30);

      // Save the PDF
      doc.save(`Invoice_${selectedVendor.vender_Name}.pdf`);
    }
  };

  return (
    <>
      <Sidebar />

      <div className="container-vendor-invoice-monthly">
        <h2
          style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}
          className="text-center mt-[1rem]"
        >
          Vendor Monthly Invoice
        </h2>

        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          Invoice To:
        </h2>

        <div className="form-vendor-invoice">
          <div className="form-row">
          <div className="form-group">
      <label htmlFor="vender_Name" className="form-label">
        Vendor Name:
        <span className="required-asterisk">*</span>
      </label>
      <select
        className="update-duty-form-control"
        name="vender_Name"
        id="vender_Name"
        value={selectedVendorId}
        onChange={handleChange}
      >
        <option value="">Select Vendor</option>
        {vendors.map((vendor) => (
          <option key={vendor._id} value={vendor.vender_id}>
            {vendor.vender_Name}
          </option>
        ))}
      </select>
    </div>
            <div className="form-group col-6">
              <label htmlFor="invoiceDate" className="form-label">
                Invoice Date:
              </label>
              <input
                type="date"
                className="form-control-cust-inq-input"
                name="invoiceDate"
                value={formData.invoiceDate}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div>
          {selectedVendor && (
            <div>
              <h3>Vendor Trip Details:</h3>
              <table className="invoice-table">
                <thead>
                  <tr>
                    <th>DESCRIPTION</th>
                    <th>SAC Code</th>
                    <th>Kms</th>
                    <th>AMOUNT</th>
                    <th>TOTAL</th>
                    <th>TDS</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.venderTripDetails.map((trip, index) => (
                    <tr key={index}>
                      <td>{trip.Description}</td>
                      <td>{trip.vehicle_type}</td> {/* Add this line */}
                      <td>{trip.SAC_Code}</td>
                      <td>{trip.kms}</td>
                      <td>{trip.amount}</td>
                      <td>{trip.total_amount}</td>
                      <td>{trip.tds}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan="4" style={{ textAlign: "right" }}>
                      Subtotal
                    </td>
                    <td>
                      {formData.venderTripDetails.reduce(
                        (total, trip) => total + trip.total_amount,
                        0
                      )}
                    </td>
                    <td>
                      {formData.venderTripDetails.reduce(
                        (total, trip) => total + trip.tds,
                        0
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="4" style={{ textAlign: "right" }}>
                      Grand Total
                    </td>
                    <td>
                      {formData.venderTripDetails.reduce(
                        (total, trip) => total + trip.total_amount,
                        0
                      ) -
                        formData.venderTripDetails.reduce(
                          (total, trip) => total + trip.tds,
                          0
                        )}
                    </td>
                    <td>
                      {formData.venderTripDetails.reduce(
                        (total, trip) => total + trip.tds,
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

export default VendorInvoiceMonthly;
