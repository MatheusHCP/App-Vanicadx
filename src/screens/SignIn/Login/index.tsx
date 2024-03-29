import React from 'react';
import {StatusBar, Platform, ScrollView, Alert} from 'react-native';
import {useTheme} from 'styled-components/native';
import {Button} from '../../../components/Button';
import {HeaderOptions} from '../../../components/HeaderOptions';
import {Icon} from '../../../components/Icon';
import Input from '../../../components/Input';
import {Separator} from '../../../components/Separator';
import {Text} from '../../../components/Text';
import useSignInNavigation from '../../../hooks/useSignInNavigation';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Container, AccessText} from './styles';
import {schemaLogin} from './validations';
import {BackButton} from '../../../components/BackButton';
import useAuth from '../../../hooks/useAuth';
import {RequestSignInData} from '../../../services/resource/auth/types';
import {AvoidKeyboard} from '../../../components/AvoidKeyboard';

export function Login() {
  const {spacing} = useTheme();
  const navigation = useSignInNavigation();

  /**
   * Hooks
   */

  const {loading, signIn, signInApple, checkifExistUser, signUp} = useAuth();

  /**
   * Forms
   */

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
    setFocus,
  } = useForm({
    resolver: yupResolver(schemaLogin),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  /**
   * Callbacks
   */

  const handleGoBack = () => navigation.goBack();

  async function onSubmit(data: RequestSignInData) {
    await signIn(data);
  }

  async function handleGoogleButton() {
    try {
      const {user} = await GoogleSignin.signIn();

      const hasUser = await checkifExistUser({
        email: user.email
      })
      if(hasUser){
        await signIn({
          email: user.email
        })
      }
      else{
        await signUp({ // Verificação pra caso retorne null, vai ser incrementado um objeto vazio, caso tenha algo vai criar o objeto.
          ...(user.photo?{avatar: user.photo} : {}),
          ...(user.email?{email: user.email} : {}),
          ...(user.givenName?{firstName: user.givenName} : {}),
          ...(user.familyName?{lastName: user.familyName} : {})
        })
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Ops!', "Ocorreu um erro ao realizar o login.")
    }
  }

  return (
    <AvoidKeyboard>
      <Container>
        <StatusBar
          barStyle={'dark-content'}
          translucent
          backgroundColor="transparent"
        />
        <HeaderOptions
          left={<BackButton icon="close" onPress={handleGoBack} />}
          right={
            <Text typography="body3" color="primary">
              Esqueci minha senha
            </Text>
          }
        />
        <Separator height={spacing.md} />
        <ScrollView showsVerticalScrollIndicator={false} >
          <Text typography="h3">Login</Text>
          <Separator height={spacing.md} />
          <Controller
            control={control}
            name="email"
            render={({field: {onBlur, onChange, value, ref, name}}) => (
              <Input
                ref={ref}
                autoCapitalize="none"
                autoComplete="email"
                keyboardType="email-address"
                onChange={onChange}
                onChangeText={text => setValue(name, text)}
                value={value}
                onBlur={onBlur}
                returnKeyType="next" // Return key type muda o estilo do botão de ENTER do teclado.
                onSubmitEditing={() => setFocus('password')}
                label="Email"
                icon="check"
                iconColor="primary"
                error={errors.email?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({field: {onBlur, onChange, value, ref, name}}) => (
              <Input
                ref={ref}
                autoCapitalize="none"
                autoComplete="password"
                onChange={onChange}
                onChangeText={text => setValue(name, text)}
                value={value}
                onBlur={onBlur}
                returnKeyType="done" // Return key type muda o estilo do botão de ENTER do teclado.
                onSubmitEditing={handleSubmit(onSubmit)}
                label="Senha"
                secureTextEntry
                iconColor="primary"
                error={errors.password?.message}
              />
            )}
          />
          <Separator height={spacing.md} />
          <Button
            onPress={handleSubmit(onSubmit)}
            disabled={loading}
            testID="button-login-email"
            loading={loading}>
            Login
          </Button>
          <Separator height={spacing.md} />
          <AccessText typography="body3" color="surface500">
            ou acesse com login social
          </AccessText>
          {Platform.OS == 'ios' && (
            <>
              <Separator height={spacing.md} />
              <Button
                mode="outlined"
                typography="caption"
                icon={<Icon icon="apple" />}
                color="secondary">
                Continuar com a Apple
              </Button>
            </>
          )}
          <Separator height={spacing.md} />
          <Button
            mode="outlined"
            typography="caption"
            onPress={handleGoogleButton}
            icon={<Icon icon="google" />}
            color="secondary">
            Continuar com o Google
          </Button>
          <Separator height={spacing.xxl} />
        </ScrollView>
      </Container>
    </AvoidKeyboard>
  );
}
