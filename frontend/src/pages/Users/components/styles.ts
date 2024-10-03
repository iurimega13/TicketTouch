import styled from 'styled-components';
import { Input, Button as AntButton, Select } from 'antd';

// Container principal para o formulário
export const Container = styled.div`
  padding: 30px; /* Aumentei o padding */
  background-color: ${props => props.theme.colors.background};
  border-radius: 10px; /* Cantos arredondados */
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1); /* Sombra para destaque */
  max-width: 600px; /* Largura máxima ajustada */
  margin: 0 auto; /* Centraliza o container */
`;

// Botão estilizado de ação
export const ActionButton = styled(AntButton)`
  margin: 10px;
  background-color: ${props => props.theme.colors.secundary}; /* Cor do botão */
  color: ${props => props.theme.colors.textAlt}; /* Cor do texto do botão */
  width: 100%; /* Preencher as laterais */
  padding: 12px; 
  border-radius: 5px; /* Cantos arredondados */
  border: none; /* Remove a borda padrão */
  font-weight: bold; /* Texto em negrito */
  cursor: pointer; /* Cursor de ponteiro */

  &:hover {
    background-color: ${props => props.theme.colors.tertiary}; /* Cor ao passar o mouse */
  }
`;


// Contêiner para o formulário
export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 12px;
`;

// Contêiner para criação de usuários
export const CreateUserForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px; /* Espaço entre os elementos */
`;

// Conteúdo do modal
export const ModalContent = styled.div`
  background-color: ${props => props.theme.colors.secondary};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 400px; /* Ajuste conforme necessário */
  margin: 0 auto; /* Centraliza o card */
`;

// Cabeçalho do modal
export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

// Título do modal
export const ModalTitle = styled.h2`
  margin: 0;
  font-size: 22px; /* Aumentei o tamanho da fonte */
  font-weight: bold;
  text-align: center;
  flex-grow: 1;
  color: ${props => props.theme.colors.text};
`;

// Botão de fechar do modal
export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${props => props.theme.colors.text};
`;

// Selecionador estilizado
export const StyledSelect = styled(Select)`
  width: 100%;
  .ant-select-selector {
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    border: 1px solid ${props => props.theme.colors.border}; /* Borda ajustada */
    border-radius: 5px; /* Cantos arredondados */
  }
`;

// Contêiner para a paginação
export const PaginationContainer = styled.div`
  text-align: center;
  margin-top: 20px; /* Espaço superior */
`;

// Campo de busca estilizado
export const SearchInput = styled(Input)`
  margin-bottom: 16px;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  border: 1px solid ${props => props.theme.colors.border}; /* Borda ajustada */
  border-radius: 5px; /* Cantos arredondados */

  &:focus {
    outline: none; /* Remove o contorno padrão */
    border-color: ${props => props.theme.colors.focus}; /* Cor da borda ao focar */
  }
`;

// Botão de usuário estilizado
export const UserButton = styled(AntButton)`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.text};
  width: 100%; /* Preencher as laterais */
  padding: 12px; /* Aumentei o padding para um botão mais confortável */
  border-radius: 5px; /* Cantos arredondados */
  border: none; /* Remove a borda padrão */
  font-weight: bold; /* Texto em negrito */
  cursor: pointer; /* Cursor de ponteiro */

  &:hover {
    background-color: ${props => props.theme.colors.primaryHover};
  }
`;

// Formulário de busca avançada
export const AdvancedSearchForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px; /* Espaço entre os elementos */
  margin-top: 20px;
  background-color: ${props => props.theme.colors.tertiary};
  padding: 20px;
  border-radius: 8px; /* Cantos arredondados */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Sombra para destaque */
`;
