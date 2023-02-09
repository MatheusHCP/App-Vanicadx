import React, {forwardRef, useCallback, useContext, useImperativeHandle, useMemo, useRef, useState} from 'react';
import { TouchableOpacity } from 'react-native';
import {ThemeContext} from 'styled-components/native';
import { Icon } from '../Icon';

import {Border, Container, Error, IconContainer, InputInternal, Label} from './styles';
import {InputProps, InputValueRef} from './types';

const Input : React.ForwardRefRenderFunction<InputValueRef, InputProps> = ({
  color="surface500",
  secureTextEntry,
  icon,
  iconColor,
  label,
  error,
  iconPosition = 'right',
  onChangeText,
  ...rest}, ref) => {
  const [text, setText] = useState('');

    // REFS

  const internalRef = useRef<any>();


  /**
   * useImperativeHandle
   */

  useImperativeHandle(ref, () => ({
    value: text,
    focus: () => internalRef.current?.focus(),
    blur: () => internalRef.current?.blur(),
    setValue: (value: string) => internalRef.current?.setValue(),
  }), [text])


  
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {colors} = useContext(ThemeContext);

  const selectedColorForActiveColorIcon = useMemo(() => {
    if (error) {
      return colors.error.main
    }
    if (iconColor){
      return colors[color].main
    }
    return colors[color].main
  },[error, iconColor, colors, color])

  const renderIcon = useCallback(() => {
    if(secureTextEntry){
      return (
        <TouchableOpacity onPress={() => setPasswordVisible(old => !old)}>
          <IconContainer iconPosition={iconPosition}>
            <Icon icon={passwordVisible ? 'eyeclosed' : 'eyeopen'} activeColor={selectedColorForActiveColorIcon}/>
          </IconContainer>
        </TouchableOpacity>
      )
    }

    if (icon) {
      return (
        <IconContainer iconPosition={iconPosition}>
          <Icon icon={icon} activeColor={selectedColorForActiveColorIcon}/>
        </IconContainer>
      )
    }

    return null;
  },[secureTextEntry, icon, iconPosition, passwordVisible, selectedColorForActiveColorIcon])

  return (
    <Container>
      {!!label && (
        <Label color='surface600' typography='body3' >{label}</Label>
      )}
      <Border color='transparent' borderColor={error ? colors.error.main : colors[color].main}>
      {iconPosition == 'left' && renderIcon()}
        <InputInternal
          ref={internalRef}
          value={text}
          onChangeText={value => {
            setText(value);
            onChangeText?.(value); // Verifica se possui algum onchangetext passado por parametro se possui ele retorna o value no callback
          }}
          secureTextEntry={secureTextEntry && !passwordVisible}
          {...rest}
        />
        {iconPosition == 'right' && renderIcon()}
      </Border>
        {!! error && (
          <Error testID='error-input' color='error' typography='body1'>{error}</Error>
        )}
    </Container>
  );
}


export default forwardRef(Input)