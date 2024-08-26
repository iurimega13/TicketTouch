import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40vw; 
  height: 40vh;
  background-color: ${props => props.theme.colors.secundary};
  padding: 20px;
  position: absolute; 
  top: 50%; 
  left: 50%;
  transform: translate(-50%, -50%); 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
  color: ${props => props.theme.colors.text};
  border-radius: 10px; 

  @media (max-width: 768px) {
    width: 90vw; /* Ajusta a largura para telas menores */
    height: auto; /* Permite que a altura se ajuste ao conteúdo */
    padding: 10px;
  }
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center; /* Centraliza o texto */

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center; /* Centraliza os itens no formulário */
  width: 100%; /* Ajusta a largura para preencher o container */

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Input = styled.input`
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%; /* Ajusta a largura para preencher o formulário */

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 480px) {
    padding: 0.4rem;
  }
`;

export const Button = styled.button`
  padding: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    padding: 0.4rem;
  }

  @media (max-width: 480px) {
    padding: 0.3rem;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 1rem;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const rememberMe = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  text-color: ${props => props.theme.colors.text};
`;