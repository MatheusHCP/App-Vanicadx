import React from 'react';
import { Pressable } from 'react-native';
import { Icon } from '../../../../../components/Icon';
import { Separator } from '../../../../../components/Separator';
import { Text } from '../../../../../components/Text';

import {
  Circle,
 Container,
} from './styles';
import { Props } from './types';

export function SmallCard({icon, title, onPress}: Props){
return (
  <Pressable onPress={onPress}>
   <Container>
    <Circle>
      <Icon icon={icon} size={20} activeColor="white"/>
    </Circle>
    <Separator height={15}/>
    <Text style={{textAlign: 'center'}}>{title}</Text>
   </Container>
  </Pressable>
  );
}