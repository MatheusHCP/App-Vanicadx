import { TextProps } from "react-native";
import { ColorsType, TypographyTypes } from "styled-components";

export interface Props extends TextProps {
  children: string;
  color?: ColorsType;
  typography: TypographyTypes
}