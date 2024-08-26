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

function App() {
  const [theme, setTheme] = useState(light);
  const [data, setData] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === light ? dark : light);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const location = useLocation();

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <div className="App">
          <GlobalStyle />
          {/* Condicionalmente renderize a Navbar */}
          {location.pathname !== '/login' && <Navbar toggleTheme={toggleTheme} isDarkMode={theme === dark} />}
          <Header />
          {data && <div>{JSON.stringify(data)}</div>}
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
            <Route 
              path="/home" 
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <Home />
                </PrivateRoute>
              } 
            />
          </Routes>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

const AppWrapper: React.FC = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;