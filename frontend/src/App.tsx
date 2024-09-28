import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, useLocation, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Cookies from 'js-cookie'; // Importa a biblioteca js-cookie

import light from './styles/themes/light';
import dark from './styles/themes/dark';
import GlobalStyle from './styles/global';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Home from './pages/Home';
import ProfileSettings from './pages/ProfileSettings'; // Importa o componente ProfileSettings
import Users from './pages/Users'; // Importa o componente Users
import PrivateRoute from './components/PrivateRoute';
import { getUserProfile, getUserSettings, updateUserSettings } from './services/api'; // Importa a função getUserProfile e updateUserSettings

const Layout: React.FC = () => {
  const location = useLocation();
  const [theme, setTheme] = useState(light);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // Inicializa como null para indicar carregamento
  const [loading, setLoading] = useState(true); // Novo estado para controlar o carregamento

  useEffect(() => {
    const fetchUserProfileAndSettings = async () => {
      const token = Cookies.get('accessToken'); // Lê o token dos cookies
      if (token) {
        setIsAuthenticated(true); // O usuário está autenticado
        const userId = localStorage.getItem('userId');
        if (userId) {
          const userProfile = await getUserProfile(userId);
          const userSettings = await getUserSettings(); // Busca as configurações do usuário
          setTheme(userSettings.theme === 'dark' ? dark : light); // Define o tema com base nas configurações do usuário
        }
      } else {
        setIsAuthenticated(false); // O usuário não está autenticado
      }
      setLoading(false); // Define o carregamento como concluído
    };

    fetchUserProfileAndSettings();
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const toggleTheme = async () => {
    const newTheme = theme === light ? dark : light;
    setTheme(newTheme);

    // Atualiza as configurações do usuário no backend
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

  // Se ainda está carregando (checando os cookies), exibe algo como uma tela de carregamento
  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <GlobalStyle />
        <Navbar isVisible={showNavbar} toggleTheme={toggleTheme} isDarkMode={theme === dark} />
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to={isAuthenticated ? "/home" : "/login"} />} />
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          {/* Verifica se o estado de isAuthenticated é true antes de renderizar o PrivateRoute */}
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
                path="/users"
                element={<PrivateRoute element={<Users />} isAuthenticated={isAuthenticated!} />}
              />
            </>
          )}
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