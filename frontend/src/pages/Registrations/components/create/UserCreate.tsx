import React, { useState, useEffect } from 'react';
import { notification, Select, Spin } from 'antd';
import {
  CreateForm,
  FormContainer,
  ActionButton,
  SelectContainer,
  StyledLabel,
} from './styles';
import { createUser, getUnits, getDepartmentsByUnit } from '../../../../services/api';

const { Option } = Select;

const UserCreate: React.FC = () => {
  const initialUserState = {
    username: '',
    name: '',
    email: '',
    password: '',
    role: '',
    phone_number: '',
    ramal: '',
    unit: '',
    department: '',
  };

  const [newUser, setNewUser] = useState(initialUserState);

  const [units, setUnits] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [loadingUnits, setLoadingUnits] = useState(false);
  const [loadingDepartments, setLoadingDepartments] = useState(false);

  useEffect(() => {
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

    fetchUnits();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUnitChange = async (value: string) => {
    setNewUser((prevState) => ({
      ...prevState,
      unit: value,
      department: '', 
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
    setNewUser((prevState) => ({
      ...prevState,
      department: value,
    }));
  };

  const validatePassword = (password: string) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar
    );
  };

  const validateForm = () => {
    return (
      newUser.username !== '' &&
      newUser.name !== '' &&
      newUser.email !== '' &&
      newUser.password !== '' &&
      newUser.role !== '' &&
      newUser.unit !== '' &&
      newUser.department !== '' &&
      validatePassword(newUser.password) &&
      (newUser.phone_number !== '' || newUser.ramal !== '')
    );
  };

  const handleCreateUser = async () => {
    if (!validateForm()) {
      notification.error({
        message: 'Erro',
        description: 'Por favor, preencha todos os campos obrigatórios e verifique se a senha atende aos critérios. Pelo menos um dos campos "Número de Telefone" ou "Ramal" deve estar preenchido.',
        placement: 'top',
      });
      return;
    }

    try {
      await createUser(newUser);
      
      notification.success({
        message: 'Sucesso',
        description: 'Usuário criado com sucesso',
        placement: 'top',
      });
      setNewUser(initialUserState); 
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
    <FormContainer>
      <CreateForm>
        <StyledLabel>Nome de Usuário</StyledLabel>
        <input
          type="text"
          name="username"
          value={newUser.username}
          onChange={handleInputChange}
          title="Nome de Usuário"
          placeholder="Digite o nome de usuário"
        />
        <StyledLabel>Nome</StyledLabel>
        <input
          type="text"
          name="name"
          value={newUser.name}
          onChange={handleInputChange}
          title="Nome"
          placeholder="Digite o nome"
        />
        <StyledLabel>Email</StyledLabel>
        <input
          type="email"
          name="email"
          value={newUser.email}
          onChange={handleInputChange}
          title="Email"
          placeholder="Digite o email"
        />
        <StyledLabel>Senha</StyledLabel>
        <input
          type="password"
          name="password"
          value={newUser.password}
          onChange={handleInputChange}
          title="Senha"
          placeholder="Digite a senha"
        />
        
        <SelectContainer>
          <StyledLabel>Tipo de Usuário</StyledLabel>
          <Select
            style={{ width: '100%' }}
            value={newUser.role}
            onChange={(value) => handleSelectChange('role', value)}
            title="Tipo de Usuário"
            placeholder="Selecione o tipo de usuário"
          >
            <Option value="admin">Admin</Option>
            <Option value="analyst">Analista</Option>
            <Option value="user">Usuário</Option>
          </Select>
        </SelectContainer>

        <StyledLabel>Número de Telefone</StyledLabel>
        <input
          type="text"
          name="phone_number"
          value={newUser.phone_number}
          onChange={handleInputChange}
          title="Número de Telefone"
          placeholder="Digite o número de telefone"
        />
        <StyledLabel>Ramal</StyledLabel>
        <input
          type="text"
          name="ramal"
          value={newUser.ramal}
          onChange={handleInputChange}
          title="Ramal"
          placeholder="Digite o ramal"
        />

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
            value={newUser.unit}
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
            value={newUser.department}
            onChange={handleDepartmentChange}
            tokenSeparators={[',']}
            options={Array.isArray(departments) ? departments.map((department: any) => ({
              value: department.id,
              label: department.name,
            })) : []}
            notFoundContent={loadingDepartments ? <Spin size="small" /> : null}
            disabled={!newUser.unit}
            title="Departamento"
            placeholder="Selecione o departamento"
          />
        </SelectContainer>

        <ActionButton onClick={handleCreateUser} >
          Criar Novo Usuário
        </ActionButton>
      </CreateForm>
    </FormContainer>
  );
};

export default UserCreate;