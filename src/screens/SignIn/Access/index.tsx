
import React from 'react';
import { StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components/native';
import splashImage from '../../../assets/images/splash/splashscreen.png';
import { Button } from '../../../components/Button';
import { Separator } from '../../../components/Separator';
import { Text } from '../../../components/Text';
import useSignInNavigation from '../../../hooks/useSignInNavigation';


import {
 Container,
 ContainerRounded,
 IconRoundedVaccine,
 IconVaccine,
 Column
} from './styles';

export function Access(){
  const {bottom} = useSafeAreaInsets()
  const {spacing} = useTheme()
  const navigation = useSignInNavigation()

  /**
   * Callback
   */

  const handleNavigateToLogin = () => navigation.navigate('Login')
  const handleNavigateToSignUp = () => navigation.navigate('signUp')

return (
   <Container source={splashImage}>
    <StatusBar barStyle={'light-content'}  translucent backgroundColor="transparent" />
    <Column>
      <IconRoundedVaccine>
        <IconVaccine icon='vaccine' size={80} />
      </IconRoundedVaccine>
      <Separator height={spacing.md} />
      <Text typography='h2' color='background' >Vacinadex</Text>
    </Column>
    <ContainerRounded>
    <Separator height={spacing.xl} />
      <Text typography='h4'>Bem vindo</Text>
    <Separator height={spacing.sm} />
      <Text typography='subTitle1'>Acesse ao app</Text>
    <Separator height={spacing.xxl} />
      <Button onPress={handleNavigateToLogin}>Login</Button>
    <Separator height={spacing.lg} />
      <Button mode='outlined' onPress={handleNavigateToSignUp}>Cadastro</Button>
    <Separator height={bottom + spacing.xxxl} />
    </ContainerRounded>
   </Container>
  );
}