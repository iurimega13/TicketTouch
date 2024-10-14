import React, { useState } from 'react';
import { notification } from 'antd'; 
import { CreateForm, FormContainer, ActionButton } from './styles';
import { createUnit } from '../../../../services/api';

const UnitCreate: React.FC = () => {
  const initialUnitState = {
    name: '',
    address: ''
  };

  const [newUnit, setNewUnit] = useState(initialUnitState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUnit(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    return newUnit.name !== '' && newUnit.address !== '';
  };

  const handleCreateUnit = async () => {
    if (!validateForm()) {
      notification.error({
        message: 'Erro',
        description: 'Por favor, preencha todos os campos',
        placement: 'top',
      });
      return;
    }

    try {
      const createdUnit = await createUnit(newUnit);
      notification.success({
        message: 'Sucesso',
        description: 'Unidade criada com sucesso',
        placement: 'top',
      });
      setNewUnit(initialUnitState); // Limpa o formulário
    } catch (error) {
      console.error('Erro ao criar unidade:', error);
      notification.error({
        message: 'Erro',
        description: 'Erro ao criar unidade',
        placement: 'top',
      });
    }
  };

  return (
    <FormContainer>
      <CreateForm>
        <input type="text" name="name" placeholder="Nome" value={newUnit.name} onChange={handleInputChange} />
        <input type="text" name="address" placeholder="Endereço" value={newUnit.address} onChange={handleInputChange} />
        <ActionButton onClick={handleCreateUnit}>Criar Nova Unidade</ActionButton>
      </CreateForm>
    </FormContainer>
  );
};

export default UnitCreate;