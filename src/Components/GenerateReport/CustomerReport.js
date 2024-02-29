import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import * as XLSX from "xlsx";

function CustomerReport() {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [reportType, setReportType] = useState("all");
  const [filterOptions, setFilterOptions] = useState({
    total_km: "",
    total_hour: "",
    extra_km: "",
    extra_hour: "",
    title: "",
    total_amount: ""
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [customers, reportType, filterOptions]);

  const fetchCustomers = () => {
    fetch(`http://localhost:7000/api/update-duty`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCustomers(data);
      })
      .catch((error) => console.error("Error fetching customers:", error));
  };

  const applyFilter = () => {
    let filteredData = [...customers];
    if (reportType === "billwiseDetails") {
      filteredData = filteredData.filter(customer => {
        for (const key in filterOptions) {
          if (filterOptions[key] !== "" && customer[key] !== filterOptions[key]) {
            return false;
          }
        }
        return true;
      });
    }
    setFilteredCustomers(filteredData);
  };

  const handleFilterChange = (event) => {
    setReportType(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFilterOptions({ ...filterOptions, [name]: value });
  };

  const downloadExcel = () => {
    if (filteredCustomers.length === 0) {
      console.error("No customers selected");
      return;
    }

    const customerData = filteredCustomers.map((customer, index) => ({
      ...customer,
      "Sr. No.": index + 1,
    }));

    const worksheet = XLSX.utils.json_to_sheet(customerData);

    const columnWidths = [
      { wch: 10 }, // Date
      { wch: 20 }, // Customer Name
      // Add more widths as needed
    ];

    worksheet["!cols"] = columnWidths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Customer Details");
    XLSX.writeFile(workbook, "customer_details.xlsx");
  };

  return (
    <>
      <Sidebar />
      <div className="container-vendor-invoice">
        <h2
          style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "8px" }}
        >
          Billwise Details Report
        </h2>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <label htmlFor="reportType" style={{ marginRight: "10px" }}>
            Select Report Type:
          </label>
          <select
            id="reportType"
            value={reportType}
            onChange={handleFilterChange}
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          >
            
            <option value="billwiseDetails">Billwise Details Report</option>
           
          </select>
          <i className="fas fa-filter ml-3"></i>
         
          <button
            className="rate-btn-submit ml-3"
            onClick={downloadExcel}
            style={{ marginBottom: "20px" }}
          >
            Export to Excel
          </button>
        </div>

        <table className="table">
          <thead>
            {reportType === "billwiseDetails" && (
              <tr>
                <th>Sr.No.</th>
                <th>Date</th>
                <th>Customer Name</th>
                <th>Total KM</th>
                <th>Rate</th>
                <th>Title</th>
                <th>Total Amount</th>
              </tr>
            )}
          </thead>
          <tbody>
            {filteredCustomers.map((customer, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{customer.date}</td>
                <td>{customer.name}</td>
                <td>{customer.totalkm}</td>
                <td>{customer.extrahour}</td>
                <td>{customer.title}</td>
                <td>{customer.totalamount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default CustomerReport;
