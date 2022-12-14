import React from 'react';

import {Container} from './styles';
import {IconProps} from './types';
import Icons from '../../constants/icons';

export function Icon({icon, size = 20, activeColor, style}: IconProps) {

  if (activeColor) {
    return (
      <Container
        size={size}
        source={Icons[icon]}
        style={[{tintColor: activeColor}, style]}
        resizeMode="contain"
      />
    );
  }
  return <Container size={size} source={Icons[icon]} style={style} resizeMode="contain"/>;
}
