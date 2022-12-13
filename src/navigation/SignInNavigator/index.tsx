import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Access } from "../../screens/SignIn/Access";
import { Login } from "../../screens/SignIn/Login";
import { OnBoarding } from "../../screens/SignIn/OnBoarding";
import { SignUp } from "../../screens/SignIn/SignUp";

const Stack = createNativeStackNavigator();

const SignInNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="onboarding" component={OnBoarding}/>
      <Stack.Screen name="access" component={Access}/>
      <Stack.Screen name="login" component={Login}/>
      <Stack.Screen name="signup" component={SignUp}/>
    </Stack.Navigator>
  )
}

export default SignInNavigator;