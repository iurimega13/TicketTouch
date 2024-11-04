import React, { useState, useEffect, useCallback } from 'react';
import { Button, Input, Form, notification, List, Progress, Tooltip } from 'antd';
import {
  cancelTicket,
  addCommentToTicket,
  getChangesByTicketId,
  getSlaByTicket,
  getTicketById,
  getUserProfile,
} from '../../../../services/api';
import { ChangesContainer, SlaContainer, StyledModal, StyledSpan } from './styles';

interface TicketPopupProps {
  visible: boolean;
  onClose: () => void;
  ticketId: string;
  onTicketCancelled: () => void;
}

interface Change {
  field: string;
  value: string;
  date?: string;
}

const TicketPopup: React.FC<TicketPopupProps> = ({
  visible,
  onClose,
  ticketId,
  onTicketCancelled,
}) => {
  const [ticket, setTicket] = useState<any>(null);
  const [comment, setComment] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [changes, setChanges] = useState<any[]>([]);
  const [slaDetails, setSlaDetails] = useState<any>(null);
  const [username, setUsername] = useState<string>('');
  const [extraResponseTime, setExtraResponseTime] = useState<number>(0);
  const [closingDate, setClosingDate] = useState<Date | null>(null); 

  const userId = localStorage.getItem('userId');

  const fetchUserProfile = useCallback(async () => {
    if (!userId) {
      console.error('Erro: userId não encontrado no localStorage');
      return;
    }

    try {
      const userProfile = await getUserProfile(userId);
      setUsername(userProfile.username);
    } catch (error) {
      console.error('Erro ao buscar perfil do usuário:', error);
    }
  }, [userId]);

  const fetchTicketDetails = useCallback(async () => {
    try {
      const ticketData = await getTicketById(ticketId);
      setTicket(ticketData);
      if (ticketData.sla) {
        const slaData = await getSlaByTicket(ticketData.sla.id);
        setSlaDetails(slaData);
      }
    } catch (error) {
      notification.error({
        message: 'Erro',
        description: 'Erro ao buscar detalhes do ticket',
      });
    }
  }, [ticketId]);

  const fetchChanges = useCallback(async () => {
    try {
      const changesData = await getChangesByTicketId(ticketId);
      setChanges(changesData);
  
      let additionalTime = 0;
      let foundClosingDate: Date | null = null;
  
      if (Array.isArray(changesData)) {
        changesData.forEach((changeItem) => {
          if (Array.isArray(changeItem.changes)) {
            changeItem.changes.forEach((change: Change) => {
              if (
                change.field === 'comentário' &&
                (change.value.includes('admin') || change.value.includes('analista'))
              ) {
                if (ticket && ticket.type === 'incidente') {
                  additionalTime += 1 * 60 * 60 * 1000; 
                } else if (ticket && ticket.type === 'solicitacao') {
                  additionalTime += 4 * 60 * 60 * 1000;
                }
              }
  
              
              if (
                (change.field === 'cancelamento' || change.field === 'fechamento') &&
                change.date
              ) {
                foundClosingDate = new Date(change.date);
              }
            });
          }
        });
      } else {
        console.error("Erro: changesData não é um array");
      }
  
      setExtraResponseTime(additionalTime);
      setClosingDate(foundClosingDate); 
    } catch (error) {
      notification.error({
        message: 'Erro',
        description: 'Erro ao buscar histórico de atualizações',
      });
      console.error("Erro ao buscar histórico de mudanças:", error);
    }
  }, [ticketId, ticket]);
  

  useEffect(() => {
    if (visible) {
      fetchUserProfile();
      fetchTicketDetails();
      fetchChanges();
    }
  }, [visible, fetchUserProfile, fetchTicketDetails, fetchChanges]);

  const calculateSlaStatus = () => {
    if (!slaDetails || !ticket) return 'SLA não definido';

    const createdAt = new Date(ticket.created_at);
    const currentTime = new Date();
    const effectiveEndDate = closingDate || currentTime;

    const responseDeadline = new Date(
      createdAt.getTime() + slaDetails.response_time * 60 * 60 * 1000 + extraResponseTime
    );
    const resolutionDeadline = new Date(
      createdAt.getTime() + slaDetails.resolution_time * 60 * 60 * 1000
    );

    // 1. Verifica se o ticket está fechado
    if (closingDate) return ' Fechado';
    

    // 2. Verifica se o prazo de resolução foi ultrapassado
    if (effectiveEndDate > resolutionDeadline) return 'Atrasado para resolução';

    // 3. Verifica se o prazo de resposta foi ultrapassado
    if (effectiveEndDate > responseDeadline) return 'Atrasado para resposta';

    // 4. Caso contrário, está dentro do prazo
    return 'Dentro do Prazo';
  };

  const calculateProgress = (deadline: Date) => {
    const createdAt = new Date(ticket.created_at);
    const effectiveEndDate = closingDate || new Date();
    const totalDuration = deadline.getTime() - createdAt.getTime();
    const elapsedDuration = effectiveEndDate.getTime() - createdAt.getTime();
    return Math.min(Math.round((elapsedDuration / totalDuration) * 100), 100);
  };

  const getProgressColor = (percent: number) => {
    if (percent < 50) return 'green';
    if (percent < 75) return 'yellow';
    if (percent < 90) return 'orange';
    return 'red';
  };

  const handleCancelTicket = async () => {
    setLoading(true);
    try {
      const lastChange = changes[changes.length - 1];
      await addCommentToTicket(lastChange.id, `Cancelou o ticket.`, username, 'cancelamento');
      await cancelTicket(ticket.id);
      notification.success({
        message: 'Sucesso',
        description: 'Ticket cancelado com sucesso',
      });
      onTicketCancelled();
    } catch (error) {
      notification.error({
        message: 'Erro',
        description: 'Erro ao cancelar o ticket',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async () => {
    if (!comment.trim()) {
      return notification.warning({
        message: 'Aviso',
        description: 'Comentário não pode estar vazio.',
      });
    }

    try {
      const lastChange = changes[changes.length - 1];
      await addCommentToTicket(lastChange.id, comment, username, 'comentário');
      notification.success({
        message: 'Sucesso',
        description: 'Comentário adicionado com sucesso',
      });

      setComment('');
      fetchChanges();
    } catch (error) {
      notification.error({
        message: 'Erro',
        description: 'Erro ao adicionar comentário',
      });
    }
  };

  if (!ticket) {
    return null;
  }

  const responseDeadline = slaDetails
    ? new Date(
        new Date(ticket.created_at).getTime() +
          slaDetails.response_time * 60 * 60 * 1000 +
          extraResponseTime,
      )
    : null;
  const resolutionDeadline = slaDetails
    ? new Date(
        new Date(ticket.created_at).getTime() +
          slaDetails.resolution_time * 60 * 60 * 1000,
      )
    : null;

  const responseProgress = responseDeadline
    ? calculateProgress(responseDeadline)
    : 0;
  const resolutionProgress = resolutionDeadline
    ? calculateProgress(resolutionDeadline)
    : 0;

  return (
    <StyledModal open={visible} onCancel={onClose} footer={null}>
      <Form layout="vertical">
        <Form.Item label="Título do Ticket">
          <p>{ticket.title}</p>
        </Form.Item>

        <Form.Item label="Descrição do Ticket">
          <p>{ticket.description}</p>
        </Form.Item>

        <Form.Item label="Status do Ticket">
          <p>{ticket.status}</p>
        </Form.Item>

        {slaDetails && (
          <Form.Item label="SLA">
            <p>Status: {calculateSlaStatus()}</p>
            <SlaContainer>
              {responseDeadline && (
                <Tooltip title={`Prazo de Resposta: ${responseDeadline.toLocaleString()}`}>
                  <div style={{ marginBottom: '10px' }}>
                    <StyledSpan>Progresso de Resposta:</StyledSpan>
                    <Progress
                      percent={responseProgress}
                      status="active"
                      strokeColor={getProgressColor(responseProgress)}
                    />
                  </div>
                </Tooltip>
              )}
              {resolutionDeadline && (
                <Tooltip title={`Prazo de Resolução: ${resolutionDeadline.toLocaleString()}`}>
                  <div>
                    <StyledSpan>Progresso de Resolução:</StyledSpan>
                    <Progress
                      percent={resolutionProgress}
                      status="active"
                      strokeColor={getProgressColor(resolutionProgress)}
                    />
                  </div>
                </Tooltip>
              )}
            </SlaContainer>
          </Form.Item>
        )}

        <Form.Item label="Histórico de Atualizações">
          {changes.length === 0 ? (
            <p>Sem histórico de atualizações</p>
          ) : (
            <ChangesContainer>
              <List
                dataSource={changes}
                renderItem={(item) => (
                  <List.Item>
                    <div>
                      {item.changes.map((change: Change, index: number) => (
                        <p key={index}>
                          {change.date ? `${new Date(change.date).toLocaleString()} - ` : ''}
                          {`${change.value}`}
                        </p>
                      ))}
                    </div>
                  </List.Item>
                )}
              />
            </ChangesContainer>
          )}
        </Form.Item>

        {ticket.status !== 'Fechado' ? (
          <>
            <Form.Item label="Adicionar Comentário">
              <Input.TextArea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Digite um comentário"
                rows={4}
              />
            </Form.Item>

            <Form.Item style={{ textAlign: 'right', marginTop: '20px' }}>
              <Button
                type="primary"
                onClick={() => handleAddComment()}
                style={{ marginRight: '10px' }}
              >
                Adicionar Comentário
              </Button>
              <Button
                danger
                onClick={() => handleCancelTicket()}
                loading={loading}
                style={{ marginRight: '10px' }}
              >
                Cancelar Ticket
              </Button>
            </Form.Item>
          </>
        ) : (
          <Form.Item style={{ textAlign: 'right', marginTop: '20px' }}>
            <Button
              type="primary"
              onClick={() => console.log('Feedback button clicked')}
              style={{ marginRight: '10px' }}
            >
              Adicionar Feedback
            </Button>
          </Form.Item>
        )}
      </Form>
    </StyledModal>
  );
};

export default TicketPopup;