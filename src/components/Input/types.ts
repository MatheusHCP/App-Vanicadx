import { TextInputProps } from "react-native";
import { ColorsType } from 'styled-components/native';
import { NameIconTypes } from "../../constants/icons";

export type iconPosition = 'left' | 'right'

export interface InputProps extends TextInputProps{
  color?: ColorsType
  icon?: NameIconTypes
  iconColor?: ColorsType
  iconPosition?: iconPosition
  label?: string
  error?: string;
}

export interface InputValueRef{
  value: string
  focus?: () => void
  blur?: () => void
  setValue?: (value: string) => void
}