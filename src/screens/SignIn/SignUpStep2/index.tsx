import React, {useMemo} from 'react';
import {useTheme} from 'styled-components/native';
import useSignInNavigation from '../../../hooks/useSignInNavigation';
import {Container} from './styles';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {schemaSignupStep2} from './validations';
import {StatusBar, useWindowDimensions, ScrollView} from 'react-native';
import {HeaderOptions} from '../../../components/HeaderOptions';
import {Text} from '../../../components/Text';
import {Separator} from '../../../components/Separator';
import Input from '../../../components/Input';
import {Button} from '../../../components/Button';
// @ts-ignore
import ProgressBar from 'react-native-progress/Bar';
import {BackButton} from '../../../components/BackButton';
import {SignUpStep2SignInStackRouteProp} from '../../../@types/routes/SignIn/SignInStackNavigator';
import useAuth from '../../../hooks/useAuth';
import {AvoidKeyboard} from '../../../components/AvoidKeyboard';

export function SignUpStep2({route}: {route: SignUpStep2SignInStackRouteProp}) {
  const {spacing, colors} = useTheme();
  const navigation = useSignInNavigation();
  const {width} = useWindowDimensions();
  const params = route.params;

  /**
   * Hooks
   */

  const {signUp, loading} = useAuth();

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
    resolver: yupResolver(schemaSignupStep2),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  /**
   * Memos
   */

  const widthProgressBar = useMemo(() => {
    const PressableXWidth = 35;
    const centerHeaderOptionWidth = spacing.md * 3;
    const marginScreenWidth = spacing.md * 2;
    const value =
      width - (marginScreenWidth + PressableXWidth + centerHeaderOptionWidth);
    return value;
  }, [width, spacing]);

  /**
   * Callbacks
   */

  const handleGoBack = () => navigation.goBack();

  const onSubmit = async (data: {
    password: string;
    confirmPassword: string;
  }) => {
    await signUp({
      email: params.email,
      password: data.password,
      firstName: params.firstName,
      lastName: params.lastName,
    });
  };

  return (
    <AvoidKeyboard>
      <Container>
        <ScrollView showsVerticalScrollIndicator={false}>
          <StatusBar barStyle={'dark-content'} translucent backgroundColor="transparent"/>
          <HeaderOptions
            left={<BackButton icon="back" onPress={handleGoBack} />}
            center={<Separator width={spacing.md} />}
            right={
              <ProgressBar
                progress={1}
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
          <Text typography="caption" color="surface100">
            Sua senha precisa ter pelo menos {'\n'}8 caracteres
          </Text>
          <Separator height={spacing.md} />
          <Controller
            control={control}
            name="password"
            render={({field: {onBlur, onChange, value, ref}}) => (
              <Input
                ref={ref}
                autoCapitalize="none"
                autoComplete="password"
                onChange={onChange}
                returnKeyType="next"
                onSubmitEditing={() => {
                  setFocus('confirmPassword')
                }}
                onChangeText={text => setValue('password', text)}
                value={value}
                onBlur={onBlur}
                label="Senha"
                secureTextEntry
                iconColor="primary"
                error={errors.password?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="confirmPassword"
            render={({field: {onBlur, onChange, value, ref}}) => (
              <Input
                ref={ref}
                autoCapitalize="none"
                autoComplete="password"
                onChange={onChange}
                returnKeyType="done"
                onSubmitEditing={handleSubmit(onSubmit)}
                onChangeText={text => setValue('confirmPassword', text)}
                value={value}
                onBlur={onBlur}
                label="Confirmar senha"
                secureTextEntry
                iconColor="primary"
                error={errors.confirmPassword?.message}
              />
            )}
          />
          <Separator height={spacing.md} />
          <Button
            onPress={handleSubmit(onSubmit)}
            loading={loading}
            disabled={loading}>
            Continuar
          </Button>
          <Separator height={spacing.md} />
        </ScrollView>
      </Container>
    </AvoidKeyboard>
  );
}
