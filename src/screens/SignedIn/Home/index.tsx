import React, {useCallback, useEffect, useState} from 'react';
import {StatusBar, Alert, FlatList, RefreshControl} from 'react-native';
import {Banner} from './localComponents/Banner';
import {Separator} from '../../../components/Separator';
import {Text} from '../../../components/Text';
import {VaccineCard} from '../../../components/VaccineCard';
import useAuth from '../../../hooks/useAuth';
import {Header} from './localComponents/Header';
import {SmallCard} from './localComponents/SmallCard';

import {Container, Content, ScrollViewItems} from './styles';
import {useNavigation} from '@react-navigation/native';
import {VaccineDTO} from '../../../@types/dtos/vaccine';
import {getVaccines} from '../../../services/resource/vaccine';
import {isAfter} from 'date-fns';
import {Empty} from '../../../components/Empty';
import VaccineCardShimmer from '../../../components/VaccineCard/localComponents/VaccineCardShimmer';
import { spacing } from '../../../constants/styles/themes/common';

export function Home() {
  const {navigate} = useNavigation<SignedInStackNavigatorProps>();
  const {user} = useAuth();
  /**
   * States
   */
  const [vaccines, setVaccines] = useState<VaccineDTO[]>([]);
  const [loading, setLoading] = useState(true);

  /**
   *
   * Callbacks
   */

  const handleAddVaccineScreen = () => navigate('BottomTabHome', {
    screen: 'home',
    params: {
      screen: 'addVaccine'
    }
  });
  const handleMyVaccine = () => navigate('BottomTabHome', {
    screen: 'home',
    params: {
      screen: 'MyVaccine'
    }
  });
  const handleVaccineOnMaps = () => navigate('VaccineOnMaps');

  const handleFetchVaccines = useCallback(async () => {
    if (user) {
      try {
        setLoading(true);
        const response = await getVaccines({userID: user.id});
        setVaccines(
          response.filter(e =>
            isAfter(new Date(e.nextApplicationDate), new Date()),
          ),
        ); // Filtrando somente as próximas vacinas, datas superiores a hoje.
      } catch (error) {
        Alert.alert('Ops!', 'Não foi possível carregar as vacinas.');
      } finally {
        setLoading(false);
      }
    }
  }, [user]);

  useEffect(() => {
    handleFetchVaccines();
  }, [handleFetchVaccines]);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <FlatList
        data={vaccines}
        keyExtractor={item => String(item.id)}
        refreshing={loading}
        refreshControl={<RefreshControl
          refreshing={loading}
          onRefresh={handleFetchVaccines}
        />}
        renderItem={({item, index}) => (
          <Content>
            <VaccineCard
              vaccine={item}
              index={index}
            />
          </Content>
        )}
        ItemSeparatorComponent={() => <Separator height={15} />}
        ListEmptyComponent={() => {
          if(loading){
            return (
              <Content>
                <VaccineCardShimmer/>
                <Separator height={15}/>
                <VaccineCardShimmer/>
                <Separator height={15}/>
                <VaccineCardShimmer/>
                <Separator height={15}/>
              </Content>
            )
          }
          return (
            <Empty title="Você não possui próximas vacinas" />
          )
        }}
        ListHeaderComponent={() => {
          return (
            <>
              <Header />
              <ScrollViewItems
                horizontal
                showsHorizontalScrollIndicator={false}>
                <SmallCard
                  onPress={handleMyVaccine}
                  icon="vaccine"
                  title={`Minhas\nVacinas`}
                />
                <Separator width={spacing.md} />
                <SmallCard
                  onPress={handleAddVaccineScreen}
                  icon="plus"
                  title={`Adicionar\nvacinas`}
                />
                <Separator width={spacing.md} />
                <SmallCard
                  onPress={handleVaccineOnMaps}
                  icon="location"
                  title={`Procurar local\n de vacinação`}
                />
                <Separator width={spacing.md} />
              </ScrollViewItems>
              <Content>
                <Text typography="h8">Próximas vacinas</Text>
                <Separator height={15} />
              </Content>
            </>
          );
        }}
        ListFooterComponent={() => {
          return (
            <Content>
              <Separator height={15} />
              <Text typography="h8">Campanhas de vacinação</Text>
              <Separator height={15} />
              <Banner
                source={require('../../../assets/images/banner/covid.png')}
              />
            </Content>
          );
        }}
      />
    </Container>
  );
}
