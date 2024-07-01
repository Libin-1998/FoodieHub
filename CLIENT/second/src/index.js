import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    {/* <Login/> */}
    {/* <Signup/> */}
  </React.StrictMode>
);


reportWebVitals();
