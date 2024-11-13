import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Title, Message, Button } from './styles'; // Importe os estilos conforme necessário

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/home');
  };

  return (
    <Container>
      <Title>Página Não Encontrada</Title>
      <Message>A página que você está procurando não existe.</Message>
      <Button onClick={handleGoHome}>Voltar para Home</Button>
    </Container>
  );
};

export default NotFound;