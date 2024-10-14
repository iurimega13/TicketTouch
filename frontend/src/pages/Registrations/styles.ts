import styled from 'styled-components';
import { Button, Form, Select } from 'antd';

/* Estilos principais do container */
export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.background};
  min-height: 80vh;
  max-width: 1200px;
  margin: 60px auto 0;
`;

/* Estilos para o container dos botões */
export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: ${(props) => props.theme.colors.background};
  width: 100%;
`;

/* Estilos para o botão com hover */
export const StyledButton = styled(Button)`
  width: 100%;
  height: 60px;
  padding: 16px;
  font-size: 20px;
  background-color: ${(props) => props.theme.colors.primary} !important;
  color: ${(props) => props.theme.colors.text} !important;

  &:hover {
    background-color: ${(props) => props.theme.colors.secundary} !important;
  }

  &.active {
    background-color: ${(props) => props.theme.colors.tertiary} !important;
  }
`;

/* Estilos para o formulário */
export const CreateForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 16px;

  input {
    padding: 8px;
    border: 1px solid ${(props) => props.theme.colors.tertiary};
    border-radius: 4px;
    font-size: 16px;
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.text};
  }
`;

/* Estilos para o loading */
export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8); 
  z-index: 9999; 
`;

/* Estilos do Select */
export const StyledSelect = styled(Select)`
  width: 100% !important;
  height: 60px !important;

  .ant-select-selector {
    border-radius: 4px !important;
    background-color: ${(props) => props.theme.colors.primary} !important;
    padding: 16px !important;
    text-align: center !important;
    font-size: 20px !important;
    color: ${(props) => props.theme.colors.text} !important;
    border: 1px solid ${(props) => props.theme.colors.tertiary} !important;

    &:hover {
      background-color: ${(props) => props.theme.colors.secundary} !important;
    }
  }

  .ant-select-selection-placeholder {
    color: ${(props) => props.theme.colors.text} !important;
    font-size: 20px !important;
  }

  .ant-select-arrow {
    color: ${(props) => props.theme.colors.text} !important;
  }



`;

/* Estilos para o label do Select */
export const LabelSelect = styled.label`
  font-size: 20px;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 8px;
  display: block;
`;
