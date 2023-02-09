import { NameIconTypes } from "../../../../../constants/icons";

export interface OptionProps{
  title: string;
  icon: NameIconTypes;
  onPress?: () => void;
}