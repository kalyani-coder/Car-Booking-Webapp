import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Sidebar from "../Sidebar/Sidebar";

function CustomerInvoiceMonthly() {
  const [formData, setFormData] = useState({
    tripid: "",
    invoiceno: "",
    companyName: "Shivpushpa Travels Invoice",
    GST_No: "",
    companyAddress: "332, Kasba Peth  Phadke Haud Chowk,  Pune 411 0111",
    mail: "travelshivpushpa@gmail.com",
    kind_attn: "",
    Date: "",
    contactno: "9325501950 / 9325501978",
    to: "",
    CustomerName: "",
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

  const [invoiceNumber, setInvoiceNumber] = useState(101);
  const [customerList, setCustomerList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [invoicesForSelectedDate, setInvoicesForSelectedDate] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(
          "http://localhost:8787/api/customer-payment"
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

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const formattedDate = selectedDate.toISOString().split("T")[0];
        const response = await fetch(
          `http://localhost:8787/api/customer-payment/by-date/${formattedDate}`
        );

        if (response.ok) {
          const data = await response.json();
          setInvoicesForSelectedDate(data);
        } else {
          console.error("Failed to fetch invoices");
        }
      } catch (error) {
        console.error("API request error:", error);
      }
    };

    fetchInvoices();
  }, [selectedDate]);

  const handleChange = (e) => {
    const selectedCustomer = customerList.find(
      (customer) => customer.customer_Name === e.target.value
    );
    setSelectedCustomer(selectedCustomer);
  };

  const filterTripsForSelectedDate = () => {
    if (selectedCustomer && selectedDate) {
      const filteredTrips = customerList
        .filter(
          (customer) => customer.customerId === selectedCustomer.customerId
        )
        .filter(
          (trip) =>
            new Date(trip.Date).toDateString() === selectedDate.toDateString()
        );

      setInvoicesForSelectedDate(filteredTrips);
    }
  };

  useEffect(() => {
    filterTripsForSelectedDate();
  }, [selectedCustomer, selectedDate, customerList]);

  const handleGenerate = () => {
    const doc = new jsPDF();

    doc.text("Customer Invoice", 14, 20);
    doc.text(`Date: ${selectedDate.toLocaleDateString()}`, 14, 30);

    doc.save(`invoice_${selectedDate.toISOString().split("T")[0]}.pdf`);
  };

  return (
    <>
      <div className="container-customer-invoice">
        <h2
          style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}
          className="text-center mt-[1rem]"
        >
          Monthly Customer Invoice By Date
        </h2>

        <div className="form-vendor-invoice">
          <div className="grid-gap-2 col-6">
            <div className="form-group">
              {/* Date picker to select a date */}
              <label htmlFor="Date" className="form-label">
                Select Date:
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="dd-MM-yyyy"
                className="form-control"
              />
            </div>
          </div>
        </div>
        <div>
          {invoicesForSelectedDate && invoicesForSelectedDate.length > 0 && (
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
                  {invoicesForSelectedDate.map((trip) => (
                    <tr key={trip._id}>
                      <td>{`${trip.vehicle_Type} from ${trip.from} to ${trip.to}`}</td>
                      <td>{trip.saccode}</td>
                      <td>{trip.total_Km}</td>
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
                      {invoicesForSelectedDate.reduce(
                        (total, trip) => total + trip.total_Amount,
                        0
                      )}
                    </td>
                    <td>
                      {invoicesForSelectedDate.reduce(
                        (total, trip) => total + trip.SGST,
                        0
                      )}
                    </td>
                    <td>
                      {invoicesForSelectedDate.reduce(
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
                      {invoicesForSelectedDate.reduce(
                        (total, trip) =>
                          total + trip.total_Amount + trip.SGST + trip.CGST,
                        0
                      )}
                    </td>
                    <td>
                      {invoicesForSelectedDate.reduce(
                        (total, trip) => total + trip.SGST,
                        0
                      )}
                    </td>
                    <td>
                      {invoicesForSelectedDate.reduce(
                        (total, trip) => total + trip.CGST,
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

export default CustomerInvoiceMonthly;
