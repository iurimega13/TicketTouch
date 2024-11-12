import styled, { createGlobalStyle } from 'styled-components';
import { Button, Table } from 'antd';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

export const StyledTable = styled(Table)`
  .ant-table {
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
  }

  .ant-table-tbody > tr > td {
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
  }

  .ant-table-pagination {
    .ant-pagination-item-active {
      border-color: ${(props) => props.theme.colors.primary};
    }

    .ant-pagination-item-link {
      color: ${(props) => props.theme.colors.primary};
    }
  }
`;

export const GlobalStyle = createGlobalStyle`
  :where(.css-dev-only-do-not-override-ccdg5a).ant-table-wrapper .ant-table-thead > tr > th, 
  :where(.css-dev-only-do-not-override-ccdg5a).ant-table-wrapper .ant-table-tbody >tr >th, :where(.css-dev-only-do-not-override-ccdg5a).ant-table-wrapper .ant-table-tbody >tr >td  {
    position: relative;
    color: ${(props) => props.theme.colors.text} !important;
    background: ${(props) => props.theme.colors.secundary} !important;
    border-color: ${(props) => props.theme.colors.primary} !important;
    headerSplitColor: ${(props) => props.theme.colors.primary} !important;
  }
`;

export const StyledDiv = styled.div`
  .ant-btn-primary {
    background-color: ${(props) => props.theme.colors.primary};
    border-color: ${(props) => props.theme.colors.primary};

    &:hover {
      background-color: ${(props) => props.theme.colors.secondary} !important;
    }

    &.active {
      background-color: ${(props) => props.theme.colors.tertiary} !important;
    }
  }
`;

export const StyledButton = styled(Button)`
  width: 100%;
  padding: 16px;
  background-color: ${(props) => props.theme.colors.primary} !important;
  color: ${(props) => props.theme.colors.text} !important;

  &:hover {
    background-color: ${(props) => props.theme.colors.secundary} !important;
  }

  &.active {
    background-color: ${(props) => props.theme.colors.tertiary} !important;
  }
`;
