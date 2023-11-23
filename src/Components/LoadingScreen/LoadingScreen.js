import axios from 'axios'
import React, { useState, useEffect } from 'react'

const LoadingScreen = ({ children }) => {

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        try {
            axios.get('https://carbooking-backend-fo78.onrender.com/api/user-login', { withCredentials: true })
                .then((res) => {

                    console.log("ls", res.data)

                    if (res.data.loggedIn) {
                        localStorage.setItem('user', JSON.stringify(res.data));
                        setLoading(false)

                    } else {
                        console.log(res.data.loggedIn)
                        window.location.href = '/';
                    }
                })
        } catch (e) {
            console.log(e)
        }
    }, [])


    return (
        <>
            {loading && <div className='h-screen w-screen bg-black flex justify-center items-center'>
                <h1 className='text-white'> Loading Screen... </h1>

            </div>}
            {!loading && children}
        </>

    )
}

export default LoadingScreen