import React, { useContext } from 'react';
import {Button as ButtonRN, ButtonProps} from 'react-native'
import { ThemeContext } from 'styled-components';

import {
 Container
} from './styles';

export function CustomButton({onPress} : ButtonProps){

  const themeContext = useContext(ThemeContext)

return (
  <ButtonRN color={themeContext.colors.primary.main} title="change theme" onPress={onPress} ></ButtonRN>
  );
}