import styled from 'styled-components/native';

export const ContainerAreaView = styled.SafeAreaView`
   flex: 1;
   background-color: ${({theme}) => theme.colors.background.main};
   padding: 20px;
`;