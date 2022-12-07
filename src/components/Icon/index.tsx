import React, {useContext} from 'react';

import {Container} from './styles';
import {IconProps} from './types';
import Icons from '../../constants/icons';
import {ThemeContext} from 'styled-components';

export function Icon({icon, size = 20, activeColor, style}: IconProps) {
  const {colors} = useContext(ThemeContext);

  if (activeColor) {
    return (
      <Container
        size={size}
        source={Icons[icon]}
        style={[{tintColor: activeColor}, style]}
      />
    );
  }
  return <Container size={size} source={Icons[icon]} style={style}/>;
}
