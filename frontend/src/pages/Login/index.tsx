import React, { useState } from 'react';
import { Form as AntForm, Input as AntInput, Button as AntButton, Checkbox } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Container, Title, ButtonContainer } from './styles'; 
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    const { username, password } = values;
    console.log('Tentando login com:', username, password); // Log para depuração

    try {
      const response = await fetch('http://localhost:3001/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Falha na autenticação');
      }

      const data = await response.json();
      console.log('Login bem-sucedido', data); // Log para depuração

      // Armazene o token de acesso (você pode usar localStorage ou cookies)
      localStorage.setItem('accessToken', data.accessToken);

      // Atualize o estado de autenticação no App
      onLoginSuccess();

      // Redirecione para a página inicial
      console.log('Redirecionando para /home'); // Log para depuração
      navigate('/home');
    } catch (error) {
      console.error('Erro no login:', error); // Log para depuração
      setMessage('Nome de usuário ou senha incorretos');
    }
  };

  return (
    <Container>
      <div className="loginForm">
        <Title>Login</Title>
        <AntForm onFinish={handleSubmit} className="login-form">
          <AntForm.Item
            name="username"
            rules={[{ required: true, message: 'Por favor, insira seu nome de usuário!' }]}
          >
            <AntInput
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Nome de usuário"
            />
          </AntForm.Item>
          <AntForm.Item
            name="password"
            rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
          >
            <AntInput.Password
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Senha"
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              onClick={() => setPasswordVisible(!passwordVisible)}
            />
          </AntForm.Item>
          <ButtonContainer>
            <AntButton type="primary" htmlType="submit">
              Entrar
            </AntButton>
            <Checkbox className='rememberMe' checked={rememberMe} onChange={(e: CheckboxChangeEvent) => setRememberMe(e.target.checked)}>
              Lembrar-me
            </Checkbox>
          </ButtonContainer>
        </AntForm>
        {message && <p>{message}</p>}
      </div>
    </Container>
  );
};

export default Login;
