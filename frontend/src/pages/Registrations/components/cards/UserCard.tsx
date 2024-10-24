import React from 'react';
import { User } from '../types';
import { Card, CardTitle, CardContent, CardButton } from './styles';

interface UserCardProps {
  user: User;
  onDetailsClick: (userId: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onDetailsClick }) => {
  return (
    <Card>
      <CardTitle>
        <p>Nome: {user.name}</p>
      </CardTitle>
      <CardContent>
        <p>Usuario: {user.username}</p>
        <p>Perfil: {user.role}</p>
        <p>E-mail: {user.email}</p>
      </CardContent>
      <CardButton>
        <button onClick={() => onDetailsClick(user.id)}>Detalhes</button>
      </CardButton>
    </Card>
  );
};

export default UserCard;