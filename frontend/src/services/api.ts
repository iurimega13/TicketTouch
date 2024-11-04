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
    const response = await api.get(
      `/user-settings/${userId}`,
      getAuthHeaders(),
    );
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
    const response = await api.put(
      `/user-settings/${userId}`,
      settings,
      getAuthHeaders(),
    );
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar as configurações do usuário:', error);
    throw error;
  }
};

// Função para buscar usuários com paginação, filtro e ordenação
export const getUsersWithPagination = async (
  page: number,
  limit: number,
  filter: string,
  sortBy: string,
  sortOrder: 'ASC' | 'DESC',
) => {
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
    const response = await api.post(
      `/user/${userId}/reset-password`,
      null,
      getAuthHeaders(),
    );
    return response.data;
  } catch (error) {
    console.error('Erro ao resetar senha:', error);
    throw error;
  }
};

// Função para alterar a senha do usuário
export const changePassword = async (
  username: string,
  currentPassword: string,
  newPassword: string,
) => {
  return api.post(
    '/user/change-password',
    { username, currentPassword, newPassword },
    getAuthHeaders(),
  );
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
    const response = await api.post(
      '/departments',
      departmentData,
      getAuthHeaders(),
    );
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
export const getDepartmentsWithPagination = async (
  page: number,
  limit: number,
  filter: string,
  sortBy: string,
  sortOrder: 'ASC' | 'DESC',
) => {
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
    const response = await api.get(
      `/departments/${departmentId}`,
      getAuthHeaders(),
    );
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar perfil do departamento:', error);
    throw error;
  }
};

// Função para atualizar o departamento
export const updateDepartment = async (
  departmentId: string,
  departmentData: any,
) => {
  try {
    const response = await api.put(
      `/departments/${departmentId}`,
      departmentData,
      getAuthHeaders(),
    );
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
export const getUnitsWithPagination = async (
  page: number,
  limit: number,
  filter: string,
  sortBy: string,
  sortOrder: 'ASC' | 'DESC',
) => {
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
    const response = await api.put(
      `/units/${unitId}`,
      unitData,
      getAuthHeaders(),
    );
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
    const response = await api.post(
      '/equipments',
      equipmentData,
      getAuthHeaders(),
    );
    return response.data;
  } catch (error) {
    console.error('Erro ao criar equipamento:', error);
    throw error;
  }
};

// Função para buscar equipamentos com paginação, filtro e ordenação
export const getEquipmentsWithPagination = async (
  page: number,
  limit: number,
  filter: string,
  sortBy: string,
  sortOrder: 'ASC' | 'DESC',
) => {
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
    const response = await api.get(
      `/equipments/${equipmentId}`,
      getAuthHeaders(),
    );
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar perfil do equipamento:', error);
    throw error;
  }
};

// Função para atualizar o equipamento
export const updateEquipment = async (
  equipmentId: string,
  equipmentData: any,
) => {
  try {
    const response = await api.put(
      `/equipments/${equipmentId}`,
      equipmentData,
      getAuthHeaders(),
    );

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

// ==================== FAQ ====================

// Função para criar uma FAQ
export const createFAQ = async (question: string, answer: string) => {
  return api.post('/faqs', { question, answer });
};

// Função para buscar todas as FAQs sem paginação
export const getFAQs = async () => {
  try {
    const response = await api.get('/faqs/all');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar todas as FAQs:', error);
    throw error;
  }
};

// Função para buscar FAQs com paginação
export const getFAQsWithPagination = async (
  page: number,
  limit: number,
  filter: string,
  sortBy: string,
  sortOrder: 'ASC' | 'DESC',
) => {
  try {
    const response = await api.get('/faqs', {
      params: { page, limit, filter, sortBy, sortOrder },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar FAQs:', error);
    throw error;
  }
};

// Função para buscar uma FAQ pelo ID
export const getFAQById = async (faqId: string) => {
  const response = await api.get(`/faqs/${faqId}`);
  return response.data;
};

// Função para atualizar uma FAQ
export const updateFAQ = async (
  faqId: string,
  data: { question: string; answer: string },
) => {
  return api.put(`/faqs/${faqId}`, data);
};

// Função para deletar uma FAQ
export const deleteFAQ = async (faqId: string) => {
  return api.delete(`/faqs/${faqId}`);
};

// ==================== TICKETS ====================

// Função para criar um ticket
export const createTicket = async (ticketData: any) => {
  try {
    const response = await api.post(`/tickets`, ticketData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar ticket:', error);
    throw error;
  }
};

export const getTicketById = async (ticketId: string) => {
  try {
    const response = await api.get(`/tickets/${ticketId}`);
    return response.data;
  } catch (error: any) {
    console.error(
      'Erro ao buscar ticket:',
      error.response?.data || error.message,
    );
    throw error;
  }
};

// Função para buscar tickets com filtro
export const fetchTickets = async (filter: string) => {
  try {
    const response = await api.get('/tickets', {
      params: { filter },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar tickets:', error);
    throw error;
  }
};

// Função para buscar o último ticket por tipo
export const fetchLastTicketByType = async (
  type: 'incident' | 'serviceRequest',
) => {
  const response = await api.get(`/tickets/type/last?type=${type}`);
  return response.data;
};

// Função para cancelar um ticket
export const cancelTicket = async (ticketId: string) => {
  try {
    await api.patch(`/tickets/${ticketId}/cancel`);
  } catch (error) {
    console.error('Erro ao cancelar o ticket:', error);
    throw error;
  }
};

// Função para adicionar um comentário ao ticket
export const addCommentToTicket = async (
  ticketChangeId: string,
  comment: string,
  username: string,
  field: string = 'comentário',
) => {
  try {
    const now = new Date();
    const roundedDate = new Date(Math.round(now.getTime() / 60000) * 60000); // Arredonda para o minuto mais próximo
    const response = await api.put(`/ticket-changes/${ticketChangeId}`, {
      id: ticketChangeId,
      changes: [
        {
          field,
          value: `${username}: ${comment}`,
          date: roundedDate.toISOString(),
        },
      ],
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar comentário ao ticket:', error);
    throw error;
  }
};

// Função para buscar histórico de atualizações por ticket
export const getChangesByTicketId = async (ticketId: string) => {
  try {
    const response = await api.get(`/ticket-changes/${ticketId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar histórico de atualizações:', error);
    throw error;
  }
};

// Função para criar uma mudança (change)
export const createChange = async (changeData: any) => {
  try {
    const response = await api.post('/ticket-changes', changeData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar mudança:', error);
    throw error;
  }
};

// ==================== SLA ====================

// Função para criar SLA
export const createSla = async (slaData: any) => {
  try {
    const response = await api.post(`/slas`, slaData);
    return response.data;
  } catch (error: any) {
    console.error('Erro ao criar SLA:', error.response?.data || error.message);
    throw error;
  }
};

// Função para buscar SLA pelo ID do SLA
export const getSlaByTicket = async (slaId: string) => {
  try {
    const response = await api.get(`/slas/${slaId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Erro ao buscar SLA:', error.response?.data || error.message);
    throw error;
  }
};

// ==================== FEEDBACK ====================
export const submitFeedback = async (
  ticketId: string,
  rating: number,
  comment: string,
) => {
  await api.post(`/tickets/${ticketId}/feedback`, { rating, comment });
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
  createFAQ,
  getFAQs,
  getFAQsWithPagination,
  getFAQById,
  updateFAQ,
  deleteFAQ,
  createTicket,
  getTicketById,
  fetchTickets,
  fetchLastTicketByType,
  cancelTicket,
  addCommentToTicket,
  submitFeedback,
  createSla,
  getSlaByTicket,
  getChangesByTicketId,
};

export default apiService;
