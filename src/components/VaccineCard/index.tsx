import { format, isBefore } from 'date-fns';
import React, { useMemo } from 'react';
import {Pressable, View} from 'react-native';
import { useTheme } from 'styled-components/native';
import {Icon} from '../Icon';
import {Separator} from '../Separator';
import {Text} from '../Text';

import styles, {BadgeLeft, Chip, ChipWrap, Container, VaccineDate} from './styles';
import { VaccineCardProps } from './types';

export function VaccineCard({date, shot, title, onPress}: VaccineCardProps) {

  const {colors} = useTheme();

  const isBeforeToday = useMemo(() => {
    return isBefore(new Date(date), new Date())
  }, [date])

  const formattedDate = useMemo(() => {
    return format(new Date(date), 'dd/MM/yy')
  },[date])

  const dose = useMemo(() => {
    switch (shot) {
      case 'first-dose':
        return{
          color: colors.primary.main,
          title: '1ª dose'
        }    
      case 'second-dose':
        return{
          color: colors.orange.main,
          title: '2ª dose'
        }    
      default:
        return{
          color: colors.secondary.main,
          title: 'Dose única'
        }    
    }
  }, [shot])


  return (
    <Pressable style={styles.shadow} onPress={onPress}>
      <Container>
        <BadgeLeft color={isBeforeToday ? colors.lightGreen.main : colors.orange.main} />
        <View>
          <Text typography="body2">{title}</Text>
          <Separator height={18} />
          <ChipWrap>
            <Chip color={dose.color}>
              <Text color='background'>{dose.title}</Text>
            </Chip>
          </ChipWrap>
        </View>
        <VaccineDate>
          <Icon icon="calendar" size={20} />
          <Separator width={12} />
          <Text>{formattedDate}</Text>
        </VaccineDate>
      </Container>
    </Pressable>
  );
}
