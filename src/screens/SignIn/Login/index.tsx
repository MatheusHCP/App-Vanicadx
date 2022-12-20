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
import {useForm, Controller} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'

import {Container, AccessText, PressableX} from './styles';
import { schemaLogin } from './validations';
import { BackButton } from '../../../components/BackButton';

export function Login() {

  const {spacing} = useTheme()
  const navigation = useSignInNavigation();


    /**
   * Forms
   */

    const {
      control,
      handleSubmit,
      setValue,
      formState: {errors}
    } = useForm({
      resolver: yupResolver(schemaLogin),
      defaultValues: {
        email: '',
        password: ''
      }
    })


  /**
   * Callbacks
   */

  const handleGoBack = () => navigation.goBack();

  const onSubmit = () => {
    handleSubmit(({email, password}) => {
      console.log({email,password})
    })
  }


  return (
    <Container>
      <StatusBar barStyle={"dark-content"} />
      <HeaderOptions
        left={
          <BackButton icon='close' onPress={handleGoBack}/>
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
      <Controller
        control={control}
        name="email"
        render={({field: {onBlur, onChange, value, ref}}) => (
          <Input 
            ref={ref}
            autoCapitalize="none"
            autoComplete='email'
            keyboardType='email-address'
            onChange={onChange}
            onChangeText={text => setValue('email', text)}
            value={value}
            onBlur={onBlur}
            label='Email'
            icon='check'
            iconColor='primary'
            error={errors.email?.message}
          />
        )}
      />
            <Controller
        control={control}
        name="password"
        render={({field: {onBlur, onChange, value, ref}}) => (
          <Input 
            ref={ref}
            autoCapitalize="none"
            autoComplete='password'
            onChange={onChange}
            onChangeText={text => setValue('password', text)}
            value={value}
            onBlur={onBlur}
            label='Senha'
            secureTextEntry
            iconColor='primary'
            error={errors.password?.message}
          />
        )}
      />
      <Separator height={spacing.md} />
      <Button onPress={onSubmit}>Login</Button>
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
