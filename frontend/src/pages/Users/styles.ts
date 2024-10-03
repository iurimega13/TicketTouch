import styled from 'styled-components';

export const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Garante que o contêiner ocupe pelo menos a altura da tela */
  background-color: ${props => props.theme.colors.background};
`;

export const UserContainer = styled.div`
  padding: 20px;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.text};
  border-radius: 8px;
  width: 90%; /* Ocupa 70% da largura da tela */
  min-height: 70%; /* Garante que o contêiner ocupe pelo menos 70% da altura do contêiner pai */
  max-width: 1200px; /* Largura máxima para evitar que fique muito grande em telas grandes */
  max-height: 800px; /* Altura máxima para evitar que fique muito grande em telas grandes */
  margin: 0 auto; /* Centraliza o contêiner horizontalmente */
`;

export const UserCard = styled.div`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.text};
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const UserInfo = styled.div`
  margin-bottom: 10px;

  p {
    margin: 5px 0;
  }
`;

export const UserActions = styled.div`
  display: flex;
  gap: 10px;
`;

// Botão geral que pode ser reutilizado em vários lugares
export const ActionButton = styled.button`
  background-color: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.primary};
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: ${props => props.theme.colors.textHover};
    color: ${props => props.theme.colors.tertiary};
  }
`;

export const CreateButton = styled(ActionButton)`
  margin-bottom: 16px;
`;

export const PaginationContainer = styled.div`
  text-align: center;
  margin-top: 20px;
`;

// Estilos do Modal (ainda faz parte da página principal, se o modal for global)
export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background-color: ${props => props.theme.colors.secondary};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 400px;
  max-width: 90%;
  position: relative;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  flex-grow: 1;
  color: ${props => props.theme.colors.text};
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${props => props.theme.colors.text};
`;

