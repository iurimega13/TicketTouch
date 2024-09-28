import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api', 
});

const API_BASE_URL = 'http://localhost:3001/api';

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

export const getUserSettings = async () => {
  const userId = localStorage.getItem('userId'); // Obtém o ID do usuário do localStorage
  try {
    const response = await api.get(`/user-settings/${userId}`, { // Inclui o ID do usuário na URL
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

export const updateUserSettings = async (settings: any) => {
  const userId = localStorage.getItem('userId'); // Pegue o ID do usuário do localStorage
  try {
    const response = await api.put(`/user-settings/${userId}`, settings, { // Passando o ID do usuário na URL
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

export const getUsers = async () => {
  try {
    const response = await api.get('/user', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    throw error;
  }
};

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

export const updateUser = async (userId: string, data: any) => {
  try {
    await api.put(`/user/${userId}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    throw error;
  }
};

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

export const createUser = async (data: any) => {
  try {
    const response = await api.post('/user', data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    throw error;
  }
};