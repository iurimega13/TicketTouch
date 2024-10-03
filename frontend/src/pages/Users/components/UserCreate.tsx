import React, { useState } from 'react';
import { notification, Select, Modal } from 'antd'; 
import { CreateUserForm, ModalContent, CloseButton, FormContainer, ModalHeader, ModalTitle, StyledSelect, ActionButton } from './styles';
import { createUser, createUserSettings } from '../../../services/api';

const { Option } = Select;

interface UserCreateProps {
  isOpen: boolean;
  onClose: () => void;
  units: { id: string; name: string }[];
  departments: { id: string; name: string }[];
  onUserCreated: (user: any) => void;
  openModal: () => void; // Nova propriedade para abrir o modal
}

const UserCreate: React.FC<UserCreateProps> = ({ isOpen, onClose, units, departments, onUserCreated, openModal }) => {
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    phone_number: '',
    ramal: '',
    username: '',
    unit: '',
    department: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    // Adicione a lógica de validação do formulário aqui
    return true;
  };

  const handleCreateUser = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const createdUser = await createUser(newUser);
      await createUserSettings(createdUser.id, { 
        theme: 'light', 
        notifications: true 
      });
      onUserCreated(createdUser);
      notification.success({
        message: 'Sucesso',
        description: 'Usuário criado com sucesso',
        placement: 'top',
      });
      onClose();
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      notification.error({
        message: 'Erro',
        description: 'Erro ao criar usuário',
        placement: 'top',
      });
    }
  };

  return (
    <>
      <ActionButton onClick={openModal} style={{ width: '100%', marginBottom: '16px' }}>
        Criar Novo Usuário
      </ActionButton>
      <Modal visible={isOpen} onCancel={onClose} footer={null}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>NOVO USUÁRIO</ModalTitle>
            <CloseButton onClick={onClose}>×</CloseButton>
          </ModalHeader>
          <FormContainer>
            <CreateUserForm>
              <input type="text" name="name" placeholder="Nome" value={newUser.name} onChange={handleInputChange} />
              <input type="text" name="email" placeholder="Email" value={newUser.email} onChange={handleInputChange} />
              <input type="password" name="password" placeholder="Senha" value={newUser.password} onChange={handleInputChange} />
              <input type="text" name="role" placeholder="Função" value={newUser.role} onChange={handleInputChange} />
              <input type="text" name="phone_number" placeholder="Telefone" value={newUser.phone_number} onChange={handleInputChange} />
              <input type="text" name="ramal" placeholder="Ramal" value={newUser.ramal} onChange={handleInputChange} />
              <input type="text" name="username" placeholder="Nome de Usuário" value={newUser.username} onChange={handleInputChange} />
              <StyledSelect
                showSearch
                placeholder="Selecione a Unidade"
                onChange={value => setNewUser(prevState => ({ ...prevState, unit: value as string }))} // Converte o valor para string
              >
                {units.map(unit => (
                  <Option key={unit.id} value={unit.id}>{unit.name}</Option>
                ))}
              </StyledSelect>
              <StyledSelect
                showSearch
                placeholder="Selecione o Departamento"
                onChange={value => setNewUser(prevState => ({ ...prevState, department: value as string }))} // Converte o valor para string
              >
                {departments.map(department => (
                  <Option key={department.id} value={department.id}>{department.name}</Option>
                ))}
              </StyledSelect>
              <ActionButton onClick={handleCreateUser}>Criar Novo Usuário</ActionButton>
            </CreateUserForm>
          </FormContainer>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserCreate;