import styled from 'styled-components/native';
import { Text } from '../../../components/Text';

export const Container = styled.SafeAreaView`
   flex: 1;
   background-color: ${({theme}) => theme.colors.background.main};
   padding: 0 ${({theme}) => theme.spacing.md}px;
`;

export const AccessText = styled(Text)`

   align-self: center;
`;

export const PressableX = styled.Pressable`

   padding: ${({theme}) => theme.spacing.sm}px;
   
`;