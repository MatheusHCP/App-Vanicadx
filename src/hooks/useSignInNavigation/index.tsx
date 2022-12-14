import { useNavigation } from '@react-navigation/native';
// import React from 'react';
import { SignInStackNavigatorProp } from '../../@types/routes/SignIn/SignInStackNavigator';


export default function useSignInNavigation(){
  const navigation = useNavigation<SignInStackNavigatorProp>();
  return navigation;
}