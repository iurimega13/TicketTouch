import styled from 'styled-components';
import { Button, Form } from 'antd';

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


export const FormContainer = styled.div`
  margin-top: 20px;
  background-color: ${props => props.theme.colors.primary};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
    width: 100%;
  }
`;

export const StyledLabel = styled.label`
  font-size: 12px;
  border-radius: 2px;
  color: ${props => props.theme.colors.text};
`;


export const Textarea = styled.textarea`
  width: 100%;
  min-height: 200px;
  max-height: 400px; 
  padding: 8px;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
  font-size: 16px;
  background-color: ${props => props.theme.colors.inputBackground};
  color: ${props => props.theme.colors.inputText};
  resize: none; 
  overflow-y: auto; 
  margin-bottom: 30px;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;
