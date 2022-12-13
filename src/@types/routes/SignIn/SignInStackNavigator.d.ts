import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type SignInStackParamList = {
  access: undefined
  Login: undefined
  onBoarding: undefined
  signUp: undefined
};

/**
 * useNavigation types | nomes das telas existentes
 */

export type SignInStackNavigatorProp = NativeStackNavigationProp<SignInStackParamList, 'access'>;

/**
 * useRoute types | Parametros que cada tela utiliza.
 */

// export type StoriesSignInStackRouteProp = RouteProp<SignInStackParamList, 'access'>