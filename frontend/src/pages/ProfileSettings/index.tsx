import React, { useEffect, useState } from 'react';
import { OuterContainer, Container, Title, SectionTitle, Grid, GridItem, Label, Info, ButtonContainer } from './styles';
import { getUserProfile, getUserSettings, updateUserSettings } from '../../services/api';
import { Button } from 'antd';

const ProfileSettings: React.FC = () => {
  const [user, setUser] = useState({ username: '', email: '' });
  const [settings, setSettings] = useState({ notifications_settings: false, theme: 'light' });
  const [loading, setLoading] = useState(true);

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
        console.error('Erro ao buscar perfil e configurações do usuário:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfileAndSettings();
  }, []);

  const toggleNotifications = async () => {
    try {
      const updatedSettings = { ...settings, notifications_settings: !settings.notifications_settings };
      await updateUserSettings(updatedSettings);
      setSettings(updatedSettings);
    } catch (error) {
      console.error('Erro ao atualizar configurações de notificações:', error);
    }
  };

  const changeTheme = async () => {
    try {
      const updatedSettings = { ...settings, theme: settings.theme === 'light' ? 'dark' : 'light' };
      await updateUserSettings(updatedSettings);
      setSettings(updatedSettings);
      window.location.reload(); // Recarrega a página para aplicar o novo tema
    } catch (error) {
      console.error('Erro ao atualizar tema:', error);
    }
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
            <Info>{settings.notifications_settings ? 'Ativadas' : 'Desativadas'}</Info>
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
              <Button type="primary" onClick={changeTheme}>Alterar Tema</Button>
            </ButtonContainer>
          </GridItem>
        </Grid>

        <SectionTitle>Segurança</SectionTitle>
        <Grid>
          <GridItem>
            <Label>Senha:</Label>
            <ButtonContainer>
              <Button type="primary">Alterar Senha</Button>
            </ButtonContainer>
          </GridItem>
        </Grid>
      </Container>
    </OuterContainer>
  );
};

export default ProfileSettings;