import React, {useContext, useMemo} from 'react';
import {ThemeContext} from 'styled-components/native';

import {AbsoluteIcon, Container, Loading, Title} from './styles';
import {ButtonProps} from './types';

export function Button({
  children,
  mode = 'contained',
  color = 'primary',
  loading = false,
  icon,
  typography = "body2",
  onPress,
  ...rest
}: ButtonProps) {
  const {colors} = useContext(ThemeContext);

  const colorByMode = useMemo(() => {
    return mode == 'outlined' ? colors[color].main : colors[color].onMain;
  }, [mode, color, colors]);

  return (
    <Container
      mode={mode}
      borderColor={colors[color].main}
      color={colors[color].main}
      onPress={onPress}
      {...rest}>
        {!!icon && <AbsoluteIcon>{icon}</AbsoluteIcon>}
      <Title typography={typography} color={colorByMode}>{children}</Title>
      {loading && <Loading size={15} color={colorByMode} />}
    </Container>
  );
}
