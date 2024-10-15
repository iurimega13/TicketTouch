import React, { useState, useEffect } from 'react';
import { notification, Select, Spin } from 'antd'; 
import { CreateForm, FormContainer, ActionButton, SelectContainer, StyledLabel } from './styles';
import { createEquipment, getUsers, getUnits, getDepartments } from '../../../../services/api';

const EquipmentCreate: React.FC = () => {
  const initialEquipmentState = {
    name: '',
    description: '',
    serial_number: '',
    user_id: '',
    unit_id: '',
    department_id: '',
    is_shared: '',
  };

  const [newEquipment, setNewEquipment] = useState(initialEquipmentState);
  const [users, setUsers] = useState<any[]>([]);
  const [units, setUnits] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingUnits, setLoadingUnits] = useState(false);
  const [loadingDepartments, setLoadingDepartments] = useState(false);
  const [userFieldDisabled, setUserFieldDisabled] = useState(false);

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
      const response = await getUsers(1);
      setUsers(response || []);
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
      const response = await getUnits(1);
      setUnits(response || []);
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
      const response = await getDepartments(unit_id); 
      setDepartments(response || []);
    } catch (error) {
      console.error('Erro ao buscar departamentos:', error);
      setDepartments([]);
    } finally {
      setLoadingDepartments(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEquipment(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string | boolean) => {
    setNewEquipment(prevState => ({
      ...prevState,
      [name]: value
    }));
    if (name === 'unit_id') {
      fetchDepartments(value as string);
    }
    if (name === 'is_shared') {
      setUserFieldDisabled(value as boolean); 
    }
  };

  const validateForm = () => {
    return newEquipment.name !== initialEquipmentState.name &&
           newEquipment.serial_number !== initialEquipmentState.serial_number &&
           (newEquipment.is_shared || newEquipment.user_id !== initialEquipmentState.user_id) &&
           newEquipment.unit_id !== initialEquipmentState.unit_id &&
           newEquipment.department_id !== initialEquipmentState.department_id;
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
            onChange={(value) => handleSelectChange('is_shared', value)}
            options={[
              { value: '', label: 'Compartilhado' },
              { value: true, label: 'Sim' },
              { value: false, label: 'Não' },
            ]}
          />
        </SelectContainer>
        <StyledLabel>Nome</StyledLabel>
        <input type="text" name="name" placeholder="Nome" value={newEquipment.name} onChange={handleInputChange} />
        <StyledLabel>Descrição</StyledLabel>
        <input type="text" name="description" placeholder="Descrição" value={newEquipment.description} onChange={handleInputChange} />
        <StyledLabel>Número de Série</StyledLabel>
        <input type="text" name="serial_number" placeholder="Número de Série" value={newEquipment.serial_number} onChange={handleInputChange} />

        <SelectContainer>
          <StyledLabel>Usuário</StyledLabel>
          <Select
            showSearch
            style={{ width: '100%' }}
            optionFilterProp="label"
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '')
                .toLowerCase()
                .localeCompare((optionB?.label ?? '').toLowerCase())
            }
            value={newEquipment.user_id}
            onChange={(value) => handleSelectChange('user_id', value)}
            tokenSeparators={[',']}
            options={[
              { value: '', label: 'Selecione um usuário' },
              ...users.map((user: any) => ({
                value: user.id,
                label: user.name,
              }))
            ]}
            notFoundContent={loadingUsers ? <Spin size="small" /> : null}
            disabled={userFieldDisabled} 
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
            onChange={(value) => handleSelectChange('unit_id', value)}
            options={[
              { value: '', label: 'Selecione uma unidade' },
              ...units.map((unit: any) => ({
                value: unit.id,
                label: unit.name,
              }))
            ]}
            notFoundContent={loadingUnits ? <Spin size="small" /> : null}
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
            onChange={(value) => handleSelectChange('department_id', value)}
            options={[
              { value: '', label: 'Selecione um departamento' },
              ...departments.map((department: any) => ({
                value: department.id,
                label: department.name,
              }))
            ]}
            notFoundContent={loadingDepartments ? <Spin size="small" /> : null}
            disabled={!newEquipment.unit_id}
          />
        </SelectContainer>

        <ActionButton onClick={handleCreateEquipment}>Criar Novo Equipamento</ActionButton>
      </CreateForm>
    </FormContainer>
  );
};

export default EquipmentCreate;