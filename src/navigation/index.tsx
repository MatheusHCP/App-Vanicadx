import React, { useEffect, useState } from 'react';
import { DevSettings } from 'react-native';
import BottomTabNavigator from './SignedInNavigator/BottomTabNavigator';
import SignInNavigator from './SignInNavigator';

export function Routes(){
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Adicionar opção no menu de desenvolvimento para alterar o loggedin para verificar
  // as rotas diferentes.
  useEffect(() => {
    DevSettings.addMenuItem("Change Routes", () => setIsLoggedIn(old => !old))
  }, [])


  return isLoggedIn ? <BottomTabNavigator/> : <SignInNavigator/>
}