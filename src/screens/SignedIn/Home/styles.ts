import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

export const Container = styled.ScrollView`
   flex: 1;
`;

export const ScrollViewItems = styled.ScrollView`

   padding: ${({theme}) => theme.spacing.md}px;

`;