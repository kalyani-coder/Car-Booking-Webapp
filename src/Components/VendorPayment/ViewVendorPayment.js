import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FaTrash, FaFilePdf, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import headerlogo from "../../assects/images/shivpushpa_logo.png";

const ViewVendorPayment = () => {
  const [vendors, setVendors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [filteredShareDetails, setFilteredShareDetails] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch(
          "http://localhost:8787/api/vender-payment"
        );
        if (!response.ok) {
          throw Error("Network response was not ok");
        }
        const data = await response.json();
        setVendors(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchVendors();
  }, []);

  const handleVendorsDelete = async (vendorId) => {
    const confirmed = window.confirm(
      "Do you want to delete this Vendor Payment?"
    );
    if (confirmed) {
      // Optimistically update the UI
      const updatedDetails = filteredShareDetails.filter(
        (item) => item._id !== vendorId
      );
      setFilteredShareDetails(updatedDetails);

      try {
        const response = await fetch(
          `http://localhost:8787/api/vender-payment/${vendorId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        alert("Vendor payment deleted successfully");
      } catch (error) {
        console.error("Error deleting vendor payment:", error);
        setError("Error deleting vendor payment: " + error.message);

        // Optionally, revert the UI update if the API call fails
        setFilteredShareDetails((prevDetails) => [
          ...prevDetails,
          filteredShareDetails.find((item) => item._id === vendorId),
        ]);
      }
    }
  };

  // Define a global variable to track the invoice number
  let invoiceCounter = 100;

  const handleGenerateInvoice = (vendor) => {
    const downloadConfirmed = window.confirm(
      "Do you want to download the invoice?"
    );

    if (downloadConfirmed) {
      const doc = new jsPDF({
        unit: "mm",
        format: "a4",
        compress: true,
        orientation: "portrait",
        // Increase the height as needed
        height: 800,
      });

      doc.setFillColor(60, 181, 205);
      doc.rect(0, 0, doc.internal.pageSize.getWidth(), 7, "F");

      // Add header image
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
      doc.text(`Invoice Date: ${formattedDate}`, 150, 20);

      doc.setDrawColor(0, 0, 255);
      doc.line(10, 45, 200, 45);

      doc.text("INVOICE TO:", 10, 55);

      const rows = [
        { label: "Vendor Name", value: vendor.vender_Name, yPos: 62 },
        { label: "Mobile No", value: vendor.mobile_Number, yPos: 67 },
        { label: "GST No", value: vendor.GST_No, yPos: 72 },
      ];

      // Add the rows to the PDF
      rows.forEach((row) => {
        doc.text(`${row.label}: ${row.value}`, 10, row.yPos);
      });
      doc.line(10, 80, 200, 80);

      const vendorDetails = [
        ["Description", "kms", "AMOUNT", "TOTAL", "TDS 1%"],
        [
          `${vendor.vehicle_type} - ${vendor.from} - ${vendor.to} on ${vendor.current_Date}`,
          "",
          "",
          "",
          "",
          "",
        ],
        ["Total KM", vendor.total_km, "", vendor.total_amount, vendor.tds],
        ["Total Hr", vendor.total_hour, "", "", "", ""],
        // ['Extra KM',  vendor.extra_km, vendor.total_amount, vendor.extramkm_Amount,'' ],
        // ['Extra Hr', vendor.extra_hour, vendor.extrahours_Amount, vendor.extrahours_Amount],
        // [{ content: 'Sub Total:', colSpan: 4, styles: { fillColor: [169, 169, 169] } }, `Rs. ${vendor.subtotal_Amount.toLocaleString()}`],
        // [{ content: 'Total Amount:', colSpan: 4, styles: { fillColor: [169, 169, 169] } }, `Rs. ${vendor.total_amount.toLocaleString()}`]
      ];

      // Convert total amount to words
      const numberToWords = require("number-to-words");
      // const totalAmountInWords = numberToWords.toWords(vendor.total_amount);
      // const capitalizedTotalAmountInWords = totalAmountInWords.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });

      // Add the total amount in words below the table
      // vendorDetails.push([{ content: `Total Amount: Rs. ${capitalizedTotalAmountInWords}`, colSpan: 6, styles: { textColor: [0, 0, 0] } }]);

      const marginLeft = 10;
      const marginTop = 110;

      doc.autoTable({
        startY: marginTop,
        body: vendorDetails,
        theme: "grid",
        margin: { left: marginLeft },
      });

      // Bank Details section on the left side
      doc.setFontSize(10);
      doc.text("Bank Details:", 10, doc.autoTable.previous.finalY + 17);
      doc.text(
        "Bank Name: The Cosmos Co-operative Bank Ltd",
        10,
        doc.autoTable.previous.finalY + 24
      );
      doc.text(
        "Branch Name: Kasba Raviwar Branch, Pune 411 002",
        10,
        doc.autoTable.previous.finalY + 31
      );
      doc.text(
        "Account Number: 015204301220061",
        10,
        doc.autoTable.previous.finalY + 38
      );
      doc.text(
        "IFSC Code: COSB0000015",
        10,
        doc.autoTable.previous.finalY + 45
      );
      doc.text("MICR Code: 411164014", 10, doc.autoTable.previous.finalY + 52);

      // Additional details on the right side
      doc.text(
        "For Shivpushpa Travels",
        160,
        doc.autoTable.previous.finalY + 20
      );
      doc.text("Authorised Signatory", 160, doc.autoTable.previous.finalY + 30);

      // Save the PDF or open in a new tab
      doc.save(`Invoice_${vendor._id}.pdf`);
    }
  };

  // const handleViewMore = (vendor) => {
  //   setSelectedVendor(vendor);
  // };

  const filteredVendors = vendors.filter((vendor) => {
    const vendorName = vendor.vender_Name || "";
    const companyName = vendor.company_Name || "";
    return (
      vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      companyName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <div className="vendor-Add-container">
        <div className="vendor-main-container">
          <h2 className="View-Corporate-Customer-Rate font-bold p-4 my-4">
            View Vendor Payment
          </h2>
          <input
            type="search"
            placeholder="Search By Vendor Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 px-4 border rounded-lg shadow-md mb-4"
          />
          <div className="view-vendor-payment-table-overflow-y-cc">
            <table className="table">
              <thead>
                <tr>
                  <th>Sr. No.</th>
                  <th>Vendor Name</th>
                  <th>Company Name</th>
                  <th>Vehicle Type</th>
                  <th>Mobile Number</th>
                  <th>Payment</th>
                  {/* <th>Amount</th> */}
                  <th>Tds 1 %</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredVendors.map((vendor, index) => (
                  <React.Fragment key={vendor._id}>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{vendor.vender_Name}</td>
                      <td>{vendor.company_Name}</td>
                      <td>{vendor.vehicle_type}</td>
                      <td>{vendor.mobile_Number}</td>
                      <td>{vendor.payment}</td>
                      {/* <td>{vendor.amount}</td> */}
                      <td>{vendor.tds}</td>
                      <td>
                        <Link
                          className="btn btn-primary btn-sm ml-2"
                          to={`/ViewVendorPayment/${vendor._id}`}
                        >
                          <i className="fas fa-eye"></i>
                        </Link>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleVendorsDelete(vendor._id)}
                        >
                          <FaTrash />
                        </button>
                        <button
                          className="btn btn-info"
                          onClick={() => handleGenerateInvoice(vendor)}
                        >
                          <FaFilePdf />
                        </button>
                      </td>
                    </tr>

                    {selectedVendor === vendor && (
                      <tr>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={() => handleGenerateInvoice(vendor)}
                          >
                            <FaFilePdf />
                          </button>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewVendorPayment;
