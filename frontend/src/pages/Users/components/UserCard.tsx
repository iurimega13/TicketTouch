import React from 'react';
import { Card } from 'antd';
import { User } from './types'; // Importar a interface User
import { CardContainer, CardButton } from './styles'; // Estilização

interface UserCardProps {
  user: User;
  onDetailsClick: (userId: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onDetailsClick }) => {
  return (
    <CardContainer>
      <Card title={user.name} bordered={false} style={{ backgroundColor: '#1890ff', color: '#fff' }}>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
        <p>Função: {user.role}</p>
        <CardButton onClick={() => onDetailsClick(user.id)}>Detalhes</CardButton>
      </Card>
    </CardContainer>
  );
};

export default UserCard;