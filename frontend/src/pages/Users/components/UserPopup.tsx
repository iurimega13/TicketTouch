import React, { useState, useEffect } from 'react';
import { Modal, Input, Button, Form } from 'antd';
import { getUserProfile, updateUser, deleteUser } from '../../../services/api'; // Ajustar importação
import { User } from './types'; // Importar a interface User

interface UserPopupProps {
  userId: string;
  onClose: () => void;
}

const UserPopup: React.FC<UserPopupProps> = ({ userId, onClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserProfile(userId); // Ajustar função
        setUser(userData);
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleUpdate = async () => {
    if (!user) return;

    setLoading(true);
    try {
      await updateUser(userId, user);
      onClose();
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteUser(userId);
      onClose();
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
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

  return (
    <Modal visible={true} onCancel={onClose} footer={null}>
      {user ? (
        <Form layout="vertical">
          <Form.Item label="Nome">
            <Input name="name" value={user.name} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Username">
            <Input name="username" value={user.username} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Email">
            <Input name="email" value={user.email} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Função">
            <Input name="role" value={user.role} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Telefone">
            <Input name="phone_number" value={user.phone_number} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Ramal">
            <Input name="ramal" value={user.ramal} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Unidade">
            <Input name="unit" value={user.unit} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Departamento">
            <Input name="department" value={user.department} onChange={handleChange} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleUpdate} loading={loading}>
              Atualizar
            </Button>
            <Button danger onClick={handleDelete} loading={loading} style={{ marginLeft: '10px' }}>
              Deletar
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <p>Carregando...</p>
      )}
    </Modal>
  );
};

export default UserPopup;