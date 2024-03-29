import styled from 'styled-components/native';

export const Container = styled.View`
   padding: 0 ${({theme}) => theme.spacing.md}px;
   flex: 1;
`;

export const Content = styled.View`
   background-color: ${({theme}) => theme.colors.background.main};
   padding: ${({theme}) => theme.spacing.xl}px ${({theme}) => theme.spacing.md}px;
   border-radius: ${({theme}) => theme.borders.radius.sm}px;

`;

export const LogoVaccine = styled.Image`
   height: 80px;
   width: 80px;
   border-radius: ${({theme}) => theme.borders.radius.sm}px;

`;

export const RowVaccine = styled.View`
   flex-direction: row;
   padding: ${({theme}) => theme.spacing.md}px;
   max-width: 80%;
   align-items: center;
`;

export const RowTextDetail = styled.View`
   flex-direction: row;
   padding: ${({theme}) => theme.spacing.md}px ${({theme}) => theme.spacing.sm}px;
   align-items: center;
`;