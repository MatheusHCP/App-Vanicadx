import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Home  from '../screens/Home';
import { Profile } from '../screens/Profile';

const Stack = createNativeStackNavigator()

export function Routes(){
return (
   <Stack.Navigator initialRouteName='Home'>
    <Stack.Screen
      name='Home'
      component={Home}
    />
    <Stack.Screen
      name='Profile'
      component={Profile}
    />
   </Stack.Navigator>
  );
}