import React from 'react';
import { Unit } from '../types';
import { Card, CardTitle, CardContent, CardButton } from './styles';

interface UnitCardProps {
  unit: Unit;
  onDetailsClick: (unitId: string) => void;
}

const UnitCard: React.FC<UnitCardProps> = ({ unit, onDetailsClick }) => {
  return (
    <Card>
      <CardTitle>
        <p>Nome: {unit.name}</p>
      </CardTitle>
      <CardButton>
        <button onClick={() => onDetailsClick(unit.id)}>Detalhes</button>
      </CardButton>
    </Card>
  );
};

export default UnitCard;