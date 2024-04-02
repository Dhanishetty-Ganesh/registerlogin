import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation
import axios from 'axios'; // Import axios for making HTTP requests

import './index.css'; // Import CSS file

const AdminRegister = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    institute: '',
    whatsappnumber: '',
  });

  // State to store error message
  const [errorMessage, setErrorMessage] = useState('');

  // State to store success message
  const [successMessage, setSuccessMessage] = useState('');

  // Function to handle changes in form inputs
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      // Send POST request to server to register admin
      const response = await axios.post('http://localhost:3001/admin/register', formData);
      setSuccessMessage('Registration successful! Please log in now.'); // Set success message on successful registration
      // Clear form data
      setFormData({
        name: '',
        email: '',
        password: '',
        institute: '',
        whatsappnumber: '',
      });
    } catch (error) {
      console.error('Error registering admin:', error);
      // Set error message based on response data or generic error message if no response data is available
      setErrorMessage(error.response?.data?.message || 'Internal Server Error');
    }
  };

  return (
    <div className="admin-register-container">
      <h1>Admin Registration</h1>
      {/* Display error message if present */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {/* Form for admin registration */}
      <form onSubmit={handleSubmit} className="form-items">
        <div className="form-group">
          <label htmlFor="name" className='label-texts'>Name:</label>
          {/* Input field for name */}
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className='label-texts'>Email:</label>
          {/* Input field for email */}
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className='label-texts'>Password:</label>
          {/* Input field for password */}
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="institute"  className='label-texts'>Institute:</label>
          {/* Dropdown select for institute */}
          <select id="institute" name="institute" value={formData.institute} onChange={handleChange} required>
            <option value="">Select Institute</option>
            <option value="AKHI3421">AKHI3421 (AKHIL INSTITUTE)</option>
            <option value="RAMU8946">RAMU8946 (RAMU INSTITUTE)</option>
            <option value="PAVI6373">PAVI6373 (PAVAN INSTITUTE)</option>
            <option value="LAXM4253">LAXM4253 (LAXMAN INSTITUTE)</option>
            <option value="SURE8953">SURE8953 (SURESH INSTITUTE)</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="whatsappnumber" className='label-texts whatsapp-label'>Whatsapp Number:</label>
          {/* Input field for WhatsApp number */}
          <input
            type="tel"
            id="whatsappnumber"
            name="whatsappnumber"
            value={formData.whatsappnumber}
            onChange={handleChange}
            placeholder="Enter your WhatsApp number"
          />
        </div>

        {/* Submit button */}
        <button type="submit" className="register-button">Register</button>
      </form>

      {/* Link to admin login page */}
      <p className="para-2">
        Already have an account? <Link to="/">Login here</Link>
      </p>

      {/* Display success message if present */}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default AdminRegister;
