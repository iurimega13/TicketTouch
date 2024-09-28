import React, { useState } from 'react';
import { Form as AntForm, Input as AntInput, Button as AntButton } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Container, LogoContainer, Title, ButtonContainer, StyledCheckbox, ForgotPassword, ErrorMessage, OuterContainer } from './styles'; 
import { useNavigate } from 'react-router-dom';
import loginImage from '../../assets/logo.png';
import { CheckboxChangeEvent } from 'antd/es/checkbox/Checkbox';
import Cookies from 'js-cookie';

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [rememberMe, setRememberMe] = useState(false); // Estado para controlar a opção "Lembrar-me"
  const [message, setMessage] = useState(''); // Estado para armazenar mensagens de erro
  const navigate = useNavigate(); // Hook para navegação entre rotas

  const handleSubmit = async (values: any) => {
    const { username, password } = values; // Desestruturação dos valores do formulário

    try {
      const response = await fetch('http://localhost:3001/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }), // Envio dos dados para autenticação
      });

      // Verifica se a resposta da API não foi bem-sucedida
      if (!response.ok) {
        throw new Error('Falha na autenticação');
      }

      const data = await response.json(); // Conversão da resposta para JSON

      // Verifica se a resposta inclui o ID do usuário
      if (data.user && data.user.id) {
        // Armazenar o ID do usuário no localStorage
        localStorage.setItem('userId', data.user.id); // Armazena o ID no localStorage
      } else {
        throw new Error('ID do usuário não encontrado na resposta');
      }

      // Lógica para armazenar o token de autenticação
      if (rememberMe) {
        Cookies.set('accessToken', data.accessToken, { expires: 7 }); // Armazena o token em cookies por 7 dias
      } else {
        sessionStorage.setItem('accessToken', data.accessToken); // Armazena o token no sessionStorage
        const expireTime = new Date().getTime() + 30 * 60 * 1000; // Define expiração para 30 minutos
        sessionStorage.setItem('expireTime', expireTime.toString()); // Armazena o tempo de expiração
      }

      onLoginSuccess(); // Chama a função de sucesso no login
      navigate('/home'); // Redireciona para a página inicial
    } catch (error) {
      console.error('Erro de autenticação:', error); // Log de erro
      setMessage('Nome de usuário ou senha incorretos'); // Mensagem de erro para o usuário
    }
  };

  return (
    <OuterContainer>
      <LogoContainer>
        <img src={loginImage} alt="Login" />
      </LogoContainer>

      <Container>
        <Title>Login</Title>
        <AntForm onFinish={handleSubmit}> {/* Chama handleSubmit ao submeter o formulário */}
          <AntForm.Item 
            name="username" 
            rules={[{ required: true, message: 'Por favor, insira seu nome de usuário!' }]} // Validação do nome de usuário
          >
            <AntInput prefix={<UserOutlined />} placeholder="Nome de usuário" />
          </AntForm.Item>
          <AntForm.Item 
            name="password" 
            rules={[{ required: true, message: 'Por favor, insira sua senha!' }]} // Validação da senha
          >
            <AntInput.Password
              prefix={<LockOutlined />}
              placeholder="Senha"
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} // Ícones de visibilidade da senha
            />
          </AntForm.Item>
          <AntForm.Item>
            <StyledCheckbox 
              checked={rememberMe} 
              onChange={(e: CheckboxChangeEvent) => setRememberMe(e.target.checked)} // Controla a opção "Lembrar-me"
            >
              Lembrar-me
            </StyledCheckbox>
          </AntForm.Item>
          <ButtonContainer>
            <AntButton type="primary" htmlType="submit"> {/* Botão de envio do formulário */}
              Entrar
            </AntButton>
          </ButtonContainer>
          <ForgotPassword>
            <a href="/forgot-password">Esqueceu a senha?</a> {/* Link para recuperação de senha */}
          </ForgotPassword>
        </AntForm>
        {message && ( // Exibe mensagem de erro se existir
          <ErrorMessage>
            <div className="ErrorMessage">{message}</div>
          </ErrorMessage>
        )}
      </Container>
    </OuterContainer>
  );
};

export default Login;
