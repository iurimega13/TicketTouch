import styled from 'styled-components';
import { Tabs} from 'antd';

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
  overflow: hidden; /* Adicionado para garantir que o conteúdo não ultrapasse os limites */
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




/* Estilos para as Tabs */
export const StyledTabs = styled(Tabs)`
  .ant-tabs-nav {
    margin-bottom: 16px;
  }

  .ant-tabs-tab {
    font-size: 16px;
    padding: 8px 10px;
    background-color: ${(props) => props.theme.colors.secundary};
    color: ${(props) => props.theme.colors.text} !important;
    border-radius: 4px 4px 0 0;
    transition: background-color 0.1s, color 0.1s;

    &:hover {
      background-color: ${(props) => props.theme.colors.primary};
      color: ${(props) => props.theme.colors.text};
    }
  }

  .ant-tabs-tab-active {
    background-color: ${(props) => props.theme.colors.primary}; 
    color: ${(props) => props.theme.colors.text} !important; 
    font-weight: bold; 
  }
  
`;

