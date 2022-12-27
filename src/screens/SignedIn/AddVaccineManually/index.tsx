import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Pressable, StatusBar} from 'react-native';
import {useTheme} from 'styled-components/native';
import {AvoidKeyboard} from '../../../components/AvoidKeyboard';
import {Button} from '../../../components/Button';
import { HeaderOptions } from '../../../components/HeaderOptions';
import {Icon} from '../../../components/Icon';
import Input from '../../../components/Input';
import {Separator} from '../../../components/Separator';
import {Text} from '../../../components/Text';
import {Select} from './localComponents/Select';

import {Container, ContainerSelect, Content, Scroll} from './styles';
import {HasSecondShot, HasSecondShotEnum} from './types';
import {schemaAddVaccineManually} from './validations';

export function AddVaccineManually() {
  const {goBack} = useNavigation();
  const {spacing} = useTheme();
  const [hasSecondShot, setHasSecondShot] = useState<HasSecondShot>(
    HasSecondShotEnum.YES,
  );

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
    resolver: yupResolver(schemaAddVaccineManually),
    defaultValues: {
      name: '',
      brand: '',
      applicationDate: '',
      applicationLocation: '',
      nextApplicationDate: '',
    },
  });

  const onSubmit = (dataForm: any) => console.log(dataForm);

  return (
    <AvoidKeyboard>
      <Container>
        <Scroll>
          <Content>
            <StatusBar barStyle={'dark-content'} translucent backgroundColor='transparent' />
            <HeaderOptions
              left={
                <Pressable onPress={goBack}>
                <Icon icon="close" size={15} />
              </Pressable>
              }
            />
            <Separator height={spacing.md} />
            <Text typography="h7">{`Adicione as informações\nda vacina`}</Text>
            <Separator height={spacing.lg} />
            <Controller
              control={control}
              name="name"
              render={({field: {name, onBlur, onChange, ref, value}}) => (
                <Input
                  ref={ref}
                  value={value}
                  onChange={onChange}
                  error={errors[name]?.message}
                  label="Nome da vacina"
                  onBlur={onBlur}
                  onFocus={() => setFocus(name)}
                  onChangeText={text => setValue(name, text)}
                  returnKeyType="next"
                  onSubmitEditing={() => setFocus('brand')}
                />
              )}
            />
            <Controller
              control={control}
              name="brand"
              render={({field: {name, onBlur, onChange, ref, value}}) => (
                <Input
                  ref={ref}
                  value={value}
                  onChange={onChange}
                  error={errors[name]?.message}
                  label="Marca da vacina"
                  onFocus={() => setFocus(name)}
                  onBlur={onBlur}
                  returnKeyType="next"
                  onSubmitEditing={() => setFocus('applicationDate')}
                  onChangeText={text => setValue(name, text)}
                />
              )}
            />
            <Controller
              control={control}
              name="applicationDate"
              render={({field: {name, onBlur, onChange, ref, value}}) => (
                <Input
                  ref={ref}
                  value={value}
                  onChange={onChange}
                  label="Data da aplicação"
                  error={errors[name]?.message}
                  onFocus={() => setFocus(name)}
                  onBlur={onBlur}
                  returnKeyType="next"
                  onSubmitEditing={() => setFocus('applicationLocation')}
                  onChangeText={text => setValue(name, text)}
                />
              )}
            />
            <Controller
              control={control}
              name="applicationLocation"
              render={({field: {name, onBlur, onChange, ref, value}}) => (
                <Input
                  ref={ref}
                  value={value}
                  onChange={onChange}
                  label="Local da aplicação"
                  error={errors[name]?.message}
                  onFocus={() => setFocus(name)}
                  onBlur={onBlur}
                  returnKeyType="next"
                  onChangeText={text => setValue(name, text)}
                />
              )}
            />
            <Separator height={spacing.md} />
            <Text color="surface600" typography="body3">
              Possui segunda dose?
            </Text>
            <Separator height={spacing.sm} />
            <ContainerSelect>
              <Select
                onPress={() => setHasSecondShot(HasSecondShotEnum.YES)}
                title="Sim"
                isSelected={hasSecondShot == HasSecondShotEnum.YES}
              />
              <Select
                onPress={() => setHasSecondShot(HasSecondShotEnum.NO)}
                title="Não"
                isSelected={hasSecondShot == HasSecondShotEnum.NO}
              />
              <Select
                onPress={() => setHasSecondShot(HasSecondShotEnum.SINGLE)}
                title="Dose única"
                isSelected={hasSecondShot == HasSecondShotEnum.SINGLE}
              />
            </ContainerSelect>
            {hasSecondShot == HasSecondShotEnum.YES && (
              <Controller
                control={control}
                name="nextApplicationDate"
                render={({field: {name, onBlur, onChange, ref, value}}) => (
                  <Input
                    ref={ref}
                    value={value}
                    onChange={onChange}
                    label="Data da próxima aplicação?"
                    error={errors[name]?.message}
                    onFocus={() => setFocus(name)}
                    onBlur={onBlur}
                    returnKeyType="done"
                    onSubmitEditing={handleSubmit(onSubmit)}
                    onChangeText={text => setValue(name, text)}
                  />
                )}
              />
            )}
            <Separator height={spacing.md} />
            <Button onPress={handleSubmit(onSubmit)}>Salvar</Button>
            <Separator height={spacing.lg} />
          </Content>
        </Scroll>
      </Container>
    </AvoidKeyboard>
  );
}
