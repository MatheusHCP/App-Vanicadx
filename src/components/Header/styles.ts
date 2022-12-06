import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({theme}) => theme.colors.primary.main};
  border-width: 4px;
  border-color: ${({theme}) => theme.colors.secondary.main};
  padding: 10px;
  border-radius: 4px;

`;

export const Title = styled.Text`
  color: ${({theme}) => theme.colors.primary.onMain};
  font-size: 20px;
`;

export const Name = styled(Title)`
  font-size: 40px;
`;