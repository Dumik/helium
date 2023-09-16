import styled from 'styled-components/native';

export const SelectStyled = styled.View<{
  width?: number;
  bgColor?: string;
  paddingTop?: number;
  paddingBottom?: number;
}>`
  width: ${({ width }: any) => (width ? `${width}px` : '160px')};
  border-style: solid;
  border-color: #5c62d4;
  border-width: 1px;
  padding-top: ${({ paddingTop }: any) =>
    paddingTop ? `${paddingTop}px` : '12px'};
  padding-bottom: ${({ paddingBottom }: any) =>
    paddingBottom ? `${paddingBottom}px` : '12px'};
  border-radius: 8px;
  background-color: ${({ bgColor }: any) => (bgColor ? bgColor : 'white')};
`;
