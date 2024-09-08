// App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import light from './styles/themes/light';
import dark from './styles/themes/dark';
import GlobalStyle from './styles/global';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './authContext';

const Layout: React.FC = () => {
  const location = useLocation();
  const [theme, setTheme] = useState(light);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === light ? dark : light);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  // Determine se a Navbar deve ser visível com base na rota atual
  const showNavbar = location.pathname !== '/login';

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <GlobalStyle />
        <Navbar isVisible={showNavbar} toggleTheme={toggleTheme} isDarkMode={theme === dark} />
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/home" element={<PrivateRoute element={<Home />} isAuthenticated={isAuthenticated} />} />
          <Route path="*" element={<Navigate to="/login" replace={true} />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

const App: React.FC = () => (
  <Router>
    <Layout />
  </Router>
);

export default App;
