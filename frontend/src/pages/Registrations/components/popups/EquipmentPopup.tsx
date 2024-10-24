import React, { useState, useEffect } from 'react';
import {
  Input,
  Button,
  Form,
  Select,
  Spin,
  notification,
} from 'antd';
import {
  getEquipmentProfile,
  updateEquipment,
  deleteEquipment,
  getUnits,
  getDepartmentsByUnit,
  getUsers,
} from '../../../../services/api';
import { StyledModal } from './styles';
import { Equipment, Unit, Department, User } from '../types';
import { AxiosError } from 'axios';

interface EquipmentPopupProps {
  equipmentId: string;
  onClose: () => void;
  onUpdate: () => void;
}

const EquipmentPopup: React.FC<EquipmentPopupProps> = ({
  equipmentId,
  onClose,
  onUpdate,
}) => {
  const [equipment, setEquipment] = useState<Equipment | null>(null);
  const [originalEquipment, setOriginalEquipment] = useState<Equipment | null>(
    null,
  );
  const [units, setUnits] = useState<Unit[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUnits, setLoadingUnits] = useState(false);
  const [loadingDepartments, setLoadingDepartments] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const equipmentData = await getEquipmentProfile(equipmentId);
        setEquipment({
          ...equipmentData,
          unit: equipmentData.unit || null,
          department: equipmentData.department || null,
          user: equipmentData.user || null,
        });
        setOriginalEquipment({
          ...equipmentData,
          unit: equipmentData.unit || null,
          department: equipmentData.department || null,
          user: equipmentData.user || null,
        });

        if (equipmentData?.unit) {
          await fetchDepartments(equipmentData.unit.id);
        }
      } catch (error) {
        console.error('Erro ao buscar equipamento:', error);
        notification.error({
          message: 'Erro',
          description: 'Erro ao buscar equipamento',
        });
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

    const fetchUsers = async () => {
      setLoadingUsers(true);
      try {
        const response = await getUsers();
        setUsers(response || []);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        notification.error({
          message: 'Erro',
          description: 'Erro ao buscar usuários',
        });
        setUsers([]);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchEquipment();
    fetchUnits();
    fetchUsers();
  }, [equipmentId]);

  const fetchDepartments = async (unitId: string) => {
    setLoadingDepartments(true);
    try {
      const response = await getDepartmentsByUnit(unitId);
      const departmentsData = response.data;
      if (Array.isArray(departmentsData)) {
        setDepartments(departmentsData);
      } else {
        setDepartments([]);
      }
    } catch (error) {
      console.error('Erro ao buscar departamentos:', error);
      notification.error({
        message: 'Erro',
        description: 'Erro ao buscar departamentos',
      });
      setDepartments([]);
    } finally {
      setLoadingDepartments(false);
    }
  };

  const handleUpdate = async () => {
    if (!equipment || !originalEquipment) return;
  
    // Definir os tipos corretamente: strings para IDs e textos, boolean para is_shared
    const updateData: Partial<Record<string, string | boolean>> = {};
  
    Object.keys(equipment).forEach((key) => {
      const equipmentValue = equipment[key as keyof Equipment];
      const originalValue = originalEquipment[key as keyof Equipment];
  
      if (equipmentValue !== originalValue && equipmentValue !== null) {
        if (key === 'user' || key === 'unit' || key === 'department') {
          if (equipmentValue && typeof equipmentValue === 'object' && 'id' in equipmentValue) {
            updateData[`${key}_id`] = String(equipmentValue.id);  
          }
        } 
        // Convertendo is_shared para boolean
        else if (key === 'is_shared') {
          updateData[key] = Boolean(equipmentValue);  
        } 
        // Garantindo que campos de texto sejam strings
        else if (typeof equipmentValue === 'string') {
          updateData[key] = equipmentValue;  
        } else {
          updateData[key] = String(equipmentValue);  
        }
      }
    });
  
    const filteredUpdateData = Object.fromEntries(
      Object.entries(updateData).filter(([_, v]) => v !== undefined)
    );
  
    if (Object.keys(filteredUpdateData).length === 0) {
      notification.info({
        message: 'Nenhuma alteração',
        description: 'Nenhuma alteração foi feita nos dados do equipamento.',
      });
      return;
    }

    
  
    setLoading(true);
    try {
      await updateEquipment(equipmentId, filteredUpdateData);
      notification.success({
        message: 'Sucesso',
        description: 'Equipamento atualizado com sucesso',
      });
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Erro ao atualizar equipamento:', error);
  if (error instanceof AxiosError && error.response) {
    const errorMessage = error.response.data.message || 'Erro ao atualizar equipamento';
    notification.error({
      message: 'Erro',
      description: errorMessage,
    });
  } else if (error instanceof Error) {
    notification.error({
      message: 'Erro',
      description: error.message || 'Erro desconhecido ao atualizar equipamento.',
    });
  } else {
    notification.error({
      message: 'Erro',
      description: 'Erro desconhecido ao atualizar equipamento.',
    });
  }
    } finally {
      setLoading(false);
    }
  };
  
  
  

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteEquipment(equipmentId);
      notification.success({
        message: 'Sucesso',
        description: 'Equipamento deletado com sucesso',
      });
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Erro ao deletar equipamento:', error);
      if (error instanceof AxiosError && error.response) {
        const errorMessage =
          error.response.data.message || 'Erro ao deletar equipamento';
        notification.error({
          message: 'Erro',
          description: errorMessage,
        });
      } else if (error instanceof Error) {
        notification.error({
          message: 'Erro',
          description: error.message,
        });
      } else {
        notification.error({
          message: 'Erro',
          description: 'Erro desconhecido ao deletar equipamento',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!equipment) return;

    setEquipment({
      ...equipment,
      [e.target.name]: e.target.value,
    });
  };

  const handleUnitChange = async (unitId: string) => {
    const selectedUnit = units.find((unit) => unit.id === unitId);

    if (!equipment || !selectedUnit) return;

    setEquipment((prevState) => ({
      ...prevState!,
      unit: selectedUnit,
      department: null,
      user: null,
    }));

    await fetchDepartments(unitId);
  };

  const handleDepartmentChange = (departmentId: string) => {
    const selectedDepartment = departments.find(
      (department) => department.id === departmentId,
    );

    if (!equipment || !selectedDepartment) return;

    setEquipment((prevState) => ({
      ...prevState!,
      department: selectedDepartment,
    }));
  };

  const handleUserChange = (userId: string) => {
    const selectedUser = users.find((user) => user.id === userId);

    if (!equipment || !selectedUser) return;

    setEquipment((prevState) => ({
      ...prevState!,
      user: selectedUser,
    }));
  };

  return (
    <StyledModal open={true} onCancel={onClose} footer={null}>
      {equipment ? (
        <Form layout="vertical">
          <Form.Item label="Nome">
            <Input name="name" value={equipment.name} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Descrição">
            <Input
              name="description"
              value={equipment.description}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Número de Série">
            <Input
              name="serial_number"
              value={equipment.serial_number}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Compartilhado">
            <Select
              style={{ width: '100%' }}
              value={equipment.is_shared}
              onChange={(value) => {
                setEquipment((prevState) => ({
                  ...prevState!,
                  is_shared: value,
                }));
              }}
              options={[
                { value: true, label: 'Sim' },
                { value: false, label: 'Não' },
              ]}
            />
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
              value={equipment.unit?.id || undefined}
              onChange={handleUnitChange}
              options={units.map((unit: Unit) => ({
                value: unit.id,
                label: unit.name,
              }))}
              notFoundContent={loadingUnits ? <Spin size="small" /> : null}
            />
          </Form.Item>
          <Form.Item label="Departamento">
            <Select
              showSearch
              style={{ width: '100%' }}
              placeholder="Selecione um Departamento"
              optionFilterProp="label"
              filterSort={(optionA, optionB) =>
                String(optionA?.label ?? '')
                  .toLowerCase()
                  .localeCompare(String(optionB?.label ?? '').toLowerCase())
              }
              value={equipment.department?.id || undefined}
              onChange={handleDepartmentChange}
              options={
                Array.isArray(departments)
                  ? departments.map((department: Department) => ({
                      value: department.id,
                      label: department.name,
                    }))
                  : []
              }
              notFoundContent={
                loadingDepartments ? <Spin size="small" /> : null
              }
              disabled={!equipment.unit}
            />
          </Form.Item>
          <Form.Item label="Usuário">
            <Select
              showSearch
              style={{ width: '100%' }}
              placeholder="Selecione um Usuário"
              optionFilterProp="label"
              filterSort={(optionA, optionB) =>
                String(optionA?.label ?? '')
                  .toLowerCase()
                  .localeCompare(String(optionB?.label ?? '').toLowerCase())
              }
              value={equipment.user?.id || undefined}
              onChange={handleUserChange}
              options={users.map((user: User) => ({
                value: user.id,
                label: user.name,
              }))}
              notFoundContent={loadingUsers ? <Spin size="small" /> : null}
              disabled={equipment.is_shared === true} 
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" loading={loading} onClick={handleUpdate}>
              Atualizar
            </Button>
            <Button
              danger
              onClick={handleDelete}
              loading={loading}
              style={{ marginLeft: '10px' }}
            >
              Deletar
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <Spin />
      )}
    </StyledModal>
  );
};

export default EquipmentPopup;
