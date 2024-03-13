import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import PieChart from "../Piechart/Piechart";

const Home = () => {
  // Sample data for customers and vendors
  const data = [
    { name: "Customers", bookings: 73 },
    { name: "Vendors", bookings: 30 },
    { name: "Bookings", bookings: 13 },
    { name: "Trips", bookings: 22 },
  ];

  const newdata = {
    labels: ["enquiry", "bookings", "completed trips", "pending trips"],
    values: [65, 55, 40, 15],
  };

  return (
    <>
      <Sidebar />
      <h1 className="text-center mt-10 fs-2 fw-bold text-primary dashboard">
        Welcome to Admin Dashboard
      </h1>
      <div className="flex ml-15 justify-center mt-10">
        <div className="flex justify-start w-full max-w-3xl">
          {/* <div className="w-1/2 mr-4">
            <PieChart data={newdata} />
          </div> */}
          <div className="w-1/2">
            <BarChart width={500} height={300} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="bookings" fill="#8884d8" />
            </BarChart>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
