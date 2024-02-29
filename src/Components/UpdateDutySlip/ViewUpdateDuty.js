import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { FaEdit, FaSave, FaTrash } from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Customer from './../CustomerEnquiry/Customer';

const ViewUpdateDuty = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDetails, setShowDetails] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://localhost:7000/api/update-duty");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCustomers(data);
        setFilteredCustomers(data); // Initialize filtered data with all customer inquiries
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data: " + error.message);
      }
    };

    fetchCustomers();
  }, []);


   // Define a global variable to track the invoice number
let invoiceCounter = 100;
const generateTripDutySlip = async (customerId) => {
  try {
    // Fetch customer details from the API based on the customerId
    const response = await fetch(`http://localhost:7000/api/update-duty/${customerId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch customer details");
    }
    const formData = await response.json();

    console.log(formData);
  const downloadConfirmed = window.confirm(
    "Do you want to download the trip duty slip?"
  );

  if (downloadConfirmed) {
    const doc = new jsPDF();
    doc.setFontSize(18);
// Center the "Trip Duty Slip" heading on the page
const tripDutySlipX = (doc.internal.pageSize.getWidth() / 2) - (doc.getStringUnitWidth("Trip Duty Slip") * 18 / 2);
doc.text("Trip Duty Slip", tripDutySlipX, 20, { className: "uppercase-text" });
    // Increment the invoice counter and pad it to ensure it's always three digits
  invoiceCounter++;
  const invoiceNo = invoiceCounter.toString().padStart(3, '0');
    // Add left side details
    doc.setFontSize(12);
    doc.text("Report To: Shivpushpa Travels", 20, 30);
    doc.text("Mobile: 9325501950 / 9325501978",20,40)
    doc.text("Address: 332, Kasba Peth", 20, 50);
    doc.text("Phadke Haud Chowk, Pune 411 0111",20,60)
    doc.text("Mail: travelshivpushpa@gmail.com", 20, 70);

    // Add space between left and right side details
    doc.text("", 10, 80);

    // Add right side details
   
    doc.setFontSize(12);

    doc.text(`Date: ${formData.date}`, 140, 30);
    doc.text(`Invoice No: ${invoiceNo}`, 140, 40);
    doc.text(`Type Of Vehicle: ${formData.vehicle}`, 140,50);
    doc.text(`Vehicle No.: ${formData.vehiclenumber}`, 140,60);


    // Add a line to separate left and right side details
    doc.line(30, 80, 200, 80);

    // Add space between the header and the table
    doc.text("", 10, 90);

    // Add table
    const columns = ["Field", "Value"];
    const rows = [
      
      ["Reporting Address", formData.reportingaddress],
      ["Customer Name", formData.name],
      ["Type Of Vehicle", formData.vehicle],
      ["Vehicle Number", formData.vehiclenumber],
      ["Rate", formData.rate],
      ["From", formData.from],
      ["To", formData.to],
      ["Duty Type", formData.title],
      ["Amount", formData.amount],
      ["Starting Time", formData.startingtime],
      ["Closing Time", formData.closingtime],
      ["Starting KM", formData.startingkm],
      ["Closing KM", formData.closingkm],
      ["Total Hour", formData.totalhour],
      ["Total KM", formData.totalkm],
      ["Extra Hour", formData.extrahour],
      ["Extra Hours Amount", formData.extrahoursamount],
      ["Extra KMS", formData.extrakm],
      ["Extra KMS Amount", formData.extrakmamount],
      ["SubTotal Amount", formData.subtotalamount],
      ["SGST 2.5%", formData.sgst],
      ["CGST 2.5%", formData.cgst],
      ["Total Amount", formData.totalamount],
      ["Advanced Amount", formData.advanceamount],
      ["Remaining Amount", formData.remainingamount],
    ];

    const startYPosition = 20; 
    // Position the table below the left and right side details
    doc.autoTable({
      body: rows,
      startY: 100,
      theme: "grid",
      styles: {
        fontSize: 10,
        halign: "center",
      },
      columnStyles: {
        0: { fontStyle: "bold", halign: "left" },
        1: { halign: "left" },
      },
    });

    // Save the PDF or open in a new tab
    doc.save(`Trip_Duty_Slip_${formData.date}.pdf`);
  }
}catch (error) {
  console.error("Error generating trip duty slip:", error);
  alert("Failed to generate trip duty slip. Please try again.");
}
};

  const handleEdit = (customer) => {
    setEditingCustomer({ ...customer });
  };

  const handleSave = () => {
    // Handle save logic here, for example, make an API request to update the data
    // Once saved, setEditingCustomer to null to exit the editing mode
    setEditingCustomer(null);
  };

  const handleDelete = async (customer) => {
    // Display an alert with customer data before deletion
    const confirmDelete = window.confirm("Do you want to delete the customer?");

    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:7000/api/update-duty/${customer._id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        setFilteredCustomers((prevCustomers) =>
          prevCustomers.filter((c) => c._id !== customer._id)
        );
        alert("Customer deleted successfully");
      } catch (error) {
        console.error("Error deleting customer:", error);
        setError("Error deleting customer: " + error.message);
      }
    }
  };

  // Function to toggle showing details for a specific customer
  const toggleShowDetails = (customerId) => {
    setShowDetails(showDetails === customerId ? null : customerId);
  };

  // Function to filter customers based on search criteria
  const filterCustomers = () => {
    const filteredData = customers.filter((customer) => {
      const customerNameMatches = customer.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const companyNameMatches = customer.companyname
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return customerNameMatches || companyNameMatches;
    });

    setFilteredCustomers(filteredData);
  };

  useEffect(() => {
    filterCustomers();
  }, [searchQuery]);

  return (
    <>
      <Sidebar />
      <div className="customer-Add-container">
        <div className="customer-main-container">
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            View Duty Slip
          </h2>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by Customer Name / Company Name"
              className="w-full p-2 rounded border"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Company Name</th>
                <th>GST No</th>
                <th>Reporting Address</th>
                <th>Date</th>
                <th>Customer Name</th>
                <th>Vehicle</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <React.Fragment key={customer._id}>
                  <tr>
                    <td>{customer.companyname}</td>
                    <td>{customer.gstno}</td>
                    <td>{customer.reportingaddress}</td>
                    <td>{customer.date}</td>
                    <td>{customer.name}</td>
                    <td>{customer.vehicle}</td>
                    <td>
                      {editingCustomer &&
                      editingCustomer._id === customer._id ? (
                        <button
                          className="btn btn-success"
                          onClick={handleSave}
                        >
                          <FaSave />
                        </button>
                      ) : (
                        <>
                          <button
                            className="btn btn-primary"
                            onClick={() => toggleShowDetails(customer._id)}
                          >
                            View More
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(customer)}
                          >
                            <FaTrash />
                          </button>
                          <button className="btn btn-info"  onClick={() => generateTripDutySlip(customer._id)}>
            Print
          </button>
                        </>
                      )}
                    </td>
                  </tr>
                  {showDetails === customer._id && (
                    <tr>
                      <td colSpan="7" className="mb-4">
                      <p className="mb-2">
        <strong>Company Name:</strong> {customer.companyname}
      </p>
      <p className="mb-2">
        <strong>GST No:</strong> {customer.gstno}
      </p>
      <p className="mb-2">
        <strong>Reporting Address:</strong> {customer.reportingaddress}
      </p>
      <p className="mb-2">
        <strong>Date:</strong> {customer.date}
      </p>
      <p className="mb-2">
        <strong>Name:</strong> {customer.name}
      </p>
      <p className="mb-2">
        <strong>Vehicle:</strong> {customer.vehicle}
      </p>
      <p className="mb-2">
        <strong>Vehicle Number:</strong> {customer.vehiclenumber}
      </p>
      <p className="mb-2">
        <strong>From:</strong> {customer.from}
      </p>
      <p className="mb-2">
        <strong>To:</strong> {customer.to}
      </p>
      <p className="mb-2">
        <strong>Closing KM:</strong> {customer.closingkm}
      </p>
      <p className="mb-2">
        <strong>Closing Time:</strong> {customer.closingtime}
      </p>
      <p className="mb-2">
        <strong>Starting KM:</strong> {customer.startingkm}
      </p>
      <p className="mb-2">
        <strong>Starting Time:</strong> {customer.startingtime}
      </p>
      <p className="mb-2">
        <strong>Total KM:</strong> {customer.totalkm}
      </p>
      <p className="mb-2">
        <strong>Total Hour:</strong> {customer.totalhour}
      </p>
      <p className="mb-2">
        <strong>Title:</strong> {customer.title}
      </p>
      <p className="mb-2">
        <strong>Amount:</strong> {customer.amount}
      </p>
      <p className="mb-2">
        <strong>Extra KM:</strong> {customer.extrakm}
      </p>
      <p className="mb-2">
        <strong>Amount1:</strong> {customer.amount1}
      </p>
      <p className="mb-2">
        <strong>Extra Hour:</strong> {customer.extrahour}
      </p>
      <p className="mb-2">
        <strong>Amount2:</strong> {customer.amount2}
      </p>
      <p className="mb-2">
        <strong>Total Amount:</strong> {customer.totalamount}
      </p>
      <p className="mb-2">
        <strong>Advance Amount:</strong> {customer.advanceamount}
      </p>
      <p className="mb-2">
        <strong>Payment Method:</strong> {customer.paymentmethod}
      </p>
      <p className="mb-2">
        <strong>Cheque No:</strong> {customer.chequeNo}
      </p>
      <p className="mb-2">
        <strong>IFSC Code:</strong> {customer.ifscCode}
      </p>
      <p className="mb-2">
        <strong>UPI ID:</strong> {customer.upiId}
      </p>
      <p className="mb-2">
        <strong>Cash Receiver:</strong> {customer.cashReceiver}
      </p>
      <p className="mb-2">
        <strong>Transaction ID:</strong> {customer.transactionId}
      </p>
      <p className="mb-2">
        <strong>Transaction Number:</strong> {customer.TransactionNumber}
      </p>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ViewUpdateDuty;
