import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./TripDetailsReport.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as XLSX from "xlsx";

function TripDetailsReport() {
  const [tripDetails, setTripDetails] = useState([]);
  const [filteredTripDetails, setFilteredTripDetails] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [tripCounts, setTripCounts] = useState({});

  useEffect(() => {
    fetchTripDetails();
  }, []);

  useEffect(() => {
    countTrips();
  }, [filteredTripDetails]);

  const fetchTripDetails = async () => {
    try {
      const response = await fetch("http://localhost:8787/api/trip-details");
      const data = await response.json();
      setTripDetails(data);
      setFilteredTripDetails(data); // Initialize filtered trip details with all trip details
    } catch (error) {
      console.error("Error fetching trip details:", error);
    }
  };

  const handleFieldChange = (field, value) => {
    // Update selected vehicle and filter trip details based on selected vehicle
    setSelectedVehicle(value);
    if (value === "") {
      // If no vehicle selected, show all trip details
      setFilteredTripDetails(tripDetails);
    } else {
      // Filter trip details based on selected vehicle
      const filteredData = tripDetails.filter((trip) => trip.vehicle === value);
      setFilteredTripDetails(filteredData);
    }
  };

  const countTrips = () => {
    const counts = {};
    filteredTripDetails.forEach((trip) => {
      counts[trip.vehicle] = (counts[trip.vehicle] || 0) + 1;
    });
    setTripCounts(counts);
  };

  const exportToExcel = () => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileName = "trip_details_report.xlsx";
    const ws = XLSX.utils.json_to_sheet(filteredTripDetails);
    
    // Adjust column widths
    ws["!cols"] = [
      { wpx: 100 }, 
      { wpx: 150 },
      { wpx: 100 }, 
      { wpx: 150 }, 
      { wpx: 100 }, 
      { wpx: 150 }, 
      { wpx: 100 }, 
      { wpx: 150 }, 
      { wpx: 100 }, 
      { wpx: 150 }, 
      { wpx: 100 }, 
      { wpx: 150 }
    ];
  
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    const url = URL.createObjectURL(data);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
  };

  return (
    <>
      <Sidebar />
      <div className="container-customer-invoice">
        <h2
          style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}
          className="text-center"
        >
          Trip Details Report
        </h2>
        <select
          className="trip-details-input"
          name="vehicle"
          id="vehicle"
          value={selectedVehicle}
          onChange={(e) => handleFieldChange("vehicle", e.target.value)}
        >
          <option value="">Vehicle</option>
          <option value="Sedan Car">Sedan Car</option>
          <option value="Mini Car">Mini Car</option>
          <option value="SUV Car">SUV Car</option>
          <option value="Ac Bus 13-Seater">AC Bus 13-Seater</option>
          <option value="AC Bus 17-Seater">AC Bus 17-Seater</option>
          <option value="AC Bus 20-Seater">AC Bus 20-Seater</option>
          <option value="AC Bus 32-Seater">AC Bus 32-Seater</option>
          <option value="AC Bus 35-Seater">AC Bus 35-Seater</option>
          <option value="AC Bus 40-Seater">AC Bus 40-Seater</option>
          <option value="AC Bus 45-Seater">AC Bus 45-Seater</option>
          <option value="Non-AC Bus 17-Seater">Non-AC Bus 17 Seater</option>
          <option value="Non-AC Bus 20-Seater">Non-AC Bus 20 Seater</option>
          <option value="Non-AC Bus 32-Seater">Non-AC Bus 32 Seater</option>
          <option value="Non-AC Bus 40-Seater">Non-AC Bus 40 Seater</option>
          <option value="Non-AC Bus 45-Seater">Non-AC Bus 45 Seater</option>
          <option value="Non-AC Bus 49-Seater">Non-AC Bus 49 Seater</option>
        </select>

        <button className="btn btn-primary mt-2 ml-2" onClick={exportToExcel}>
          Export to Excel
        </button>

        <div className="trip-counts-container">
  {Object.keys(tripCounts).map((vehicle, index) => (
    <div key={index} className="trip-counts">
      <span>
        <strong>{vehicle} :</strong>
      </span>
      <span>{tripCounts[vehicle]}</span>
    </div>
  ))}
</div>

        <table className="table">
          <thead>
            <tr>
              <th>Sr. No.</th>
              {/* <th>Trip ID</th> */}
              <th>Date</th>
              <th>Vehicle</th>
              <th>Customer Name</th>
              <th>Trip Type</th>
              <th>Sub Type</th>
              <th>Pickup Location</th>
              <th>Dropoff Location</th>
            </tr>
          </thead>
          <tbody>
            {filteredTripDetails.map((trip, index) => (
              <tr key={trip.id}>
                <td>{index + 1}</td>
                <td>{trip.date}</td>
                <td>{trip.vehicle}</td>
                <td>{trip.customername}</td>
                <td>{trip.triptype}</td>
                <td>{trip.subtype}</td>
                <td>{trip.pickuplocation}</td>
                <td>{trip.dropofflocation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TripDetailsReport;
