import React from 'react';
import { Icon } from '../Icon';

import {
 Container
} from './styles';
import { Props } from './types';

export function BackButton({icon, onPress} : Props){
return (
   <Container onPress={onPress}>
    <Icon icon={icon} size={15}/>
   </Container>
  );
}