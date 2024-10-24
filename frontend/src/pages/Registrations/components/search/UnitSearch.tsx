import React, { useState, useEffect, useCallback } from 'react';
import { notification, Pagination, Empty, Input, Spin, Select } from 'antd';
import { getUnitsWithPagination } from '../../../../services/api';
import UnitCard from '../cards/UnitCard';
import UnitPopup from '../popups/UnitPopup';
import { Unit } from '../types';
import { ActionButton, SortLabel } from './styles';

const { Option } = Select;

const UnitSearch: React.FC = () => {
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [units, setUnits] = useState<Unit[]>([]);
  const [totalUnits, setTotalUnits] = useState<number>(0);
  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('ASC');
  const [loading, setLoading] = useState(false);
  const [searchInitiated, setSearchInitiated] = useState(false);

  // Função para buscar unidades da API
  const fetchUnits = useCallback(
    async (
      page: number,
      limit: number,
      filter: string,
      sortBy: string,
      sortOrder: 'ASC' | 'DESC',
    ) => {
      setLoading(true);
      try {
        const result = await getUnitsWithPagination(
          page,
          limit,
          filter,
          sortBy,
          sortOrder,
        );
        setUnits(result.data);
        setTotalUnits(result.total);
      } catch (error) {
        notification.error({
          message: 'Erro',
          description: 'Erro ao buscar unidades',
        });
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  // Efeito para buscar unidades quando a página ou busca inicia
  useEffect(() => {
    if (searchInitiated) {
      console.log('Mudando para a página:', page);
      fetchUnits(page, itemsPerPage, filter, sortBy, sortOrder);
    }
  }, [
    page,
    fetchUnits,
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
    fetchUnits(1, itemsPerPage, filter, sortBy, sortOrder);
  };

  // Função para alterar a página
  const handlePageChange = (p: number) => {
    setPage(p);
    fetchUnits(p, itemsPerPage, filter, sortBy, sortOrder);
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

  // Função para exibir detalhes de uma unidade
  const handleDetailsClick = (unitId: string) => {
    setSelectedUnitId(unitId);
  };

  // Função para fechar o popup de unidade
  const handleClosePopup = () => {
    setSelectedUnitId(null);
  };

  return (
    <div>
      <Input
        placeholder="Filtrar unidades"
        value={filter}
        onChange={handleFilterChange}
        style={{ marginBottom: '20px' }}
      />
      <ActionButton onClick={handleSearch}>Listar Unidades</ActionButton>

      <div style={{ margin: '20px 0' }}>
        <SortLabel >Ordenar por: </SortLabel>
        <Select
          defaultValue="name"
          style={{ width: 120 }}
          onChange={handleSortByChange}
        >
          <Option value="name">Nome</Option>
          <Option value="created_at">Data de Criação</Option>
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
      ) : searchInitiated && units.length > 0 ? (
        <div>
          {units.map((unit) => (
            <UnitCard
              key={unit.id}
              unit={unit}
              onDetailsClick={handleDetailsClick}
            />
          ))}
        </div>
      ) : searchInitiated ? (
        <Empty description="Nenhuma unidade encontrada" />
      ) : null}

      {searchInitiated && units.length > 0 && (
        <Pagination
          current={page}
          total={totalUnits}
          pageSize={itemsPerPage}
          onChange={handlePageChange}
        />
      )}

      {selectedUnitId && (
        <UnitPopup
          unitId={selectedUnitId}
          onClose={handleClosePopup}
          onUpdate={handleSearch}
        />
      )}
    </div>
  );
};

export default UnitSearch;
