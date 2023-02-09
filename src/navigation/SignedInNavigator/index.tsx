import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { VaccineDetail } from '../../screens/SignedIn/VaccineDetail';
import { VaccineOnMaps } from '../../screens/SignedIn/VaccineOnMaps';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createNativeStackNavigator<SignedInStackParamsList>();

export function SignedInNavigator(){
return (
   <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen
     name='BottomTabHome'
     component={BottomTabNavigator}
    />
    <Stack.Screen
     name='VaccineDetail'
     component={VaccineDetail}
    />
    <Stack.Screen
     name='VaccineOnMaps'
     component={VaccineOnMaps}
    />
   </Stack.Navigator>
  );
}