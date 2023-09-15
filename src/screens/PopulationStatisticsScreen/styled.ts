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

export const SelectedContainerStyled = styled.View`
  flex-direction: row;
  justify-content: center;
  gap: 16px;
  margin-top: 20px;
`;

export const LoaderContainerStyled = styled.View`
  flex-direction: row;
  justify-content: center;
  gap: 16px;
  margin-top: 60px;
`;

export const StyledText = styled.Text<{ marginTop?: number }>`
  margin-top: ${({ marginTop }) => (marginTop ? `${marginTop}px` : '10px')};
  font-size: 24px;
  text-align: center;
`;
