import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./VendorReport.css";
import * as XLSX from "xlsx";

function VendorReport() {
  const [vendors, setVendors] = useState([]);
  const [filterByVendorName, setFilterByVendorName] = useState("");
  const [filterByPayment, setFilterByPayment] = useState("all");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [tripCounts, setTripCounts] = useState({});

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = () => {
    fetch(`http://localhost:8787/api/vender-payment`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setVendors(data);
      })
      .catch((error) => console.error("Error fetching vendors:", error));
  };

  const handleFilterByVendorName = (event) => {
    setFilterByVendorName(event.target.value);
  };

  const handleFilterByPayment = (event) => {
    setFilterByPayment(event.target.value);
  };

  const handleFieldChange = (field, value) => {
    if (field === "vehicle") {
      setSelectedVehicle(value);
    }
  };

  useEffect(() => {
    const calculateTripCounts = () => {
      const counts = {};
      vendors.forEach((vendor) => {
        const vehicleType = vendor.vehicle;
        if (counts[vehicleType]) {
          counts[vehicleType]++;
        } else {
          counts[vehicleType] = 1;
        }
      });
      setTripCounts(counts);
    };

    calculateTripCounts();
  }, [vendors]);

  const filteredVendors = vendors.filter((vendor) => {
    const amount = vendor.amount ? vendor.amount.toString() : "";
    const vendorName = vendor.vender_Name
      ? vendor.vender_Name.toLowerCase()
      : "";
    const paymentStatus =
      filterByPayment === "Partial"
        ? vendor.payment === "Partial"
        : filterByPayment === "Partial"
        ? vendor.payment === "Full Payment"
        : true;
    return (
      vendorName.includes(filterByVendorName.toLowerCase()) && paymentStatus
    );
  });

  const downloadExcel = () => {
    if (filteredVendors.length === 0) {
      console.error("No vendors selected");
      return;
    }

    const vendorData = filteredVendors.map((vendor, index) => ({
      "Sr. No.": index + 1,
      "Vendor Name": vendor.vender_Name,
      GSTIN: vendor.GST_No,
      "Mobile No.": vendor.mobile_Number,
      "Company Name": vendor.company_Name,
      Amount: vendor.total_Amount,
      TDS: vendor.tds,
      "Total Amt": vendor.amount,
      // "Paid Amount": vendor.paid_Amount,
      // "Remaining Amount": vendor.remaining_Amount,
      Payment: vendor.payment,
      "Payment Method": vendor.payment_Method,
    }));

    const worksheet = XLSX.utils.json_to_sheet(vendorData);

    const columnWidths = [
      { wch: 8 }, // Sr. No.
      { wch: 20 }, // Vendor Name
      { wch: 15 }, // GSTIN
      { wch: 15 }, // Mobile No.
      { wch: 25 }, // Company Name
      { wch: 15 }, // Amount
      { wch: 10 }, // TDS
      { wch: 15 }, // Total Amt
      { wch: 15 }, // Paid Amount
      { wch: 15 }, // Remaining Amount
      { wch: 15 }, // Payment
      { wch: 20 }, // Payment Method
    ];

    worksheet["!cols"] = columnWidths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Vendor Details");
    XLSX.writeFile(workbook, "vendor_details.xlsx");
  };

  return (
    <>
      <div className="container-vendor-invoice">
        <h2
          style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}
          className="ml-[30%] mt-[1rem]"
        >
          Vendor Report
        </h2>

        <div className="grid-container">
          <div className="filters">
            <div className="filter-input">
              <input
                type="text"
                placeholder="Filter by Vendor Name"
                value={filterByVendorName}
                onChange={handleFilterByVendorName}
              />
              <i className="fas fa-filter"></i>
            </div>
            <div className="filter-dropdown">
              <select value={filterByPayment} onChange={handleFilterByPayment}>
                <option value="all">All Payments</option>
                <option value="Partial">Partially</option>
                <option value="Fully Payment">Fully Payment</option>
              </select>
            </div>
            <div className="filter-dropdown">
              <select
                value={selectedVehicle}
                onChange={(e) => handleFieldChange("vehicle", e.target.value)}
              >
                <option value="">Vehicle</option>
                <option value="Sedan Car">Sedan Car</option>
                <option value="Mini Car">Mini Car</option>
                <option value="SUV Car">SUV Car</option>
                <option value="Ac Bus 13-Seater">AC Bus 13-Seater</option>
                <option value="Ac Bus 17-Seater">AC Bus 17-Seater</option>
                <option value="Ac Bus 20-Seater">AC Bus 20-Seater</option>
                <option value="Ac Bus 32-Seater">AC Bus 32-Seater</option>
                <option value="Ac Bus 35-Seater">AC Bus 35-Seater</option>
                <option value="Ac Bus 40-Seater">AC Bus 40-Seater</option>
                <option value="Ac Bus 45-Seater">AC Bus 45-Seater</option>
                <option value="Non-AC Bus 17-Seater">
                  Non-AC Bus 17 Seater
                </option>
                <option value="Non-AC Bus 20-Seater">
                  Non-AC Bus 20 Seater
                </option>
                <option value="Non-AC Bus 32-Seater">
                  Non-AC Bus 32 Seater
                </option>
                <option value="Non-AC Bus 40-Seater">
                  Non-AC Bus 40 Seater
                </option>
                <option value="Non-AC Bus 45-Seater">
                  Non-AC Bus 45 Seater
                </option>
                <option value="Non-AC Bus 49-Seater">
                  Non-AC Bus 49 Seater
                </option>
              </select>
              {selectedVehicle && (
                <div className="trip-counts">
                  <span className="mb-3">
                    <strong>Vehicle Type: {selectedVehicle}:</strong>{" "}
                  </span>
                  <span>{tripCounts[selectedVehicle] || 0}</span>
                </div>
              )}
            </div>
          </div>

          <div className="export-button">
            <button className="rate-btn-submit" onClick={downloadExcel}>
              Export to Excel
            </button>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Vendor Name</th>
              <th>GST No</th>
              <th>Invoice Number</th>
              <th>Mobile Number</th>
              <th>Company Name</th>
              <th>Vehicle Type</th>
              <th>Amount</th>
              <th>TDS</th>
              <th>Payables Amount</th>
              {/* <th>Paid Amount</th>
              <th>Remaining Amount</th> */}
              <th>Payment</th>
              {/* <th>Payment Method</th> */}
            </tr>
          </thead>
          <tbody>
            {filteredVendors.map((vendor, index) => (
              <tr key={vendor._id}>
                <td>{index + 1}</td>
                <td>{vendor.vender_Name}</td>
                <td>{vendor.GST_No}</td>
                <td></td>
                <td>{vendor.mobile_Number}</td>
                <td>{vendor.company_Name}</td>
                <td>{vendor.vehicle_type}</td>
                <td>{vendor.total_Amount}</td>
                <td>{vendor.tds}</td>
                <td>{vendor.amount}</td>
                {/* <td>{vendor.paid_Amount}</td>
                <td>{vendor.remaining_Amount}</td> */}
                <td>{vendor.payment}</td>
                {/* <td>{vendor.payment_Method}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default VendorReport;
