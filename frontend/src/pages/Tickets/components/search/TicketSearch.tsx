import React, { useEffect, useState, useCallback } from 'react';
import { Select, Spin, notification } from 'antd';
import { fetchTickets } from '../../../../services/api';
import TicketPopup from '../popup/TicketPopup';
import TicketCard from '../card/TicketCard';
import { SortButton } from './styles';

const { Option } = Select;

const TicketSearch: React.FC = () => {
  const [tickets, setTickets] = useState<any[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<any | null>(null);
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>('open');
  const [isAscending, setIsAscending] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);

  const loadTickets = useCallback(async () => {
    setLoading(true);
    try {
      const ticketsData = await fetchTickets(filter);

      console.log(`Tickets carregados:`, ticketsData);

      // Filtrar e ordenar os tickets
      const filteredTickets = ticketsData.filter((ticket: any) => {
        const isOpenStatus = ticket.status === 'Aberto' || ticket.status === 'Em Andamento';
        const isClosedStatus = ticket.status === 'Fechado';

        return filter === 'open' ? isOpenStatus : isClosedStatus;
      });

      console.log(`Tickets filtrados (apenas abertos e em andamento):`, filteredTickets);

      const sortedTickets = filteredTickets.sort((a: any, b: any) => {
        if (filter === 'open') {
          return (
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          );
        } else if (filter === 'closed') {
          const lastChangeA =
            a.changes?.find((change: any) => change.field === 'cancelamento')
              ?.date || a.updated_at;
          const lastChangeB =
            b.changes?.find((change: any) => change.field === 'cancelamento')
              ?.date || b.updated_at;
          return (
            new Date(lastChangeB).getTime() - new Date(lastChangeA).getTime()
          );
        }
        return 0;
      });

      if (!isAscending) {
        sortedTickets.reverse();
      }

      console.log(`Tickets ordenados:`, sortedTickets);

      setTickets(sortedTickets);
    } catch (error) {
      notification.error({
        message: 'Erro',
        description: 'Erro ao buscar tickets',
      });
    } finally {
      setLoading(false);
    }
  }, [filter, isAscending]);

  useEffect(() => {
    loadTickets();
  }, [filter, isAscending, loadTickets]);

  const handleDetailsClick = (ticket: any) => {
    setSelectedTicket(ticket);
    setPopupVisible(true);
  };

  const handleFilterChange = (value: string) => {
    setFilter(value);
  };

  const handleTicketCancelled = () => {
    setPopupVisible(false);
    loadTickets();
  };

  const toggleSortOrder = () => {
    setIsAscending(!isAscending);
  };

  return (
    <>
      <Select
        defaultValue="open"
        onChange={handleFilterChange}
        style={{ marginBottom: '16px' }}
      >
        <Option value="open">Tickets Abertos</Option>
        <Option value="closed">Tickets Fechados</Option>
      </Select>
      <SortButton onClick={toggleSortOrder} style={{ marginBottom: '16px' }}>
        {isAscending ? 'Ordem Decrescente' : 'Ordem Crescente'}
      </SortButton>
      {loading ? (
        <Spin size="large" />
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {tickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              onDetailsClick={() => handleDetailsClick(ticket)}
            />
          ))}
        </div>
      )}
      {selectedTicket && (
        <TicketPopup
          visible={popupVisible}
          onClose={() => setPopupVisible(false)}
          ticketId={selectedTicket.id}
          onTicketCancelled={handleTicketCancelled}
        />
      )}
    </>
  );
};

export default TicketSearch;
