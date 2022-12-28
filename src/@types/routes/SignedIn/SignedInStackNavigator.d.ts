import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { VaccineDTO } from '../../dtos/vaccine';

declare global {
  export type SignedInStackParamsList = {
    BottomTabHome: undefined;
    // FIXME: Create real interface to vaccine
    VaccineDetail: {
      vaccine: VaccineDTO;
    };
    VaccineOnMaps: undefined;
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
