import { FaMoon, FaSun } from "react-icons/fa";
import styled from "styled-components";

export const Container = styled.div`
  height: 60px;
  display: flex;
  color: ${props => props.theme.colors.text};
  align-items: center;
  background-color: ${props => props.theme.colors.primary};
  padding: 0 30px;
  justify-content: space-between;
`;

export const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

export const SunIcon = styled(FaSun)`
  color: yellow;
  font-size: 24px;
`;

export const MoonIcon = styled(FaMoon)`
  color: gray;
  font-size: 24px;
`;