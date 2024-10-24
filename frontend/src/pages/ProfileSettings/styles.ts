import { Modal } from 'antd';
import styled from 'styled-components';

export const OuterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  user-select: none;
  position: relative;
  margin: 60px auto 0px;
`;

export const Container = styled.div`
  background-color: ${props => props.theme.colors.primary};
  padding: 30px; /* Aumentei o padding */
  border-radius: 4px; /* Aumentei o border-radius para suavizar mais os cantos */
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.15); /* Aumentei o box-shadow para mais destaque */
  height: 100%;
  width: 100%;
  max-width: 550px; /* Aumentei a largura máxima */
  user-select: none;
  
`;

export const Title = styled.h1`
  font-size: 26px; /* Aumentei o tamanho da fonte */
  margin-bottom: 30px; /* Aumentei o espaço inferior */
  color: ${props => props.theme.colors.text};
  text-align: center;
  user-select: none;
`;

export const SectionTitle = styled.h2`
  font-size: 20px; /* Aumentei o tamanho da fonte */
  margin-top: 30px; /* Aumentei o espaço superior */
  margin-bottom: 20px; /* Aumentei o espaço inferior */
  color: ${props => props.theme.colors.text};
  user-select: none;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px; /* Aumentei o gap entre os itens */

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const GridItem = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-size: 18px; /* Aumentei o tamanho da fonte */
  color: ${props => props.theme.colors.text};
  user-select: none;
  margin-bottom: 10px; /* Aumentei o espaço inferior */
`;

export const Info = styled.p`
  font-size: 18px; /* Aumentei o tamanho da fonte */
  color: ${props => props.theme.colors.text};
  user-select: none;
  margin-bottom: 20px; /* Aumentei o espaço inferior */
`;

export const ButtonContainer = styled.div`
  margin-top: 10px; /* Aumentei o espaço superior */
`;

export const StyledModal = styled(Modal)`
  .ant-modal-content {
    background-color: ${(props) => props.theme.colors.secundary};
    color: ${(props) => props.theme.colors.textAlt};
  }

  .ant-modal-header {
    background-color: ${(props) => props.theme.colors.secondary};
    color: ${(props) => props.theme.colors.textAlt};
  }

  .ant-modal-footer {
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.textAlt};
  }

  .ant-modal-title {
    color: ${(props) => props.theme.colors.textAlt};
  }

  .ant-btn-primary {
    background-color: ${(props) => props.theme.colors.primary};
    border-color: ${(props) => props.theme.colors.primary};

    &:hover {
      background-color: ${(props) => props.theme.colors.secundary} !important;
    }

    &.active {
      background-color: ${(props) => props.theme.colors.tertiary} !important;
    }
  }

  .ant-btn-danger {
    background-color: ${(props) => props.theme.colors.danger};
    border-color: ${(props) => props.theme.colors.danger};
  }

  .ant-input {
    background-color: ${(props) => props.theme.colors.inputBackground};
    color: ${(props) => props.theme.colors.textAlt};
  }
`;