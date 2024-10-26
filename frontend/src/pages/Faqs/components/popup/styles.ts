import styled from 'styled-components';
import { Modal } from 'antd';

export const StyledModal = styled(Modal)`
  .ant-modal-content {
    background-color: ${(props) => props.theme.colors.secundary};
    color: ${(props) => props.theme.colors.textAlt};
  }

  .ant-modal-header {
    background-color: ${(props) => props.theme.colors.secondary};
    color: ${(props) => props.theme.colors.textAlt};
  }

  .ant-modal-footer {
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.textAlt};
  }

  .ant-modal-title {
    color: ${(props) => props.theme.colors.textAlt};
  }

  .ant-btn-primary {
    background-color: ${(props) => props.theme.colors.primary};
    border-color: ${(props) => props.theme.colors.primary};

    &:hover {
      background-color: ${(props) => props.theme.colors.secundary} !important;
    }

    &.active {
      background-color: ${(props) => props.theme.colors.tertiary} !important;
    }
  }

  .ant-btn-danger {
    background-color: ${(props) => props.theme.colors.danger};
    border-color: ${(props) => props.theme.colors.danger};
  }

  .ant-input {
    background-color: ${(props) => props.theme.colors.inputBackground};
    color: ${(props) => props.theme.colors.textAlt};
  }
`;
