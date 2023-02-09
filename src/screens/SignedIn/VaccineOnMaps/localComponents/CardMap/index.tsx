import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components/native';
import { Separator } from '../../../../../components/Separator';
import { Text } from '../../../../../components/Text';

import {
 Container, ContainerDescription, ImageLocal
} from './styles';
import { CardMapProps } from './types';

export function CardMap({distance, image, title} : CardMapProps){

  const {bottom} = useSafeAreaInsets()
  const {spacing} = useTheme();

return (
   <Container bottom={bottom}>
    <ImageLocal source={image}/>
    <Separator  width={spacing.sm}/>
    <ContainerDescription>
      <Text typography='overline'>{title}</Text>
      <Separator width={spacing.sm} />
      <Text>{distance}</Text>
    </ContainerDescription>
   </Container>
  );
}