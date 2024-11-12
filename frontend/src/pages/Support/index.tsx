import React, { useState } from 'react';
import { Tabs, Spin } from 'antd';
import { MainContainer, LoadingContainer, StyledTabs } from './styles';
import TicketSearch from './components/search/TicketSearch';

const { TabPane } = Tabs;

const Support: React.FC = () => {
  const [loading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('incident');

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  return (
    <MainContainer>
      {loading && (
        <LoadingContainer>
          <Spin size="large" />
        </LoadingContainer>
      )}
      {!loading && (
        <StyledTabs defaultActiveKey="incident" onChange={handleTabChange}>
          <TabPane tab="Incidentes" key="incident">
            <TicketSearch type={activeTab} />
          </TabPane>
          <TabPane tab="Solicitações" key="serviceRequest">
            <TicketSearch type={activeTab} />
          </TabPane>
          <TabPane tab="Atendimentos" key="myTickets">
            <TicketSearch type={activeTab} />
          </TabPane>
        </StyledTabs>
      )}
    </MainContainer>
  );
};

export default Support;