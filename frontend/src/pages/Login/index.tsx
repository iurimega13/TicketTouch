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
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    const { username, password } = values;

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

      if (rememberMe) {
        // Armazenar o token em cookies com expiração de 7 dias
        Cookies.set('accessToken', data.accessToken, { expires: 7 });
      } else {
        // Armazenar o token no sessionStorage e configurar expiração de 30 minutos
        sessionStorage.setItem('accessToken', data.accessToken);
        const expireTime = new Date().getTime() + 30 * 60 * 1000; // 30 minutos em milissegundos
        sessionStorage.setItem('expireTime', expireTime.toString());
      }

      onLoginSuccess();
      navigate('/home');
    } catch (error) {
      setMessage('Nome de usuário ou senha incorretos');
    }
  };

  return (
    <OuterContainer>
      <LogoContainer>
        <img src={loginImage} alt="Login" />
      </LogoContainer>

      <Container>
        <Title>Login</Title>
        <AntForm onFinish={handleSubmit}>
          <AntForm.Item name="username" rules={[{ required: true, message: 'Por favor, insira seu nome de usuário!' }]}>
            <AntInput prefix={<UserOutlined />} placeholder="Nome de usuário" />
          </AntForm.Item>
          <AntForm.Item name="password" rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}>
            <AntInput.Password
              prefix={<LockOutlined />}
              placeholder="Senha"
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </AntForm.Item>
          <AntForm.Item>
            <StyledCheckbox checked={rememberMe} onChange={(e: CheckboxChangeEvent) => setRememberMe(e.target.checked)}>
              Lembrar-me
            </StyledCheckbox>
          </AntForm.Item>
          <ButtonContainer>
            <AntButton type="primary" htmlType="submit">
              Entrar
            </AntButton>
          </ButtonContainer>
          <ForgotPassword>
            <a href="/forgot-password">Esqueceu a senha?</a>
          </ForgotPassword>
        </AntForm>
        {message && (
          <ErrorMessage>
            <div className="ErrorMessage">{message}</div>
          </ErrorMessage>
        )}
      </Container>
    </OuterContainer>
  );
};

export default Login;
