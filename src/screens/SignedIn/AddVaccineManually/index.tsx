import {yupResolver} from '@hookform/resolvers/yup';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import {StackActions, useNavigation} from '@react-navigation/native';
import { format } from 'date-fns';
import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Alert, Pressable, StatusBar} from 'react-native';
import {useTheme} from 'styled-components/native';
import {AvoidKeyboard} from '../../../components/AvoidKeyboard';
import {Button} from '../../../components/Button';
import { HeaderOptions } from '../../../components/HeaderOptions';
import {Icon} from '../../../components/Icon';
import Input from '../../../components/Input';
import {Separator} from '../../../components/Separator';
import {Text} from '../../../components/Text';
import useAuth from '../../../hooks/useAuth';
import { createVaccine } from '../../../services/resource/vaccine';
import {Select} from './localComponents/Select';

import {Container, ContainerSelect, Content, Scroll} from './styles';
import {Fields, HasSecondShot, HasSecondShotEnum} from './types';
import {schemaAddVaccineManually} from './validations';

export function AddVaccineManually() {
  const {goBack, dispatch} = useNavigation();
  const {spacing, colors} = useTheme();
  const {user} = useAuth();

  const [hasSecondShot, setHasSecondShot] = useState<HasSecondShot>(
    HasSecondShotEnum.YES,
  );
  const [loading, setLoading] = useState(false)

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
      applicationDate: new Date().toISOString(),
      applicationLocation: '',
      nextApplicationDate: '',
    },
  });

  /**
   * Callbacks
   */

  const handleChangeDateField = (field: Fields, date: number) => {
    setValue(field, new Date(date).toISOString())
    if(field == 'nextApplicationDate'){
      setFocus('applicationLocation')
    }
  }

  const handleDatePickerAndroid = (field: Fields) => {
    DateTimePickerAndroid.open({
      value: new Date(),
      mode: 'date',
      is24Hour: true,
      onChange: e => {
        if(e.nativeEvent.timestamp){
          handleChangeDateField(field, e.nativeEvent.timestamp)
        }
      }
    })
  }

  const onSubmit = async ({name, brand, applicationLocation, applicationDate, nextApplicationDate}) => {
    if(!user?.id){
      return;
    }
    console.log({name, brand, applicationLocation, applicationDate, nextApplicationDate})
    try {
      setLoading(true);
      const dose = hasSecondShot == HasSecondShotEnum.YES ? 'second-dose' : 'single-dose'
      await createVaccine({
        dose,
        applicationDate,
        brand,
        name,
        place: applicationLocation,
        userID: user.id,
        ... (hasSecondShot == HasSecondShotEnum.YES && nextApplicationDate?{nextApplicationDate} : {nextApplicationDate: applicationDate})
      })
      
      dispatch(StackActions.popToTop());
    } catch (error) {
      Alert.alert('Ops', 'Não foi possível salvar a vacina, tente novamente.')
    }
    finally{
      setLoading(false);
    }
  };

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
            <Separator height={spacing.sm}/>
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
                  onSubmitEditing={() => handleDatePickerAndroid('applicationDate')}
                  onChangeText={text => setValue(name, text)}
                />
              )}
            />
            <Separator height={spacing.sm}/>
            <Controller
              control={control}
              name="applicationDate"
              render={({field: {name, onBlur, onChange, ref, value}}) => (
                <Pressable onPress={() => handleDatePickerAndroid('applicationDate')}>
                  <Input
                    ref={ref}
                    value={value ? format(new Date(value), 'dd/MM/yyyy') : ''}
                    onChange={onChange}
                    label="Data da aplicação"
                    error={errors[name]?.message}
                    onFocus={() => setFocus(name)}
                    editable={false}
                    onBlur={onBlur}
                    returnKeyType="next"
                    onSubmitEditing={() => setFocus('applicationLocation')}
                    onChangeText={text => setValue(name, text)}
                  />
                </Pressable>
              )}
            />
            <Separator height={spacing.sm}/>
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
              <>
              <Separator height={spacing.sm}/>
              <Controller
                control={control}
                name="nextApplicationDate"
                render={({field: {name, onBlur, onChange, ref, value}}) => (
                  <Pressable onPress={() => handleDatePickerAndroid('nextApplicationDate')}>
                    <Input
                      ref={ref}
                      value={value ? format(new Date(value), 'dd/MM/yyyy') : ''}
                      onChange={onChange}
                      label="Data da próxima aplicação?"
                      error={errors[name]?.message}
                      onFocus={() => setFocus(name)}
                      editable={false}
                      onBlur={onBlur}
                      returnKeyType="done"
                      onSubmitEditing={handleSubmit(onSubmit)}
                      onChangeText={text => setValue(name, text)}
                    />
                  </Pressable>
                )}
              />
              </>
            )}
            <Separator height={spacing.md} />
            <Button onPress={handleSubmit(onSubmit)} loading={loading}>Salvar</Button>
            <Separator height={spacing.lg} />
          </Content>
        </Scroll>
      </Container>
    </AvoidKeyboard>
  );
}
