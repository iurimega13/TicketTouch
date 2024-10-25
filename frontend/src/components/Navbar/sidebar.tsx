import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { StyledMenu } from './styles';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const userRole = localStorage.getItem('userRole');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <StyledMenu $isOpen={isOpen} ref={sidebarRef}>
      {' '}
      <span className="menu-item" onClick={() => handleNavigation('/home')}>
        Home
      </span>
      {userRole === 'admin' && (
        <>
          <span
            className="menu-item"
            onClick={() => handleNavigation('/registrations')}
          >
            Cadastros
          </span>
          <span
            className="menu-item"
            onClick={() => handleNavigation('/tickets')}
          >
            Chamados
          </span>
          <span
            className="menu-item"
            onClick={() => handleNavigation('/support')}
          >
            atendimento
          </span>
        </>
      )}
      {userRole === 'analyst' && (
        <>
          <span
            className="menu-item"
            onClick={() => handleNavigation('/tickets')}
          >
            Chamados
          </span>
          <span
            className="menu-item"
            onClick={() => handleNavigation('/support')}
          >
            atendimento
          </span>
        </>
      )}
      {userRole === 'user' && (
        <span
          className="menu-item"
          onClick={() => handleNavigation('/tickets')}
        >
          Chamados
        </span>
      )}
      <span className="menu-item" onClick={() => handleNavigation('/faqs')}>
        FAQ
      </span>
    </StyledMenu>
  );
};

export default Sidebar;
