import React, { useState, useEffect } from 'react';
import { notification, Select, Spin } from 'antd'; 
import { CreateForm, FormContainer, ActionButton, SelectContainer } from './styles';
import { createDepartment, getUnits } from '../../../../services/api';

const { Option } = Select;

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
      const response = await getUnits(1);
      setUnits(response || []);
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
      unit_id: value // Certifique-se de que o campo corresponde ao DTO
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
        <input type="text" name="name" placeholder="Nome" value={newDepartment.name} onChange={handleInputChange} />
        <SelectContainer>
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
            options={units.map((unit: any) => ({
              value: unit.id,
              label: unit.name,
            }))}
            notFoundContent={loadingUnits ? <Spin size="small" /> : null}
          />
        </SelectContainer>
        <ActionButton onClick={handleCreateDepartment}>Criar Novo Departamento</ActionButton>
      </CreateForm>
    </FormContainer>
  );
};

export default DepartmentCreate;