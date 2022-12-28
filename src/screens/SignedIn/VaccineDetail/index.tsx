import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {Pressable, ScrollView} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {useTheme} from 'styled-components/native';
import { Center } from '../../../components/Center';
import {HeaderOptions} from '../../../components/HeaderOptions';
import {Icon} from '../../../components/Icon';
import {Separator} from '../../../components/Separator';
import { Text } from '../../../components/Text';
import { getRandomImageUnsplash } from '../../../constants/unsplash';
import useConvertDose from '../../../hooks/useConvertDose';

import {Container, Content, LogoVaccine, RowTextDetail, RowVaccine} from './styles';

export function VaccineDetail() {
  const {goBack} = useNavigation();
  const {params: {vaccine}} = useRoute<VaccineSignedInStackRouteProps>();
  const {spacing, colors} = useTheme();
  
  /**
   * Callbacks
   */
  
  const dose = useConvertDose({shot: vaccine.dose})

  /**
   * useMemos
   */
  const randomImage = useMemo(() => {
    return getRandomImageUnsplash(100)
  }, [])

  return (
    <Container>
      <HeaderOptions
        left={
          <Pressable onPress={goBack}>
            <Icon icon="close" size={15} />
          </Pressable>
        }
      />
        <Separator height={spacing.md} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text typography="h7">Detalhe da vacina</Text>
        <Separator height={spacing.sm} />
        <Content>
          <RowVaccine>
            <LogoVaccine resizeMode='contain' source={{uri: randomImage}} />
            <Separator width={spacing.md} />
            <Text typography='subTitle2'>{vaccine.name}</Text>
          </RowVaccine>
          <RowTextDetail>
            <Icon icon='vaccine' activeColor={colors.primary.main} size={24} />
            <Separator width={spacing.sm} />
            <Text typography='subTitle2' color="primary">Vacina</Text>
          </RowTextDetail>
          <RowTextDetail>
            <Text typography='caption'>HPV - Papilomavírus Humano</Text>
          </RowTextDetail>
          <RowTextDetail>
            <Icon icon='calendar' activeColor={colors.primary.main} size={24} />
            <Separator width={spacing.sm} />
            <Text typography='subTitle2' color="primary">Data da aplicação</Text>
          </RowTextDetail>
          <RowTextDetail>
            <Text typography='caption'>25/10/22</Text>
          </RowTextDetail>
          <RowTextDetail>
            <Icon icon='location' activeColor={colors.primary.main} size={24} />
            <Separator width={spacing.sm} />
            <Text typography='subTitle2' color="primary">Local de aplicação</Text>
          </RowTextDetail>
          <RowTextDetail>
            <Text typography='caption'>Unidade de saúde de familia Campos do Iguaçu - Foz do Iguaçu, PR</Text>
          </RowTextDetail>
          <RowTextDetail>
            <Icon icon='dose' activeColor={colors.primary.main} size={24} />
            <Separator width={spacing.sm} />
            <Text typography='subTitle2' color="primary">Dose</Text>
          </RowTextDetail>
          <RowTextDetail>
            <Text typography='caption'>{dose.title}</Text>
          </RowTextDetail>
        <Separator width={spacing.md} />
        <RowTextDetail>
          <Center>
            <QRCode
              value='123123132321'
            />
          </Center>
        </RowTextDetail>
        </Content>
        <Separator height={spacing.lg} />
      </ScrollView>
    </Container>
  );
}
