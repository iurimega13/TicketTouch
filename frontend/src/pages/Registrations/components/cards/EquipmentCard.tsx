import React, { useEffect } from 'react';
import { Equipment } from '../types';
import { Card, CardTitle, CardContent, CardButton } from './styles';

interface EquipmentCardProps {
  equipment: Equipment;
  onDetailsClick: (equipmentId: string) => void;
}

const EquipmentCard: React.FC<EquipmentCardProps> = ({ equipment, onDetailsClick }) => {
  useEffect(() => {
  }, [equipment]);

  return (
    <Card>
      <CardTitle>
        <p>Nome: {equipment.name}</p>
      </CardTitle>
      <CardContent>
        <p>Descrição: {equipment.description}</p>
        <p>Compartilhado: {equipment.is_shared ? 'Sim' : 'Não'}</p>
      </CardContent>
      <CardButton>
        <button onClick={() => onDetailsClick(equipment.id)}>Detalhes</button>
      </CardButton>
    </Card>
  );
};

export default EquipmentCard;