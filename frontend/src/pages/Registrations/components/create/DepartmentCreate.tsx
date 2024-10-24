import React, { useState, useEffect } from 'react';
import { notification, Select, Spin } from 'antd'; 
import { CreateForm, FormContainer, ActionButton, SelectContainer, StyledLabel } from './styles';
import { createDepartment, getUnits } from '../../../../services/api';


const DepartmentCreate: React.FC = () => {
  const initialDepartmentState = {
    name: '',
    unit_id: '',
  };

  const [newDepartment, setNewDepartment] = useState(initialDepartmentState);
  const [units, setUnits] = useState<any[]>([]);
  const [loadingUnits, setLoadingUnits] = useState(false);

  useEffect(() => {
    fetchUnits();
  }, []);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewDepartment(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSelectChange = (value: string) => {
    setNewDepartment(prevState => ({
      ...prevState,
      unit_id: value
    }));
  };

  const validateForm = () => {
    return newDepartment.name !== '' && newDepartment.unit_id !== '';
  };

  const handleCreateDepartment = async () => {
    if (!validateForm()) {
      notification.error({
        message: 'Erro',
        description: 'Por favor, preencha todos os campos',
        placement: 'top',
      });
      return;
    }

    try {
      const createdDepartment = await createDepartment(newDepartment);
      notification.success({
        message: 'Sucesso',
        description: 'Departamento criado com sucesso',
        placement: 'top',
      });
      setNewDepartment(initialDepartmentState);
    } catch (error) {
      console.error('Erro ao criar departamento:', error);
      notification.error({
        message: 'Erro',
        description: 'Erro ao criar departamento',
        placement: 'top',
      });
    }
  };

  return (
    <FormContainer>
      <CreateForm>
        <StyledLabel>Nome</StyledLabel>
        <input
          type="text"
          name="name"
          value={newDepartment.name}
          onChange={handleInputChange}
          title="Nome"
          placeholder="Digite o nome do departamento"
        />
        <SelectContainer>
          <StyledLabel>Unidade</StyledLabel>
          <Select
            showSearch
            style={{ width: '100%' }}
            placeholder="Selecione uma Unidade"
            optionFilterProp="label"
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '')
                .toLowerCase()
                .localeCompare((optionB?.label ?? '').toLowerCase())
            }
            value={newDepartment.unit_id}
            onChange={handleSelectChange}
            tokenSeparators={[',']}
            options={Array.isArray(units) ? units.map((unit: any) => ({
              value: unit.id,
              label: unit.name,
            })) : []}
            notFoundContent={loadingUnits ? <Spin size="small" /> : null}
          />
        </SelectContainer>
        <ActionButton onClick={handleCreateDepartment}>Criar Novo Departamento</ActionButton>
      </CreateForm>
    </FormContainer>
  );
};

export default DepartmentCreate;