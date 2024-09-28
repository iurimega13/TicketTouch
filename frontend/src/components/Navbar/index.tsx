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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const showSidebar = location.pathname !== '/login';

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

  // Função para redirecionar
  const handleMenuClick = (path: string) => {
    if (path === '/chamados' || path === '/usuarios' || path === '/faq') {
      navigate('/home');
    } else {
      navigate(path);
    }
  };

  // Função para redirecionar no dropdown
  const handleDropdownClick = (path: string) => {
    if (path === '/profile' || path === '/settings') {
      navigate('/home');
    } else {
      navigate(path);
    }
  };

  return (
    <NavbarContainer isVisible={isVisible}>
      <MobileMenuButton onClick={handleSidebarToggle}>
        {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </MobileMenuButton>

      <StyledTitle>TICKETTOUCH</StyledTitle>

      <ProfileSection>
        
        {/* <ToggleButton onClick={toggleTheme}>
          {isDarkMode ? <FaSun size={24} color="#fff" /> : <FaMoon size={24} color="#fff" />}
        </ToggleButton> */}

        <Avatar onClick={handleDropdownToggle} src={`${process.env.PUBLIC_URL}/assets/avatar.svg`} alt="User Avatar" />

        <Dropdown ref={dropdownRef} data-visible={dropdownOpen}>
          <DropdownItem onClick={() => handleDropdownClick('/profile-settings')}>Profile</DropdownItem>
          <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
        </Dropdown>
      </ProfileSection>

      {showSidebar && <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarToggle} />}

      <Menu>
        <li onClick={() => handleMenuClick('/home')}>Home</li>
        <li onClick={() => handleMenuClick('/chamados')}>Chamados</li>
        <li onClick={() => handleMenuClick('/users')}>Usuários</li>
        <li onClick={() => handleMenuClick('/faq')}>FAQ</li>
      </Menu>
    </NavbarContainer>
  );
};

export default Navbar;