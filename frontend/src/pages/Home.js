// src/pages/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove o token de autenticação
    navigate('/login'); // Redireciona para a página de login
  };

  return (
    <div>
      <h2>Home</h2>
      <p>Bem-vindo à página inicial!</p>
      <button onClick={handleLogout}>Deslogar</button>
    </div>
  );
}

export default Home;