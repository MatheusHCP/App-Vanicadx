import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type HomeStackParamList = {
  feed: undefined;
  stories: {
    para: string
  }
};

export type HomeStackNavigatorProp = NativeStackNavigationProp<HomeStackParamList, 'feed'>;

export type StoriesHomeStackRouteProp = RouteProp<HomeStackParamList, 'stories'>