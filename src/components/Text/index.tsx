import React from 'react';
import {
 Container
} from './styles';

import { Props } from './types';

export function Text({children, color, typography, ...rest} : Props){
return (
   <Container color={color || 'surface'} typography={typography || 'body1'}  {...rest}>
    {children}
   </Container>
  );
}