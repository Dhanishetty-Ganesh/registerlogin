import React, { useState } from 'react'; // Import React and useState hook for managing state
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom for navigation
import axios from 'axios'; // Import axios for making HTTP requests
import './index.css'; // Import CSS file

function SuperAdminLogin() {
  const navigate = useNavigate(); // Hook for navigation
  const [email, setEmail] = useState(''); // State for email input
  const [password, setPassword] = useState(''); // State for password input
  const [errorMessage, setErrorMessage] = useState(''); // State for error message

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
      // Send POST request to server to authenticate super admin
      const response = await axios.post('http://localhost:3001/superadmin/login', { email, password });
      console.log(response.data);
      // Redirect to dashboard after successful login
      navigate('/dashboard');
    } catch (error) {
      console.error('Error logging in:', error);
      // Set error message based on response status or response data
      if (error.response.status === 401) {
        // Incorrect email or password
        setErrorMessage('Incorrect email or password');
      } else {
        setErrorMessage(error.response?.data?.message || 'Internal Server Error');
      }
    }
  };

  return (
    <div className="signup-box">
      <h1>SuperAdmin Login</h1>
      {/* Display error message if present */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {/* Form for super admin login */}
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
      {/* Link to super admin registration page */}
      <p>Don't have an account? <Link to="/superadmin/register">Signup</Link></p>
    </div>
  );
}

export default SuperAdminLogin;
