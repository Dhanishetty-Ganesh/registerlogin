import React, { useState } from 'react';
import axios from 'axios';
import './index.css';

// Functional component for user registration form
function UserRegister() {
  // State to manage form data and registration status
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    institute: '',
    whatsappNumber: '',
    address: '',
    district: '',
    state: ''
  });

  const [registrationStatus, setRegistrationStatus] = useState(null);

  // Function to handle changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/user/register', formData);
      console.log(response.data);
      setRegistrationStatus('success');
      clearFormFields();
    } catch (error) {
      console.error('Error registering user:', error);
      setRegistrationStatus('error');
    }
  };

  // Function to clear form fields after successful submission
  const clearFormFields = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      institute: '',
      whatsappNumber: '',
      address: '',
      district: '',
      state: ''
    });
  };

  // JSX returned by the component
  return (
    <div className="signup-box">
      {registrationStatus === 'success' ? (
        <div className="success-message">
          <p>Thank you for applying, we will inform you once if your account is approved.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h1 className="main-heading">Registration Form</h1>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} className="input-field" required />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} className="input-field" required />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} className="input-field" required />

          <label htmlFor="institute">Institute</label>
          <select id="institute" name="institute" value={formData.institute} onChange={handleChange} className="input-field" required>
            <option value="">Select Institute</option>
            <option value="AKHI3421">AKHI3421 (AKHIL INSTITUTE)</option>
            <option value="RAMU8946">RAMU8946 (RAMU INSTITUTE)</option>
            <option value="PAVI6373">PAVI6373 (PAVAN INSTITUTE)</option>
            <option value="LAXM4253">LAXM4253 (LAXMAN INSTITUTE)</option>
            <option value="SURE8953">SURE8953 (SURESH INSTITUTE)</option>
          </select>

          <label htmlFor="whatsappNumber">Whatsapp Number</label>
          <input type="tel" id="whatsappNumber" name="whatsappNumber" placeholder="Enter your whatsapp number" value={formData.whatsappNumber} onChange={handleChange} className="input-field" required />

          <label htmlFor="address">Address</label>
          <textarea id="address" name="address" placeholder="Enter your address" value={formData.address} onChange={handleChange} className="input-field" required />

          <label htmlFor="district">District</label>
          <input type="text" id="district" name="district" placeholder="Enter your district" value={formData.district} onChange={handleChange} className="input-field" required />

          <label htmlFor="state">State</label>
          <input type="text" id="state" name="state" placeholder="Enter your state" value={formData.state} onChange={handleChange} className="input-field" required />

          <input type="submit" value="Register" className="input-submit" />
        </form>
      )}
    </div>
  );
}

export default UserRegister;
