import React, { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components/native';
import { Button } from '../../../components/Button';
import { Separator } from '../../../components/Separator';
import { Text } from '../../../components/Text';
import useSignInNavigation from '../../../hooks/useSignInNavigation';


import {
 Container,
 Person,
 ContainerColumn
} from './styles';

export function OnBoarding(){

  const {spacing} = useTheme()
  const {height} = useWindowDimensions() // Pega a dimensão da janela do app.
  const {bottom, top} = useSafeAreaInsets() // Pega o tamanho do notch do celular e do bottom
  const navigation = useSignInNavigation(); // Custom hook criado para não ter ficar tipando toda hora o use navigation
  
  /**
   * States
   */
  
  const [heightPerson, setHeightPerson] = useState(0)


  /**
   * Callbacks
   * Cálculo de tamanho da imagem de acordo com o tamanho da tela.
   */
  const HandleHeightToPerson = (heightContainerBox : number) => {
    const freeSpace = height - (heightContainerBox + top + bottom + 120)
    setHeightPerson(freeSpace)
  }

  const handleNavigateToAcessScreen = () => navigation.navigate('access')

return (
   <Container>
    <Separator height={spacing.sm} />
    <Person icon='doctor' size={heightPerson} />
    <ContainerColumn onLayout={e => HandleHeightToPerson(e.nativeEvent.layout.height)}>
      <Separator height={spacing.md} />
      <Text typography='h4'>Bem vindo ao {'\n'}
        <Text typography='h3'>
          Vacinadex
        </Text>
      </Text>
      <Separator height={spacing.xxl} />
      <Text typography='subTitle1'>Sua carteira digital de vacinação de maneira fácil e prática de carregar!</Text>
    <Separator height={spacing.xxxl} />
    <Button onPress={handleNavigateToAcessScreen} color='primary'>Começar</Button>
    <Separator height={spacing.md} />
    </ContainerColumn>
   </Container>
  );
}