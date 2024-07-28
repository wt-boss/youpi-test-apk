import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Home from './Pages/Dashboard/Home';

function App() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  if (!token) {
    return <Navigate to="/login" />;

  }
else{
  return (
    <Home></Home>
  );
}
  
}

export default App;