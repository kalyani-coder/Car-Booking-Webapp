import React, { useState } from 'react';
import './LogIn.css'; // Import your custom CSS
import { Link } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (!emailRegex.test(newEmail)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (!passwordRegex.test(newPassword)) {
      setPasswordError('Password must be at least 8 characters and contain letters and numbers');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (emailRegex.test(email) && passwordRegex.test(password)) {
      // Perform login or further actions here
      console.log('Login successful');
    } else {
      console.log('Login failed');
    }
  };

  return (
    <div className='container'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label for="email" className="form-label">Email:</label>
          <input className="form-control"
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
          <span className="error">{emailError}</span>
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <span className="error">{passwordError}</span>
        </div>
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to={"/Signup"}>
        signup
      </Link></p>
    </div>
  );
};

export default Login;