import axios from 'axios';

// Criação da instância axios
const api = axios.create({
  baseURL: 'http://localhost:3001/api/',
});

// Função para obter cabeçalhos com token
const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  },
});

// ==================== USUÁRIOS ====================

// Função para autenticar o usuário
export const loginUser = async (username: string, password: string) => {
  try {
    const response = await api.post('/auth', { username, password });
    return response.data;
  } catch (error) {
    console.error('Erro de autenticação:', error);
    throw error;
  }
};

// Função para buscar o perfil do usuário
export const getUserProfile = async (userId: string) => {
  try {
    const response = await api.get(`/user/${userId}`, getAuthHeaders());
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
  const userId = localStorage.getItem('userId');
  try {
    const response = await api.get(`/user-settings/${userId}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar as configurações do usuário:', error);
    throw error;
  }
};

// Função para atualizar as configurações do usuário
export const updateUserSettings = async (settings: any) => {
  const userId = localStorage.getItem('userId');
  try {
    const response = await api.put(`/user-settings/${userId}`, settings, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar as configurações do usuário:', error);
    throw error;
  }
};

// Função para buscar usuários com paginação, filtro e ordenação
export const getUsersWithPagination = async (page: number, limit: number, filter: string, sortBy: string, sortOrder: 'ASC' | 'DESC') => {
  try {
    const response = await api.get(`/user`, {
      params: { page, limit, filter, sortBy, sortOrder },
    });
    return response.data; 
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    throw error;
  }
};

// Função para buscar todos os usuários sem paginação
export const getUsers = async () => {
  try {
    const response = await api.get(`/user/all`);
    return response.data; 
  } catch (error) {
    console.error('Erro ao buscar todos os usuários:', error);
    throw error;
  }
};

// Função para resetar a senha do usuário e retornar a nova senha
export const resetPasswordAuto = async (userId: string) => {
  try {
    const response = await api.post(`/user/${userId}/reset-password`, null, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Erro ao resetar senha:', error);
    throw error;
  }
};

// Função para alterar a senha do usuário
export const changePassword = async (username: string, currentPassword: string, newPassword: string) => {
  return api.post('/user/change-password', { username, currentPassword, newPassword }, getAuthHeaders());
};

// Função para atualizar informações do usuário
export const updateUser = async (userId: string, data: any) => {
  try {
    const response = await api.put(`/user/${userId}`, data, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    if (axios.isAxiosError(error) && error.response) {
      console.error('Dados da resposta de erro:', error.response.data); 
    }
    throw error;
  }
};

// Função para deletar um usuário
export const deleteUser = async (userId: string) => {
  try {
    await api.delete(`/user/${userId}`, getAuthHeaders());
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

// ==================== DEPARTAMENTOS ====================

// Função para criar um novo departamento
export const createDepartment = async (departmentData: any) => {
  try {
    const response = await api.post('/departments', departmentData, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Erro ao criar departamento:', error);
    throw error;
  }
};

// Função para buscar todos os departamentos sem paginação
export const getAllDepartments = async () => {
  try {
    const response = await api.get('/departments/all');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar todas as departamentos:', error);
    throw error;
  }
};

// Função para buscar todos os departamentos com paginação
export const getDepartmentsWithPagination = async (page: number, limit: number, filter: string, sortBy: string, sortOrder: 'ASC' | 'DESC') => {
  try {
    const response = await api.get('/departments', {
      params: { page, limit, filter, sortBy, sortOrder },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar departamentos:', error);
    throw error;
  }
};


// Função para buscar departamentos
export const getDepartmentsByUnit = async (unitId: string) => {
  try {
    const response = await api.get(`/departments/unit/${unitId}`, {
      ...getAuthHeaders(),
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
    const response = await api.get(`/departments/${departmentId}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar perfil do departamento:', error);
    throw error;
  }
};

// Função para atualizar o departamento
export const updateDepartment = async (departmentId: string, departmentData: any) => {
  try {
    const response = await api.put(`/departments/${departmentId}`, departmentData, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar departamento:', error);
    throw error;
  }
};

// Função para deletar o departamento
export const deleteDepartment = async (departmentId: string) => {
  try {
    await api.delete(`/departments/${departmentId}`, getAuthHeaders());
  } catch (error) {
    console.error('Erro ao deletar departamento:', error);
    throw error;
  }
};

// ==================== UNIDADES ====================

// Função para criar uma nova unidade
export const createUnit = async (unitData: any) => {
  try {
    const response = await api.post('/units', unitData, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Erro ao criar unidade:', error);
    throw error;
  }
};

// Função para buscar todas as unidades sem paginação
export const getUnits = async () => {
  try {
    const response = await api.get('/units/all');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar todas as unidades:', error);
    throw error;
  }
};

// Função para buscar unidades com paginação
export const getUnitsWithPagination = async (page: number, limit: number, filter: string, sortBy: string, sortOrder: 'ASC' | 'DESC') => {
  try {
    const response = await api.get('/units', {
      params: { page, limit, filter, sortBy, sortOrder },
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
    const response = await api.get(`/units/${unitId}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar perfil da unidade:', error);
    throw error;
  }
};

// Função para atualizar a unidade
export const updateUnit = async (unitId: string, unitData: any) => {
  try {
    const response = await api.put(`/units/${unitId}`, unitData, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar unidade:', error);
    throw error;
  }
};

// Função para deletar a unidade
export const deleteUnit = async (unitId: string) => {
  try {
    await api.delete(`/units/${unitId}`, getAuthHeaders());
  } catch (error) {
    console.error('Erro ao deletar unidade:', error);
    throw error;
  }
};

// ==================== EQUIPAMENTOS ====================

// Função para criar um novo equipamento
export const createEquipment = async (equipmentData: any) => {
  try {
    const response = await api.post('/equipments', equipmentData, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Erro ao criar equipamento:', error);
    throw error;
  }
};

// Função para buscar equipamentos com paginação, filtro e ordenação
export const getEquipmentsWithPagination = async (page: number, limit: number, filter: string, sortBy: string, sortOrder: 'ASC' | 'DESC') => {
  try {
    const response = await api.get('/equipments', {
      params: { page, limit, filter, sortBy, sortOrder },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar equipamentos:', error);
    throw error;
  }
};

// Função para buscar todos os equipamentos sem paginação
export const getEquipments = async () => {
  try {
    const response = await api.get('/equipments/all');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar todos os equipamentos:', error);
    throw error;
  }
};

// Função para buscar o perfil do equipamento
export const getEquipmentProfile = async (equipmentId: string) => {
  try {
    const response = await api.get(`/equipments/${equipmentId}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar perfil do equipamento:', error);
    throw error;
  }
};

// Função para atualizar o equipamento
export const updateEquipment = async (equipmentId: string, equipmentData: any) => {
  try {
    const response = await api.put(`/equipments/${equipmentId}`, equipmentData, getAuthHeaders());
    console.log('response', response);
    
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar equipamento:', error);
    throw error;
  }
};

// Função para deletar o equipamento
export const deleteEquipment = async (equipmentId: string) => {
  try {
    await api.delete(`/equipments/${equipmentId}`, getAuthHeaders());
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
  resetPasswordAuto,
  changePassword,
  updateUser,
  deleteUser,
  createUser,
  createUnit,
  createDepartment,
  getUnitsWithPagination,
  getUnits,
  getAllDepartments,
  getDepartmentsByUnit,
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
