import React, { useEffect, useState } from 'react';
import apiService from '../../../services/api';
import { Container, ModalContent, ActionButton } from './styles';

interface User {
  name: string;
  email: string;
  created_at: string;
  role: string;
  permissions: string[];
}

const UserPopup: React.FC<{ userId: string; onClose: () => void }> = ({ userId, onClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const result = await apiService.getUserProfile(userId);
        setUser(result);
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleDelete = async () => {
    try {
      await apiService.deleteUser(userId);
      alert('Usuário excluído com sucesso.');
      onClose();
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
    }
  };

  return (
    <Container>
      <ModalContent>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          user && (
            <div>
              <h2>{user.name}</h2>
              <p>Email: {user.email}</p>
              <p>Função: {user.role}</p>
              <p>Data de Criação: {user.created_at}</p>
              <ActionButton onClick={onClose}>Fechar</ActionButton>
              <ActionButton onClick={handleDelete}>Excluir</ActionButton>
            </div>
          )
        )}
      </ModalContent>
    </Container>
  );
};

export default UserPopup;
