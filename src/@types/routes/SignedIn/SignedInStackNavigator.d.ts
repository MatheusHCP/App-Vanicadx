import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

declare global {
  export type SignedInStackParamsList = {
    BottomTabHome: undefined;
    // FIXME: Create real interface to vaccine
    VaccineDetail: {
      vaccine: any;
    };
  };

  /**
   * useNavigation Types
   */

  export type SignedInStackNavigatorProps = NativeStackNavigationProp<
    SignedInStackParamsList,
    'BottomTabHome'
  >;

  /**
   * useRoute Types
   */

  export type VaccineSignedInStackRouteProps = RouteProp<
    SignedInStackParamsList,
    'VaccineDetail'
  >;
}
