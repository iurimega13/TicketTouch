import React, { useState } from 'react';
import { MainContainer, ButtonContainer, StyledButton, LoadingContainer } from './styles';
import TicketCreate from './components/create/TicketCreate';
import TicketSearch from './components/search/TicketSearch';
import { useTheme } from 'styled-components';
import { Spin } from 'antd';

const Tickets: React.FC = () => {
  const [view, setView] = useState<'create' | 'list' | null>(null);
  const [loading, setLoading] = useState(false);
  const [buttonLoading] = useState(false);
  const theme = useTheme();

  const handleViewChange = (view: 'create' | 'list') => {
    setLoading(true);
    setTimeout(() => {
      setView(view);
      setLoading(false);
    }, 500);
  };

  return (
    <MainContainer>
      <ButtonContainer>
        <StyledButton onClick={() => handleViewChange('create')} loading={buttonLoading} >
          Criar Nova Solicitação
        </StyledButton>
        <StyledButton onClick={() => handleViewChange('list')} loading={buttonLoading} >
          Listar Solicitações
        </StyledButton>
      </ButtonContainer>

      {loading && (
        <LoadingContainer>
          <Spin size="large" />
        </LoadingContainer>
      )}

      {view === 'create' && !loading && <TicketCreate />}
      {view === 'list' && !loading && <TicketSearch />}
    </MainContainer>
  );
};

export default Tickets;