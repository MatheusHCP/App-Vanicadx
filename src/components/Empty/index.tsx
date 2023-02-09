import React from 'react';
import { Icon } from '../Icon';
import { Text } from '../Text';

import {
 Container, Content
} from './styles';
import { EmptyProps } from './types';

export function Empty({title} : EmptyProps){
return (
   <Container>
    <Content>
      <Icon icon='emptybox' size={100} />
      {!!title && <Text typography='body2'>{title}</Text>}
    </Content>
   </Container>
  );
}