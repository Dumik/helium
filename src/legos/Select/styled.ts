import styled from 'styled-components/native';

export const SelectStyled = styled.View<{ width?: number }>`
  width: ${({ width }: any) => (width ? `${width}px` : '160px')};
  border-style: solid;
  border-color: #5c62d4;
  border-width: 1px;
  padding-top: 12px;
  padding-bottom: 12px;
  border-radius: 8px;
  background-color: white;
`;
