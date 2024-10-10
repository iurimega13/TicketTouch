import axios from 'axios';
import { notification } from 'antd';

// Criação da instância axios
const api = axios.create({
  baseURL: 'http://localhost:3001/api',
});

// Função para autenticar o usuário
export const loginUser = async (username: string, password: string) => {
  try {
    const response = await api.post('/auth', { username, password });
    return response.data; // Retorna os dados da resposta
  } catch (error) {
    console.error('Erro de autenticação:', error);
    throw error; // Lança o erro para que possa ser tratado no componente
  }
};

// Função para buscar o perfil do usuário
export const getUserProfile = async (userId: string) => {
  try {
    const response = await api.get(`/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar perfil do usuário:', error);
    throw error;
  }
};

// Função para criar configurações do usuário
export const createUserSettings = async (userId: string, settings: any) => {
  try {
    const response = await api.post(`/user-settings/${userId}`, settings);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar configurações do usuário:', error);
    throw error;
  }
};

// Função para buscar as configurações do usuário
export const getUserSettings = async () => {
  const userId = localStorage.getItem('userId'); // Obtém o ID do usuário do localStorage
  try {
    const response = await api.get(`/user-settings/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar as configurações do usuário:', error);
    throw error;
  }
};

// Função para atualizar as configurações do usuário
export const updateUserSettings = async (settings: any) => {
  const userId = localStorage.getItem('userId'); // Pega o ID do usuário do localStorage
  try {
    const response = await api.put(`/user-settings/${userId}`, settings, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar as configurações do usuário:', error);
    throw error;
  }
};

// Função para buscar usuários
export const getUsers = async (
  page = 1,
  filters: {
    searchTerm: string;
    searchField: string;
    username?: string;
    name?: string;
    email?: string;
    role?: string;
    phone_number?: string;
    ramal?: string;
    unit?: string;
    department?: string;
    created_at?: string;
  }
) => {
  try {
    const response = await api.get('/users', {
      params: { page, ...filters },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    throw error;
  }
};

// Função para resetar a senha do usuário
export const resetPassword = async (userId: string) => {
  try {
    await api.post(`/users/${userId}/reset-password`, null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
  } catch (error) {
    console.error('Erro ao resetar senha:', error);
    throw error;
  }
};

// Função para atualizar informações do usuário
export const updateUser = async (userId: string, data: any) => {
  try {
    const response = await api.put(`/user/${userId}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    throw error;
  }
};

// Função para deletar um usuário
export const deleteUser = async (userId: string) => {
  try {
    await api.delete(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    throw error;
  }
};

// Função para criar um novo usuário
export const createUser = async (userData: any) => {
  try {
    const response = await api.post('/user', userData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    throw error;
  }
};

// Função para criar uma nova unidade
export const createUnit = async (unitData: any) => {
  try {
    const response = await api.post('/units', unitData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao criar unidade:', error);
    throw error;
  }
};

// Função para criar um novo departamento
export const createDepartment = async (departmentData: any) => {
  try {
    const response = await api.post('/departments', departmentData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao criar departamento:', error);
    throw error;
  }
};


// Função para buscar departamentos
export const getDepartments = async (page: number) => {
  try {
    const response = await api.get(`/departments?page=${page}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar departamentos:', error);
    throw error;
  }
};


// Função para buscar o perfil do departamento
export const getDepartmentProfile = async (departmentId: string) => {
  try {
    const response = await api.get(`/departments/${departmentId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar perfil do departamento:', error);
    throw error;
  }
};

// Função para atualizar o departamento
export const updateDepartment = async (departmentId: string, departmentData: any) => {
  try {
    const response = await api.put(`/departments/${departmentId}`, departmentData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar departamento:', error);
    throw error;
  }
};

// Função para deletar o departamento
export const deleteDepartment = async (departmentId: string) => {
  try {
    await api.delete(`/departments/${departmentId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
  } catch (error) {
    console.error('Erro ao deletar departamento:', error);
    throw error;
  }
};


// Função para buscar unidades
export const getUnits = async (page: number) => {
  try {
    const response = await api.get('/units', {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar unidades:', error);
    throw error;
  }
};
// Função para buscar o perfil da unidade
export const getUnitProfile = async (unitId: string) => {
  try {
    const response = await api.get(`/units/${unitId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar perfil da unidade:', error);
    throw error;
  }
};

// Função para atualizar a unidade
export const updateUnit = async (unitId: string, unitData: any) => {
  try {
    const response = await api.put(`/units/${unitId}`, unitData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar unidade:', error);
    throw error;
  }
};

// Função para deletar a unidade
export const deleteUnit = async (unitId: string) => {
  try {
    await api.delete(`/units/${unitId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
  } catch (error) {
    console.error('Erro ao deletar unidade:', error);
    throw error;
  }
};


// Função para criar um novo equipamento
export const createEquipment = async (equipmentData: any) => {
  try {
    const response = await api.post('/equipments', equipmentData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao criar equipamento:', error);
    throw error;
  }
};

// Função para buscar equipamentos
export const getEquipments = async (page: number) => {
  try {
    const response = await api.get('/equipments', {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar equipamentos:', error);
    throw error;
  }
};

// Função para buscar o perfil do equipamento
export const getEquipmentProfile = async (equipmentId: string) => {
  try {
    const response = await api.get(`/equipments/${equipmentId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar perfil do equipamento:', error);
    throw error;
  }
};

// Função para atualizar o equipamento
export const updateEquipment = async (equipmentId: string, equipmentData: any) => {
  try {
    const response = await api.put(`/equipments/${equipmentId}`, equipmentData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar equipamento:', error);
    throw error;
  }
};

// Função para deletar o equipamento
export const deleteEquipment = async (equipmentId: string) => {
  try {
    await api.delete(`/equipments/${equipmentId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
  } catch (error) {
    console.error('Erro ao deletar equipamento:', error);
    throw error;
  }
};


// Exportação dos serviços da API
const apiService = {
  loginUser,
  getUserProfile,
  createUserSettings,
  getUserSettings,
  updateUserSettings,
  getUsers,
  resetPassword,
  updateUser,
  deleteUser,
  createUser,
  createUnit,
  createDepartment,
  getUnits,
  getDepartments,
  createEquipment,
  getEquipments,
  getUnitProfile,
  updateUnit,
  deleteUnit,
  getDepartmentProfile,
  updateDepartment,
  deleteDepartment,
  getEquipmentProfile,
  updateEquipment,
  deleteEquipment,
};

export default apiService;