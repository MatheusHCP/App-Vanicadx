import React from 'react';
import {ScrollView, StatusBar, View} from 'react-native';
import {useTheme} from 'styled-components/native';
import {Separator} from '../../../components/Separator';
import {Text} from '../../../components/Text';
import useAuth from '../../../hooks/useAuth';
import { Option } from './localComponent/Option';

import {Avatar, CardOption, Container, Divider, Row} from './styles';

export function Profile() {
  const {spacing} = useTheme();
  const {user, signOut} = useAuth();

  return (
    <Container>
      <ScrollView>
        <StatusBar barStyle={'dark-content'} />
        <Separator height={spacing.lg} />
        <Text typography="h5">Perfil</Text>
        <Separator height={spacing.lg} />
        <Row>
          <Avatar source={{uri: user?.avatar}} />
          <Separator width={spacing.sm} />
          <View>
            <Text typography="h8">{user?.firstName}</Text>
            <Text typography="h8">{user?.lastName}</Text>
          </View>
        </Row>
        <Separator height={spacing.lg}/>
        <View>
          <CardOption>
            <Option icon='profile' title='Informações pessoais' />
            <Divider/>
            <Option icon='notification' title='Suporte' />
            <Divider/>
            <Option onPress={signOut} icon='logout' title='Sair' />
          </CardOption>
        </View>

      </ScrollView>
    </Container>
  );
}
