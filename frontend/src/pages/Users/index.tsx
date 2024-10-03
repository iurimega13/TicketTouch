import React, { useState, useEffect } from 'react';
import { getUsers, getUnits, getDepartments } from '../../services/api';
import { UserContainer, MainContainer } from './styles';
import UserSearch from './components/UserSearch'; // Corrigir caminho
import UserCreate from './components/UserCreate'; // Corrigir caminho
import { notification } from 'antd';

interface User {
  id: string;
  username: string;
  role: string;
  department: string;
  unit: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [units, setUnits] = useState<{ id: string; name: string }[]>([]);
  const [departments, setDepartments] = useState<{ id: string; name: string }[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
    fetchUnitsAndDepartments();
  }, []);

  const fetchUsers = async (page = 1, filters = { searchTerm: '', searchField: '', startDate: null, endDate: null }) => {
    try {
      const result = await getUsers(page, filters);
      setUsers(result.users || []);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      notification.error({
        message: 'Erro',
        description: 'Erro ao buscar usuários',
        placement: 'top',
      });
    }
  };

  const fetchUnitsAndDepartments = async () => {
    try {
      const unitsResult = await getUnits();
      const departmentsResult = await getDepartments();
      setUnits(unitsResult);
      setDepartments(departmentsResult);
    } catch (error) {
      console.error('Erro ao buscar unidades e departamentos:', error);
      notification.error({
        message: 'Erro',
        description: 'Erro ao buscar unidades e departamentos',
        placement: 'top',
      });
    }
  };

  const handleSearch = (users: any[]) => {
    setUsers(users || []); // Garantir que users seja uma lista vazia se users for undefined
  };

  return (
    <MainContainer>
      <UserContainer>
        <div>
          <UserCreate
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            onUserCreated={(user: User) => setUsers([...users, user])} // Adicionar tipo User
            units={units}
            departments={departments}
            openModal={() => setIsCreateModalOpen(true)} // Passar função para abrir o modal
          />
          <UserSearch onSearch={handleSearch} />
        </div>
      </UserContainer>
    </MainContainer>
  );
};

export default Users;