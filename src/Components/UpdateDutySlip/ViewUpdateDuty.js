import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { FaEdit, FaSave, FaTrash, FaFilePdf } from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Customer from "./../CustomerEnquiry/Customer";

const ViewUpdateDuty = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDetails, setShowDetails] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState({});

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://localhost:8787/api/update-duty");
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

  let invoiceCounter = 100;

  const generateTripDutySlip = async (customerId) => {
    try {
      const response = await fetch(
        `http://localhost:8787/api/update-duty/${customerId}`
      );
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

        // Set heading properties
        const heading = "Shivpushpa Travels".toUpperCase();
        doc.setFont("helvetica", "bold"); // Set font to Helvetica Bold
        doc.setFontSize(22); // Set font size to 22

        // Center the heading on the page and set it to red
        // Set page dimensions
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        // Draw border
        const margin = 10;
        doc.rect(
          margin,
          margin,
          pageWidth - 2 * margin,
          pageHeight - 2 * margin
        );
        const headingX =
          pageWidth / 2 -
          (doc.getStringUnitWidth(heading) * doc.internal.getFontSize()) / 6;
        doc.setTextColor(255, 0, 0); // Set text color to red
        doc.text(heading, headingX, 20);

        // Reset text properties for the address lines
        doc.setTextColor(0, 0, 0); // Reset text color to black
        doc.setFontSize(12); // Reset font size to 12
        doc.setFont("helvetica", "normal"); // Reset font to normal

        const addressLines = [
          "Address: 332, Kasba Peth Near Hero Honda Showroom, Pune 411 0111",
          "Cell: 9325501950 / 9325501978",
        ];

        addressLines.forEach((line, index) => {
          const textWidth =
            doc.getStringUnitWidth(line) * doc.internal.getFontSize();
          const textX = pageWidth / 2 - textWidth / 6;
          doc.text(line, textX, 30 + index * 10);
        });

        // Increment the invoice counter and pad it to ensure it's always three digits
        invoiceCounter++;
        const invoiceNo = invoiceCounter.toString().padStart(3, "0");

        // Left side table details
        const leftDetails = [
          ["Company Name:", "Shivpushpa Travels"],
          ["Reporting Address:", formData.reportingaddress],
        ];

        // Right side table details
        const rightDetails = [
          ["Duty Slip No:", setSelectedCustomer.trip_duty_number],
          ["Date:", formData.date],
        ];

        // Render left side table
        doc.autoTable({
          startY: 60,
          margin: { left: 14 }, // Positioning the left table
          body: leftDetails,
          theme: "grid",
          styles: { fontSize: 10 },
          columnStyles: {
            0: { fontStyle: "bold", halign: "left", cellWidth: 40 },
            1: { halign: "left" }, // Style for the second column
          },
        });

        // Render right side table
        doc.autoTable({
          startY: 60,
          margin: { left: pageWidth / 2 + 20 }, // Positioning the right table
          body: rightDetails,
          theme: "grid",
          styles: { fontSize: 10 },
          columnStyles: {
            0: { fontStyle: "bold", halign: "left" },
            1: { halign: "left" },
          },
        });

        // Define additional details rows
        const additionalRows = [
          [
            "User Name:",
            formData.name,
            "Vehicle No.",
            formData.vehiclenumber,
            "Type of Car",
            formData.vehicle,
          ],
          ["From", formData.from, "To", formData.to],
        ];

        // Render additional details table
        doc.autoTable({
          startY: Math.max(doc.lastAutoTable.finalY + 10, 70), // Ensure it starts below the previous tables
          body: additionalRows,
          theme: "grid",
          styles: { fontSize: 10 },
          columnStyles: {
            0: { fontStyle: "bold", halign: "left" },
            1: { halign: "left" },
            2: { fontStyle: "bold", halign: "left", cellWidth: "auto" }, // Adjust the cell width for the third column
            3: { halign: "left" },
            4: { fontStyle: "bold", halign: "left", cellWidth: "auto" }, // Adjust the cell width for the fifth column
            5: { halign: "left" },
          },
        });

        // Define table columns and rows
        const rows = [
          [
            "Closing Kms:",
            formData.closingkm,
            "Closing Time:",
            formData.closingtime,
            "8 Hrs. 80 Kms. @",
            formData.extrakm,
          ],
          [
            "Starting KM:",
            formData.startingkm,
            "Reporting Time:",
            formData.startingtime,
            "Extra Kms. @",
            formData.extrakm,
            ,
          ],
          [
            "Total Kms:",
            formData.totalkm,
            "Total Hours:",
            formData.totalhour,
            "Extra Hours:",
            formData.extrahour,
          ],
          ["", "", "", "", "Total Amount", `${formData.totalamount} Rs.`],
          ["", "", "", "", "Less Advance", `Rs. ${formData.advanceamount} Rs.`],
          ["Customer's Signature:", "", "", "", "Net Bill"],
        ];

        // Render bottom table
        doc.autoTable({
          startY: Math.max(doc.lastAutoTable.finalY + 10, 70), // Ensure it starts below the previous tables
          body: rows,
          theme: "grid",
          styles: { fontSize: 10 },
          columnStyles: {
            0: { fontStyle: "bold", halign: "left" },
            1: { halign: "left" },
            2: { fontStyle: "bold", halign: "left" },
            3: { halign: "left" },
          },
        });
        // Add instruction and signature section
        const instructionLines = [
          "Instruction for Next Booking if any:",
          "• Kms and hours ex-our office.",
          "• Minimum 300 Km per day.",
          "• The second day will starts at 12.00 midnight.",
          "• Toll, Tax, Parking etc at passenger's account.",
        ];

        doc.setTextColor(255, 0, 0); // Set text color to red
        doc.setFontSize(10); // Set font size to 12
        doc.setFont("helvetica", "bold");
        let yOffset = doc.lastAutoTable.finalY + 7;
        doc.text(instructionLines[0], 15, yOffset);

        // Normal lines
        doc.setTextColor(0, 0, 0); // Set text color to black
        doc.setFont("helvetica", "normal"); // Set font to normal
        instructionLines.slice(1).forEach((line, index) => {
          doc.text(line, 15, yOffset + (index + 1) * 7);
        });

        doc.setTextColor(255, 0, 0); // Set text color to red
        doc.setFont("helvetica", "bold"); // Set font to bold
        doc.text("FOR SHIVPUSHPA TRAVELS", 145, yOffset);

        doc.setTextColor(0, 0, 0); // Set text color to black
        doc.setFont("helvetica", "normal"); // Reset font to normal
        doc.text("Authorized Signatory", pageWidth - 60, yOffset + 10);

        // Save the PDF or open in a new tab
        doc.save(`Duty_Slip_${formData.date}.pdf`);
      }
    } catch (error) {
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

  const handleDelete = async (customerId) => {
    const confirmDelete = window.confirm(
      "Do you want to delete the update duty?"
    );

    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:8787/api/update-duty/${customerId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        } else {
          // Customer deleted successfully, update UI
          alert("Customer deleted successfully");

          // Filter out the deleted customer from the list
          setFilteredCustomers((prevCustomers) =>
            prevCustomers.filter((c) => c._id !== customerId)
          );
        }

        // Log the response for debugging
        console.log("Delete response:", response);
      } catch (error) {
        // Handle errors
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
                {/* <th>Customer Name</th> */}
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
                    {/* <td>{customer.name}</td> */}
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
                            <i className="fas fa-eye"></i>
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(customer._id)}
                          >
                            <FaTrash />
                          </button>

                          <button
                            className="btn btn-info"
                            onClick={() => generateTripDutySlip(customer._id)}
                          >
                            <FaFilePdf />
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
                          <strong>Reporting Address:</strong>{" "}
                          {customer.reportingaddress}
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
                          <strong>Vehicle Number:</strong>{" "}
                          {customer.vehiclenumber}
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
                          <strong>Starting Time:</strong>{" "}
                          {customer.startingtime}
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
                          <strong>Advance Amount:</strong>{" "}
                          {customer.advanceamount}
                        </p>
                        <p className="mb-2">
                          <strong>Payment Method:</strong>{" "}
                          {customer.paymentmethod}
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
                          <strong>Cash Receiver:</strong>{" "}
                          {customer.cashReceiver}
                        </p>
                        <p className="mb-2">
                          <strong>Transaction ID:</strong>{" "}
                          {customer.transactionId}
                        </p>
                        <p className="mb-2">
                          <strong>Transaction Number:</strong>{" "}
                          {customer.TransactionNumber}
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
