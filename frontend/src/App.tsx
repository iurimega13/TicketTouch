import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, useLocation, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Cookies from 'js-cookie';

import light from './styles/themes/light';
import dark from './styles/themes/dark';
import GlobalStyle from './styles/global';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Home from './pages/Home';
import ProfileSettings from './pages/ProfileSettings';
import Registrations from './pages/Registrations';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute';
import { getUserSettings, updateUserSettings } from './services/api';

const Layout: React.FC = () => {
  const location = useLocation();
  const [theme, setTheme] = useState(light);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfileAndSettings = async () => {
      const token = Cookies.get('accessToken');
      if (token) {
        setIsAuthenticated(true);
        const userId = localStorage.getItem('userId');
        if (userId) {
          const userSettings = await getUserSettings();
          setTheme(userSettings.theme === 'dark' ? dark : light);
        }
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    fetchUserProfileAndSettings();
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const toggleTheme = async () => {
    const newTheme = theme === light ? dark : light;
    setTheme(newTheme);

    const userId = localStorage.getItem('userId');
    if (userId) {
      try {
        await updateUserSettings({ theme: newTheme === dark ? 'dark' : 'light' });
      } catch (error) {
        console.error('Erro ao atualizar o tema do usuário:', error);
      }
    }
  };

  const showNavbar = location.pathname !== '/login';

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <GlobalStyle />
        <Navbar isVisible={showNavbar} toggleTheme={toggleTheme} isDarkMode={theme === dark} setTheme={setTheme} />
        <Routes>
          <Route path="/" element={<Navigate to={isAuthenticated ? "/home" : "/login"} />} />
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} setTheme={setTheme} />} />
          {isAuthenticated !== null && (
            <>
              <Route
                path="/home"
                element={<PrivateRoute element={<Home />} isAuthenticated={isAuthenticated!} />}
              />
              <Route
                path="/profile-settings"
                element={<PrivateRoute element={<ProfileSettings />} isAuthenticated={isAuthenticated!} />}
              />
              <Route
                path="/registrations"
                element={<PrivateRoute element={<Registrations />} isAuthenticated={isAuthenticated!} />}
              />
              <Route
                path="*"
                element={isAuthenticated ? <NotFound /> : <Navigate to="/login" replace={true} />}
              />
            </>
          )}
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