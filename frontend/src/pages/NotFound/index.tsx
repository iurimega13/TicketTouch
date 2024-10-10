import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Title } from './styles'; // Importe os estilos conforme necessário

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/home');
  };

  return (
    <Container>
      <Title>Página Não Encontrada</Title>
      <p>A página que você está procurando não existe.</p>
      <button onClick={handleGoHome}>Voltar para Home</button>
    </Container>
  );
};

export default NotFound;