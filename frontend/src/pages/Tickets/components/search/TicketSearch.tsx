import React, { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import { fetchTickets } from '../../../../services/api';
import TicketPopup from '../popup/TicketPopup';

const TicketSearch: React.FC = () => {
  const [tickets, setTickets] = useState<any[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<any | null>(null);
  const [popupVisible, setPopupVisible] = useState<boolean>(false);

  useEffect(() => {
    const loadTickets = async () => {
      const ticketsData = await fetchTickets();
      setTickets(ticketsData);
    };
    loadTickets();
  }, []);

  const handleDetailsClick = (ticket: any) => {
    setSelectedTicket(ticket);
    setPopupVisible(true);
  };

  const columns = [
    { title: 'Nome', dataIndex: 'title', key: 'title' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    {
      title: 'Ações',
      render: (_text: any, record: any) => (
        <Button onClick={() => handleDetailsClick(record)}>Detalhes</Button>
      ),
    },
  ];

  return (
    <>
      <Table dataSource={tickets} columns={columns} />
      {selectedTicket && (
        <TicketPopup
          visible={popupVisible}
          onClose={() => setPopupVisible(false)}
          ticket={selectedTicket}
        />
      )}
    </>
  );
};

export default TicketSearch;
