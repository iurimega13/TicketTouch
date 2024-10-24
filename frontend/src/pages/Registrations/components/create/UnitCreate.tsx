import React, { useState } from 'react';
import { notification } from 'antd'; 
import { CreateForm, FormContainer, ActionButton, StyledLabel } from './styles';
import { createUnit } from '../../../../services/api';

const UnitCreate: React.FC = () => {
  const initialUnitState = {
    name: '',
    description: ''
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
    return newUnit.name !== '' && newUnit.description !== '';
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
      setNewUnit(initialUnitState); 
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
        <StyledLabel>Nome</StyledLabel>
        <input
          type="text"
          name="name"
          value={newUnit.name}
          onChange={handleInputChange}
          title="Nome"
          placeholder="Digite o nome da unidade"
        />
        <StyledLabel>Descrição</StyledLabel>
        <input
          type="text"
          name="description"
          value={newUnit.description}
          onChange={handleInputChange}
          title="Descrição"
          placeholder="Digite a Descrição da unidade"
        />
        <ActionButton onClick={handleCreateUnit}>
          Criar Nova Unidade
        </ActionButton>
      </CreateForm>
    </FormContainer>
  );
};

export default UnitCreate;