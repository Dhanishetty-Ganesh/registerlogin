import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import Dashboard from './components/Dashboard';
import SuperAdminLogin from './components/SuperAdminLogin';
import UserRegister from './components/UserRegister';
import AdminRegister from './components/AdminRegister';
import { useAuth0 } from "@auth0/auth0-react";
import './App.css'; // Import CSS file

function App() {
  const {loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<UserRegister />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/superadmin/login" element={<SuperAdminLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/:userType" element={<Dashboard />} />
        </Routes>
        {!isAuthenticated && (
          <div>
            <button onClick={(e) => loginWithRedirect()}>Log in With Your Google Account</button>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
