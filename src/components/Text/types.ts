import React from "react";
import { TextProps } from "react-native";
import { ColorsType, TypographyTypes } from "styled-components";

export interface Props extends TextProps {
  children: string | React.ReactNode;
  color?: ColorsType;
  typography?: TypographyTypes
}