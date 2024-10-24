import React, { useState, useEffect } from 'react';
import { notification, Input, Button, Form, Select, Spin } from 'antd';
import { getDepartmentProfile, updateDepartment, deleteDepartment, getUnits } from '../../../../services/api';
import { StyledModal } from './styles';
import { Department, Unit } from '../types';
import { AxiosError } from 'axios';

interface DepartmentPopupProps {
  departmentId: string;
  onClose: () => void;
  onUpdate: () => void;
}

const DepartmentPopup: React.FC<DepartmentPopupProps> = ({ departmentId, onClose, onUpdate }) => {
  const [department, setDepartment] = useState<Department | null>(null);
  const [units, setUnits] = useState<Unit[]>([]);
  const [loadingUnits, setLoadingUnits] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDepartment = async () => {
      setLoading(true);
      try {
        const departmentData = await getDepartmentProfile(departmentId);
        setDepartment(departmentData);
      } catch (error) {
        console.error('Erro ao buscar departamento:', error);
        notification.error({
          message: 'Erro',
          description: 'Erro ao buscar departamento',
        });
      } finally {
        setLoading(false);
      }
    };

    const fetchUnits = async () => {
      setLoadingUnits(true);
      try {
        const response = await getUnits();
        setUnits(response || []);
      } catch (error) {
        console.error('Erro ao buscar unidades:', error);
        notification.error({
          message: 'Erro',
          description: 'Erro ao buscar unidades',
        });
        setUnits([]);
      } finally {
        setLoadingUnits(false);
      }
    };

    fetchDepartment();
    fetchUnits();
  }, [departmentId]);

  const handleUpdate = async () => {
    if (!department) return;

    setLoading(true);
    try {
      await updateDepartment(departmentId, department);
      notification.success({
        message: 'Sucesso',
        description: 'Departamento atualizado com sucesso',
        placement: 'top',
      });
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Erro ao atualizar departamento:', error);
      notification.error({
        message: 'Erro',
        description: error instanceof Error ? error.message : 'Erro ao atualizar departamento',
        placement: 'top',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteDepartment(departmentId);
      notification.success({
        message: 'Sucesso',
        description: 'Departamento deletado com sucesso',
        placement: 'top',
      });
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Erro ao deletar departamento:', error);
      if (error instanceof AxiosError && error.response) {
        const errorMessage = error.response.data.message || 'Erro ao deletar departamento';
        notification.error({
          message: 'Erro',
          description: errorMessage,
          placement: 'top',
        });
      } else if (error instanceof Error) {
        notification.error({
          message: 'Erro',
          description: error.message,
          placement: 'top',
        });
      } else {
        notification.error({
          message: 'Erro',
          description: 'Erro desconhecido ao deletar departamento',
          placement: 'top',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!department) return;

    setDepartment({
      ...department,
      [e.target.name]: e.target.value,
    });
  };

  const handleUnitChange = (unitId: string) => {
    if (!department) return;

    const selectedUnit = units.find((unit) => unit.id === unitId);

    setDepartment((prevState) => ({
      ...prevState!,
      unit: selectedUnit || null,
    }));
  };

  return (
    <StyledModal open={true} onCancel={onClose} footer={null}>
      {loading ? (
        <Spin size="large" />
      ) : department ? (
        <Form layout="vertical">
          <Form.Item label="Nome">
            <Input name="name" value={department.name} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Unidade">
            <Select
              showSearch
              style={{ width: '100%' }}
              placeholder="Selecione uma Unidade"
              optionFilterProp="label"
              filterSort={(optionA, optionB) =>
                String(optionA?.label ?? '')
                  .toLowerCase()
                  .localeCompare(String(optionB?.label ?? '').toLowerCase())
              }
              value={department.unit_id}
              onChange={handleUnitChange}
              options={units.map((unit: Unit) => ({
                value: unit.id,
                label: unit.name,
              }))}
              notFoundContent={loadingUnits ? <Spin size="small" /> : null}
            />
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
        <p>Departamento não encontrado.</p>
      )}
    </StyledModal>
  );
};

export default DepartmentPopup;