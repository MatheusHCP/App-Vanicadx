import React from 'react';
import { DevSettings } from 'react-native';
import useAuth from '../hooks/useAuth';
import BottomTabNavigator from './SignedInNavigator/BottomTabNavigator';
import SignInNavigator from './SignInNavigator';

export function Routes(){
  const {isSignedIn} = useAuth();


  // Adicionar opção no menu de desenvolvimento para alterar o loggedin para verificar
  // as rotas diferentes.
  // useEffect(() => {
  //   DevSettings.addMenuItem("Change Routes", () => setisSignedIn(old => !old))
  // }, [])


  return isSignedIn ? <BottomTabNavigator/> : <SignInNavigator/>
}