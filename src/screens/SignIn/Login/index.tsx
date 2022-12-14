import React from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Button } from '../../../components/Button';
import {HeaderOptions} from '../../../components/HeaderOptions';
import {Icon} from '../../../components/Icon';
import Input from '../../../components/Input';
import { Separator } from '../../../components/Separator';
import {Text} from '../../../components/Text';
import useSignInNavigation from '../../../hooks/useSignInNavigation';

import {Container, AccessText, PressableX} from './styles';

export function Login() {

  const {spacing} = useTheme()
  const navigation = useSignInNavigation();


  /**
   * Callbacks
   */

  const handleGoBack= () => navigation.goBack();

  return (
    <Container>
      <StatusBar barStyle={"dark-content"} />
      <HeaderOptions
        left={
          <PressableX onPress={handleGoBack}>
            <Icon icon="close" size={15} />
          </PressableX>
        }
        right={
          <Text typography="body3" color="primary">
            Esqueci minha senha
          </Text>
        }
      />
      <Separator height={spacing.md} />
      <Text typography='h3' >Login</Text>
      <Separator height={spacing.md} />
      <Input label='Email' icon='check' iconColor='primary'/>
      <Input label='Senha' secureTextEntry iconColor='primary' />
      <Separator height={spacing.md} />
      <Button>Login</Button>
      <Separator height={spacing.md} />
      <AccessText typography='body3' color='surface500'>ou acesse com login social</AccessText>
      <Separator height={spacing.md} />
      <Button mode='outlined' typography='caption' icon={<Icon icon='apple'/>} color='secondary'>Continuar com a Apple</Button>
      <Separator height={spacing.md} />
      <Button mode='outlined' typography='caption' icon={<Icon icon='google'/>} color='secondary'>Continuar com o Google</Button>
      <Separator height={spacing.md} />
    </Container>
  );
}
