import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, StatusBar } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Icon } from '../../../components/Icon';
import { Separator } from '../../../components/Separator';
import { Text } from '../../../components/Text';

import {
  Card,
 Container,
 RowCard
} from './styles';

export function AddVaccine(){
  const {goBack, navigate} = useNavigation();
  const {spacing} = useTheme();


  const handleGoToQrCode = () => navigate('qrCode')

return (
   <Container>
    <StatusBar barStyle={'dark-content'} />
    <Separator height={spacing.md}/>
    <Pressable onPress={goBack}>
      <Icon icon='back' size={15} />
    </Pressable>
    <Separator height={spacing.md}/>
    <Text typography='h7'>Adicionar vacinas</Text>
    <Separator height={spacing.sm}/>
    <Text typography='caption'>{`Gostaria de adicionar por meio de\nqual método?`}</Text>
    <Separator height={spacing.lg}/>
      <Pressable onPress={handleGoToQrCode}>
        <Card>
          <RowCard>
            <Icon icon='qrcode' size={22} />
            <Separator width={spacing.md}/>
            <Text typography='caption'>Leitura de código QR</Text>
          </RowCard>
          <Icon icon='arrowRight' size={12}/>
        </Card>
      </Pressable>
      <Separator height={spacing.md}/>
      <Card>
        <RowCard>
          <Icon icon='lapis' size={22} />
          <Separator width={spacing.md}/>
          <Text typography='caption'>Inserção manual</Text>
        </RowCard>
        <Icon icon='arrowRight' size={12}/>
      </Card>
    <Separator height={spacing.md}/>
   </Container>
  );
}