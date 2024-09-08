import React, { useEffect, useRef } from 'react';
import { StyledMenu } from './styles';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

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

  return ( 
    <StyledMenu isOpen={isOpen} ref={sidebarRef}>
      <a className="menu-item" href="/home">Home</a>
      <a className="menu-item" href="/chamados">Chamados</a>
      <a className="menu-item" href="/usuarios">Usuários</a>
      <a className="menu-item" href="/faq">FAQ</a>
    </StyledMenu>
  );
};

export default Sidebar;
