import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   
    <Auth0Provider
    domain="dev-5is1g0kd3yowp74i.us.auth0.com"
    clientId="6LQvM21pqByEiqHHiCAhF2DMhcvCyR9i"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>
   
  
  </React.StrictMode>
);
