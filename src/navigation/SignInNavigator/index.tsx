import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Access } from "../../screens/SignIn/Access";
import { Login } from "../../screens/SignIn/Login";
import { OnBoarding } from "../../screens/SignIn/OnBoarding";
import { SignUp } from "../../screens/SignIn/SignUp";
import { SignInStackParamList } from '../../@types/routes/SignIn/SignInStackNavigator';
import { SignUpStep2 } from '../../screens/SignIn/SignUpStep2';

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
      <Stack.Screen name="signUpStep2" component={SignUpStep2}/>
    </Stack.Navigator>
  )
}

export default SignInNavigator;