import { Label } from './../../../ProfileSettings/styles';
import styled from 'styled-components';
import { Button, Form } from 'antd';

export const MainContainer = styled.div`
  padding: 20px;
  background-color: ${props => props.theme.colors.background};
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const ActionButton = styled(Button)`
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

export const ModalContent = styled.div`
  padding: 20px;
  background-color: ${props => props.theme.colors.formBackground};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: ${props => props.theme.colors.primary};

  &:hover {
    color: ${props => props.theme.colors.textHover};
  }
`;

export const FormContainer = styled.div`
  margin-top: 20px;
  background-color: ${props => props.theme.colors.primary};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  color: ${props => props.theme.colors.primary};
`;

export const CreateForm = styled(Form)`
  display: flex;
  flex-direction: column;
  

  input {
    margin-bottom: 10px;
    padding: 8px;
    border: 1px solid ${props => props.theme.colors.border};
    border-radius: 4px;
    font-size: 16px;
    background-color: ${props => props.theme.colors.inputBackground};
    color: ${props => props.theme.colors.inputText};
  }
`;


export const StyledLabel = styled.label`
  font-size: 12px;
  border-radius: 2px;
  color: ${props => props.theme.colors.text};
`;


export const SelectContainer = styled.div`
  margin-bottom: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  

  .ant-select {
    width: 100%;
  }
  
 .ant-select-selection-placeholder {
    color: ${props => props.theme.colors.textAlt} !important;
  }
  
`;