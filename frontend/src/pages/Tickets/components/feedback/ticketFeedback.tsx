import React, { useState, useEffect, useCallback } from 'react';
import { Button, Input, Form, notification, Rate } from 'antd';
import { createFeedback, getFeedbackByTicketId } from '../../../../services/api';
import { StyledFeedbackModal } from './styles'; 

interface TicketFeedbackProps {
  ticketId: string;
  onClose: () => void;
}

const TicketFeedback: React.FC<TicketFeedbackProps> = ({ ticketId, onClose }) => {
  const [feedback, setFeedback] = useState<any>(null);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem('userId');

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

  const handleCreateFeedback = async () => {
    setLoading(true);
    try {
      await createFeedback({ user: userId, ticket: ticketId, rating, comment });
      notification.success({
        message: 'Sucesso',
        description: 'Feedback criado com sucesso',
      });
      onClose();
    } catch (error) {
      notification.error({
        message: 'Erro',
        description: 'Erro ao criar feedback',
      });
    } finally {
      setLoading(false);
    }
  };

  if (feedback) {
    return (
      <StyledFeedbackModal open={true} onCancel={onClose} footer={null}>
        <h3>Feedback</h3>
        <p>Avaliação: <Rate disabled value={feedback.rating} /></p>
        <p>Comentário: {feedback.comment}</p>
        <Button onClick={onClose}>Fechar</Button>
      </StyledFeedbackModal>
    );
  }

  return (
    <StyledFeedbackModal open={true} onCancel={onClose} footer={null}>
      <Form layout="vertical">
        <Form.Item label="Avaliação">
          <Rate value={rating} onChange={setRating} />
        </Form.Item>
        <Form.Item label="Comentário">
          <Input.TextArea value={comment} onChange={(e) => setComment(e.target.value)} rows={4} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleCreateFeedback} loading={loading}>
            Enviar Feedback
          </Button>
        </Form.Item>
      </Form>
    </StyledFeedbackModal>
  );
};

export default TicketFeedback;