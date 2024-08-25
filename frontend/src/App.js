// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route path="/dashboard" element={
          <PrivateRoute element={<Dashboard /> } />
        } />
        {/* Adicione outras rotas protegidas aqui */}
      </Routes>
    </Router>
  );
}

export default App;