import React, { useEffect, useState, useCallback } from 'react';
import { Spin, notification } from 'antd';
import { fetchTicketsByTechnician, fetchTicketsSupport, getChangesByTicketId } from '../../../../services/api';
import TicketPopup from '../popup/TicketPopup';
import { TicketData } from '../../../../types/types';
import { MainContainer, FilterContainer, SortButton, StyledSelect } from './styles';
import TicketTable from '../table/TicketTable';

const { Option } = StyledSelect;

const sortTickets = (tickets: TicketData[], isAscending: boolean) => {
  const sortedTickets = [...tickets].sort((a, b) =>
    new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );
  return isAscending ? sortedTickets : sortedTickets.reverse();
};

interface TicketSearchProps {
  type: string;
}

const TicketSearch: React.FC<TicketSearchProps> = ({ type }) => {
  const userId = localStorage.getItem('userId') || '';
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<TicketData | null>(null);
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>('open');
  const [isAscending, setIsAscending] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);

  const loadTickets = useCallback(async () => {
    setLoading(true);
    console.log(`Carregando tickets para o tipo ${type} com filtro ${filter}`);
    try {
      let ticketsData;

      if (type === 'myTickets') {
        ticketsData = await fetchTicketsByTechnician(userId, filter);
      } else {
        ticketsData = await fetchTicketsSupport(filter, type);
      }

      const filteredTickets = ticketsData.filter((ticket: TicketData) => {
        const isOpenStatus = ['Aberto', 'Em Andamento'].includes(ticket.status);
        const isClosedStatus = ticket.status === 'Fechado';

        if (type === 'incident') {
          return ticket.title.startsWith('INC') && (filter === 'open' ? isOpenStatus : isClosedStatus);
        } else if (type === 'serviceRequest') {
          return ticket.title.startsWith('SOL') && (filter === 'open' ? isOpenStatus : isClosedStatus);
        } else if (type === 'myTickets') {
          return (
            ticket.technician?.id === userId &&
            (filter === 'open' ? isOpenStatus : isClosedStatus)
          );
        }
        return false;
      });

      setTickets(sortTickets(filteredTickets, isAscending));
    } catch (error) {
      notification.error({
        message: 'Erro',
        description: 'Erro ao buscar tickets',
      });
    } finally {
      setLoading(false);
    }
  }, [type, filter, isAscending, userId]);

  const toggleSortOrder = () => {
    setIsAscending(!isAscending);
    setTickets(prevTickets => sortTickets(prevTickets, !isAscending));
  };

  useEffect(() => {
    loadTickets();
  }, [type, filter, loadTickets]);

  useEffect(() => {
    setFilter('open');
  }, [type]);

  const handleDetailsClick = async (ticket: TicketData) => {
    console.log('Exibindo detalhes para o ticket:', ticket);
    try {
      const changesData = await getChangesByTicketId(ticket.id);
      setSelectedTicket({ ...ticket, changes: changesData });
      setPopupVisible(true);
    } catch (error) {
      notification.error({
        message: 'Erro',
        description: 'Erro ao buscar histórico de atualizações',
      });
    }
  };

  const handleTicketCancelled = () => {
    setPopupVisible(false);
    loadTickets();
  };

  const handleFilterChange = (value: string) => {
    console.log('Filtro alterado para:', value);
    setFilter(value);
  };

  return (
    <MainContainer>
      {loading && <Spin size="large" />}
      {!loading && (
        <>
          <FilterContainer>
            <StyledSelect value={filter} onChange={(value) => handleFilterChange(value as string)} style={{ marginBottom: '16px' }}>
              <Option value="open">Tickets Abertos</Option>
              <Option value="closed">Tickets Fechados</Option>
            </StyledSelect>
          </FilterContainer>
          <FilterContainer>
            <SortButton onClick={toggleSortOrder} style={{ marginBottom: '16px' }}>
              {isAscending ? 'Ordem Decrescente' : 'Ordem Crescente'}
            </SortButton>
          </FilterContainer>
          <TicketTable tickets={tickets} handleDetailsClick={handleDetailsClick} />
        </>
      )}
      {selectedTicket && (
        <TicketPopup
          visible={popupVisible}
          onClose={() => setPopupVisible(false)}
          ticketId={selectedTicket.id}
          onTicketCancelled={handleTicketCancelled}
        />
      )}
    </MainContainer>
  );
};

export default TicketSearch;