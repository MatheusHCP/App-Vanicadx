import styled from 'styled-components/native';
import { Icon } from '../../../components/Icon';

export const Container = styled.SafeAreaView`
   flex: 1;
   padding-left: ${({theme}) => theme.spacing.md}px;
   padding-right: ${({theme}) => theme.spacing.md}px;
   justify-content: space-between;
   background-color: ${({theme}) => theme.colors.background.main};
`;

export const ContainerColumn = styled.View`
`;

export const Person = styled(Icon)`
   align-self: center;
`;