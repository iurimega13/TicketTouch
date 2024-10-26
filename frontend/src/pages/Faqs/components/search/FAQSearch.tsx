import React, { useState, useEffect, useCallback } from 'react';
import { notification, Pagination, Empty, Input, Spin, Select } from 'antd';
import { getFAQsWithPagination } from '../../../../services/api';
import FAQCard from '../card/FAQCard';
import FAQPopup from '../popup/FAQPopup';
import { ActionButton, SortLabel } from './styles';

const { Option } = Select;

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const FAQSearch: React.FC = () => {
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [faqs, setFAQs] = useState<FAQ[]>([]);
  const [totalFAQs, setTotalFAQs] = useState<number>(0);
  const [selectedFAQId, setSelectedFAQId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('question');
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('ASC');
  const [loading, setLoading] = useState(false);
  const [searchInitiated, setSearchInitiated] = useState(false);

  // Função para buscar FAQs da API
  const fetchFAQs = useCallback(
    async (
      page: number,
      limit: number,
      filter: string,
      sortBy: string,
      sortOrder: 'ASC' | 'DESC',
    ) => {
      setLoading(true);
      try {
        const result = await getFAQsWithPagination(
          page,
          limit,
          filter,
          sortBy,
          sortOrder,
        );
        setFAQs(result.data);
        setTotalFAQs(result.total);
      } catch (error) {
        notification.error({
          message: 'Erro',
          description: 'Erro ao buscar FAQs',
        });
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  // Efeito para buscar FAQs quando a página ou busca inicia
  useEffect(() => {
    if (searchInitiated) {
      fetchFAQs(page, itemsPerPage, filter, sortBy, sortOrder);
    }
  }, [
    page,
    fetchFAQs,
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
    fetchFAQs(1, itemsPerPage, filter, sortBy, sortOrder);
  };

  // Função para alterar a página
  const handlePageChange = (p: number) => {
    setPage(p);
    fetchFAQs(p, itemsPerPage, filter, sortBy, sortOrder);
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

  // Função para exibir detalhes de uma FAQ
  const handleDetailsClick = (faqId: string) => {
    setSelectedFAQId(faqId);
  };

  // Função para fechar o popup de FAQ
  const handleClosePopup = () => {
    setSelectedFAQId(null);
  };

  return (
    <div>
      <Input
        placeholder="Filtrar FAQs"
        value={filter}
        onChange={handleFilterChange}
        style={{ marginBottom: '20px' }}
      />
      <ActionButton onClick={handleSearch}>Listar FAQs</ActionButton>

      <div style={{ margin: '20px 0' }}>
        <SortLabel>Ordenar por: </SortLabel>
        <Select
          defaultValue="question"
          style={{ width: 120 }}
          onChange={handleSortByChange}
        >
          <Option value="question">Pergunta</Option>
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
      ) : searchInitiated && faqs.length > 0 ? (
        <div>
          {faqs.map((faq) => (
            <FAQCard
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
              onDetailsClick={() => handleDetailsClick(faq.id)}
            />
          ))}
        </div>
      ) : searchInitiated ? (
        <Empty description="Nenhuma FAQ encontrada" />
      ) : null}

      {searchInitiated && faqs.length > 0 && (
        <Pagination
          current={page}
          total={totalFAQs}
          pageSize={itemsPerPage}
          onChange={handlePageChange}
        />
      )}

      {selectedFAQId && (
        <FAQPopup
          faqId={selectedFAQId}
          onClose={handleClosePopup}
          onUpdate={handleSearch}
        />
      )}
    </div>
  );
};

export default FAQSearch;