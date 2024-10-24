import React, { useState, useEffect, useCallback } from 'react';
import { Pagination, notification, Empty, Input, Spin, Select } from 'antd';
import { ActionButton, SortLabel } from './styles';
import { getUsersWithPagination } from '../../../../services/api';
import { AxiosError } from 'axios';
import UserCard from '../cards/UserCard';
import UserPopup from '../popups/UserPopup';
import { User } from '../types';

const { Option } = Select;

const UserSearch: React.FC = () => {
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [users, setUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('ASC');
  const [loading, setLoading] = useState(false);
  const [searchInitiated, setSearchInitiated] = useState(false);

  // Função para buscar usuários da API
  const fetchUsers = useCallback(
    async (
      page: number,
      limit: number,
      filter: string,
      sortBy: string,
      sortOrder: 'ASC' | 'DESC',
    ) => {
      setLoading(true);
      try {
        const result = await getUsersWithPagination(
          page,
          limit,
          filter,
          sortBy,
          sortOrder,
        );
        setUsers(result.data);
        setTotalUsers(result.total);
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.status === 404) {
          setUsers([]);
          notification.warning({
            message: 'Nenhum usuário encontrado',
            description: 'Nenhum usuário corresponde aos critérios de busca.',
          });
        } else {
          notification.error({
            message: 'Erro',
            description: 'Erro ao buscar usuários',
          });
        }
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  // Efeito para buscar usuários quando a página ou busca inicia
  useEffect(() => {
    if (searchInitiated) {
      fetchUsers(page, itemsPerPage, filter, sortBy, sortOrder);
    }
  }, [
    page,
    fetchUsers,
    itemsPerPage,
    searchInitiated,
    filter,
    sortBy,
    sortOrder,
  ]);

  // Função para iniciar a busca
  const handleSearch = () => {
    setSearchInitiated(true);
    setPage(1);
    fetchUsers(1, itemsPerPage, filter, sortBy, sortOrder);
  };

  // Função para alterar a página
  const handlePageChange = (p: number) => {
    setPage(p);
    fetchUsers(p, itemsPerPage, filter, sortBy, sortOrder);
  };

  // Função para alterar o filtro
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  // Função para alterar o critério de ordenação
  const handleSortByChange = (value: string) => {
    setSortBy(value);
  };

  // Função para alterar a ordem de ordenação
  const handleSortOrderChange = (value: 'ASC' | 'DESC') => {
    setSortOrder(value);
  };

  // Função para abrir o popup de detalhes
  const handleDetailsClick = (userId: string) => {
    setSelectedUserId(userId);
  };

  // Função para fechar o popup de detalhes
  const handleClosePopup = () => {
    setSelectedUserId(null);
  };

  // Função para atualizar a lista de usuários
  const handleUpdateUser = () => {
    fetchUsers(page, itemsPerPage, filter, sortBy, sortOrder);
  };

  return (
    <div>
      <Input
        placeholder="Filtrar usuários"
        value={filter}
        onChange={handleFilterChange}
        style={{ marginBottom: '20px' }}
      />
      <ActionButton onClick={handleSearch}>Listar Usuários</ActionButton>

      <div style={{ margin: '20px 0' }}>
        <SortLabel >Ordenar por: </SortLabel>
        <Select
          defaultValue="name"
          style={{ width: 120 }}
          onChange={handleSortByChange}
        >
          <Option value="name">Nome</Option>
          <Option value="username">Nome de Usuário</Option>
          <Option value="email">Email</Option>
          <Option value="role">Função</Option>
        </Select>

        <Select
          defaultValue="ASC"
          style={{ width: 120, marginLeft: 10 }}
          onChange={handleSortOrderChange}
        >
          <Option value="ASC">Crescente</Option>
          <Option value="DESC">Decrescente</Option>
        </Select>
      </div>

      {loading ? (
        <Spin />
      ) : searchInitiated && users.length > 0 ? (
        <div>
          {users.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onDetailsClick={handleDetailsClick}
              />
            ))}
        </div>
      ) : searchInitiated ? (
        <Empty description="Nenhum usuário encontrado" />
      ) : null}

      {searchInitiated && users.length > 0 && (
        <Pagination
          current={page}
          total={totalUsers}
          pageSize={itemsPerPage}
          onChange={handlePageChange}
        />
      )}

      {selectedUserId && (
        <UserPopup
          userId={selectedUserId}
          onClose={handleClosePopup}
          onUpdate={handleUpdateUser}
        />
      )}
    </div>
  );
};

export default UserSearch;
