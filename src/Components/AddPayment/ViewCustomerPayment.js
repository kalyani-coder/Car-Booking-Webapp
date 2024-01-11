import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FaFilePdf } from "react-icons/fa";
import { Link } from "react-router-dom";

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

        // Left side details
        doc.setFontSize(12);
        doc.text("Customer Payment", 20, 20, { className: "uppercase-text" });
        doc.text("Shivpushpa Travels", 20, 30);
        doc.text("332, Kasba Peth Phadke Haud Chowk, Pune 411 0111", 20, 40);
        doc.text("Mail: travelshivpushpa@gmail.com", 20, 50);

        // Right side details
        doc.setFontSize(18);
        doc.text("Invoice", 150, 20, { className: "uppercase-text" });
        doc.setFontSize(12);
        doc.text(`Invoice No: ${customer.invoice_No}`, 150, 30);
        doc.text(`Date: ${customer.Date}`, 150, 40);

        // Define the columns and rows for the table
        doc.setFontSize(12);
        const columns = ["Field", "Value"];
        const rows = [
          ["Company Name", customer.company_Name],
          ["GST No", customer.GST_No],
          ["Reporting Address", customer.reporting_Address],
          ["Date", customer.Date],
          ["Customer Name", customer.customer_Name],
          ["Vehicle Number", customer.vehicle_Number],
          ["Vehicle Type", customer.vehicle_Type],
          ["Quantity", customer.quantity],
          ["From", customer.from],
          ["To", customer.to],
          ["Closing KM", customer.closing_km],
          ["Closing Time", customer.closing_Time],
          ["Starting KM", customer.starting_Km],
          ["Starting Time", customer.starting_Time],
          ["Total KM", customer.total_Km],
          ["Title", customer.title],
          ["Title Amount", customer.title_Amount],
          ["Extra KM", customer.extra_Km],
          ["ExtraKM Amount", customer.extramkm_Amount],
          ["Extra Hours", customer.extra_Hours],
          ["ExtraHours Amount", customer.extrahours_Amount],
          ["SGST", customer.SGST],
          ["CGST", customer.CGST],
          ["Total Amount", customer.total_Amount],
          ["Advance Amount", customer.advance_Amount],
          ["Remaining Amount", customer.remaining_Amount],
          ["Payment Method", customer.payment_Method],
        ];

        // Set the table position and dimensions
        let tableY = 60;

        // Add the table to the PDF
        doc.autoTable({
          body: rows,
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
        doc.text(
          "For Shivpushpa Travels",
          150,
          doc.autoTable.previous.finalY + 10
        );
        doc.text(
          "Authorised Signatory",
          150,
          doc.autoTable.previous.finalY + 20
        );

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
