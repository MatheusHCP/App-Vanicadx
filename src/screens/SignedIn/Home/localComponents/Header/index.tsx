import React from 'react';
import useAuth from '../../../../../hooks/useAuth';
import headerImage from '../../../../../assets/images/Header.png'

import {
  Avatar,
 Container,
 Row
} from './styles';
import { Text } from '../../../../../components/Text';
import { View } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Separator } from '../../../../../components/Separator';


export function Header(){
  const {spacing} = useTheme()
  const {user} = useAuth()

return (
   <Container source={headerImage}>
    <Row>
      <View>
        <Text color='background' typography='h5'>Bem-vindx</Text>
        <Text color='background' typography='h6'>{user?.firstName}</Text>
      </View>
      <Avatar source={{uri: user?.avatar}} />
    </Row>
    <Separator height={spacing.xs} />
   </Container>
  );
}