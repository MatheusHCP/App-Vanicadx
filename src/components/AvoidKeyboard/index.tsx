import React, { Children } from 'react';

import {
 Container
} from './styles';

export function AvoidKeyboard({children}){
return (
   <Container>
    {children}
   </Container>
  );
}