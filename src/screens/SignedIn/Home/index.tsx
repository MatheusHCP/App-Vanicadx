import React from 'react';
import { StatusBar } from 'react-native';
import { Button } from '../../../components/Button';
import { Separator } from '../../../components/Separator';
import useAuth from '../../../hooks/useAuth';
import { Header } from './localComponents/Header';

import {
 Container
} from './styles';

export function Home(){

  const {signOut} = useAuth()

  return (
   <Container>
    <StatusBar barStyle="light-content" />
    <Header/>

    <Separator height={50} />
    <Button onPress={signOut}>Sign Out</Button>
   </Container>
  );
}