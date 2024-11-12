import React, { useState, useEffect, useCallback } from 'react';
import {
  Button,
  Input,
  Form,
  notification,
  Progress,
  Select,
  Modal,
  List,
  Tooltip,
  Spin,
} from 'antd';
import {
  cancelTicket,
  addCommentToTicket,
  getChangesByTicketId,
  getTicketById,
  getUserProfile,
  getUsers,
  getUnits,
  getDepartmentsByUnit,
  updateTicket,
  getUsersByUnit,
  createChange,
} from '../../../../services/api';
import {
  ChangesContainer,
  SlaContainer,
  StyledModal,
  StyledSpan,
} from './styles';
import { Change } from '../../../../types/types';

const { Option } = Select;

interface TicketPopupProps {
  visible: boolean;
  onClose: () => void;
  ticketId: string;
  onTicketCancelled: () => void;
}

const TicketPopup: React.FC<TicketPopupProps> = ({
  visible,
  onClose,
  ticketId,
  onTicketCancelled,
}) => {
  const [ticket, setTicket] = useState<any>(null);
  const [comment, setComment] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [changes, setChanges] = useState<any[]>([]);
  const [slaDetails] = useState<any>(null);
  const [username, setUsername] = useState<string>('');
  const [extraResponseTime, setExtraResponseTime] = useState<number>(0);
  const [closingDate, setClosingDate] = useState<Date | null>(null);
  const [dataFetched, setDataFetched] = useState<boolean>(false);
  const [users, setUsers] = useState<any[]>([]);
  const [units, setUnits] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [updatedFields, setUpdatedFields] = useState<{ [key: string]: any }>(
    {},
  );
  const [confirmCancelVisible, setConfirmCancelVisible] = useState(false);
  const [loadingUnits, setLoadingUnits] = useState(false);
  const [loadingDepartments, setLoadingDepartments] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);

  const userId = localStorage.getItem('userId');

  const fetchUserProfile = useCallback(async () => {
    if (!userId) {
      console.error('Erro: userId não encontrado no localStorage');
      return;
    }

    try {
      const userProfile = await getUserProfile(userId);
      setUsername(userProfile.username);
    } catch (error) {
      console.error('Erro ao buscar perfil do usuário:', error);
    }
  }, [userId]);

  const fetchUsers = useCallback(async (unitId?: string) => {
    setLoadingUsers(true);
    try {
      const usersData = unitId
        ? await getUsersByUnit(unitId)
        : await getUsers();
      const filteredUsers = usersData.filter(
        (user: any) => user.role === 'admin' || user.role === 'analista',
      );
      setUsers(filteredUsers);
      return filteredUsers.length > 0; 
    } catch (error) {
      notification.error({
        message: 'Erro',
        description: 'Erro ao buscar usuários',
      });
      return false; 
    } finally {
      setLoadingUsers(false);
    }
  }, []);

  const fetchUnits = useCallback(async () => {
    setLoadingUnits(true);
    try {
      const unitsData = await getUnits();
      setUnits(unitsData);
    } catch (error) {
      notification.error({
        message: 'Erro',
        description: 'Erro ao buscar unidades',
      });
    } finally {
      setLoadingUnits(false);
    }
  }, []);

  const fetchDepartments = useCallback(async (unitId: string) => {
    setLoadingDepartments(true);
    try {
      const response = await getDepartmentsByUnit(unitId);
      const departmentsData = response.data;
  
      if (!Array.isArray(departmentsData) || departmentsData.length === 0) {
        setDepartments([]);
        return false; 
      } else {
        setDepartments(departmentsData);
        return true; 
      }
    } catch (error) {
      notification.error({
        message: 'Erro',
        description: 'Erro ao buscar departamentos',
      });
      console.error('Erro ao buscar departamentos:', error);
      return false; 
    } finally {
      setLoadingDepartments(false);
    }
  }, []);

  const fetchTicketDetails = useCallback(async () => {
    setLoading(true);
    try {
      const ticketData = await getTicketById(ticketId);
      setTicket(ticketData);
      setUpdatedFields({});

      if (ticketData.unit?.id) {
        await fetchDepartments(ticketData.unit.id);
        await fetchUsers(ticketData.unit.id);
      }

      setDataFetched(true);
    } catch (error) {
      notification.error({
        message: 'Erro',
        description: 'Erro ao buscar detalhes do ticket',
      });
    } finally {
      setLoading(false);
    }
  }, [ticketId, fetchDepartments, fetchUsers]);

  const fetchChanges = useCallback(async () => {
    try {
      const changesData = await getChangesByTicketId(ticketId);
      setChanges(changesData);

      let additionalTime = 0;
      let foundClosingDate: Date | null = null;

      if (Array.isArray(changesData)) {
        changesData.forEach((changeItem) => {
          if (Array.isArray(changeItem.changes)) {
            changeItem.changes.forEach((change: Change) => {
              if (change.field === 'extraResponseTime') {
                additionalTime += parseInt(change.value, 10);
              }
              if (change.field === 'closed_at') {
                foundClosingDate = new Date(change.value);
              }
            });
          }
        });
      } else {
        console.error('Erro: changesData não é um array');
      }

      setExtraResponseTime(additionalTime);
      setClosingDate(foundClosingDate);
    } catch (error) {
      notification.error({
        message: 'Erro',
        description: 'Erro ao buscar histórico de atualizações',
      });
      console.error('Erro ao buscar histórico de mudanças:', error);
    }
  }, [ticketId]);

  useEffect(() => {
    if (visible && ticketId && !dataFetched) {
      fetchUserProfile();
      fetchTicketDetails();
      fetchChanges();
      fetchUnits();
      setDataFetched(true);
    }
    if (ticket?.unit?.id) {
      fetchDepartments(ticket.unit.id);
    }

    if (!visible) {
      setDataFetched(false);
    }
  }, [
    visible,
    ticketId,
    fetchUserProfile,
    fetchTicketDetails,
    fetchChanges,
    fetchUnits,
    dataFetched,
    fetchDepartments,
    ticket?.unit?.id,
  ]);

  const handleFieldChange = async (field: string, value: any) => {
  if (field === 'unit_id') {
    if (value !== ticket.unit?.id) {
      setUpdatedFields((prevFields) => ({
        ...prevFields,
        unit_id: value,
        department_id: null,
        technician_id: null,
      }));

      const hasDepartments = await fetchDepartments(value);
      const hasValidUsers = await fetchUsers(value);

      if (!hasDepartments || !hasValidUsers) {
        notification.warning({
          message: 'Unidade Inválida',
          description: 'A unidade selecionada não possui departamentos ou usuários adequados. Por favor, selecione outra unidade.',
        });
        setUpdatedFields((prevFields) => ({
          ...prevFields,
          unit_id: null, 
        }));
      }
    } else {
      setUpdatedFields((prevFields) => ({ ...prevFields, unit_id: value }));
    }
  } else if (field === 'status' && value === 'Aberto') {
    setUpdatedFields((prevFields) => ({
      ...prevFields,
      status: value,
      technician_id: null,
    }));
  } else {
    setUpdatedFields((prevFields) => ({ ...prevFields, [field]: value }));
  }
};


const handleUpdateTicket = async () => {
  setLoading(true);
  try {
    // Filtra apenas os campos que foram alterados
    const { fieldsToUpdate, fieldsDescription } = Object.keys(updatedFields).reduce(
      (acc, key) => {
        if (key === 'technician_id') {
          acc.fieldsToUpdate['technician_id'] = updatedFields[key];
          acc.fieldsDescription['responsável'] = formatFieldValue(key, updatedFields[key]);
        } else if (key === 'unit_id') {
          const unit = units.find((unit) => unit.id === updatedFields[key]);
          acc.fieldsToUpdate['unit_id'] = updatedFields[key];
          acc.fieldsDescription['unidade'] = unit ? unit.name : 'Unidade não encontrada';
        } else if (key === 'department_id') {
          const department = departments.find((dept) => dept.id === updatedFields[key]);
          acc.fieldsToUpdate['department_id'] = updatedFields[key];
          acc.fieldsDescription['departamento'] = department ? department.name : 'Departamento não encontrado';
        } else if (updatedFields[key] !== ticket[key]) {
          acc.fieldsToUpdate[key] = updatedFields[key];
          acc.fieldsDescription[key] = updatedFields[key];
        }
        return acc;
      },
      { fieldsToUpdate: {}, fieldsDescription: {} } as { fieldsToUpdate: { [key: string]: any }, fieldsDescription: { [key: string]: any } },
    );

    if (Object.keys(fieldsToUpdate).length === 0) {
      notification.info({
        message: 'Nenhuma alteração',
        description: 'Nenhuma alteração foi detectada para atualizar.',
      });
      setLoading(false);
      return;
    }

    // Cria a descrição das mudanças seguindo o padrão especificado
    const changesDescription = Object.entries(fieldsDescription)
      .map(
        ([key, value]) =>
          `${fieldLabels[key] || key} atualizado para ${value};`,
      )
      .join('\n');

    // Atualiza o ticket com os campos modificados
    await updateTicket(ticket.id, fieldsToUpdate);

    // Registra a alteração com a descrição detalhada
    await createChange(
      ticket.id,
      changesDescription,
      username,
      'atualização',
    );

    notification.success({
      message: 'Sucesso',
      description: 'Ticket atualizado com sucesso',
    });
    onClose();
  } catch (error) {
    notification.error({
      message: 'Erro',
      description: 'Erro ao atualizar o ticket',
    });
    console.error('Erro ao atualizar o ticket:', error);
  } finally {
    setLoading(false);
  }
};

  const handleCancelTicket = async () => {
    setLoading(true);
    try {
      await cancelTicket(ticket.id);
      notification.success({
        message: 'Sucesso',
        description: 'Ticket cancelado com sucesso',
      });
      onTicketCancelled();
    } catch (error) {
      notification.error({
        message: 'Erro',
        description: 'Erro ao cancelar o ticket',
      });
    } finally {
      setLoading(false);
      setConfirmCancelVisible(false);
    }
  };

  const handleAddComment = async () => {
    if (!comment.trim()) {
      return notification.warning({
        message: 'Aviso',
        description: 'Comentário não pode estar vazio.',
      });
    }

    try {
      // Cria a descrição da mudança para o comentário
      const commentDescription = `${username}: ${comment}`;

      // Envia o comentário para o ticket
      const lastChange = changes[changes.length - 1];
      const targetId = lastChange?.id || ticket.id;

      console.log(`Enviando comentário: "${comment}" para o ID: ${targetId}`);

      // Adiciona o comentário ao ticket
      await addCommentToTicket(
        targetId,
        commentDescription,
        username,
        'comentário',
      );

      // Registra a alteração com a descrição do comentário
      await createChange(targetId, commentDescription, username, 'comentário');

      notification.success({
        message: 'Sucesso',
        description: 'Comentário adicionado com sucesso',
      });

      // Limpa o campo de comentário e refaz a busca por mudanças
      setComment('');
      fetchChanges();
    } catch (error) {
      notification.error({
        message: 'Erro',
        description: 'Erro ao adicionar comentário',
      });
      console.error('Erro ao adicionar comentário:', error);
    }
  };

  const calculateSlaStatus = () => {
    if (!slaDetails || !ticket) return 'SLA não definido';

    const createdAt = new Date(ticket.created_at);
    const currentTime = new Date();
    const effectiveEndDate = closingDate || currentTime;

    const responseDeadline = new Date(
      createdAt.getTime() +
        slaDetails.response_time * 60 * 60 * 1000 +
        extraResponseTime,
    );
    const resolutionDeadline = new Date(
      createdAt.getTime() + slaDetails.resolution_time * 60 * 60 * 1000,
    );

    // 1. Verifica se o ticket está fechado
    if (closingDate) return 'Fechado';

    // 2. Verifica se o prazo de resolução foi ultrapassado
    if (effectiveEndDate > resolutionDeadline) return 'Atrasado para resolução';

    // 3. Verifica se o prazo de resposta foi ultrapassado
    if (effectiveEndDate > responseDeadline) return 'Atrasado para resposta';

    // 4. Caso contrário, está dentro do prazo
    return 'Dentro do Prazo';
  };

  const calculateProgress = (deadline: Date) => {
    const createdAt = new Date(ticket.created_at);
    const effectiveEndDate = closingDate || new Date();
    const totalDuration = deadline.getTime() - createdAt.getTime();
    const elapsedDuration = effectiveEndDate.getTime() - createdAt.getTime();
    return Math.min(Math.round((elapsedDuration / totalDuration) * 100), 100);
  };

  const getProgressColor = (percent: number) => {
    if (percent < 50) return 'green';
    if (percent < 75) return 'yellow';
    if (percent < 90) return 'orange';
    return 'red';
  };

  const responseDeadline = slaDetails
    ? new Date(
        new Date(ticket?.created_at).getTime() +
          slaDetails.response_time * 60 * 60 * 1000 +
          extraResponseTime,
      )
    : null;
  const resolutionDeadline = slaDetails
    ? new Date(
        new Date(ticket?.created_at).getTime() +
          slaDetails.resolution_time * 60 * 60 * 1000,
      )
    : null;

  const responseProgress = responseDeadline
    ? calculateProgress(responseDeadline)
    : 0;
  const resolutionProgress = resolutionDeadline
    ? calculateProgress(resolutionDeadline)
    : 0;

  if (!ticket) {
    return null;
  }

  // Labels dos campos traduzidos para exibição
  const fieldLabels: Record<string, string> = {
    technician_id: 'responsável',
    status: 'status',
    priority: 'prioridade',
    comentario: 'comentário',
    update: 'atualização',
    Abertura: 'Abertura',
  };

  // Formata o valor de um campo, com busca pelo nome do responsável
  const formatFieldValue = (field: string, value: any) => {
    if (field === 'technician_id') {
      const technician = users.find((user) => user.id === value);
      return technician ? technician.name : 'Usuário não encontrado';
    }
    return value;
  };

  return (
    <StyledModal open={visible} onCancel={onClose} footer={null}>
      <Form layout="vertical">
        <Form.Item label="Título do Ticket">
          <p>{ticket.title}</p>
        </Form.Item>

        <Form.Item label="Unidade">
          <Select
            showSearch
            style={{ width: '100%' }}
            placeholder="Selecione uma Unidade"
            optionFilterProp="label"
            filterSort={(optionA, optionB) =>
              String(optionA?.label ?? '')
                .toLowerCase()
                .localeCompare(String(optionB?.label ?? '').toLowerCase())
            }
            value={updatedFields.unit_id ?? ticket.unit?.id}
            onChange={(value) => handleFieldChange('unit_id', value)}
            options={units.map((unit) => ({
              value: unit.id,
              label: unit.name,
            }))}
            notFoundContent={loadingUnits ? <Spin size="small" /> : null}
            dropdownRender={(menu) =>
              ticket.status === 'Fechado' ? <></> : menu
            }
          />
        </Form.Item>

        <Form.Item label="Departamento" required>
          <Select
            showSearch
            style={{ width: '100%' }}
            placeholder="Selecione um Departamento"
            optionFilterProp="label"
            filterSort={(optionA, optionB) =>
              String(optionA?.label ?? '')
                .toLowerCase()
                .localeCompare(String(optionB?.label ?? '').toLowerCase())
            }
            value={updatedFields.department_id ?? ticket?.department?.name}
            onChange={(value) => handleFieldChange('department_id', value)}
            options={departments.map((department) => ({
              value: department.id,
              label: department.name,
            }))}
            notFoundContent={loadingDepartments ? <Spin size="small" /> : null}
          />
        </Form.Item>

        <Form.Item label="Prioridade do Ticket">
          <Select
            value={updatedFields.priority ?? ticket.priority}
            dropdownRender={(menu) =>
              ticket.status === 'Fechado' ? <></> : menu
            }
            onChange={(value) => handleFieldChange('priority', value)}
          >
            <Option value="Baixa">Baixa</Option>
            <Option value="Média">Média</Option>
            <Option value="Alta">Alta</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Descrição do Ticket">
          <p>{ticket.description}</p>
        </Form.Item>

        <Form.Item label="Status do Ticket">
          <Select
            value={updatedFields.status ?? ticket.status}
            onChange={(status: string) => {
              handleFieldChange('status', status);
            }}
            dropdownRender={(menu) =>
              ticket.status === 'Fechado' ? <></> : menu
            }
          >
            <Option value="Aberto">Aberto</Option>
            <Option value="Em Andamento">Em Andamento</Option>
            <Option value="Fechado">Fechado</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Responsável pelo Ticket"
          required={updatedFields.status !== 'Aberto'}
          validateStatus={
            updatedFields.status === 'Aberto' && updatedFields.technician_id
              ? 'error'
              : ''
          }
          help={
            updatedFields.status === 'Aberto' && updatedFields.technician_id
              ? 'O status não pode ser "Aberto" se um responsável estiver selecionado.'
              : ''
          }
        >
          <Select
            showSearch
            allowClear 
            style={{ width: '100%' }}
            placeholder="Selecione um Responsável"
            optionFilterProp="label"
            filterSort={(optionA, optionB) =>
              String(optionA?.label ?? '')
                .toLowerCase()
                .localeCompare(String(optionB?.label ?? '').toLowerCase())
            }
            value={updatedFields.technician_id ?? null} 
            onChange={(value) => handleFieldChange('technician_id', value)}
            options={[
              { value: null, label: 'Vazio' },
              ...users.map((user) => ({
                value: user.id,
                label: user.name,
              })),
            ]}
            notFoundContent={loadingUsers ? <Spin size="small" /> : null}
            dropdownRender={(menu) =>
              ticket.status === 'Fechado' ? <></> : menu
            }
          />
        </Form.Item>

        <Form.Item label="Usuário do Ticket">
          <p>{ticket.user.name}</p>
        </Form.Item>

        {slaDetails && (
          <Form.Item label="SLA">
            <p>Status: {calculateSlaStatus()}</p>
            <SlaContainer>
              {responseDeadline && (
                <Tooltip
                  title={`Prazo de Resposta: ${responseDeadline.toLocaleString()}`}
                >
                  <div style={{ marginBottom: '10px' }}>
                    <StyledSpan>Progresso de Resposta:</StyledSpan>
                    <Progress
                      percent={responseProgress}
                      status="active"
                      strokeColor={getProgressColor(responseProgress)}
                    />
                  </div>
                </Tooltip>
              )}
              {resolutionDeadline && (
                <Tooltip
                  title={`Prazo de Resolução: ${resolutionDeadline.toLocaleString()}`}
                >
                  <div>
                    <StyledSpan>Progresso de Resolução:</StyledSpan>
                    <Progress
                      percent={resolutionProgress}
                      status="active"
                      strokeColor={getProgressColor(resolutionProgress)}
                    />
                  </div>
                </Tooltip>
              )}
            </SlaContainer>
          </Form.Item>
        )}

        <Form.Item label="Histórico de Atualizações">
          {changes.length === 0 ? (
            <p>Sem histórico de atualizações</p>
          ) : (
            <ChangesContainer>
              <List
                dataSource={changes}
                renderItem={(item) => (
                  <List.Item>
                    <div>
                      {item.changes &&
                        item.changes.map((change: Change, index: number) => (
                          <p key={index}>
                            {change.date && (
                              <span>
                                {new Date(change.date).toLocaleString()} -{' '}
                              </span>
                            )}

                            <span>
                              <strong>
                                {fieldLabels[change.field] || change.field} -
                              </strong>{' '}
                              {fieldLabels[change.field] === 'responsável'
                                ? `Atualizado: ${formatFieldValue(
                                    change.field,
                                    change.value,
                                  )}`
                                : ` ${change.value}`}
                            </span>

                            
                          </p>
                        ))}
                    </div>
                  </List.Item>
                )}
              />
            </ChangesContainer>
          )}
        </Form.Item>

        {ticket.status !== 'Fechado' ? (
          <>
            <Form.Item label="Adicionar Comentário">
              <Input.TextArea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Digite um comentário"
                rows={4}
              />
            </Form.Item>

            <Form.Item style={{ textAlign: 'right', marginTop: '20px' }}>
              <Button
                type="primary"
                onClick={handleAddComment}
                style={{ marginRight: '10px' }}
              >
                Adicionar Comentário
              </Button>
              <Button
                type="primary"
                onClick={handleUpdateTicket}
                loading={loading}
                style={{ marginRight: '10px' }}
              >
                Atualizar
              </Button>
              <Button
                danger
                onClick={handleCancelTicket}
                loading={loading}
                style={{ marginRight: '10px' }}
              >
                Cancelar Ticket
              </Button>
            </Form.Item>
          </>
        ) : (
          <Form.Item style={{ textAlign: 'right', marginTop: '20px' }}>
            <Button
              type="primary"
              onClick={() => console.log('Feedback button clicked')}
              style={{ marginRight: '10px' }}
            >
              Feedback
            </Button>
          </Form.Item>
        )}

        <Modal
          title="Confirmação"
          open={confirmCancelVisible}
          onOk={handleCancelTicket}
          onCancel={() => setConfirmCancelVisible(false)}
          okText="Sim"
          cancelText="Não"
        >
          <p>Tem certeza que deseja cancelar este ticket?</p>
        </Modal>
      </Form>
    </StyledModal>
  );
};

export default TicketPopup;
