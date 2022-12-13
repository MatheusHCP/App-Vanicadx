import React from 'react';
import BottomTabNavigator from './SignedInNavigator/BottomTabNavigator';
import SignInNavigator from './SignInNavigator';

export function Routes(){
  const isLoggedIn = true;

  return isLoggedIn ? <BottomTabNavigator/> : <SignInNavigator/>
}