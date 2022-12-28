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

  const handleAddVaccineScreen = () => navigate('addVaccine');
  const handleMyVaccine = () => navigate('MyVaccine');
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
        renderItem={({item}) => (
          <Content>
            <VaccineCard
              title={item.name}
              shot={item.dose}
              date={item.nextApplicationDate}
            />
          </Content>
        )}
        ItemSeparatorComponent={() => <Separator height={15} />}
        ListEmptyComponent={() => (
          <Empty title="Você não possui próximas vacinas" />
        )}
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
                <Separator width={15} />
                <SmallCard
                  onPress={handleAddVaccineScreen}
                  icon="plus"
                  title={`Adicionar\nvacinas`}
                />
                <Separator width={15} />
                <SmallCard
                  onPress={handleVaccineOnMaps}
                  icon="location"
                  title={`Procurar local\n de vacinação`}
                />
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
