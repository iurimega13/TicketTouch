import React from 'react';
import { Card, CardTitle, CardContent, CardButton } from './styles';

interface TicketCardProps {
  ticket: {
    id: string;
    title: string;
    description: string;
    status: string;
    sla: {
      name: string;
      response_time: number;
      resolution_time: number;
    };
  };
  onDetailsClick: (ticketId: string) => void;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket, onDetailsClick }) => {
  return (
    <Card>
      <CardTitle>
        <p>Nome: {ticket.title}</p>
      </CardTitle>
      <CardContent>
        <p>Descrição: {ticket.description}</p>
        <p>Status: {ticket.status}</p>
        {ticket.sla && (
          <>
            <p>SLA: {ticket.sla.name}</p>
            <p>Tempo de Resposta: {ticket.sla.response_time} horas</p>
            <p>Tempo de Resolução: {ticket.sla.resolution_time} horas</p>
          </>
        )}
      </CardContent>
      <CardButton>
        <button onClick={() => onDetailsClick(ticket.id)}>Detalhes</button>
      </CardButton>
    </Card>
  );
};

export default TicketCard;