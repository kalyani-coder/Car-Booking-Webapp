import React, { useState , useEffect } from "react";
import "./VendorInvoice.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Sidebar from "../Sidebar/Sidebar";

function VendorInvoice() {
  const [formData, setFormData] = useState({
    vendorId: "",
    tripid: "",
    invoiceno: "",
    companyName: 'Shivpushpa Travels Invoice',
    gstno: "",
    companyAddress: '332, Kasba Peth  Phadke Haud Chowk,  Pune 411 0111',
    contactno: "9325501950 / 9325501978",
    mail: 'travelshivpushpa@gmail.com',
    kind_attn:"",
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
  });

  const [vendors, setVendors] = useState([]); // State to store fetched vendors

  useEffect(() => {
    // Fetch vendors from the API when the component mounts
    fetch("http://localhost:7000/api/add-venders")
      .then((response) => response.json())
      .then((data) => setVendors(data))
      .catch((error) => console.error("Error fetching vendors:", error));
  }, []);

 

  // const [showInvoiceData, setShowInvoiceData] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const selectedVendor = vendors.find((vendor) => vendor._id === value);

    setFormData({
      ...formData,
      [name]: value,
      vendorName: selectedVendor?.vender_Name || "",
      vendorGSTNo: selectedVendor?.GST_No || "",
      vendorContactNo: selectedVendor?.vender_Mobile || "",
      venderEmail: selectedVendor?.Vender_Email || "",    // New fields
      address: selectedVendor?.address || "",             // New fields
    });
  };

  

  const handleGenerate = () => {
    const downloadConfirmed = window.confirm('Do you want to download the invoice?');

    if (downloadConfirmed) {
    const doc = new jsPDF();

    // Add content to the PDF
    doc.setFontSize(12);
    
    doc.text(formData.companyName, 10, 10);
    doc.text(formData.companyAddress, 10, 20);
    doc.text('Invoice No: ' + formData.invoiceno, 10, 30);
    doc.text('GST No: ' + formData.gstno, 10, 40);
    // doc.text('Date: ' + formData.date, 10, 50);
    doc.text('Mail: ' + formData.mail, 10, 60);

    // Add content to the right side
    doc.text('PO No: ', 150, 30);
    doc.text('Invoice No: ' + formData.invoiceno, 150, 40);
    doc.text('Date: ' + formData.date, 150, 50);
    doc.text('Customer ID GST No: 27AABTS4503R1Z1', 150, 60);

    doc.text('Vendor Name: ' + formData.vendorName, 10, 80);
    doc.text('Vendor Address: ' + formData.vendorAddress, 10, 90);
    doc.text('Vendor GST No: ' + formData.vendorGSTNo, 10, 100);
    doc.text('Contact No: ' + formData.vendorContactNo, 10, 110);

    
    

    // Add Bank Details
    doc.text('Bank Details:', 10, doc.autoTable.previous.finalY + 20);
    doc.text('Bank Name: ' + formData.bankname, 10, doc.autoTable.previous.finalY + 30);
    doc.text('Branch Name: ' + formData.branchname, 10, doc.autoTable.previous.finalY + 40);
    doc.text('Account Holder Name: ' + formData.accountHoldername, 10, doc.autoTable.previous.finalY + 50);
    doc.text('Account Number: ' + formData.accountNumber, 10, doc.autoTable.previous.finalY + 60);
    doc.text('IFSC Code: ' + formData.ifsccode, 10, doc.autoTable.previous.finalY + 70);
    doc.text('MICR Code: ' + formData.micrcode, 10, doc.autoTable.previous.finalY + 80);

    // Add Shivpushpa Travels and Authorized Signatory
    doc.text('For Shivpushpa Travels', 150, doc.autoTable.previous.finalY + 30);
    doc.text('Authorised Signatory', 150, doc.autoTable.previous.finalY + 60);

    doc.save('invoice.pdf');
  }
  };

  return (
    <>
      <Sidebar />

      <div className="container-vendor-invoice">
        <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "8px" }}>
           Vendor Invoice
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
                <option key={vendor._id} value={vendor._id}>
                  {vendor.vender_Name}
                </option>
              ))}
            </select>
            <label htmlFor="vendorGSTNo" className="form-label">
              GST No:
            </label>
            <input
              className="form-control-vendor-invoice"
              type="text"
              placeholder="GST No."
              name="vendorGSTNo"
              value={formData.vendorGSTNo}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2 grid-gap-2 col-6">
            <label htmlFor="address" className="form-label">
              Vendor Address:
            </label>
            <input
              className="form-control-vendor-invoice"
              type="text"
              placeholder="Vendor Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            <label htmlFor="vendorContactNo" className="form-label">
              Contact No
            </label>
            <input
              className="form-control-vendor-invoice"
              type="text"
              placeholder="Contact No."
              name="vendorContactNo"
              value={formData.vendorContactNo}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          
          
          <button className="btn btn-danger mt-2" onClick={handleGenerate}>
            Generate
          </button>
        </div>
      </div>
    </>
  );
}

export default VendorInvoice;
