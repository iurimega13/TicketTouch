import React, { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { NavbarContainer, Menu, ToggleButton, ProfileSection, Avatar, Dropdown, DropdownItem } from "./style";

interface NavbarProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleTheme, isDarkMode }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <NavbarContainer>
      {/* Menu */}
      <Menu>
        <li>home</li>
        <li>chamados</li>
        <li>Usuários</li>
        <li>faq</li>
      </Menu>

      {/* Tema e Perfil */}
      <ProfileSection>
        {/* Botão de Alternância de Tema */}
        <ToggleButton onClick={toggleTheme}>
          {isDarkMode ? (
            <FaSun size={24} color="#f1c40f" />
          ) : (
            <FaMoon size={24} color="#f39c12" />
          )}
        </ToggleButton>

        {/* Avatar */}
        <Avatar onClick={handleDropdownToggle} src={`${process.env.PUBLIC_URL}/assets/avatar.svg`} alt="User Avatar" />

        {/* Dropdown */}
        {dropdownOpen && (
          <Dropdown>
            <DropdownItem>Profile</DropdownItem>
            <DropdownItem>Settings</DropdownItem>
            <DropdownItem>Logout</DropdownItem>
          </Dropdown>
        )}
      </ProfileSection>
    </NavbarContainer>
  );
};

export default Navbar;
