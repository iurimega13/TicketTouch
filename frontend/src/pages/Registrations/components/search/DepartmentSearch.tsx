import React, { useState, useEffect, useCallback } from 'react';
import { notification, Pagination, Empty, Input, Spin, Select } from 'antd';
import { getDepartmentsWithPagination } from '../../../../services/api';
import DepartmentCard from '../cards/DepartmentCard';
import DepartmentPopup from '../popups/DepartmentPopup';
import { Department } from '../types';
import { ActionButton, SortLabel } from './styles';

const { Option } = Select;

const DepartmentSearch: React.FC = () => {
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10);  
  const [departments, setDepartments] = useState<Department[]>([]);  
  const [totalDepartments, setTotalDepartments] = useState<number>(0);  
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('');  
  const [sortBy, setSortBy] = useState<string>('name');  
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('ASC');  
  const [loading, setLoading] = useState(false);
  const [searchInitiated, setSearchInitiated] = useState(false);

  // Função para buscar departamentos da API
  const fetchDepartments = useCallback(async (page: number, limit: number, filter: string, sortBy: string, sortOrder: 'ASC' | 'DESC') => {
    setLoading(true);
    try {
      const result = await getDepartmentsWithPagination(page, limit, filter, sortBy, sortOrder); 
      console.log('Resultado da API:', result);
      setDepartments(result.data);  
      setTotalDepartments(result.total);  
    } catch (error) {
      notification.error({
        message: 'Erro',
        description: 'Erro ao buscar departamentos',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // Efeito para buscar departamentos quando a página ou filtros/ordenadores mudam
  useEffect(() => {
    if (searchInitiated) {
      console.log('Mudando para a página:', page);
      fetchDepartments(page, itemsPerPage, filter, sortBy, sortOrder); 
    }
  }, [page, fetchDepartments, itemsPerPage, searchInitiated, filter, sortBy, sortOrder]);

  // Função para iniciar a busca
  const handleSearch = () => {
    setSearchInitiated(true);
    setPage(1);  
    fetchDepartments(1, itemsPerPage, filter, sortBy, sortOrder);  
  };

  // Função para alterar a página
  const handlePageChange = (p: number) => {
    setPage(p);
    fetchDepartments(p, itemsPerPage, filter, sortBy, sortOrder);  
  };

  // Função para alterar o filtro
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value); 
  };

  // Função para alterar o critério de ordenação
  const handleSortByChange = (value: string) => {
    setSortBy(value); 
  };

  // Função para alterar a ordem (ASC/DESC)
  const handleSortOrderChange = (value: 'ASC' | 'DESC') => {
    setSortOrder(value);  
  };

  // Função para exibir detalhes de um departamento
  const handleDetailsClick = (departmentId: string) => {
    setSelectedDepartmentId(departmentId);  
  };

  // Função para fechar o popup de departamento
  const handleClosePopup = () => {
    setSelectedDepartmentId(null);  
  };

  return (
    <div>
      <Input
        placeholder="Filtrar departamentos"
        value={filter}
        onChange={handleFilterChange}  
        style={{ marginBottom: '20px' }}
      />
      <ActionButton onClick={handleSearch}>Listar Departamentos</ActionButton>

      <div style={{ margin: '20px 0' }}>
        <SortLabel >Ordenar por: </SortLabel>
        <Select defaultValue="name" style={{ width: 120 }} onChange={handleSortByChange}>
          <Option value="name">Nome</Option>
          <Option value="created_at">Data de Criação</Option>
        </Select>

        <Select defaultValue="ASC" style={{ width: 120, marginLeft: 10 }} onChange={handleSortOrderChange}>
          <Option value="ASC">Crescente</Option>
          <Option value="DESC">Decrescente</Option>
        </Select>
      </div>

      {loading ? (
        <Spin />  
      ) : searchInitiated && departments.length > 0 ? (
        <div>
          {departments.map((department) => (
            <DepartmentCard
              key={department.id}
              department={department}
              onDetailsClick={handleDetailsClick}  
            />
          ))}
        </div>
      ) : searchInitiated ? (
        <Empty description="Nenhum departamento encontrado" />  
      ) : null}

      {searchInitiated && departments.length > 0 && (
        <Pagination
          current={page}
          total={totalDepartments} 
          pageSize={itemsPerPage}
          onChange={handlePageChange}  
        />
      )}

      {selectedDepartmentId && (
        <DepartmentPopup
          departmentId={selectedDepartmentId} 
          onClose={handleClosePopup}  
          onUpdate={handleSearch}  
        />
      )}
    </div>
  );
};

export default DepartmentSearch;
