import React, { useState, useEffect, useRef } from 'react';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './sidebar';
import {
  NavbarContainer,
  Menu,
  ToggleButton,
  ProfileSection,
  Avatar,
  Dropdown,
  DropdownItem,
  StyledTitle,
  MobileMenuButton
} from './styles';

interface NavbarProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
  isVisible: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleTheme, isDarkMode, isVisible }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado para controlar a abertura da sidebar
  const navigate = useNavigate();
  const location = useLocation(); // Hook para obter o local atual
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen); // Alterna o estado da sidebar
  };

  // Verifica se a URL é diferente de "/login" para exibir o Sidebar
  const showSidebar = location.pathname !== '/login';

  // Fechar o dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <NavbarContainer isVisible={isVisible}>
      {/* Botão de Menu Móvel */}
      <MobileMenuButton onClick={handleSidebarToggle}>
        {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </MobileMenuButton>

      <StyledTitle>TICKETTOUCH</StyledTitle>

      <ProfileSection>
        <ToggleButton onClick={toggleTheme}>
          {isDarkMode ? <FaSun size={24} color="#fff" /> : <FaMoon size={24} color="#fff" />}
        </ToggleButton>

        <Avatar onClick={handleDropdownToggle} src={`${process.env.PUBLIC_URL}/assets/avatar.svg`} alt="User Avatar" />

        {/* Dropdown */}
        <Dropdown ref={dropdownRef} data-visible={dropdownOpen}>
          <DropdownItem>Profile</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
        </Dropdown>
      </ProfileSection>

      {/* Sidebar */}
      {showSidebar && <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarToggle} />}

      {/* Menu Desktop */}
      <Menu>
        <li>home</li>
        <li>chamados</li>
        <li>Usuários</li>
        <li>faq</li>
      </Menu>
    </NavbarContainer>
  );
};

export default Navbar;
