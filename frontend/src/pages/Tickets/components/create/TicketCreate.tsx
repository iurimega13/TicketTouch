import React, { useState, useEffect } from 'react';
import { notification, Select, Spin, Input } from 'antd';
import {
  CreateForm,
  FormContainer,
  ActionButton,
  SelectContainer,
  StyledLabel,
  Textarea,
} from './styles';
import {
  createTicket,
  fetchLastTicketByType,
  getUsers,
  getUnits,
  getDepartmentsByUnit,
  createSla,
} from '../../../../services/api';

const TicketCreate: React.FC = () => {
  const initialTicketState = {
    titleType: '' as 'incident' | 'serviceRequest',
    description: '',
    category_name: '',
    user_id: '',
    unit_id: '',
    department_id: '', 
    sla_id: '',
  };

  const [newTicket, setNewTicket] = useState(initialTicketState);
  const [users, setUsers] = useState<any[]>([]);
  const [units, setUnits] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingUnits, setLoadingUnits] = useState(false);
  const [loadingDepartments, setLoadingDepartments] = useState(false);

  useEffect(() => {
    fetchUsers();
    fetchUnits();
  }, []);

  useEffect(() => {
    if (newTicket.unit_id) {
      fetchDepartments(newTicket.unit_id);
    }
  }, [newTicket.unit_id]);

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const usersData = await getUsers();
      setUsers(Array.isArray(usersData) ? usersData : []);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      setUsers([]);
    } finally {
      setLoadingUsers(false);
    }
  };

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

  const fetchDepartments = async (unit_id: string) => {
    setLoadingDepartments(true);
    try {
      const response = await getDepartmentsByUnit(unit_id);
      setDepartments(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Erro ao buscar departamentos:', error);
      setDepartments([]);
    } finally {
      setLoadingDepartments(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTicket((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTicket((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string | boolean) => {
    setNewTicket((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === 'unit_id') {
      fetchDepartments(value as string);
    }
  };

  const handleUnitChange = async (value: string) => {
    setNewTicket((prevState) => ({
      ...prevState,
      unit_id: value,
      department_id: '',
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
    setNewTicket((prevState) => ({
      ...prevState,
      department_id: value,
    }));
  };

  const validateForm = () => {
    return (
      newTicket.titleType !== initialTicketState.titleType &&
      newTicket.description !== initialTicketState.description &&
      (newTicket.titleType === 'incident' || newTicket.category_name !== initialTicketState.category_name) &&
      newTicket.user_id !== initialTicketState.user_id &&
      newTicket.unit_id !== initialTicketState.unit_id &&
      newTicket.department_id !== initialTicketState.department_id
    );
  };

  const handleCreateTicket = async () => {
    if (!validateForm()) {
        notification.error({
            message: 'Erro',
            description: 'Por favor, preencha todos os campos obrigatórios',
            placement: 'top',
        });
        return;
    }

    const { titleType, ...ticketData } = newTicket;

    try {
        // Obter o último ticket criado com base no tipo de solicitação
        const lastTicket = await fetchLastTicketByType(titleType);
        
        // Log para verificar o título do último ticket
        console.log('Último ticket recuperado:', lastTicket);

        // Verifica se o último ticket existe e extrai o número
        const nextNumber = lastTicket ? 
            (parseInt(lastTicket.title.split('-')[1], 10) + 1) : 1; // Adicione a base para parseInt

        const titlePrefix = titleType === 'incident' ? 'INC' : 'SOL';
        const title = `${titlePrefix}-${String(nextNumber).padStart(4, '0')}`;

        // Log dos dados do SLA antes de criar
        const slaData = {
            name: `SLA para ${title}`,
            description: `SLA do chamado: ${title}`,
            time: '24h',
            response_time: 4,
            resolution_time: 24,
        };
        console.log('Dados do SLA:', slaData);

        // Criar SLA primeiro
        const createdSla = await createSla(slaData);

        // Log dos dados do ticket antes de criar
        console.log('Dados do Ticket:', {
            title,
            ...ticketData,
            priority: 'Média',
            status: 'Aberto',
            sla_id: createdSla.id,
            type: titleType
        });

        // Criar o ticket com o sla_id retornado
        await createTicket({
            title,
            ...ticketData,
            priority: 'Média',
            status: 'Aberto',
            sla_id: createdSla.id,
            type: titleType
        });

        notification.success({
            message: 'Sucesso',
            description: 'Ticket criado com sucesso',
            placement: 'top',
        });
        setNewTicket(initialTicketState);
    } catch (error) {
        console.error('Erro ao criar ticket:', error);
        notification.error({
            message: 'Erro',
            description: 'Erro ao criar ticket',
            placement: 'top',
        });
    }
};


  return (
    <FormContainer>
      <CreateForm>
        <SelectContainer>
          <StyledLabel>Tipo de Chamado</StyledLabel>
          <Select
            style={{ width: '100%' }}
            value={newTicket.titleType}
            onChange={(value) => handleSelectChange('titleType', value)}
            options={[
              { value: 'serviceRequest', label: 'Solicitação de Serviço' },
              { value: 'incident', label: 'Incidente' },
            ]}
          />
        </SelectContainer>

        {newTicket.titleType !== 'incident' && (
          <SelectContainer>
            <StyledLabel>Nome da Categoria</StyledLabel>
            <Input
              type="text"
              name="category_name"
              value={newTicket.category_name}
              onChange={handleInputChange}
              title="Nome da Categoria"
              placeholder="Digite o nome da categoria"
            />
          </SelectContainer>
        )}

        <SelectContainer>
          <StyledLabel>Usuário</StyledLabel>
          <Select
            showSearch
            style={{ width: '100%' }}
            placeholder="Selecione um Usuário"
            optionFilterProp="label"
            filterSort={(optionA, optionB) =>
              String(optionA?.label ?? '')
                .toLowerCase()
                .localeCompare(String(optionB?.label ?? '').toLowerCase())
            }
            value={newTicket.user_id}
            onChange={(value) => handleSelectChange('user_id', value)}
            options={Array.isArray(users) ? users.map((user: any) => ({
              value: user.id,
              label: user.name,
            })) : []}
            notFoundContent={loadingUsers ? <Spin size="small" /> : null}
          />
        </SelectContainer>

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
            value={newTicket.unit_id}
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
            value={newTicket.department_id}
            onChange={handleDepartmentChange}
            tokenSeparators={[',']}
            options={Array.isArray(departments) ? departments.map((department: any) => ({
              value: department.id,
              label: department.name,
            })) : []}
            notFoundContent={loadingDepartments ? <Spin size="small" /> : null}
            disabled={!newTicket.unit_id}
            title="Departamento"
            placeholder="Selecione o departamento"
          />
        </SelectContainer>

        <StyledLabel>Descrição</StyledLabel>
        <Textarea
          name="description"
          value={newTicket.description}
          onChange={handleTextAreaChange} 
          title="Descrição"
          placeholder="Digite a descrição do ticket"
        />

        <ActionButton onClick={handleCreateTicket}>
          Criar Novo Ticket
        </ActionButton>
      </CreateForm>
    </FormContainer>
  );
};

export default TicketCreate;