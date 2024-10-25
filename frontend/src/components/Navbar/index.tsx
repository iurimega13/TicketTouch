import React, { useState, useEffect, useRef } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Sidebar from './sidebar';
import {
  NavbarContainer,
  Menu,
  ProfileSection,
  Avatar,
  Dropdown,
  DropdownItem,
  StyledTitle,
  MobileMenuButton,
} from './styles';
import light from '../../styles/themes/light';

interface NavbarProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
  isvisible: boolean;
  setTheme: (theme: any) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  toggleTheme,
  isDarkMode,
  isvisible,
  setTheme,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Controla a Sidebar
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    setTheme(light);
    navigate('/login');
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen); // Alterna a Sidebar
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const userRole = localStorage.getItem('userRole');

  const handleMenuClick = (path: string) => {
    navigate(path);
  };

  return (
    <NavbarContainer isVisible={isvisible}>
      <MobileMenuButton onClick={handleSidebarToggle}>
        {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </MobileMenuButton>

      <StyledTitle>TICKETTOUCH</StyledTitle>

      <ProfileSection>
      <Avatar
        onClick={handleDropdownToggle}
        src={`${process.env.PUBLIC_URL}/assets/avatar.svg`}
        alt="User Avatar"
      />
      <Dropdown ref={dropdownRef} data-visible={dropdownOpen}>
        <DropdownItem onClick={() => handleMenuClick('/profile-settings')}>
          Profile
        </DropdownItem>
        <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
      </Dropdown>
    </ProfileSection>

      <Menu>
        <li onClick={() => handleMenuClick('/home')}>Home</li>
        {userRole === 'admin' && (
          <>
            <li onClick={() => handleMenuClick('/registrations')}>Cadastros</li>
            <li onClick={() => handleMenuClick('/tickets')}>Chamados</li>
            <li onClick={() => handleMenuClick('/support')}>Atendimento</li>
          </>
        )}
        {userRole === 'analyst' && (
          <>
            <li onClick={() => handleMenuClick('/tickets')}>Chamados</li>
            <li onClick={() => handleMenuClick('/support')}>Atendimento</li>
          </>
        )}
        {userRole === 'user' && (
          <li onClick={() => handleMenuClick('/tickets')}>Chamados</li>
        )}
        <li onClick={() => handleMenuClick('/faqs')}>FAQ</li>
      </Menu>

      {/* Renderiza a Sidebar se isSidebarOpen for true */}
      {isSidebarOpen && (
        <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarToggle} />
      )}
    </NavbarContainer>
  );
};

export default Navbar;
