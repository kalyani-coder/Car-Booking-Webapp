import React, { useState  } from 'react';
import './LogIn.css';
import { Link } from 'react-router-dom';

const LogIn = () => {
  const initialFormData = {
    email: '',
    password: '',

  };
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form data:', formData);
  };

  return (
    <div class="container d-flex">
        <div class="row width-container-for-login">
            <div class="justify-content-center  align-items-center">
                <form>
                    <div class="mb-3">
                        <label htmlFor="email" class="form-label">Email:</label>
                        <input type="email" class="form-control" id="email" placeholder="Enter your email"/>
                    </div>
                    <div class="mb-3">
                        <label htmlFor="password" class="form-label">Password:</label>
                        <input type="password" class="form-control" id="password" placeholder="Enter your password"/>
                    </div>
                    <Link to='/home'>
                    <button type="submit" class="btn btn-primary">Login</button>
                    </Link>
                      
                </form>
            </div>
        </div>
    </div>
  )
};

export default LogIn;
