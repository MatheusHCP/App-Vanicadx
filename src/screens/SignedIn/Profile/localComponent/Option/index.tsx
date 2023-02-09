import React from 'react';
import { useTheme } from 'styled-components/native';
import { Icon } from '../../../../../components/Icon';
import { Separator } from '../../../../../components/Separator';
import { Text } from '../../../../../components/Text';

import {
  Circle,
 Container,
 Row
} from './styles';
import { OptionProps } from './types';

export function Option({icon, title, onPress} : OptionProps){

  const {colors, spacing} = useTheme()

return (
   <Container onPress={onPress}>
    <Row>
      <Circle>
        <Icon icon={icon} size={15} activeColor={colors.background.main} />
      </Circle>
      <Separator width={spacing.sm}/>
      <Text>{title}</Text>
    </Row>
    <Icon icon='arrowRight' size={15} activeColor={colors.primary.main} />
   </Container>
  );
}