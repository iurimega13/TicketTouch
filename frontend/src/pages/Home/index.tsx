import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, GridItem, StyledButton, StyledCard } from './styles';
import chamadosImage from '../../assets/chamados.png';
import faqsImage from '../../assets/FAQS.png';
import Meta from 'antd/es/card/Meta';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateToTickets = () => {
    navigate('/tickets');
  };

  const handleNavigateToFaqs = () => {
    navigate('/faqs');
  };

  return (
    <Container>
      <Grid>
        <GridItem>
          <StyledCard
            cover={
              <img
                alt="Incidente e Solicitação de Serviço"
                src={chamadosImage}
              />
            }
            actions={[
              <StyledButton type="primary" onClick={handleNavigateToTickets}>
                Ver Chamados
              </StyledButton>,
            ]}
          >
            <Meta
              title="Incidente e Solicitação de Serviço"
              description="Incidentes reportam falhas que afetam o funcionamento normal dos serviços, enquanto solicitações de serviço envolvem pedidos de novos recursos, acessos ou mudanças. Entre e escolha a opção que melhor se encaixa na sua necessidade."
            />
          </StyledCard>
        </GridItem>
        <GridItem>
          <StyledCard
            cover={<img alt="FAQs" src={faqsImage} />}
            actions={[
              <StyledButton type="primary" onClick={handleNavigateToFaqs}>
                Ver FAQs
              </StyledButton>,
            ]}
          >
            <Meta
              title="FAQs"
              description="Descubra como as FAQs podem facilitar sua experiência. Saiba mais sobre as Perguntas Frequentes e encontre respostas rápidas e objetivas para dúvidas comuns, otimizando seu tempo e simplificando o acesso às informações mais importantes."
            />
          </StyledCard>
        </GridItem>
      </Grid>
    </Container>
  );
};

export default Home;
