import React, { useState } from 'react';
import { MainContainer, ButtonContainer, StyledButton, LoadingContainer, StyledSelect } from './styles';
import UserSearch from './components/search/UserSearch';
import UnitSearch from './components/search/UnitSearch';
import EquipmentSearch from './components/search/EquipmentSearch';
import DepartmentSearch from './components/search/DepartmentSearch';
import UserCreate from './components/create/UserCreate';
import UnitCreate from './components/create/UnitCreate';
import EquipmentCreate from './components/create/EquipmentCreate';
import DepartmentCreate from './components/create/DepartmentCreate';
import { useTheme } from 'styled-components';
import { Spin } from 'antd';

const { Option } = StyledSelect;

const Registrations: React.FC = () => {
  const [view, setView] = useState<'create' | 'list' | null>(null);
  const [entity, setEntity] = useState<'user' | 'unit' | 'equipment' | 'department' | null>(null);
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const theme = useTheme();

  const handleViewChange = (view: 'create' | 'list') => {
    setButtonLoading(true);
    setTimeout(() => {
      setView(view);
      setEntity(null);
      setButtonLoading(false);
    }, 500);
  };

  const handleEntityChange = (value: unknown) => {
    const entityValue = value as 'user' | 'unit' | 'equipment' | 'department';
    setLoading(true);
    setTimeout(() => {
      setEntity(entityValue);
      setLoading(false);
    }, 500);
  };

  return (
    <MainContainer>
      <ButtonContainer>
        <StyledButton onClick={() => handleViewChange('create')} loading={buttonLoading} >
          Criar Novo Cadastro
        </StyledButton>
        <StyledButton onClick={() => handleViewChange('list')} loading={buttonLoading} >
          Listar Cadastros
        </StyledButton>
      </ButtonContainer>

      {view && (
        <StyledSelect
          dropdownStyle={{
            // backgroundColor: theme.colors.primary,
            color: theme.colors.text,
          }}
          
          key={view} 
          placeholder={`Selecione uma entidade para ${view === 'create' ? 'criar' : 'listar'}`}
          onChange={handleEntityChange}
        >
          <Option value="user">Usuário</Option>
          <Option value="unit">Unidade</Option>
          <Option value="department">Departamento</Option>
          <Option value="equipment">Equipamento</Option>
        </StyledSelect>
      )}

      {loading && (
        <LoadingContainer>
          <Spin size="large" />
        </LoadingContainer>
      )}

      {view && entity && !loading && (
        <>
          {view === 'create' && entity === 'user' && <UserCreate />}
          {view === 'list' && entity === 'user' && <UserSearch />}
          {view === 'create' && entity === 'unit' && <UnitCreate />}
          {view === 'list' && entity === 'unit' && <UnitSearch />}
          {view === 'create' && entity === 'equipment' && <EquipmentCreate />}
          {view === 'list' && entity === 'equipment' && <EquipmentSearch />}
          {view === 'create' && entity === 'department' && <DepartmentCreate />}
          {view === 'list' && entity === 'department' && <DepartmentSearch />}
        </>
      )}
    </MainContainer>
  );
};

export default Registrations;
