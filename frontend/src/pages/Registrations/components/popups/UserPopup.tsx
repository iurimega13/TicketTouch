import React, { useState, useEffect } from 'react';
import { Input, Button, Form, Select, Spin, notification } from 'antd';
import {
  getUserProfile,
  updateUser,
  deleteUser,
  getUnits,
  getDepartmentsByUnit,
  resetPasswordAuto,
} from '../../../../services/api';
import { User, Unit, Department } from '../types';
import { StyledModal } from './styles';
import { AxiosError } from 'axios';

const { Option } = Select;

interface UserPopupProps {
  userId: string;
  onClose: () => void;
  onUpdate: () => void;
}

const UserPopup: React.FC<UserPopupProps> = ({ userId, onClose, onUpdate }) => {
  const [user, setUser] = useState<User | null>(null);
  const [originalUser, setOriginalUser] = useState<User | null>(null);
  const [units, setUnits] = useState<Unit[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loadingUnits, setLoadingUnits] = useState(false);
  const [loadingDepartments, setLoadingDepartments] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState<string | null>(null);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);

  const fetchDepartments = async (unitId: string) => {
    setLoadingDepartments(true);
    try {
      const response = await getDepartmentsByUnit(unitId);
      const departmentsData = Array.isArray(response.data) ? response.data : [];
      setDepartments(departmentsData);
    } catch (error) {
      console.error('Erro ao buscar departamentos:', error);
      setDepartments([]);
    } finally {
      setLoadingDepartments(false);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserProfile(userId);

        setUser({
          ...userData,
          unit: userData.unit || null,
          department: userData.department || null,
        });

        setOriginalUser({
          ...userData,
          unit: userData.unit || null,
          department: userData.department || null,
        });

        if (userData.unit) {
          await fetchDepartments(userData.unit.id);
        }
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
      }
    };

    const fetchUnits = async () => {
      setLoadingUnits(true);
      try {
        const response = await getUnits();
        setUnits(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error('Erro ao buscar unidades:', error);
        setUnits([]);
      } finally {
        setLoadingUnits(false);
      }
    };

    fetchUser();
    fetchUnits();
  }, [userId]);

  const handleUpdate = async () => {
    if (!user || !originalUser) return;

    const updateData: Partial<User> = {};

    Object.keys(user).forEach((key) => {
      const userValue = user[key as keyof User];
      const originalValue = originalUser[key as keyof User];

      if (userValue !== originalValue && userValue !== null) {
        if (
          typeof userValue === 'object' &&
          userValue !== null &&
          'id' in userValue &&
          'name' in userValue
        ) {
          updateData[key as keyof User] = userValue.id as any;
        } else {
          updateData[key as keyof User] = userValue as any;
        }
      }
    });

    if (Object.keys(updateData).length === 0) {
      notification.info({
        message: 'Nenhuma alteração',
        description: 'Nenhuma alteração foi feita nos dados do usuário.',
      });
      return;
    }

    setLoading(true);
    try {
      await updateUser(userId, updateData);
      notification.success({
        message: 'Sucesso!',
        description: 'Usuário atualizado com sucesso.',
      });
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      if (error instanceof Error) {
        notification.error({
          message: 'Erro!',
          description:
            error.message || 'Ocorreu um erro ao atualizar o usuário.',
        });
      } else {
        notification.error({
          message: 'Erro!',
          description: 'Erro desconhecido ao atualizar o usuário.',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteUser(userId);
      notification.success({
        message: 'Sucesso!',
        description: 'Usuário deletado com sucesso.',
      });
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      if (error instanceof AxiosError && error.response) {
        const errorMessage =
          error.response.data.message || 'Erro ao deletar usuário';
        notification.error({
          message: 'Erro!',
          description: errorMessage,
        });
      } else if (error instanceof Error) {
        notification.error({
          message: 'Erro!',
          description: error.message,
        });
      } else {
        notification.error({
          message: 'Erro!',
          description: 'Erro desconhecido ao deletar o usuário.',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Função para resetar a senha do usuário
  const handleResetPassword = async () => {
    setLoading(true);
    try {
      const response = await resetPasswordAuto(userId);
      const { newPassword } = response;
      setNewPassword(newPassword);
      setPasswordModalVisible(true);
      notification.success({
        message: 'Sucesso!',
        description: 'Senha resetada com sucesso.',
      });
    } catch (error) {
      console.error('Erro ao resetar senha:', error);
      notification.error({
        message: 'Erro!',
        description: 'Não foi possível resetar a senha.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) return;

    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    if (!user) return;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleUnitChange = async (unitId: string) => {
    const selectedUnit = units.find((unit) => unit.id === unitId);

    if (!user || !selectedUnit) return;

    setUser((prevState) => ({
      ...prevState!,
      unit: selectedUnit,
      department: null,
    }));

    await fetchDepartments(unitId);
  };

  const handleDepartmentChange = (departmentId: string) => {
    const selectedDepartment = departments.find(
      (department) => department.id === departmentId,
    );

    if (!user || !selectedDepartment) return;

    setUser((prevState) => ({
      ...prevState!,
      department: selectedDepartment,
    }));
  };

  return (
    <StyledModal open={true} onCancel={onClose} footer={null}>
      {user ? (
        <Form layout="vertical">
          <Form.Item label="Nome">
            <Input name="name" value={user.name} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Username">
            <Input
              name="username"
              value={user.username}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Email">
            <Input name="email" value={user.email} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Tipo de Usuário">
            <Select
              style={{ width: '100%' }}
              value={user.role}
              onChange={(value) => handleSelectChange('role', value)}
              title="Tipo de Usuário"
              placeholder="Selecione o tipo de usuário"
            >
              <Option value="admin">Admin</Option>
              <Option value="analyst">Analista</Option>
              <Option value="user">Usuário</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Telefone">
            <Input
              name="phone_number"
              value={user.phone_number}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Ramal">
            <Input name="ramal" value={user.ramal} onChange={handleChange} />
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
              value={user.unit?.id || undefined}
              onChange={handleUnitChange}
              options={units.map((unit: Unit) => ({
                value: unit.id,
                label: unit.name,
              }))}
              notFoundContent={loadingUnits ? <Spin size="small" /> : null}
            />
          </Form.Item>
          <Form.Item label="Departamento">
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
              value={user.department?.name || undefined}
              onChange={handleDepartmentChange}
              options={departments.map((department: Department) => ({
                value: department.id,
                label: department.name,
              }))}
              notFoundContent={
                loadingDepartments ? <Spin size="small" /> : null
              }
              disabled={!user.unit}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleUpdate} loading={loading}>
              Atualizar
            </Button>
            <Button
              type="primary"
              onClick={handleResetPassword}
              style={{ marginLeft: '10px' }}
              loading={loading}
            >
              Resetar Senha
            </Button>
            <Button
              danger
              onClick={handleDelete}
              loading={loading}
              style={{ marginLeft: '10px' }}
            >
              Deletar
            </Button>
            <StyledModal
              open={passwordModalVisible}
              cancelButtonProps={{ style: { display: 'none' } }}
              okButtonProps={{ style: { display: 'none' } }}
              closeIcon={null}
            >
              <Form layout="vertical">
                <Form.Item label="Nome">
                  <Input value={user?.name} readOnly />
                </Form.Item>
                <Form.Item label="Nova Senha">
                  <Input.Password value={newPassword ?? ''} readOnly />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    onClick={() => setPasswordModalVisible(false)}
                    style={{ width: '100%' }}
                  >
                    OK
                  </Button>
                </Form.Item>
              </Form>
            </StyledModal>
          </Form.Item>
        </Form>
      ) : (
        <Spin size="large" />
      )}
    </StyledModal>
  );
};

export default UserPopup;
