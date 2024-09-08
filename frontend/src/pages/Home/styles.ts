import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  user-select: none;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;