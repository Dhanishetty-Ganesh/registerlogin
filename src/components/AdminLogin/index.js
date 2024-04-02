import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom
import axios from 'axios'; // Import axios for making HTTP requests
import './index.css'; // Import CSS file

function AdminLogin() {
  const navigate = useNavigate(); // Hook for navigating between pages
  const [email, setEmail] = useState(''); // State for storing email input
  const [password, setPassword] = useState(''); // State for storing password input
  const [errorMessage, setErrorMessage] = useState(''); // State for storing error message

  // Function to handle changes in email input
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Function to handle changes in password input
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    try {
      // Send POST request to server to authenticate admin
      const response = await axios.post('http://localhost:3001/admin/login', { email, password });
      console.log(response.data);
      // Check if response contains institute information
      const instituteName = response.data?.institute;
      const userType = 'admin'; // Assuming the user type is always 'admin' for admin login
      if (instituteName) {
        // Redirect to dashboard with the institute name and userType as query parameters
        navigate(`/dashboard?institute=${encodeURIComponent(instituteName)}&userType=${encodeURIComponent(userType)}`);
      } else {
        // Set error message if institute name is not found in response
        setErrorMessage('Institute name not found in response.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      // Set error message based on response data or generic error message if no response data is available
      setErrorMessage(error.response?.data?.message || 'Internal Server Error');
    }
  };

  return (
    <div className="signup-box">
      <h1>Admin Login</h1>
      {/* Display error message if present */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {/* Form for admin login */}
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        {/* Input field for email */}
        <input
          type="email"
          placeholder=""
          value={email}
          onChange={handleEmailChange}
          required
        />
        <label>Password</label>
        {/* Input field for password */}
        <input
          type="password"
          placeholder=""
          value={password}
          onChange={handlePasswordChange}
          required
        />
        {/* Submit button */}
        <input type="submit" value="Submit" />
      </form>
      {/* Link to admin registration page */}
      <p>Don't have an account? <Link to="/admin/register">Signup</Link></p>
    </div>
  );
}

export default AdminLogin;
