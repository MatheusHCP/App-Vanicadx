import React from 'react';
import useAuth from '../hooks/useAuth';
import { SignedInNavigator } from './SignedInNavigator';
import SignInNavigator from './SignInNavigator';

export function Routes(){
  const {isSignedIn} = useAuth();


  // Adicionar opção no menu de desenvolvimento para alterar o loggedin para verificar
  // as rotas diferentes.
  // useEffect(() => {
  //   DevSettings.addMenuItem("Change Routes", () => setisSignedIn(old => !old))
  // }, [])


  return isSignedIn ? <SignedInNavigator/> : <SignInNavigator/>
}