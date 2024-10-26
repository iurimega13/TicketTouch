import React from 'react';
import { Card, CardTitle, CardContent, CardButton, CardContainer } from './styles';

interface FAQCardProps {
  question: string;
  answer: string;
  onDetailsClick: () => void;
}

const FAQCard: React.FC<FAQCardProps> = ({ question, answer, onDetailsClick }) => {
  const userRole = localStorage.getItem('userRole') as 'admin' | 'analyst' | 'user';

  return (
    <CardContainer>
      <Card>
        <CardTitle>
          <p>{question}</p>
        </CardTitle>
        <CardContent>
          <p>{answer}</p>
        </CardContent>
        {userRole !== 'user' && ( 
          <CardButton>
            <button onClick={onDetailsClick}>Detalhes</button>
          </CardButton>
        )}
      </Card>
    </CardContainer>
  );
};

export default FAQCard;