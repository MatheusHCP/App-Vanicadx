import { ColorSchemeName } from "react-native";
import { DefaultTheme } from "styled-components";

export type ThemeType = 'light' | 'dark';

export interface Props {
  currentTheme: ThemeType;
  theme : DefaultTheme;
}

export interface colorSchemeProps{
  colorScheme: ColorSchemeName;
}