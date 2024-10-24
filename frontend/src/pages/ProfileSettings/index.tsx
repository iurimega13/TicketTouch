import React, { useEffect, useState } from 'react';
import { Input, Form, Button, notification } from 'antd';
import {
  OuterContainer,
  Container,
  Title,
  SectionTitle,
  Grid,
  GridItem,
  Label,
  Info,
  ButtonContainer,
  StyledModal,
} from './styles';
import {
  getUserProfile,
  getUserSettings,
  updateUserSettings,
  changePassword,
} from '../../services/api';
import { useNavigate } from 'react-router-dom';

const ProfileSettings: React.FC = () => {
  const [user, setUser] = useState({ username: '', email: '' });
  const [settings, setSettings] = useState({
    notifications_settings: false,
    theme: 'light',
  });
  const [loading, setLoading] = useState(true);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [form] = Form.useForm();
  const redirectToLogin = useNavigate(); // Para redirecionar após o logout

  useEffect(() => {
    const fetchUserProfileAndSettings = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (userId) {
          const userProfile = await getUserProfile(userId);
          const userSettings = await getUserSettings();
          setUser(userProfile);
          setSettings(userSettings);
        } else {
          console.error('User ID não encontrado no localStorage');
        }
      } catch (error) {
        console.error(
          'Erro ao buscar perfil e configurações do usuário:',
          error,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfileAndSettings();
  }, []);

  const toggleNotifications = async () => {
    try {
      const updatedSettings = {
        ...settings,
        notifications_settings: !settings.notifications_settings,
      };
      await updateUserSettings(updatedSettings);
      setSettings(updatedSettings);
    } catch (error) {
      console.error('Erro ao atualizar configurações de notificações:', error);
    }
  };

  const changeTheme = async () => {
    try {
      const updatedSettings = {
        ...settings,
        theme: settings.theme === 'light' ? 'dark' : 'light',
      };
      await updateUserSettings(updatedSettings);
      setSettings(updatedSettings);
      window.location.reload(); // Recarrega a página para aplicar o novo tema
    } catch (error) {
      console.error('Erro ao atualizar tema:', error);
    }
  };

  // Função para validar a nova senha
  const validatePassword = (password: string) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar
    );
  };

  // Type guard para verificar se o erro tem uma resposta HTTP
  const isAxiosError = (error: any): error is { response: { status: number, data: { message: string } } } => {
    return error && error.response && typeof error.response.status === 'number';
  };

  // Função para mudar a senha
  const handleChangePassword = async (values: {
    currentPassword: string;
    newPassword: string;
  }) => {
    try {
      await changePassword(
        user.username,
        values.currentPassword,
        values.newPassword,
      );
      notification.success({
        message: 'Sucesso!',
        description: 'Senha alterada com sucesso. Faça login novamente.',
      });
      localStorage.removeItem('userId');
      redirectToLogin('/login');
    } catch (error) {
      console.error('Erro ao mudar senha:', error);

      if (isAxiosError(error)) {
        const errorMessage = error.response.data?.message || 'Erro ao alterar a senha.';
        notification.error({
          message: 'Erro!',
          description: errorMessage,
        });
      } else {
        notification.error({
          message: 'Erro!',
          description: 'Erro ao alterar a senha.',
        });
      }
    }
  };

  // Abrir o modal de alteração de senha
  const openPasswordModal = () => {
    setPasswordModalVisible(true);
  };

  // Fechar o modal
  const closePasswordModal = () => {
    setPasswordModalVisible(false);
    form.resetFields();
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <OuterContainer>
      <Container>
        <Title>Configurações de Perfil</Title>

        <SectionTitle>Perfil</SectionTitle>
        <Grid>
          <GridItem>
            <Label>Nome de Usuário:</Label>
            <Info>{user.username}</Info>
          </GridItem>
          <GridItem>
            <Label>Email:</Label>
            <Info>{user.email}</Info>
          </GridItem>
        </Grid>

        <SectionTitle>Configurações</SectionTitle>
        <Grid>
          <GridItem>
            <Label>Notificações:</Label>
            <Info>
              {settings.notifications_settings ? 'Ativadas' : 'Desativadas'}
            </Info>
            <ButtonContainer>
              <Button type="primary" onClick={toggleNotifications}>
                {settings.notifications_settings ? 'Desativar' : 'Ativar'}
              </Button>
            </ButtonContainer>
          </GridItem>
          <GridItem>
            <Label>Tema:</Label>
            <Info>{settings.theme === 'light' ? 'Claro' : 'Escuro'}</Info>
            <ButtonContainer>
              <Button type="primary" onClick={changeTheme}>
                Alterar Tema
              </Button>
            </ButtonContainer>
          </GridItem>
        </Grid>

        <SectionTitle>Segurança</SectionTitle>
        <Grid>
          <GridItem>
            <Label>Senha:</Label>
            <ButtonContainer>
              <Button type="primary" onClick={openPasswordModal}>
                Alterar Senha
              </Button>
            </ButtonContainer>
          </GridItem>
        </Grid>
      </Container>

      <StyledModal
        open={passwordModalVisible}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
        closeIcon={null}
      >
        <Form form={form} layout="vertical" onFinish={handleChangePassword}>
          <Form.Item
            name="currentPassword"
            label="Senha Atual"
            rules={[
              { required: true, message: 'Por favor, insira sua senha atual' },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="Nova Senha"
            rules={[
              { required: true, message: 'Por favor, insira a nova senha' },
              {
                validator(_, value) {
                  if (value && validatePassword(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      'A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.',
                    ),
                  );
                },
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirmar Nova Senha"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: 'Por favor, confirme sua nova senha' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('As senhas não coincidem!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Alterar Senha
            </Button>
            <Button
              danger
              onClick={() => closePasswordModal()}
              style={{ marginTop: '10px', width: '100%' }}
            >
              Cancelar
            </Button>
          </Form.Item>
        </Form>
      </StyledModal>
    </OuterContainer>
  );
};

export default ProfileSettings;
