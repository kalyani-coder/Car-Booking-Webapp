import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FaFilePdf } from "react-icons/fa";
import { Link } from "react-router-dom";
import headerlogo from "../../assects/images/shivpushpa_logo.png"
import Customer from './../CustomerEnquiry/Customer';


const ViewCustomerPayment = () => {
  const [customers, setcustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchcustomers = async () => {
      try {
        const response = await fetch(
          "http://localhost:7000/api/customer-payment"
        );
        if (!response.ok) {
          throw Error("Network response was not ok");
        }
        const data = await response.json();
        setcustomers(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchcustomers();
  }, []);

  // Define a global variable to track the invoice number
let invoiceCounter = 100;
  const handleGenerateInvoice = (customerId) => {
    const downloadConfirmed = window.confirm(
      "Do you want to download the invoice?"
    );


    // Fetch customer data for the specified customer ID
    const customer = customers.find((customer) => customer._id === customerId);

    if (downloadConfirmed) {
      if (customer) {
        const doc = new jsPDF({
          unit: "mm",
          format: "a4",
          compress: true,
          orientation: "portrait",
          // Increase the height as needed
          height: 800,
        });

      

    doc.setFillColor(60,181,205);
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), 7, 'F');


    // image 
    const img = new Image();
    img.src = headerlogo;
    doc.addImage(img, 'JPEG', 5, 10, 45, 32); 


    doc.setFillColor(211, 211, 211);

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

    doc.setFontSize(11);
    doc.text(`Invoice No: ${invoiceNo}`, 150, 15);
    doc.text(`Invoice Date : ${formattedDate}`, 150, 20);
   

    doc.setDrawColor(0, 0, 255); 
    doc.line(10, 60, 200, 60); 

    doc.text('INVOICE TO:', 10, 68); 
    
   

    const rows = [
      { label: "Customer Name", value: customer.customer_Name, yPos: 75 },
      { label: "Mobile No", value: customer.mobile_no, yPos: 80 },
      { label: "GST No", value: customer.GST_No, yPos: 85 },
      { label: "Vehicle Type", value: customer.vehicle_Type, yPos: 90 },
      { label: "Vehicle Number", value: customer.vehicle_Number, yPos: 95 }
    ];
    
    // Add the rows to the PDF
    rows.forEach(row => {
      doc.text(`${row.label}: ${row.value}`, 10, row.yPos);
    });
    doc.line(10, 105, 200, 105);

    const customerDetails = [
      ['Description', 'SAC COde', 'KMS','AMOUNT', 'TOTAL', 'CGST 2.5%', 'SGST 2.5%'],
      [`${customer.vehicle_Type} - ${customer.from} - ${customer.to} on ${customer.Date}`, '', '', '', '', '', ''], // Populate other fields accordingly
      ['Total KM', '', customer.total_Km, '', '', '', ''],
      ['Total Hr', '', customer.total_hours, '', '', '', ''], 
      ['Extra KM', '', customer.extra_Km, '', '', '', ''],
      ['Extra Hr', '', customer.extra_Hours, '', '', '', ''],
      ['Toll Parking', '', customer.toll, '', '', '', ''],
      [{ content: 'Total Amount:', styles: { fillColor: [169, 169, 169], textColor: [0, 0, 0] } }, '', "Rs. " + customer.total_Amount.toLocaleString()]
  ];

  const marginLeft = 10;
  const marginTop = 130;

  doc.autoTable({
    startY: marginTop,
    body: customerDetails,
    theme: 'grid',
    margin: { left: marginLeft }
});
        // Set the table position and dimensions
        let tableY = 60;

        // Add the table to the PDF
        doc.autoTable({
          // body: rows,
          startY: tableY,
          theme: "grid",
          styles: {
            fontSize: 10, // Default font size for the entire table
          },
          columnStyles: {
            0: { fontSize: 10, fontStyle: "bold" }, // Field names - larger and bold
            1: { fontSize: 10 }, // Values - default font size
          },
        });

        // Add space between the table and the "Bank Details" section
        doc.text("", 10, doc.autoTable.previous.finalY + 10);

        // Bank Details section
        // doc.setFontSize(10);
        // doc.text('Bank Details:', 20, doc.autoTable.previous.finalY + 20);
        // doc.text('Bank Name: The Cosmos Co-operative Bank Ltd', 20, doc.autoTable.previous.finalY + 30);
        // doc.text('Branch Name: Kasba Raviwar Branch, Pune 411 002', 20, doc.autoTable.previous.finalY + 40);
        // doc.text('Account Number: 015204301220061', 20, doc.autoTable.previous.finalY + 50);
        // doc.text('IFSC Code: COSB0000015', 20, doc.autoTable.previous.finalY + 60);
        // doc.text('MICR Code: 411164014', 20, doc.autoTable.previous.finalY + 70);

        // "Right side bottom details" section
        doc.setFontSize(12);
        // doc.text(
        //   "For Shivpushpa Travels",
        //   150,
        //   doc.autoTable.previous.finalY + 10
        // );
        // doc.text(
        //   "Authorised Signatory",
        //   150,
        //   doc.autoTable.previous.finalY + 20
        // );

        // Save the PDF or open in a new tab
        doc.save(`Invoice_${customer._id}.pdf`);
      }
    } else {
      console.error("Customer not found.");
    }
  };

  const filteredCustomers = customers.filter((customer) => {
    const customerName = customer.customer_Name || "";
    const companyName = customer.company_Name || "";
    return (
      customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      companyName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <Sidebar />
      <div className="customer-Add-container">
        <div className="customer-main-container">
          <h1 className="text-2xl font-semibold mb-4">View Customer Payment</h1>
          <input
            type="search"
            placeholder="Search By Customer Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 px-4 border rounded-lg shadow-md mb-4"
          />
          <table className="table">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Company Name</th>
                <th>GST No</th>
                <th>reporting_Address</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer._id}>
                  <td>{customer.customer_Name}</td>
                  <td>{customer.company_Name}</td>
                  <td>{customer.GST_No}</td>
                  <td>{customer.reporting_Address}</td>
                  <td>{customer.Date}</td>

                  <td>
                    <Link
                      className="btn btn-info ml-2"
                      to={`/ViewCustomerPayment/${customer._id}`}
                    >
                      View More
                    </Link>
                    <button
                      className="btn btn-info"
                      onClick={() => handleGenerateInvoice(customer._id)}
                    >
                      <FaFilePdf />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ViewCustomerPayment;
