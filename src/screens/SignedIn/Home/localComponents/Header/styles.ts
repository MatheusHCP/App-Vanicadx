import { ImageBackgroundProps } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.ImageBackground.attrs(({theme}) => ({
  imageStyle: {borderBottomLeftRadius: theme.borders.radius.sm, borderBottomRightRadius: theme.borders.radius.sm}
}))`
   height: 181px;
   padding: ${({theme}) => theme.spacing.md}px;
   justify-content: flex-end;
   border-radius: 20px;
`;

export const Avatar = styled.Image`
  height: 70px;
  width: 70px;
  border-radius: 35px;
`;

export const Row = styled.View`

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

`