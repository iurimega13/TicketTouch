import React, { useState } from 'react';
import { Form as AntForm,  Button as AntButton, notification } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Container, LogoContainer, Title, ButtonContainer, StyledCheckbox, ForgotPassword, ErrorMessage, OuterContainer, StyledInput, StyledPasswordInput } from './styles'; 
import { useNavigate } from 'react-router-dom';
import loginImage from '../../assets/logo.png';
import { CheckboxChangeEvent } from 'antd/es/checkbox/Checkbox';
import Cookies from 'js-cookie';
import { getUserSettings, loginUser } from '../../services/api'; // Importa a função loginUser
import light from '../../styles/themes/light'; // Importa o tema light
import dark from '../../styles/themes/dark'; // Importa o tema dark
import { useTheme } from 'styled-components'; // Importa o hook useTheme

interface LoginProps {
  onLoginSuccess: () => void;
  setTheme: (theme: any) => void; // Adiciona a função setTheme como prop
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, setTheme }) => {
  const [rememberMe, setRememberMe] = useState(false); // Estado para controlar a opção "Lembrar-me"
  const [message, setMessage] = useState(''); // Estado para armazenar mensagens de erro
  const [hasError, setHasError] = useState(false); // Estado para controlar se há erro nos campos
  const navigate = useNavigate(); // Hook para navegação entre rotas
  const theme = useTheme(); // Hook para acessar o tema atual

  const handleSubmit = async (values: any) => {
    const { username, password } = values; // Obtém username e password do formulário
  
    try {
      const data = await loginUser(username, password); // Chama a função loginUser
  
      notification.success({
        message: 'Autenticação bem-sucedida',
        description: 'Login realizado com sucesso',
        placement: 'top',
        style: {
          backgroundColor: theme.colors.successBackground,
          color: theme.colors.successText,
        },
      });

      // Verifica se a resposta inclui o ID do usuário
      if (data.user && data.user.id) {
        localStorage.setItem('userId', data.user.id); // Armazena o ID do usuário
      } else {
        throw new Error('ID do usuário não encontrado na resposta'); // Lança erro se o ID não estiver presente
      }
  
      // Lógica para armazenar o token de autenticação
      if (rememberMe) {
        Cookies.set('accessToken', data.accessToken, { expires: 7 }); // Armazena o token em cookies por 7 dias
      } else {
        sessionStorage.setItem('accessToken', data.accessToken); // Armazena o token no sessionStorage
        const currentTime = new Date();
        const expireTime = new Date(currentTime.getTime() + 30 * 60 * 1000).getTime();
        sessionStorage.setItem('expireTime', expireTime.toString()); // Armazena o tempo de expiração
      }
  
      const userSettings = await getUserSettings(); // Busca as configurações do usuário
      setTheme(userSettings.theme === 'dark' ? dark : light); // Altera o tema baseado nas configurações
  
      onLoginSuccess(); // Chama a função de sucesso no login
      navigate('/home'); // Redireciona para a página inicial
    } catch (error) {
      console.error('Erro de autenticação:', error); // Log de erro
      setMessage('Nome de usuário ou senha incorretos'); // Mensagem de erro para o usuário
      setHasError(true); // Define que há erro nos campos
      notification.error({
        message: 'Erro de autenticação',
        description: 'Nome de usuário ou senha incorretos',
        placement: 'top',
        style: {
          backgroundColor: theme.colors.errorBackground,
          color: theme.colors.errorText,
        },
      });
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
            <StyledInput prefix={<UserOutlined />} placeholder="Nome de usuário" hasError={hasError} />
          </AntForm.Item>
          <AntForm.Item 
            name="password" 
            rules={[{ required: true, message: 'Por favor, insira sua senha!' }]} // Validação da senha
          >
            <StyledPasswordInput
              prefix={<LockOutlined />}
              placeholder="Senha"
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} // Ícones de visibilidade da senha
              hasError={hasError}
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