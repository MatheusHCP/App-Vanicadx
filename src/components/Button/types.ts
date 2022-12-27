import React from "react";
import { TouchableOpacityProps } from "react-native";
import { ColorsType, TypographyTypes } from "styled-components";

export type Mode = 'outlined' | 'contained'

export interface ButtonProps extends TouchableOpacityProps {
  children: string;
  color?: ColorsType;
  icon?: React.ReactNode;
  typography?: TypographyTypes
  mode?: Mode;
  loading?: boolean;
  paddingHorizontal?: number;
  paddingVertical?: number;

} 