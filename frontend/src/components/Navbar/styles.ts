import styled from "styled-components";

export const NavbarContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: ${props => props.theme.colors.primary};
  position: fixed;
  top: 0;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: ${props => props.theme.colors.text};
  text-transform: uppercase;
`;

export const Menu = styled.ul`
  list-style: none;
  display: flex;
  gap: 20px;
  user-select: none;

  li {
    cursor: pointer;
    padding: 10px 20px;
    border-radius: 4px;

    &:hover {
      background-color: ${props => props.theme.colors.secundary};
      color: ${props => props.theme.colors.textHover};
    }
  }
`;

export const ToggleButton = styled.div`
  cursor: pointer;
`;

export const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
  margin-left: 15px;
  user-select: none;
  fill: ${props => props.theme.colors.text};
`;

export const Dropdown = styled.div`
  position: absolute;
  top: 60px;
  right: 0;
  background-color: ${props => props.theme.colors.primary};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  z-index: 1001;
  user-select: none;

  
`;

export const DropdownItem = styled.div`
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.colors.secundary};
    color: ${props => props.theme.colors.textHover};
  }
`;