import React, { useState, useEffect } from 'react';
import { Department } from '../types';
import { Card, CardTitle, CardContent, CardButton } from './styles';
import { getUnitProfile } from '../../../../services/api'; // Importe sua função de API para obter a unidade

interface DepartmentCardProps {
  department: Department;
  onDetailsClick: (departmentId: string) => void;
}

const DepartmentCard: React.FC<DepartmentCardProps> = ({ department, onDetailsClick }) => {
  const [unitName, setUnitName] = useState<string>(''); // Estado para armazenar o nome da unidade

  useEffect(() => {
    const fetchUnit = async () => {
      if (department.unit_id) { // Verifique se o ID da unidade existe
        try {
          const unitData = await getUnitProfile(department.unit_id); // Chama a API para buscar a unidade
          if (unitData && unitData.name) {
            setUnitName(unitData.name); // Atualiza o estado com o nome da unidade
          } else {
            setUnitName('Nome da unidade não disponível'); // Mensagem padrão se o nome não estiver presente
          }
        } catch (error) {
          console.error('Erro ao buscar unidade:', error); // Log do erro caso a API falhe
          setUnitName('Erro ao buscar unidade'); // Define mensagem de erro
        }
      } else {
        console.warn('ID da unidade não está definido'); // Log se não houver ID da unidade
      }
    };

    fetchUnit();
  }, [department.unit_id]); // Chama a função toda vez que o ID da unidade muda

  return (
    <Card>
      <CardTitle>
        <p>Nome: {department.name}</p>
      </CardTitle>
      <CardContent>
        <p>Unidade: {unitName || 'Carregando...'}</p> {/* Mostra 'Carregando...' enquanto busca */}
      </CardContent>
      <CardButton>
        <button onClick={() => onDetailsClick(department.id)}>Detalhes</button>
      </CardButton>
    </Card>
  );
};

export default DepartmentCard;
