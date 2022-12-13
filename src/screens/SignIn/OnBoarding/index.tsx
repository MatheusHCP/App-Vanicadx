import React from 'react';
import { SafeAreaView } from 'react-native';
import { Button } from '../../../components/Button';
import useAuth from '../../../hooks/useAuth';


import {
 Container
} from './styles';

export function OnBoarding(){

  const {signIn, loading} = useAuth()

return (
   <SafeAreaView>
    <Button loading={loading} onPress={() => signIn({email: 'TESTE', password:"TESTE"})}>Sign In</Button>
   </SafeAreaView>
  );
}