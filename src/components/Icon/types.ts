import { ImageProps } from "react-native";
import { ColorsType } from 'styled-components/native';
import { NameIconTypes } from "../../constants/icons";

export interface IconOptionProps{
  icon: NameIconTypes
  size?: number
  activeColor?: string
}

export interface IconProps extends ImageProps, IconOptionProps{
}