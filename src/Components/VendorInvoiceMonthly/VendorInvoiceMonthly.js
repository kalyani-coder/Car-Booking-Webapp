import React, { useState, useEffect } from "react";
import "./VendorInvoiceMonthly.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Sidebar from "../Sidebar/Sidebar";

function VendorInvoiceMonthly() {
  const [formData, setFormData] = useState({
    vendorId: "",
    tripid: "",
    invoiceno: "",
    companyName: 'Shivpushpa Travels Invoice',
    gstno: "",
    companyAddress: '332, Kasba Peth Phadke Haud Chowk, Pune 411 0111',
    contactno: "9325501950 / 9325501978",
    mail: 'travelshivpushpa@gmail.com',
    kind_attn: "",
    date: "",
    contactno: "",
    to: "",
    vendorName: "",
    vendorAddress: "",
    vendorGSTNo: "",
    vendorContactNo: "",
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
    venderTripDetails: [] // State to store fetched vendor trip details
  });

  const [vendors, setVendors] = useState([]); // State to store fetched vendors
  const [selectedVendor, setSelectedVendor] = useState(null);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch("http://localhost:10000/api/vender-payment");
        if (response.ok) {
          const data = await response.json();
          setVendors(data);
        } else {
          console.error("Failed to fetch vendors");
        }
      } catch (error) {
        console.error("API request error:", error);
      }
    };
    fetchVendors();
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;
    const selectedVendor = vendors.find(vendor => vendor.vender_Name === value);
    setSelectedVendor(selectedVendor);
    
    if (selectedVendor) {
      setFormData({
        ...formData,
        vendorId: selectedVendor._id,
        vendorName: selectedVendor.vender_Name,
        vendorGSTNo: selectedVendor.GST_No,
        vendorContactNo: selectedVendor.vender_Mobile,
        vendorAddress: selectedVendor.address
      });

      // Fetch vendor trip details
      fetchVendorTripDetails(selectedVendor.vender_Name);
    }
  };

  const fetchVendorTripDetails = async (vendorName) => {
    try {
      const response = await fetch(`http://localhost:10000/api/vender-payment?vendorName=${vendorName}`);
      if (response.ok) {
        const data = await response.json();
        setFormData(prevState => ({
          ...prevState,
          venderTripDetails: data
        }));
      } else {
        console.error("Failed to fetch vendor trip details");
      }
    } catch (error) {
      console.error("API request error:", error);
    }
  };

  const handleGenerate = () => {
    // Calculate total values and TDS
    let totalKm = 0;
    let totalHour = 0;
    let extraKm = 0;
    let extraHour = 0;
    let totalAmount = 0;
    formData.venderTripDetails.forEach(trip => {
      totalKm += trip.kms;
      totalHour += trip.total_hour;
      extraKm += trip.extra_km;
      extraHour += trip.extra_hour;
      totalAmount += trip.amount;
    });
    const subtotal = totalAmount;
    const tds = subtotal * 0.01;
    const finalAmount = subtotal - tds;

    const downloadConfirmed = window.confirm('Do you want to download the invoice?');
    if (downloadConfirmed) {
      const doc = new jsPDF();

      // Add content to the PDF
      doc.setFontSize(12);
      doc.text(formData.companyName, 10, 10);
      doc.text(formData.companyAddress, 10, 20);
      doc.text('Invoice No: ' + formData.invoiceno, 10, 30);
      doc.text('GST No: ' + formData.gstno, 10, 40);
      doc.text('Mail: ' + formData.mail, 10, 60);

      doc.text('PO No: ', 150, 30);
      doc.text('Invoice No: ' + formData.invoiceno, 150, 40);
      doc.text('Date: ' + formData.current_Date, 150, 50);
      doc.text('GST No: ' + formData.GST_No, 150, 60);

      doc.text('Vendor Name: ' + formData.vendorName, 10, 80);
      doc.text('Vendor Address: ' + formData.vendorAddress, 10, 90);
      doc.text('Vendor GST No: ' + formData.GST_No, 10, 100);
      doc.text('Contact No: ' + formData.mobile_Number, 10, 110);

      // Add vendor trip details table
      doc.text('Vendor Trip Details', 10, 130);
      const tripDetails = formData.venderTripDetails.map((trip, index) => [
        trip.Description,
        trip.vehicle_type,
        trip.kms,
        trip.total_hour,
        trip.extra_km,
        trip.extra_hour,
        trip.amount,
        trip.tds
      ]);
      doc.autoTable({
        startY: 140,
        head: [['Description', 'Vehicle Type', 'Kms', 'Total Hour', 'Extra KM', 'Extra Hour', 'Amount', 'TDS']],
        body: tripDetails
      });

      // Add subtotal, TDS, and total amount
      doc.text(`Subtotal: ${subtotal}`, 10, doc.autoTable.previous.finalY + 10);
      doc.text(`TDS (1%): ${tds}`, 10, doc.autoTable.previous.finalY + 20);
      doc.text(`Total Amount: ${finalAmount}`, 10, doc.autoTable.previous.finalY + 30);

      doc.text('Bank Details:', 10, doc.autoTable.previous.finalY + 40);
      doc.text('Bank Name: ' + formData.bankname, 10, doc.autoTable.previous.finalY + 50);
      doc.text('Branch Name: ' + formData.branchname, 10, doc.autoTable.previous.finalY + 60);
      doc.text('Account Holder Name: ' + formData.accountHoldername, 10, doc.autoTable.previous.finalY + 70);
      doc.text('Account Number: ' + formData.accountNumber, 10, doc.autoTable.previous.finalY + 80);
      doc.text('IFSC Code: ' + formData.ifsccode, 10, doc.autoTable.previous.finalY + 90);
      doc.text('MICR Code: ' + formData.micrcode, 10, doc.autoTable.previous.finalY + 100);

      doc.text('For Shivpushpa Travels', 150, doc.autoTable.previous.finalY + 40);
      doc.text('Authorised Signatory', 150, doc.autoTable.previous.finalY + 70);

      doc.save('invoice.pdf');
    }
  };

  return (
    <>
      <Sidebar />

      <div className="container-vendor-invoice-monthly">
        <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "8px" }}>
          Vendor Monthly Invoice
        </h2>

        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "5px",
          }}
        >
          Invoice To:
        </h2>

        <div className="form-vendor-invoice">
          <div className="grid-gap-2 col-6">
            <label htmlFor="vendorId" className="form-label">
              Vendor Name:
            </label>
            <select
              className="form-control-cust-inq-input"
              name="vendorId"
              value={formData.vendorId}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Vendor
              </option>
              {vendors.map((vendor) => (
                <option key={vendor._id} value={vendor.vender_Name}>
                  {vendor.vender_Name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          {selectedVendor && (
            <div>
              <h3>Vendor Trip Details:</h3>
              <table className="invoice-table">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Vehicle Type</th>
                    <th>Kms</th>
                    <th>Total Hour</th>
                    <th>Extra KM</th>
                    <th>Extra Hour</th>
                    <th>Amount</th>
                    <th>TDS</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.venderTripDetails.map((trip, index) => (
                    <tr key={index}>
                      <td>{trip.Description}
                      {`${trip.vehicle_Type} from  on ${trip.current_Date}`}
                          <br />
                          Total Km 
                          <br/>
                          Total Hours
                          <br />
                          Extra Km <br/>
                          Extra Hours 
                          <br/>
                      </td>
                      
                      <td>{trip.kms}</td>
                      <td>{trip.total_hour}</td>
                      <td>{trip.extra_km}</td>
                      <td>{trip.extra_hour}</td>
                      <td>{trip.amount}</td>
                      <td>{trip.tds}</td>
                    </tr>
                  ))}
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
