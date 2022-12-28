import {useNavigation, useRoute} from '@react-navigation/native';
import { format } from 'date-fns';
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
        <Text typography="h7">Detalhes da vacina</Text>
        <Separator height={spacing.sm} />
        <Content>
          <RowVaccine>
            <LogoVaccine resizeMode='contain' source={{uri: randomImage}} />
            <Separator width={spacing.md} />
            <Text typography='subTitle2'>{vaccine.brand}</Text>
          </RowVaccine>
          <RowTextDetail>
            <Icon icon='vaccine' activeColor={colors.primary.main} size={24} />
            <Separator width={spacing.sm} />
            <Text typography='subTitle2' color="primary">Vacina</Text>
          </RowTextDetail>
          <RowTextDetail>
            <Text typography='caption'>{vaccine.name}</Text>
          </RowTextDetail>
          <RowTextDetail>
            <Icon icon='calendar' activeColor={colors.primary.main} size={24} />
            <Separator width={spacing.sm} />
            <Text typography='subTitle2' color="primary">Data da aplicação</Text>
          </RowTextDetail>
          <RowTextDetail>
            <Text typography='caption'>{format(new Date(vaccine.applicationDate), 'dd/MM/yyyy')}</Text>
          </RowTextDetail>
          <RowTextDetail>
            <Icon icon='location' activeColor={colors.primary.main} size={24} />
            <Separator width={spacing.sm} />
            <Text typography='subTitle2' color="primary">Local de aplicação</Text>
          </RowTextDetail>
          <RowTextDetail>
            <Text typography='caption'>{vaccine.place}</Text>
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
              value={vaccine.barCode}
            />
          </Center>
        </RowTextDetail>
        </Content>
        <Separator height={spacing.lg} />
      </ScrollView>
    </Container>
  );
}
