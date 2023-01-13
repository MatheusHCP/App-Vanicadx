import {useNavigation} from '@react-navigation/native';
import {format, isBefore} from 'date-fns';
import React, {useMemo, useEffect} from 'react';
import {useWindowDimensions} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {useTheme} from 'styled-components/native';
import useConvertDose from '../../hooks/useConvertDose';
import {Icon} from '../Icon';
import {Separator} from '../Separator';
import Shadow from '../Shadow';
import {Text} from '../Text';

import {
  BadgeLeft,
  Chip,
  ChipWrap,
  Container,
  TitleContainer,
  VaccineDate,
} from './styles';
import {VaccineCardProps} from './types';

export function VaccineCard({vaccine, index = 0}: VaccineCardProps) {
  const {colors} = useTheme();
  const {navigate} = useNavigation<SignedInStackNavigatorProps>();
  const dose = useConvertDose({shot: vaccine.dose});
  const window = useWindowDimensions();

  /**
   * Reanimated
   */

  const translateX = useSharedValue(window.width);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value, // ----> translateX.value go out of the screen.
        },
      ],
    };
  });

  const isBeforeToday = useMemo(() => {
    return isBefore(new Date(vaccine.nextApplicationDate), new Date());
  }, [vaccine]);

  const formattedDate = useMemo(() => {
    return format(new Date(vaccine.nextApplicationDate), 'dd/MM/yy');
  }, [vaccine]);

  const handleNavigateToVaccineDetail = () =>
    navigate('VaccineDetail', {vaccine});

  /**
   * useEffect
   */

  useEffect(() => {
    setTimeout(() => {
      translateX.value = withSpring(0); // Animação de elastico ao vir o componente
    }, index * 300);
  }, [translateX, index]);

  return (
    <Animated.View style={animatedStyle}>
      <Shadow onPress={handleNavigateToVaccineDetail}>
        <Container>
          <BadgeLeft
            color={isBeforeToday ? colors.lightGreen.main : colors.orange.main}
          />
          <TitleContainer>
            <Text typography="body2" numberOfLines={1}>
              {vaccine.name}
            </Text>
            <Separator height={18} />
            <ChipWrap>
              <Chip color={dose.color}>
                <Text color="background">{dose.title}</Text>
              </Chip>
            </ChipWrap>
          </TitleContainer>
          <VaccineDate>
            <Icon icon="calendar" size={20} />
            <Separator width={12} />
            <Text>{formattedDate}</Text>
          </VaccineDate>
        </Container>
      </Shadow>
    </Animated.View>
  );
}
