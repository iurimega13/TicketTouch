const axios = require('axios');
const { faker } = require('@faker-js/faker');
const { LocalStorage } = require('node-localstorage');

// Configurar o localStorage no Node.js
const localStorage = new LocalStorage('./scratch');

const API_URL = 'http://localhost:3001/api';

// Criação da instância axios
const api = axios.create({
  baseURL: API_URL,
});

// Função para obter cabeçalhos com token
const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  },
});

const createUnits = async (count) => {
  console.log('Iniciando criação de unidades...');
  for (let i = 0; i < count; i++) {
    const unit = {
      name: faker.company.name(),
      description: faker.lorem.sentence(),
    };

    try {
      const response = await axios.post(`${API_URL}/units`, unit, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(`Unidade criada: ${JSON.stringify(response.data)}`);
    } catch (error) {
      console.error(`Erro ao criar unidade: ${error.message}`);
    }
  }
  console.log(`${count} unidades criadas.`);
};

const createDepartments = async (count) => {
  console.log('Iniciando criação de departamentos...');
  try {
    console.log('Buscando unidades...');
    const response = await axios.get(`${API_URL}/units`);
    const units = response.data.data; 
    console.log('Unidades buscadas:', units);

    if (!Array.isArray(units)) {
      throw new Error('A resposta da API não é um array');
    }

    const unitIds = units.map((unit) => unit.id);

    for (let i = 0; i < count; i++) {
      const department = {
        name: faker.commerce.department(),
        unit_id: faker.helpers.arrayElement(unitIds),
      };
      try {
        const response = await axios.post(`${API_URL}/departments`, department);
        console.log(`Departamento criado: ${JSON.stringify(response.data)}`);
      } catch (error) {
        console.error(`Erro ao criar departamento: ${error.message}`);
        console.error(`Dados do departamento: ${JSON.stringify(department)}`);
      }
    }
    console.log(`${count} departamentos criados.`);
  } catch (error) {
    console.error(`Erro ao criar departamentos: ${error.message}`);
  }
};

const createUsers = async (count) => {
  console.log('Iniciando criação de usuários...');
  try {
    console.log('Buscando unidades...');
    const unitsResponse = await axios.get(`${API_URL}/units`);
    const units = unitsResponse.data.data; 
    console.log('Unidades buscadas:', units);

    if (!Array.isArray(units)) {
      throw new Error('A resposta da API não é um array');
    }

    const unitIds = units.map((unit) => unit.id);

    console.log('Buscando departamentos...');
    const departmentsResponse = await axios.get(`${API_URL}/departments`);
    const departments = departmentsResponse.data.data; 
    console.log('Departamentos buscados:', departments);

    if (!Array.isArray(departments)) {
      throw new Error('A resposta da API não é um array');
    }

    const departmentIds = departments.map((department) => department.id);

    for (let i = 0; i < count; i++) {
      const user = {
        username: faker.internet.userName(),
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: faker.helpers.arrayElement(['admin', 'analyst', 'user']),
        phone_number: faker.phone.number(),
        ramal: faker.phone.number(),
        unit: faker.helpers.arrayElement(unitIds),
        department: faker.helpers.arrayElement(departmentIds),
      };
      try {
        const response = await axios.post(`${API_URL}/user`, user);
        console.log(`Usuário criado: ${JSON.stringify(response.data)}`);
      } catch (error) {
        console.error(`Erro ao criar usuário: ${error.message}`);
        console.error(`Dados do usuário: ${JSON.stringify(user)}`);
      }
    }
    console.log(`${count} usuários criados.`);
  } catch (error) {
    console.error(`Erro ao criar usuários: ${error.message}`);
  }
};

const createEquipments = async (count) => {
  console.log('Iniciando criação de equipamentos...');
  try {
    console.log('Buscando usuários...');
    const usersResponse = await axios.get(`${API_URL}/user`);
    console.log('Resposta da API de usuários:', usersResponse.data);

    const users = usersResponse.data; 
    console.log('Usuários buscados:', users);

    if (!Array.isArray(users)) {
      throw new Error('A resposta da API não é um array');
    }

    const userIds = users.map((user) => user.id);

    console.log('Buscando unidades...');
    const unitsResponse = await axios.get(`${API_URL}/units`);
    const units = unitsResponse.data.data; 
    console.log('Unidades buscadas:', units);

    if (!Array.isArray(units)) {
      throw new Error('A resposta da API não é um array');
    }

    const unitIds = units.map((unit) => unit.id);

    console.log('Buscando departamentos...');
    const departmentsResponse = await axios.get(`${API_URL}/departments`);
    const departments = departmentsResponse.data.data; 
    console.log('Departamentos buscados:', departments);

    if (!Array.isArray(departments)) {
      throw new Error('A resposta da API não é um array');
    }

    const departmentIds = departments.map((department) => department.id);

    for (let i = 0; i < count; i++) {
      const equipment = {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        serial_number: faker.string.uuid(),
        user_id: faker.helpers.arrayElement(userIds),
        unit_id: faker.helpers.arrayElement(unitIds),
        department_id: faker.helpers.arrayElement(departmentIds),
        is_shared: faker.datatype.boolean(),
      };
      try {
        const response = await axios.post(`${API_URL}/equipments`, equipment);
        console.log(`Equipamento criado: ${JSON.stringify(response.data)}`);
      } catch (error) {
        console.error(`Erro ao criar equipamento: ${error.message}`);
        console.error(`Dados do equipamento: ${JSON.stringify(equipment)}`);
      }
    }
    console.log(`${count} equipamentos criados.`);
  } catch (error) {
    console.error(`Erro ao criar equipamentos: ${error.message}`);
  }
};

const populateDatabase = async () => {
  try {
    await createUnits(50);
    await createDepartments(50);
    await createUsers(50);
    await createEquipments(50);
    console.log('Banco de dados populado com sucesso.');
  } catch (error) {
    console.error('Erro ao popular o banco de dados:', error);
  }
};

populateDatabase();