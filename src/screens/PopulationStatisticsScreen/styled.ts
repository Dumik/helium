import styled from 'styled-components/native';

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
  color: #555555;
`;
