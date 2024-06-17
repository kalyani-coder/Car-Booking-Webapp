
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        
    });

    const { name, email, password } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        // e.preventDefault();

        try {
            const response = await fetch('http://localhost:8787/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                    
                })
            });

            const data = await response.json();

            // Handle response from the server as needed
            console.log(data);
            window.alert('Register successfull')
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <div className="flex justify-center min-h-screen bg-gray-100">
                <div className="px-8 py-6 mx-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3 h-3/4 mt-20 rounded-5">
                    <div className="flex justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-teal-600" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path
                                d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-center">Register</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mt-4">
                            <div>
                                <label className="block" htmlFor="Name">Name</label>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600"
                                    name="name"
                                    value={name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            

                            <div className="mt-4">
                                <label className="block" htmlFor="email">Email</label>
                                <input type="email" placeholder="Email"
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600"
                                    name="email"
                                    value={email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mt-4">
                                <label className="block">Password</label>
                                <input type="password" placeholder="Password"
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600"
                                    name="password"
                                    value={password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                           


                        </div>
                        <div className="flex">
                            <button
                                type="submit"
                                className="w-full px-6 py-2 mt-4 text-white bg-dark rounded-lg hover:bg-teal-700 transition duration-200"
                            >
                                Create Account
                            </button>
                        </div>
                    </form>
                    <div className="mt-6 text-grey-dark">
                        <span className="mr-2">Already have an account?</span>
                        <Link to='/' className="text-teal-600 hover:underline font-bold">
                            Log in
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;
