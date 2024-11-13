import { Button, Card } from 'antd';
import styled from 'styled-components';

export const Container = styled.div`
  user-select: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  user-select: none;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  padding: 20px;
  margin: 60px auto 0;

  @media (min-width: 900px) {
    flex-direction: row;
    justify-content: space-around;
    width: 80%;
    margin: 30px auto;
  }
`;

export const CardContainer = styled.div`
  flex: 1;
  max-width: 400px;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.colors.secundary};
  color: ${(props) => props.theme.colors.text};
  margin: 10px;
  padding: 15px;
  box-sizing: border-box;

  .ant-card {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  img {
    user-select: none;
    width: 100%;
    height: 200px;
    object-fit: cover;
    background-color: ${(props) => props.theme.colors.secundary} !important;
  }

  .ant-card-meta {
    text-align: center;
  }

  @media (min-width: 768px) {
    width: 45%;
    margin: 10px;
  }
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

export const StyledCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.secundary};
  color: ${(props) => props.theme.colors.text};
  padding: 10px;

  .ant-card-actions {
    background-color: ${(props) => props.theme.colors.secundary};
  }
`;

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

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
`;
