import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';

import light from './styles/themes/light';
import dark from './styles/themes/dark';
import GlobalStyle from './styles/global';
import Header from './components/Header';
import Navbar from './components/Navbar'; // Importe a nova Navbar

function App() {
  const [theme, setTheme] = useState(light); // Estado para o tema

  const toggleTheme = () => {
    setTheme(theme === light ? dark : light); // Alterna entre light e dark
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <GlobalStyle />
        <Navbar toggleTheme={toggleTheme} isDarkMode={theme === dark} /> {/* Barra global */}
        <Header />
      </div>
    </ThemeProvider>
  );
}

export default App;
