import React, { useState } from 'react';
import { Pagination, notification, Input, List, Empty } from 'antd';
import { ActionButton, PaginationContainer, AdvancedSearchForm } from './styles';
import { getUsers } from '../../../services/api';
import { AxiosError } from 'axios'; // Importar o tipo AxiosError


interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  role: string;
  phone_number: string;
  ramal: string;
  unit: string;
  department: string;
  created_at: string;
}

interface UserSearchProps {
  onSearch: (users: User[], totalPages: number) => void;
}

const UserSearch: React.FC<UserSearchProps> = ({ onSearch }) => {
  const [searchTerm] = useState('');
  const [searchField] = useState('username');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [users, setUsers] = useState<User[]>([]);
  const [isAdvancedSearchVisible, setIsAdvancedSearchVisible] = useState(false);
  const [filters, setFilters] = useState({
    username: '',
    name: '',
    email: '',
    role: '',
    phone_number: '',
    ramal: '',
    unit: '',
    department: '',
    created_at: '',
  });

  // Função para buscar usuários com base nos filtros e na página atual
  const fetchUsers = async (page: number) => {
    try {
      const result = await getUsers(page, { searchTerm, searchField, ...filters });
      if (result && Array.isArray(result)) {
        const users = result.map((user: any) => ({
          id: user.id,
          username: user.username,
          name: user.name,
          email: user.email,
          role: user.role,
          phone_number: user.phone_number,
          ramal: user.ramal,
          unit: user.unit || '',
          department: user.department || '',
          created_at: user.created_at,
        }));
        setUsers(users);
        setTotalPages(Math.ceil(result.length / 10));
        onSearch(users, Math.ceil(result.length / 10));
      } else {
        throw new Error('Formato de resposta da API inválido');
      }
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status === 404) {
        setUsers([]);
        notification.warning({
          message: 'Nenhum usuário encontrado',
          description: 'Nenhum usuário corresponde aos critérios de busca.',
          placement: 'top',
        });
      } else {
        notification.error({
          message: 'Erro',
          description: 'Erro ao buscar usuários',
          placement: 'top',
        });
      }
    }
  };

  // Função para iniciar a busca de usuários
  const handleSearch = () => {
    fetchUsers(page);
  };

  // Função para atualizar os filtros de busca
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      {isAdvancedSearchVisible && (
        <AdvancedSearchForm>
          <Input
            name="username"
            value={filters.username}
            onChange={handleFilterChange}
            placeholder="Username"
            style={{ width: '100%' }}
          />
          <Input
            name="name"
            value={filters.name}
            onChange={handleFilterChange}
            placeholder="Nome"
            style={{ width: '100%' }}
          />
          <Input
            name="email"
            value={filters.email}
            onChange={handleFilterChange}
            placeholder="Email"
            style={{ width: '100%' }}
          />
          <Input
            name="role"
            value={filters.role}
            onChange={handleFilterChange}
            placeholder="Role"
            style={{ width: '100%' }}
          />
          <Input
            name="phone_number"
            value={filters.phone_number}
            onChange={handleFilterChange}
            placeholder="Telefone"
            style={{ width: '100%' }}
          />
          <Input
            name="ramal"
            value={filters.ramal}
            onChange={handleFilterChange}
            placeholder="Ramal"
            style={{ width: '100%' }}
          />
          <Input
            name="unit"
            value={filters.unit}
            onChange={handleFilterChange}
            placeholder="Unidade"
            style={{ width: '100%' }}
          />
          <Input
            name="department"
            value={filters.department}
            onChange={handleFilterChange}
            placeholder="Departamento"
            style={{ width: '100%' }}
          />
          <Input
            name="created_at"
            value={filters.created_at}
            onChange={handleFilterChange}
            placeholder="Data de Criação"
            style={{ width: '100%' }}
          />
        </AdvancedSearchForm>
      )}
      <ActionButton onClick={() => setIsAdvancedSearchVisible(!isAdvancedSearchVisible)}>
        {isAdvancedSearchVisible ? 'Esconder Busca Avançada' : 'Mostrar Busca Avançada'}
      </ActionButton>
      
      <ActionButton onClick={handleSearch}>Listar Usuários</ActionButton>

      {users.length > 0 ? (
        <List
          dataSource={users}
          renderItem={(user: User) => (
            <List.Item key={user.id}>
              <List.Item.Meta
                title={user.name}
                description={`Username: ${user.username} | Role: ${user.role}`}
              />
            </List.Item>
          )}
        />
      ) : (
        <Empty description="Nenhum usuário encontrado" />
      )}

      <PaginationContainer>
        <Pagination
          current={page}
          total={totalPages * 10} 
          onChange={(p) => {
            setPage(p);
            fetchUsers(p);
          }}
        />
      </PaginationContainer>
    </div>
  );
};

export default UserSearch;