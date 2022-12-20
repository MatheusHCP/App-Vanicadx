import React from 'react';
import { ScrollView, StatusBar } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Button } from '../../../components/Button';
import { Separator } from '../../../components/Separator';
import useAuth from '../../../hooks/useAuth';
import { Header } from './localComponents/Header';
import { SmallCard } from './localComponents/SmallCard';

import {
 Container, ScrollViewItems
} from './styles';

export function Home(){

  const {signOut} = useAuth()

  return (
   <Container>
    <StatusBar barStyle="light-content" />
    <Header/>
    <ScrollViewItems horizontal >
      <SmallCard icon='vaccine' title={`Minhas\nVacinas`} />
      <Separator width={15}/>
      <SmallCard icon='vaccine' title={`Adicionar\nvacinas`} />
      <Separator width={15}/>
      <SmallCard icon='vaccine' title={`Procurar local\n de vacinação`} />
    </ScrollViewItems>
    <Separator height={50} />
    <Button onPress={signOut}>Sign Out</Button>
   </Container>
  );
}