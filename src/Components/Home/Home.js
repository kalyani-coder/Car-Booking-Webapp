import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './Home.css'

const Home = () => {
  // Sample data for customers and vendors
  const data = [
    { name: 'Customers', bookings: 50 },
    { name: 'Vendors', bookings: 30 },
    { name: 'Bookings', bookings: 13 },
    { name: 'Trips', bookings: 22 },
    { name: 'Profit', bookings: 27 },
  ];

  return (
    <LoadingScreen>
      <>
        <Sidebar />
        <h1 className='text-center fs-2 fw-bold text-primary dashboard'>Welcome to Admin Dashboard</h1>
        <div style={{ width: '80%', margin: 'auto' }}>
          <BarChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey='bookings' fill='#8884d8' />
          </BarChart>
        </div>
      </>
    </LoadingScreen>
  );
};

export default Home;
