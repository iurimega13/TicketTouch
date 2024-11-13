import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background-color: ${(props) => props.theme.colors.inputBackground};
  color: ${(props) => props.theme.colors.textAlt};
`;

export const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: ${(props) => props.theme.colors.text};
`;

export const Message = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: ${(props) => props.theme.colors.text};
`;

export const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.primary};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.secundary};
  }
`;