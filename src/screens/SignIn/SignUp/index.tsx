import React, { useMemo } from 'react';
import {useTheme} from 'styled-components/native';
import useSignInNavigation from '../../../hooks/useSignInNavigation';
import {Container, PressableX} from './styles';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {schemaSignup} from './validations';
import {StatusBar, useWindowDimensions, ScrollView} from 'react-native';
import {HeaderOptions} from '../../../components/HeaderOptions';
import {Icon} from '../../../components/Icon';
import {Text} from '../../../components/Text';
import {Separator} from '../../../components/Separator';
import Input from '../../../components/Input';
import {Button} from '../../../components/Button';
import ProgressBar from 'react-native-progress/Bar'
import { BackButton } from '../../../components/BackButton';
import { AvoidKeyboard } from '../../../components/AvoidKeyboard';

export function SignUp() {
  const {spacing, colors} = useTheme();
  const navigation = useSignInNavigation();
  const {width} = useWindowDimensions()

  /**
   * Forms
   */

  const {
    control,
    handleSubmit,
    setValue,
    setFocus,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schemaSignup),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
    },
  });

  /**
   * Memos
   */

    const widthProgressBar = useMemo(() => {
      const PressableXWidth = 35;
      const centerHeaderOptionWidth = spacing.md * 3
      const marginScreenWidth = spacing.md * 2
      const value = width - (marginScreenWidth + PressableXWidth + centerHeaderOptionWidth)
      return value
    }, [width, spacing])

  /**
   * Callbacks
   */

  const handleGoBack = () => navigation.goBack();

  const onSubmit = data => navigation.navigate('signUpStep2', data);

  return (
    <AvoidKeyboard>
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
      <StatusBar barStyle={'dark-content'} translucent backgroundColor="transparent"/>
      <HeaderOptions
        left={
          <BackButton icon='close' onPress={handleGoBack}/>
        }
        center={<Separator width={spacing.md} />}
        right={
          <ProgressBar
            progress={0.5}
            color={colors.primary.main}
            unfilledColor={colors.surface50.main}
            borderWidth={0}
            height={6}
            width={widthProgressBar}
          />
        }
      />
      <Separator height={spacing.md} />
      <Text typography="h3">Cadastro</Text>
      <Separator height={spacing.md} />
      <Text typography='caption' color='surface100'>Informações pessoais</Text>
      <Separator height={spacing.md} />
      <Controller
        control={control}
        name="firstName"
        render={({field: {onBlur, onChange, value, ref}}) => (
          <Input
            ref={ref}
            onChange={onChange}
            onChangeText={text => setValue('firstName', text)}
            value={value}
            onBlur={onBlur}
            returnKeyType="next" // Return key type muda o estilo do botão de ENTER do teclado.
            onSubmitEditing={() => {
              setFocus('lastName')
            }}
            label="Nome"
            error={errors.firstName?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="lastName"
        render={({field: {onBlur, onChange, value, ref}}) => (
          <Input
            ref={ref}
            onChange={onChange}
            onChangeText={text => setValue('lastName', text)}
            value={value}
            onBlur={onBlur}
            returnKeyType="next"
            onSubmitEditing={() => {
              setFocus('email')
            }}
            label="Sobrenome"
            error={errors.lastName?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="email"
        render={({field: {onBlur, onChange, value, ref}}) => (
          <Input
            ref={ref}
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            onChange={onChange}
            onChangeText={text => setValue('email', text)}
            value={value}
            returnKeyType="done"
            onSubmitEditing={handleSubmit(onSubmit)}
            onBlur={onBlur}
            label="Email"
            error={errors.email?.message}
          />
        )}
      />
      <Separator height={spacing.md} />
      <Button onPress={handleSubmit(onSubmit)}>Continuar</Button>
      <Separator height={spacing.md} />
    </ScrollView>
    </Container>
    </AvoidKeyboard>
  );
}
