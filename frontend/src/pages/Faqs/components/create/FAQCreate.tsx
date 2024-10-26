// src/components/FAQCreate.tsx
import React, { useState, useRef } from 'react';
import { notification } from 'antd'; 
import { CreateForm, FormContainer, ActionButton, StyledLabel, Textarea } from './styles';
import { createFAQ } from '../../../../services/api';

const FAQCreate: React.FC = () => {
  const initialFAQState = {
    question: '',
    answer: ''
  };

  const [newFAQ, setNewFAQ] = useState(initialFAQState);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Ajusta automaticamente a altura do textarea
  const autoResizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset para calcular a altura
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`; // Ajusta altura até um limite de 200px
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewFAQ(prevState => ({
      ...prevState,
      [name]: value
    }));

    if (e.target.name === 'answer') {
      autoResizeTextarea();
    }
  };

  const validateForm = () => {
    return newFAQ.question !== '' && newFAQ.answer !== '';
  };

  const handleCreateFAQ = async () => {
    if (!validateForm()) {
      notification.error({
        message: 'Erro',
        description: 'Por favor, preencha todos os campos',
        placement: 'top',
      });
      return;
    }

    try {
      await createFAQ(newFAQ.question, newFAQ.answer);
      notification.success({
        message: 'Sucesso',
        description: 'FAQ criada com sucesso',
        placement: 'top',
      });
      setNewFAQ(initialFAQState); 
    } catch (error) {
      console.error('Erro ao criar FAQ:', error);
      notification.error({
        message: 'Erro',
        description: 'Erro ao criar FAQ',
        placement: 'top',
      });
    }
  };

  return (
    <FormContainer>
      <CreateForm>
        <StyledLabel>Pergunta</StyledLabel>
        <input
          type="text"
          name="question"
          value={newFAQ.question}
          onChange={handleInputChange}
          title="Pergunta"
          placeholder="Digite a pergunta"
        />
        <StyledLabel>Resposta</StyledLabel>
        <Textarea
          name="answer"
          ref={textareaRef}
          value={newFAQ.answer}
          onChange={handleInputChange}
          title="Resposta"
          placeholder="Digite a resposta"
        />
        <ActionButton onClick={handleCreateFAQ}>
          Criar Nova FAQ
        </ActionButton>
      </CreateForm>
    </FormContainer>
  );
};

export default FAQCreate;
