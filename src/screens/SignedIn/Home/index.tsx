import React from 'react';
import {ScrollView, StatusBar} from 'react-native';
import {useTheme} from 'styled-components/native';
import {Button} from '../../../components/Button';
import {Separator} from '../../../components/Separator';
import { Text } from '../../../components/Text';
import {VaccineCard} from '../../../components/VaccineCard';
import useAuth from '../../../hooks/useAuth';
import {Header} from './localComponents/Header';
import {SmallCard} from './localComponents/SmallCard';

import {Container, Content, ScrollViewItems} from './styles';

export function Home() {
  const {signOut} = useAuth();

  return (
    <Container>
      <StatusBar barStyle="light-content" />
      <Header />
      <ScrollViewItems horizontal>
        <SmallCard icon="vaccine" title={`Minhas\nVacinas`} />
        <Separator width={15} />
        <SmallCard icon="plus" title={`Adicionar\nvacinas`} />
        <Separator width={15} />
        <SmallCard icon="location" title={`Procurar local\n de vacinação`} />
      </ScrollViewItems>
      <Content>
        <Text typography='h7'>Próximas vacinas</Text>
        <Separator height={15}/>
        <VaccineCard title='Triplice Viral' date={new Date(2022, 12, 23).toISOString()} />
        <Separator height={15}/>
        <VaccineCard  title='Covid-19' shot="first-dose" date={new Date().toISOString()} />
        <Separator height={15}/>
        <VaccineCard title='Covid-19' shot="second-dose" date={new Date().toISOString()} />
      </Content>
      <Separator height={50} />
      <Button onPress={signOut}>Sign Out</Button>
    </Container>
  );
}
