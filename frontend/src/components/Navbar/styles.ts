// src/styles.ts
import styled from 'styled-components';

export const NavbarContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isVisible' // Não envia isVisible para o DOM
})<{ isVisible: boolean }>`
  width: 100%;
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  text-transform: uppercase;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: ${props => props.theme.colors.text};
  background-color: ${props => props.theme.colors.primary};
  overflow: hidden;
  height: 60px;
  flex-wrap: wrap;

  @media (max-width: 1250px) {
    padding: 10px 15px;
    height: auto;
  }
`;


export const Menu = styled.ul`
  list-style: none;
  display: flex;
  gap: 20px;
  user-select: none;
  margin: 0;
  padding: 0;
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);

  li {
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 4px;

    &:hover {
      background-color: ${props => props.theme.colors.secundary};
      color: ${props => props.theme.colors.textHover};
    }
  }

  @media (max-width: 1250px) {
    display: none; /* Esconde o menu padrão em telas menores */
  }
`;

export const MobileMenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.theme.colors.text};
  font-size: 24px;
  z-index: 1001;
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);

  @media (min-width: 1251px) {
    display: none; /* Esconde o botão de menu hamburguer em telas maiores */
  }
`;

export const StyledTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: ${props => props.theme.colors.text};
  margin: 0 auto; /* Centraliza o título */
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  user-select: none;

  @media (max-width: 1175px) {
    font-size: 20px;
  }
`;

export const ToggleButton = styled.div`
  cursor: pointer;
  margin-left: auto; /* Alinha o botão de tema à direita */
  margin-right: 20px;

  @media (max-width: 1175px) {
    margin-right: 15px;
  }
`;

export const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-left: auto; 
  user-select: none;
`;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
  margin-left: 15px;
  user-select: none;
  fill: ${props => props.theme.colors.text};
`;

export const Dropdown = styled.div<{ 'data-visible': boolean }>`
  position: fixed;
  top: 65px;
  right: 10px;
  background-color: ${props => props.theme.colors.primary};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  z-index: 1000;
  display: ${({ 'data-visible': visible }) => (visible ? 'block' : 'none')};
  user-select: none;
  padding: 10px;
  color: white;
`;



export const DropdownItem = styled.div`
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.colors.secundary};
    color: ${props => props.theme.colors.textHover};
  }
`;

export const StyledMenu = styled.div<{ $isOpen: boolean }>` // Usando $ para uma transient prop
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  background-color: ${props => props.theme.colors.primary};
  width: 300px;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  padding: 1rem;
  box-shadow: 0 2px 5px rgba(0,0,0,0.3);
  z-index: 1000;

  .menu-item {
    display: block;
    padding: 1rem;
    color: ${props => props.theme.colors.text};
    text-decoration: none;
    cursor: pointer;

    &:hover {
      background-color: ${props => props.theme.colors.secundary};
      color: ${props => props.theme.colors.textHover};
    }
  }
`;
