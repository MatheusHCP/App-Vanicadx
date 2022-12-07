import React, {useRef} from 'react';
import { InputValueRef } from '../../components/Input/types';
import { Text } from '../../components/Text';
import { Alert } from 'react-native'
import { TouchableOpacity } from 'react-native'

import {
 Container
} from './styles';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../components/Button';

export default function Home(){

  const navigation = useNavigation()
  const refEmail = useRef<InputValueRef>({value: ''});
  const refPassword = useRef<InputValueRef>({value: ''});

  const handlePress = () => {
    Alert.alert(refEmail.current?.value || 'Não tinha email', refPassword.current?.value || 'Não Tinha password')
  }

  const handleScren = () => navigation.navigate('Profile')

return (
   <Container>
    <Button onPress={handleScren}>
      Texto
    </Button>
   </Container>
  );
}