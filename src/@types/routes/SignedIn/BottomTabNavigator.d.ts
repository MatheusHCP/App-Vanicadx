import { NavigatorScreenParams } from "@react-navigation/native"
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs'
import { HomeStackParamsList } from "./HomeStackNavigator";

declare global {
  export type BottomTabParamList = {
    home?: NavigatorScreenParams<HomeStackParamsList>;
    profile: undefined;
  }
  
  /**
   * useNavigation types
   */
 
 export type StartBottomTabNavigatorProp = BottomTabNavigationProp<
  BottomTabParamList,
  'home'
 >
}