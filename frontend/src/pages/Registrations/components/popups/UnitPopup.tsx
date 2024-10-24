import React, { useState, useEffect } from 'react';
import { Input, Button, Form, notification } from 'antd';
import { getUnitProfile, updateUnit, deleteUnit } from '../../../../services/api';
import { Unit } from '../types';
import { StyledModal } from './styles';
import { AxiosError } from 'axios';

interface UnitPopupProps {
  unitId: string;
  onClose: () => void;
  onUpdate: () => void;
}

const UnitPopup: React.FC<UnitPopupProps> = ({ unitId, onClose, onUpdate }) => {
  const [unit, setUnit] = useState<Unit | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUnit = async () => {
      try {
        const unitData = await getUnitProfile(unitId);
        setUnit(unitData);
      } catch (error) {
        console.error('Erro ao buscar unidade:', error);
        notification.error({
          message: 'Erro',
          description: 'Erro ao buscar unidade',
        });
      }
    };

    fetchUnit();
  }, [unitId]);

  const handleUpdate = async () => {
    if (!unit) return;

    setLoading(true);
    try {
      await updateUnit(unitId, unit);
      notification.success({
        message: 'Unidade Atualizada',
        description: `A unidade ${unit.name} foi atualizada com sucesso.`,
      });
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Erro ao atualizar unidade:', error);
      notification.error({
        message: 'Erro',
        description: error instanceof Error ? error.message : 'Erro desconhecido ao atualizar unidade',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteUnit(unitId);
      notification.success({
        message: 'Unidade Deletada',
        description: `A unidade ${unit?.name} foi deletada com sucesso.`,
      });
      onUpdate();
      onClose();
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        console.error('Erro ao deletar unidade:', error.response.data.message);
        notification.error({
          message: 'Erro',
          description: error.response.data.message,
        });
      } else if (error instanceof Error) {
        console.error('Erro ao deletar unidade:', error.message);
        notification.error({
          message: 'Erro',
          description: error.message,
        });
      } else {
        console.error('Erro ao deletar unidade:', error);
        notification.error({
          message: 'Erro',
          description: 'Erro desconhecido ao deletar unidade',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!unit) return;

    setUnit({
      ...unit,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <StyledModal open={true} onCancel={onClose} footer={null}>
      {unit ? (
        <Form layout="vertical">
          <Form.Item label="Nome">
            <Input name="name" value={unit.name} onChange={handleChange} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleUpdate} loading={loading}>
              Atualizar
            </Button>
            <Button danger onClick={handleDelete} loading={loading} style={{ marginLeft: '10px' }}>
              Deletar
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <p>Carregando...</p>
      )}
    </StyledModal>
  );
};

export default UnitPopup;