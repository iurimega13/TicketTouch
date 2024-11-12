import React from 'react';
import { Breakpoint, Table } from 'antd';
import { TicketData } from '../../../../types/types';
import { StyledDiv, StyledButton, GlobalStyle, MainContainer} from './styles';

interface TicketTableComponentProps {
  tickets: TicketData[];
  handleDetailsClick: (ticket: TicketData) => void;
}

const TicketTable: React.FC<TicketTableComponentProps> = ({
  tickets,
  handleDetailsClick,
}) => {
  const columns = [
    {
      title: 'Título',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Descrição',
      dataIndex: 'description',
      key: 'description',
      responsive: ['md'] as Breakpoint[], 
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Ações',
      key: 'action',
      render: (_: any, record: TicketData) => (
        <MainContainer>
        <StyledDiv>
      <GlobalStyle />
          <StyledButton
            type="primary"
            onClick={() => handleDetailsClick(record)}
            style={{ marginRight: '10px' }}
          >
            Detalhes
          </StyledButton>
        </StyledDiv>
        </MainContainer>
      ),
    },
  ];

  return <Table columns={columns} dataSource={tickets} rowKey="id" />;
};

export default TicketTable;