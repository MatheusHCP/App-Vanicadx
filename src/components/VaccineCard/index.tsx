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

export function VaccineCard({date, shot, title, onPress}: VaccineCardProps) {

  const {colors} = useTheme();
  const dose = useConvertDose({shot})

  const isBeforeToday = useMemo(() => {
    return isBefore(new Date(date), new Date())
  }, [date])

  const formattedDate = useMemo(() => {
    return format(new Date(date), 'dd/MM/yy')
  },[date])




  return (
    <Pressable style={styles.shadow} onPress={onPress}>
      <Container>
        <BadgeLeft color={isBeforeToday ? colors.lightGreen.main : colors.orange.main} />
        <TitleContainer>
          <Text typography="body2" numberOfLines={1}>{title}</Text>
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
