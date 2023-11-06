import React from 'react'
import Sidebar from '../Sidebar/Sidebar';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

const Home = () => {
  return (
    <LoadingScreen>

      <>

        <Sidebar />

        <h1 className='text-center'>Welcome to Admin Dashboard</h1>

      </>
    </LoadingScreen>
  )
}

export default Home