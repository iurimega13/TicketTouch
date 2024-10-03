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
    const response = await api.get('/user', {
      params: {
        page,
        term: filters.searchTerm, // Mantém 'term' para o controlador
        field: filters.searchField, // Mantém 'field' para o controlador
        username: filters.username,
        name: filters.name,
        email: filters.email,
        role: filters.role,
        phone_number: filters.phone_number,
        ramal: filters.ramal,
        unit: filters.unit,
        department: filters.department,
        created_at: filters.created_at,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return response.data; // Assegura que a estrutura de dados é a esperada
  } catch (error) {
    
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

// Função para buscar unidades
export const getUnits = async () => {
  try {
    const response = await api.get('/units', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar unidades:', error);
    throw error;
  }
};

// Função para buscar departamentos
export const getDepartments = async () => {
  try {
    const response = await api.get('/departments', {
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
  getUnits,
  getDepartments,
};

export default apiService;