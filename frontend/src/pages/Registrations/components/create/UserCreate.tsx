import React, { useState, useEffect } from 'react';
import { notification, Select, Spin } from 'antd';
import {
  CreateForm,
  FormContainer,
  ActionButton,
  SelectContainer,
} from './styles';
import { createUser, getUnits, getDepartments } from '../../../../services/api';

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
        const response = await getUnits(1); // Página 1, ajuste conforme necessário
        setUnits(response || []);
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
      department: '', // Limpa o departamento ao mudar a unidade
    }));

    setLoadingDepartments(true);
    try {
      const response = await getDepartments(value); // Passa o unitId para buscar os departamentos
      setDepartments(response || []);
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
      validatePassword(newUser.password)
    );
  };

  const handleCreateUser = async () => {
    if (!validateForm()) {
      notification.error({
        message: 'Erro',
        description: 'Por favor, preencha todos os campos obrigatórios e verifique se a senha atende aos critérios',
        placement: 'top',
      });
      return;
    }

    try {
      const createdUser = await createUser(newUser);
      notification.success({
        message: 'Sucesso',
        description: 'Usuário criado com sucesso',
        placement: 'top',
      });
      setNewUser(initialUserState); // Limpa o formulário
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
        <input
          type="text"
          name="username"
          placeholder="Nome de Usuário"
          value={newUser.username}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="name"
          placeholder="Nome"
          value={newUser.name}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newUser.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={newUser.password}
          onChange={handleInputChange}
        />
        
        <SelectContainer>
          <Select
            style={{ width: '100%' }}
            placeholder="Selecione o Tipo de Usuário"
            value={newUser.role}
            onChange={(value) => handleSelectChange('role', value)}
          >
            <Option value="admin">Admin</Option>
            <Option value="analyst">Analyst</Option>
            <Option value="user">User</Option>
          </Select>
        </SelectContainer>

        <input
          type="text"
          name="phone_number"
          placeholder="Número de Telefone"
          value={newUser.phone_number}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="ramal"
          placeholder="Ramal"
          value={newUser.ramal}
          onChange={handleInputChange}
        />

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
            value={newUser.unit}
            onChange={handleUnitChange}
            tokenSeparators={[',']}
            options={units.map((unit: any) => ({
              value: unit.id,
              label: unit.name,
            }))}
            notFoundContent={loadingUnits ? <Spin size="small" /> : null}
          />
        </SelectContainer>

        <SelectContainer>
          <Select
            showSearch
            style={{ width: '100%' }}
            placeholder="Selecione um Departamento"
            optionFilterProp="label"
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '')
                .toLowerCase()
                .localeCompare((optionB?.label ?? '').toLowerCase())
            }
            value={newUser.department}
            onChange={handleDepartmentChange}
            tokenSeparators={[',']}
            options={departments.map((department: any) => ({
              value: department.id,
              label: department.name,
            }))}
            notFoundContent={loadingDepartments ? <Spin size="small" /> : null}
            disabled={!newUser.unit}
          />
        </SelectContainer>

        <ActionButton onClick={handleCreateUser}>
          Criar Novo Usuário
        </ActionButton>
      </CreateForm>
    </FormContainer>
  );
};

export default UserCreate;