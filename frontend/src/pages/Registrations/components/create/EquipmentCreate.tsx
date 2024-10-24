import React, { useState, useEffect } from 'react';
import { notification, Select, Spin } from 'antd';
import {
  CreateForm,
  FormContainer,
  ActionButton,
  SelectContainer,
  StyledLabel,
} from './styles';
import {
  createEquipment,
  getUsers,
  getUnits,
  getDepartmentsByUnit,
} from '../../../../services/api';

const EquipmentCreate: React.FC = () => {
  const initialEquipmentState = {
    name: '',
    description: '',
    serial_number: '',
    user_id: '',
    unit_id: '',
    department_id: '',
    is_shared: false,
  };

  const [newEquipment, setNewEquipment] = useState(initialEquipmentState);
  const [users, setUsers] = useState<any[]>([]);
  const [units, setUnits] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingUnits, setLoadingUnits] = useState(false);
  const [loadingDepartments, setLoadingDepartments] = useState(false);

  useEffect(() => {
    fetchUsers();
    fetchUnits();
  }, []);

  useEffect(() => {
    if (newEquipment.unit_id) {
      fetchDepartments(newEquipment.unit_id);
    }
  }, [newEquipment.unit_id]);

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const usersData = await getUsers();
      setUsers(Array.isArray(usersData) ? usersData : []);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      setUsers([]);
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchUnits = async () => {
    setLoadingUnits(true);
    try {
      const response = await getUnits();
      const unitsData = Array.isArray(response) ? response : [];
      setUnits(unitsData);
    } catch (error) {
      console.error('Erro ao buscar unidades:', error);
      setUnits([]);
    } finally {
      setLoadingUnits(false);
    }
  };

  const fetchDepartments = async (unit_id: string) => {
    setLoadingDepartments(true);
    try {
      const response = await getDepartmentsByUnit(unit_id);
      setDepartments(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Erro ao buscar departamentos:', error);
      setDepartments([]);
    } finally {
      setLoadingDepartments(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEquipment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string | boolean) => {
    setNewEquipment((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === 'unit_id') {
      fetchDepartments(value as string);
    }
  };

  const handleUnitChange = async (value: string) => {
    setNewEquipment((prevState) => ({
      ...prevState,
      unit_id: value,
      department_id: '',
    }));

    setLoadingDepartments(true);
    try {
      const response = await getDepartmentsByUnit(value);
      setDepartments(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Erro ao buscar departamentos:', error);
      setDepartments([]);
    } finally {
      setLoadingDepartments(false);
    }
  };

  const handleDepartmentChange = (value: string) => {
    setNewEquipment((prevState) => ({
      ...prevState,
      department_id: value,
    }));
  };

  const validateForm = () => {
    return (
      newEquipment.name !== initialEquipmentState.name &&
      newEquipment.serial_number !== initialEquipmentState.serial_number &&
      (newEquipment.is_shared ||
        newEquipment.user_id !== initialEquipmentState.user_id) &&
      newEquipment.unit_id !== initialEquipmentState.unit_id &&
      newEquipment.department_id !== initialEquipmentState.department_id
    );
  };

  const handleCreateEquipment = async () => {
    if (!validateForm()) {
      notification.error({
        message: 'Erro',
        description: 'Por favor, preencha todos os campos obrigatórios',
        placement: 'top',
      });
      return;
    }

    const equipmentToCreate = {
      ...newEquipment,
      user_id: newEquipment.is_shared ? null : newEquipment.user_id || null,
      unit_id: newEquipment.unit_id || null,
      department_id: newEquipment.department_id || null,
    };

    try {
      await createEquipment(equipmentToCreate);
      notification.success({
        message: 'Sucesso',
        description: 'Equipamento criado com sucesso',
        placement: 'top',
      });
      setNewEquipment(initialEquipmentState);
    } catch (error) {
      console.error('Erro ao criar equipamento:', error);
      notification.error({
        message: 'Erro',
        description: 'Erro ao criar equipamento',
        placement: 'top',
      });
    }
  };

  return (
    <FormContainer>
      <CreateForm>
        <SelectContainer>
          <StyledLabel>Compartilhado</StyledLabel>
          <Select
            style={{ width: '100%' }}
            value={newEquipment.is_shared}
            onChange={(value) =>
              handleSelectChange('is_shared', value as unknown as boolean)
            }
            options={[
              { value: undefined, label: 'Compartilhado' },
              { value: true, label: 'Sim' },
              { value: false, label: 'Não' },
            ]}
          />
        </SelectContainer>
        <StyledLabel>Nome</StyledLabel>
        <input
          type="text"
          name="name"
          value={newEquipment.name}
          onChange={handleInputChange}
          title="Nome"
          placeholder="Digite o nome do equipamento"
        />
        <StyledLabel>Descrição</StyledLabel>
        <input
          type="text"
          name="description"
          value={newEquipment.description}
          onChange={handleInputChange}
          title="Descrição"
          placeholder="Digite a descrição do equipamento"
        />
        <StyledLabel>Número de Série</StyledLabel>
        <input
          type="text"
          name="serial_number"
          value={newEquipment.serial_number}
          onChange={handleInputChange}
          title="Número de Série"
          placeholder="Digite o número de série do equipamento"
        />

        <SelectContainer>
          <StyledLabel>Usuário</StyledLabel>
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
            value={newEquipment.user_id} 
            onChange={(value) => handleSelectChange('user_id', value)} 
            options={Array.isArray(users) ? users.map((user: any) => ({
              value: user.id,
              label: user.name,
            })) : []}
            notFoundContent={loadingUsers ? <Spin size="small" /> : null}
            disabled={newEquipment.is_shared}
          />
        </SelectContainer>

        <SelectContainer>
          <StyledLabel>Unidade</StyledLabel>
          <Select
            showSearch
            style={{ width: '100%' }}
            optionFilterProp="label"
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '')
                .toLowerCase()
                .localeCompare((optionB?.label ?? '').toLowerCase())
            }
            value={newEquipment.unit_id}
            onChange={handleUnitChange}
            tokenSeparators={[',']}
            options={Array.isArray(units) ? units.map((unit: any) => ({
              value: unit.id,
              label: unit.name,
            })) : []}
            notFoundContent={loadingUnits ? <Spin size="small" /> : null}
            title="Unidade"
            placeholder="Selecione a unidade"
          />
        </SelectContainer>

        <SelectContainer>
          <StyledLabel>Departamento</StyledLabel>
          <Select
            showSearch
            style={{ width: '100%' }}
            optionFilterProp="label"
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '')
                .toLowerCase()
                .localeCompare((optionB?.label ?? '').toLowerCase())
            }
            value={newEquipment.department_id}
            onChange={handleDepartmentChange}
            tokenSeparators={[',']}
            options={Array.isArray(departments) ? departments.map((department: any) => ({
              value: department.id,
              label: department.name,
            })) : []}
            notFoundContent={loadingDepartments ? <Spin size="small" /> : null}
            disabled={!newEquipment.unit_id}
            title="Departamento"
            placeholder="Selecione o departamento"
          />
        </SelectContainer>

        <ActionButton onClick={handleCreateEquipment}>
          Criar Novo Equipamento
        </ActionButton>
      </CreateForm>
    </FormContainer>
  );
};

export default EquipmentCreate;