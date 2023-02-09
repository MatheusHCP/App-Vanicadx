import {StackActions, useNavigation} from '@react-navigation/native';
import React, {useMemo, useState} from 'react';
import {Pressable, StatusBar, useWindowDimensions, ViewStyle} from 'react-native';
import {useTheme} from 'styled-components/native';
import {Icon} from '../../../components/Icon';
import {Separator} from '../../../components/Separator';
import {Text} from '../../../components/Text';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {Alert, ActivityIndicator} from 'react-native'

import {Container, Content, Scroll} from './styles';
import { getVaccines } from '../../../services/resource/vaccine';

export function Qrcode() {
  const {goBack, dispatch, navigate} = useNavigation();
  const {spacing, colors} = useTheme();
  const {height, width} = useWindowDimensions()
  const [loading, setLoading] = useState(false)
  const cameraStyle = useMemo(() => ({
    marginTop: 40,
    flex: 0,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: width * 0.7,
    width: width * 0.7,
  } as ViewStyle),[width, height])

  const HandleBarCodeOnQrCode = async (qrCodeValue : string) => {
    try {
      setLoading(true)
      const response = await getVaccines({
        barCode: qrCodeValue
      })
      if (response.length > 0) {
        dispatch(StackActions.popToTop());
        navigate('VaccineDetail', {vaccine: response[0]})
      }
      else{
        throw new Error('Vacina não encontrada')
      }
    } catch (err) {
      goBack();
      Alert.alert('Ops!', 'Não foi possível encontrar a vacina.')
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <Container>
      <Scroll>
        <Content>
        <StatusBar barStyle={'dark-content'} />
        <Separator height={spacing.md} />
        <Pressable onPress={goBack}>
          <Icon icon="close" size={15} />
        </Pressable>
        <Separator height={spacing.md} />
        <Text typography="h7">Ler QR Code</Text>
        <Separator height={spacing.sm} />
        <Text typography="caption">Posicione o código QR dentro da área</Text>
        <Separator height={spacing.xxxl} />
        </Content>
        {loading ? (
          <ActivityIndicator color={colors.primary.main} />
        ) : (
          <QRCodeScanner
            cameraStyle={cameraStyle}
            onRead={e => HandleBarCodeOnQrCode(e.data)}
            flashMode={RNCamera.Constants.FlashMode.torch}></QRCodeScanner>
        )}
      </Scroll>
    </Container>
  );
}
