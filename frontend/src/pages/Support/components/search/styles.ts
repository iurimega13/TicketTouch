import styled from 'styled-components';
import { Button, Select } from 'antd';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden; 
`;


export const SortButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.primary} !important;
  color: ${(props) => props.theme.colors.text} !important;
  width: 100%;
  &:hover {
    background-color: ${(props) => props.theme.colors.secondary} !important;
  }

  &.active {
    background-color: ${(props) => props.theme.colors.tertiary} !important;
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;



export const StyledSelect = styled(Select)`
  width: 100%;
`;
