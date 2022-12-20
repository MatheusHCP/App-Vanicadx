import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

export const Container = styled(SafeAreaView)`
   flex: 1;
   background-color: ${({theme}) => theme.colors.background.main};
   padding: 0 ${({theme}) => theme.spacing.md}px;

`;

export const PressableX = styled.Pressable`

   padding: ${({theme}) => theme.spacing.sm}px;
   
`;