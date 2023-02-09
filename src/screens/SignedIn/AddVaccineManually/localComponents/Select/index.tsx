import React from 'react';
import { useTheme } from 'styled-components/native';
import { Icon } from '../../../../../components/Icon';
import { Separator } from '../../../../../components/Separator';
import { Text } from '../../../../../components/Text';

import {
 Container
} from './styles';
import { SelectProps } from './types';

export function Select({title, isSelected, onPress} : SelectProps){

  const {spacing} = useTheme();
return (
   <Container onPress={onPress}>
    <Icon icon={isSelected ? 'radioButtonActive' : 'radioButton'}/>
    <Separator width={spacing.sm}/>
    <Text color='surface600' typography='body3'>{title}</Text>
   </Container>
  );
}