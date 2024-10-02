import styled from 'styled-components';
import { Checkbox as AntCheckbox, Input as AntInput } from 'antd'; // Importando o Input do Ant Design

export const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
  background-color: ${props => props.theme.colors.background};
  padding: 0 20px;  /* Adicionando algum padding para telas menores */
`;

export const LogoContainer = styled.div`
  user-select: none;
  img {
    width: 20vw; 
    height: auto;
  }

  @media (max-width: 768px) {
    img {
      width: 50vw;  /* Ajustando o tamanho da imagem em telas menores */
    }
  }

  @media (max-width: 480px) {
    img {
      width: 80vw;  /* Ajustando ainda mais para telas muito pequenas */
    }
  }
`;

export const Container = styled.div`
  user-select: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;  /* Ajustando a largura para se ajustar bem em diferentes tamanhos */
  max-width: 400px;  /* Limita a largura máxima */
  background-color: ${props => props.theme.colors.secundary};
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
  color: ${props => props.theme.colors.text};
  border-radius: 10px; 

  @media (max-width: 768px) {
    width: 95%;
    padding: 15px;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 10px;
  }
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
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

export const StyledCheckbox = styled(AntCheckbox)`
  .ant-checkbox-wrapper {
    color: ${props => props.theme.colors.text}; 
  }

  .ant-checkbox + span {
    color: ${props => props.theme.colors.text}; 
  }
`;

export const ForgotPassword = styled.div`
  a {
    display: flex;
    color: ${props => props.theme.colors.text};
    text-align: center;
    margin-top: 10px;
    font-size: 0.9rem;  /* Ajusta o tamanho da fonte para telas menores */
  }
`;

export const ErrorMessage = styled.div`
  color: red;
  margin-top: 1rem;
  text-align: center;
  font-size: 0.9rem;  /* Ajusta o tamanho da fonte para melhorar a visibilidade */
`;

export const StyledInput = styled(AntInput)<{ hasError: boolean }>`
  border-color: ${props => (props.hasError ? 'red' : '')};
`;

export const StyledPasswordInput = styled(AntInput.Password)<{ hasError: boolean }>`
  border-color: ${props => (props.hasError ? 'red' : '')};
`;