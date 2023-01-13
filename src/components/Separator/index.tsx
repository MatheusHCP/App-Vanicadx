import React from 'react';

import {
 Container
} from './styles';
import { Props } from './types';

export function Separator({height, width} : Props){
return (
   <Container height={height} width={width} testID="separator" />
  );
}