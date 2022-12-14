import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Access } from "../../screens/SignIn/Access";
import { Login } from "../../screens/SignIn/Login";
import { OnBoarding } from "../../screens/SignIn/OnBoarding";
import { SignUp } from "../../screens/SignIn/SignUp";
import { SignInStackParamList } from '../../@types/routes/SignIn/SignInStackNavigator';

const Stack = createNativeStackNavigator<SignInStackParamList>();

const SignInNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="onBoarding" component={OnBoarding}/>
      <Stack.Screen name="access" component={Access}/>
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="signUp" component={SignUp}/>
    </Stack.Navigator>
  )
}

export default SignInNavigator;