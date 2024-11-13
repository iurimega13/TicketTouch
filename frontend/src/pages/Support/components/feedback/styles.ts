import styled from 'styled-components';
import { Modal } from 'antd';

export const StyledFeedbackModal = styled(Modal)`
  user-select: none;

  .ant-modal-content {
    background-color: ${(props) => props.theme.colors.secundary};
    color: ${(props) => props.theme.colors.textbackground};
  }

  .ant-modal-header {
    background-color: ${(props) => props.theme.colors.secondary};
    color: ${(props) => props.theme.colors.textbackground};
  }

  .ant-modal-footer {
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.textbackground};
  }

  .ant-modal-title {
    color: ${(props) => props.theme.colors.textbackground};
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

  .ant-form-item-label > label {
   align-items: center;
   
    color: ${(props) => props.theme.colors.text};
  }

  .ant-form-item {
    color: ${(props) => props.theme.colors.textAlt};
  }

  p {
    color: ${(props) => props.theme.colors.textAlt};
    background-color: ${(props) => props.theme.colors.text};
    border-radius: 5px;
    padding: 5px;
    margin-top: 20px;
  }
  button {
  width: 100%;
  margin-top: 20px;
  }
  progress {
    margin-top: 10px;
    height: 20px;
  }

  .ant-rate-star-first,
  .ant-rate-star-second {
    color: ${(props) => props.theme.colors.primary};
  }
`;