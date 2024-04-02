import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import { useLocation } from 'react-router-dom'; // Import useLocation for accessing query parameters
import './index.css'; // Import CSS file

const Dashboard = () => {
  const [users, setUsers] = useState([]); // State to store users data
  const [error, setError] = useState(null); // State to store error message
  const location = useLocation(); // Hook to get current location
  const queryParams = new URLSearchParams(location.search); // Get query parameters from location
  const instituteName = queryParams.get('institute'); // Get institute name from query parameters

  // Function to fetch users data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let response;
        // Fetch users based on institute name if available, otherwise fetch all users
        if (instituteName) {
          response = await axios.get(`http://localhost:3001/user?institute=${encodeURIComponent(instituteName)}`);
        } else {
          response = await axios.get("http://localhost:3001/user");
        }
        setUsers(response.data); // Set users data
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Error fetching users. Please try again later."); // Set error message on error
      }
    };
    fetchUsers();
  }, [instituteName]); // Fetch users data whenever instituteName changes

  // Function to handle action change (approve/reject)
  const handleActionChange = async (userId, action) => {
    try {
      let updatedUsers = [...users];
      const userIndex = updatedUsers.findIndex(user => user.id === userId);
      // Handle action based on action type
      if (action === "rejected") {
        await axios.delete(`http://localhost:3001/user/${userId}`); // Delete user if rejected
        updatedUsers.splice(userIndex, 1); // Remove user from users list
      } else if (action === "approved") {
        updatedUsers[userIndex].action = "approved"; // Update user action to approved
      }
      setUsers(updatedUsers); // Update users state
      localStorage.setItem('users', JSON.stringify(updatedUsers)); // Update local storage with updated users data
    } catch (error) {
      console.error("Error changing user action:", error);
      setError("Error changing user action. Please try again later."); // Set error message on error
    }
  };

  return (
    <div className="container">
      <section className="main">
        <div className="main-top">
          <h1>Admin Dashboard</h1>
          <i className="fas fa-user-cog"></i>
        </div>

        <section className="attendance">
          <div className="attendance-list">
            <h1>Users</h1>
            {/* Display error message if present */}
            {error && <p className="error-message">{error}</p>}
            {/* Table to display users data */}
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Institute</th>
                  <th>Whatsapp Number</th>
                  <th>Address</th>
                  <th>District</th>
                  <th>State</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {/* Map through users data and display each user */}
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.institute}</td>
                    <td>{user.whatsappnumber || "N/A"}</td>
                    <td>{user.address}</td>
                    <td>{user.district}</td>
                    <td>{user.state}</td>
                    <td>
                      {/* Display approve button if action is not approved */}
                      {user.action === "approved" ? (
                        <span className="approved-text">Approved</span>
                      ) : (
                        <button className="approve" onClick={() => handleActionChange(user.id, "approved")}>Approve</button>
                      )}
                      {/* Display reject button */}
                      <button className="reject" onClick={() => handleActionChange(user.id, "rejected")}>Reject</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Dashboard;
