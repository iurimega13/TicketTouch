import React, { useState, useEffect, useCallback } from 'react';
import { Button, Rate } from 'antd';
import { getFeedbackByTicketId } from '../../../../services/api';
import { StyledFeedbackModal } from './styles'; 

interface TicketFeedbackProps {
  ticketId: string;
  onClose: () => void;
}

const TicketFeedback: React.FC<TicketFeedbackProps> = ({ ticketId, onClose }) => {
  const [feedback, setFeedback] = useState<any>(null);

  const fetchFeedback = useCallback(async () => {
    try {
      const feedbackData = await getFeedbackByTicketId(ticketId);
      setFeedback(feedbackData);
    } catch (error) {
      console.error('Erro ao obter feedback:', error);
    }
  }, [ticketId]);

  useEffect(() => {
    fetchFeedback();
  }, [fetchFeedback]);

  if (!feedback) {
    return null;
  }

  return (
    <StyledFeedbackModal open={true} onCancel={onClose} footer={null}>
      <h3>Feedback</h3>
      <p>Avaliação: <Rate disabled value={feedback.rating} /></p>
      <p>Comentário: {feedback.comment}</p>
      <Button onClick={onClose}>Fechar</Button>
    </StyledFeedbackModal>
  );
};

export default TicketFeedback;