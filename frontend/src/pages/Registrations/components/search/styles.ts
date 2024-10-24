import styled from 'styled-components';
import { Button, Form } from 'antd';

export const MainContainer = styled.div`
  padding: 20px;
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
`;

export const SortLabel = styled.span<{ color?: string }>`
  color: ${(props) => props.theme.colors.textAlt} !important;};
  font-weight: bold;
  margin-right: 10px;
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;


export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

export const FormContainer = styled.div`
  margin-top: 20px;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalTitle = styled.h2`
  margin: 0;
`;

export const CreateForm = styled(Form)`
  display: flex;
  flex-direction: column;

  input {
    margin-bottom: 10px;
  }
`;