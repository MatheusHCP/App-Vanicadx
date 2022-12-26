import { StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { AddVaccine } from '../../../screens/SignedIn/AddVaccine';
import { Home } from '../../../screens/SignedIn/Home';

const Stack = createNativeStackNavigator();

export function HomeStack(){

  return (
   <Stack.Navigator>
    <Stack.Screen name='homeStack' component={Home} options={{headerShown: false}} />
    <Stack.Screen name='addVaccine' component={AddVaccine} options={{headerShown: false}} />
   </Stack.Navigator>
  );
}