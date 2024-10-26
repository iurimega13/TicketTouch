import React, { useState, useEffect } from 'react';
import { MainContainer, ButtonContainer, StyledButton, LoadingContainer } from './styles';
import FAQCreate from './components/create/FAQCreate';
import FAQSearch from './components/search/FAQSearch';
import { Spin } from 'antd';

const FAQs: React.FC = () => {
  const [view, setView] = useState<'create' | 'list' | null>(null);
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'analyst' | 'user' | null>(null);

  useEffect(() => {
    const role = localStorage.getItem('userRole') as 'admin' | 'analyst' | 'user';
    setUserRole(role);
  }, []);

  const handleViewChange = (newView: 'create' | 'list') => {
    setLoading(true);
    setTimeout(() => {
      setView(newView);
      setLoading(false);
    }, 500);
  };

  return (
    <MainContainer>
      <ButtonContainer>
        {userRole !== 'user' && (
          <StyledButton onClick={() => handleViewChange('create')}>
            Criar Nova FAQ
          </StyledButton>
        )}
        <StyledButton onClick={() => handleViewChange('list')}>
          Listar FAQs
        </StyledButton>
      </ButtonContainer>

      {loading && (
        <LoadingContainer>
          <Spin size="large" />
        </LoadingContainer>
      )}

      {view === 'create' && <FAQCreate />}
      {view === 'list' && <FAQSearch />}
    </MainContainer>
  );
};

export default FAQs;