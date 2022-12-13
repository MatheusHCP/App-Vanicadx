import { NavigatorScreenParams } from "@react-navigation/native"
import { HomeStackParamList } from "../SignIn/SignInStackNavigator"
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs'

declare global {
  export type BottomTabParamList = {
    home: undefined;
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