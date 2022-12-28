import { NavigationHelpersContext, useNavigation } from '@react-navigation/native';
import { format, isBefore } from 'date-fns';
import React, { useMemo } from 'react';
import {Pressable, View} from 'react-native';
import { useTheme } from 'styled-components/native';
import useConvertDose from '../../hooks/useConvertDose';
import {Icon} from '../Icon';
import {Separator} from '../Separator';
import {Text} from '../Text';

import styles, {BadgeLeft, Chip, ChipWrap, Container, TitleContainer, VaccineDate} from './styles';
import { VaccineCardProps } from './types';

export function VaccineCard({vaccine}: VaccineCardProps) {

  const {colors} = useTheme();
  const {navigate} = useNavigation<SignedInStackNavigatorProps>();
  const dose = useConvertDose({shot: vaccine.dose})

  const isBeforeToday = useMemo(() => {
    return isBefore(new Date(vaccine.nextApplicationDate), new Date())
  }, [vaccine])

  const formattedDate = useMemo(() => {
    return format(new Date(vaccine.nextApplicationDate), 'dd/MM/yy')
  },[vaccine])

  const handleNavigateToVaccineDetail = () => navigate('VaccineDetail', {vaccine})


  return (
    <Pressable style={styles.shadow} onPress={handleNavigateToVaccineDetail}>
      <Container>
        <BadgeLeft color={isBeforeToday ? colors.lightGreen.main : colors.orange.main} />
        <TitleContainer>
          <Text typography="body2" numberOfLines={1}>{vaccine.name}</Text>
          <Separator height={18} />
          <ChipWrap>
            <Chip color={dose.color}>
              <Text color='background'>{dose.title}</Text>
            </Chip>
          </ChipWrap>
        </TitleContainer>
        <VaccineDate>
          <Icon icon="calendar" size={20} />
          <Separator width={12} />
          <Text>{formattedDate}</Text>
        </VaccineDate>
      </Container>
    </Pressable>
  );
}
