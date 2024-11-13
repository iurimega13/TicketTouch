import React, { useState, useEffect, useCallback } from 'react';
import { notification, Pagination, Empty, Input, Spin, Select } from 'antd';
import { getEquipmentsWithPagination } from '../../../../services/api';
import EquipmentCard from '../cards/EquipmentCard';
import EquipmentPopup from '../popups/EquipmentPopup';
import { Equipment } from '../types';
import { ActionButton, StyledDiv } from './styles';

const { Option } = Select;

const EquipmentSearch: React.FC = () => {
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [totalEquipments, setTotalEquipments] = useState<number>(0);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('ASC');
  const [loading, setLoading] = useState(false);
  const [searchInitiated, setSearchInitiated] = useState(false);

  const fetchEquipments = useCallback(async (page: number, limit: number, filter: string, sortBy: string, sortOrder: 'ASC' | 'DESC') => {
    setLoading(true);
    try {
      const result = await getEquipmentsWithPagination(page, limit, filter, sortBy, sortOrder);
      setEquipments(result.data);
      setTotalEquipments(result.total);
    } catch (error) {
      notification.error({
        message: 'Erro',
        description: 'Erro ao buscar equipamentos',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (searchInitiated) {
      fetchEquipments(page, itemsPerPage, filter, sortBy, sortOrder);
    }
  }, [page, fetchEquipments, itemsPerPage, searchInitiated, filter, sortBy, sortOrder]);

  const handleSearch = () => {
    setSearchInitiated(true);
    setPage(1);
    fetchEquipments(1, itemsPerPage, filter, sortBy, sortOrder);
  };

  const handlePageChange = (p: number) => {
    setPage(p);
    fetchEquipments(p, itemsPerPage, filter, sortBy, sortOrder);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const handleSortByChange = (value: string) => {
    setSortBy(value);
  };

  const handleSortOrderChange = (value: 'ASC' | 'DESC') => {
    setSortOrder(value);
  };

  const handleDetailsClick = (equipmentId: string) => {
    setSelectedEquipmentId(equipmentId);
  };

  const handleClosePopup = () => {
    setSelectedEquipmentId(null);
  };

  const handleUpdateEquipments = () => {
    fetchEquipments(page, itemsPerPage, filter, sortBy, sortOrder);
  };

  return (
    <div>
      <Input
        placeholder="Filtrar equipamentos"
        value={filter}
        onChange={handleFilterChange}
        style={{ marginBottom: '20px' }}
      />
      <ActionButton onClick={handleSearch}>Listar Equipamentos</ActionButton>

      <div style={{ margin: '20px 0' }}>
        <span>Ordenar por: </span>
        <Select defaultValue="name" style={{ width: 120 }} onChange={handleSortByChange}>
          <Option value="name">Nome</Option>
          <Option value="created_at">Data de Criação</Option>
          <Option value="serial_number">Número de Série</Option>
        </Select>

        <Select defaultValue="ASC" style={{ width: 120, marginLeft: 10 }} onChange={handleSortOrderChange}>
          <Option value="ASC">Crescente</Option>
          <Option value="DESC">Decrescente</Option>
        </Select>
      </div>

      {loading ? (
        <Spin />
      ) : searchInitiated && equipments.length > 0 ? (
        <StyledDiv>
          {equipments.map((equipment) => (
            <EquipmentCard
              key={equipment.id}
              equipment={equipment}
              onDetailsClick={handleDetailsClick}
            />
          ))}
        </StyledDiv>
      ) : searchInitiated ? (
        <Empty description="Nenhum equipamento encontrado" />
      ) : null}

      {searchInitiated && equipments.length > 0 && (
        <Pagination
          current={page}
          total={totalEquipments}
          pageSize={itemsPerPage}
          onChange={handlePageChange}
        />
      )}

      {selectedEquipmentId && (
        <EquipmentPopup
          equipmentId={selectedEquipmentId}
          onClose={handleClosePopup}
          onUpdate={handleUpdateEquipments}
        />
      )}
    </div>
  );
};

export default EquipmentSearch;