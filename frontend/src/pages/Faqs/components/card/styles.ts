import styled from 'styled-components';

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: -8px; /* Ajuste para espaçamento entre os cards */
`;

export const Card = styled.div`
  user-select: none;
  width: calc(100% - 16px); /* Ajuste para três cards por linha com espaçamento */
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  background-color: ${props => props.theme.colors.primary} !important;
  margin-bottom: 40px; 
  `;

// Outros estilos permanecem os mesmos
export const CardTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: bold;
  color: ${props => props.theme.colors.text};
`;

export const CardContent = styled.div`
  font-size: 14px;
  color: ${props => props.theme.colors.tertiary};
`;

export const CardButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;

  button {
    width: 100%;
    padding: 10px;
    color: ${(props) => props.theme.colors.text};
    border-radius: 4px;
    cursor: pointer;

    background-color: ${(props) => props.theme.colors.primary};
    border-color: ${(props) => props.theme.colors.primary};

    &:hover {
      background-color: ${(props) => props.theme.colors.secundary} !important;
    }

    &.active {
      background-color: ${(props) => props.theme.colors.tertiary} !important;
    }
  }
`;