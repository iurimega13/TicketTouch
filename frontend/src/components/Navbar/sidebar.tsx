import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { StyledMenu } from './styles';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate(); // Hook para navegação programática

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
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

  // Função para lidar com a navegação e redirecionamento temporário
  const handleNavigation = (path: string) => {
    if (path === '/chamados' || path === '/usuarios' || path === '/faq') {
      navigate('/home'); // Redireciona para home se a rota não existir
    } else {
      navigate(path);
    }
    onClose(); // Fecha a sidebar após a navegação
  };

  return ( 
    <StyledMenu isOpen={isOpen} ref={sidebarRef}>
      <span className="menu-item" onClick={() => handleNavigation('/home')}>Home</span>
      <span className="menu-item" onClick={() => handleNavigation('/chamados')}>Chamados</span>
      <span className="menu-item" onClick={() => handleNavigation('/usuarios')}>Usuários</span>
      <span className="menu-item" onClick={() => handleNavigation('/faq')}>FAQ</span>
    </StyledMenu>
  );
};

export default Sidebar;
