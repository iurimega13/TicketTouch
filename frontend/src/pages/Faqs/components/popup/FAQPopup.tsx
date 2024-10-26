// src/components/popups/FAQPopup.tsx
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Modal, Spin, notification } from 'antd';
import { getFAQById, updateFAQ, deleteFAQ } from '../../../../services/api';
import { StyledModal } from './styles';

interface FAQPopupProps {
  faqId: string;
  onClose: () => void;
  onUpdate: () => void;
}

const FAQPopup: React.FC<FAQPopupProps> = ({ faqId, onClose, onUpdate }) => {
  const [faq, setFAQ] = useState<{ question: string; answer: string } | null>(
    null,
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFAQ = async () => {
      setLoading(true);
      try {
        const data = await getFAQById(faqId);
        setFAQ(data);
      } catch (error) {
        console.error('Erro ao buscar FAQ:', error);
        notification.error({
          message: 'Erro!',
          description: 'Erro ao buscar FAQ.',
        });
      } finally {
        setLoading(false);
      }
    };
    fetchFAQ();
  }, [faqId]);

  const handleUpdate = async (values: { question: string; answer: string }) => {
    setLoading(true);
    try {
      await updateFAQ(faqId, values);
      notification.success({
        message: 'Sucesso!',
        description: 'FAQ atualizada com sucesso.',
      });
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Erro ao atualizar FAQ:', error);
      notification.error({
        message: 'Erro!',
        description: 'Erro ao atualizar FAQ.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    Modal.confirm({
      title: 'Confirmar Exclusão',
      content: 'Tem certeza de que deseja excluir esta FAQ?',
      onOk: async () => {
        setLoading(true);
        try {
          await deleteFAQ(faqId);
          notification.success({
            message: 'Sucesso!',
            description: 'FAQ deletada com sucesso.',
          });
          onUpdate();
          onClose();
        } catch (error) {
          console.error('Erro ao deletar FAQ:', error);
          notification.error({
            message: 'Erro!',
            description: 'Erro ao deletar FAQ.',
          });
        } finally {
          setLoading(false);
        }
      },
    });
  };

  return (
    <StyledModal open={true} onCancel={onClose} footer={null}>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Form
          layout="vertical"
          initialValues={faq || { question: '', answer: '' }}
          onFinish={handleUpdate}
        >
          <Form.Item
            label="Pergunta"
            name="question"
            rules={[{ required: true, message: 'Insira a pergunta' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Resposta"
            name="answer"
            rules={[{ required: true, message: 'Insira a resposta' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Atualizar
            </Button>
            <Button
              danger
              onClick={handleDelete}
              style={{ marginLeft: '10px' }}
            >
              Deletar
            </Button>
          </Form.Item>
        </Form>
      )}
    </StyledModal>
  );
};

export default FAQPopup;
