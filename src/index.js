import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';import './index.css';
import App from './App';

import reportWebVitals from './reportWebVitals';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';

ReactDOM.render(
  <React.StrictMode>
     <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<App />} />
      </Routes>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();