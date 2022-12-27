import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {FlatList, Pressable, StatusBar} from 'react-native';
import {useTheme} from 'styled-components/native';
import {Button} from '../../../components/Button';
import {HeaderOptions} from '../../../components/HeaderOptions';
import {Icon} from '../../../components/Icon';
import Input from '../../../components/Input';
import {Separator} from '../../../components/Separator';
import {Text} from '../../../components/Text';
import {VaccineCard} from '../../../components/VaccineCard';

import {Container, RowFilterVaccine} from './styles';
import {FilterVaccine} from './types';

export function MyVaccine() {
  const {goBack, navigate} = useNavigation<SignedInStackNavigatorProps>();
  const {spacing} = useTheme();

  /**
   * States
   */
  const [toggleFilter, setToggleFilter] = useState<FilterVaccine>('all');
  const [searchInput, setSearchInput] = useState('');

  /**
   * Callback
   */
  const handleToggleFilter = () => {
    setToggleFilter(old => (old == 'all' ? 'next' : 'all')); // Como é um toggle de filtro e só possui dois estados. feitos direto no set do filter
  };

  const handleNavigateToVaccineDetail = vaccine => navigate('VaccineDetail', {vaccine})

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <HeaderOptions
        left={
          <Pressable onPress={goBack}>
            <Icon icon="back" size={15} />
          </Pressable>
        }
      />
      <Separator height={spacing.md} />
      <Text typography="h7">Minhas vacinas</Text>
      <Separator height={spacing.md} />
      <Input
        icon="search"
        iconPosition="left"
        iconColor="lightGreen"
        placeholder="Busca de vacina"
        // TODO: Implement Debounce ao efetuar a busca esperar X segundos para efetuar consulta na API
        onChangeText={setSearchInput}
        value={searchInput}
      />
      <Separator height={spacing.ty} />
      <RowFilterVaccine>
        <Button
          mode={toggleFilter == 'all' ? 'contained' : 'outlined'}
          paddingHorizontal={20}
          paddingVertical={8}
          onPress={handleToggleFilter}>
          Todas
        </Button>
        <Separator width={spacing.sm} />
        <Button
          mode={toggleFilter == 'next' ? 'contained' : 'outlined'}
          paddingHorizontal={20}
          paddingVertical={8}
          onPress={handleToggleFilter}>
          Próximas vacinas
        </Button>
      </RowFilterVaccine>
      <Separator height={spacing.md} />
      <FlatList
        data={[1, 2, 3, 4, 5]}
        keyExtractor={item => `${item}`} // Passando dessa forma pois o keyExtractor ele pede uma string para tornar o item dessa lista unico.
        ItemSeparatorComponent={() => <Separator height={15} />}
        ListFooterComponent={() => <Separator height={15} />}
        renderItem={({item}) => (
          <VaccineCard
            //FIXME: Handle to open detail screen
            key={item}
            onPress={() => {
              handleNavigateToVaccineDetail(
               {shot: 'second-dose',
                title: 'Johnson'
              }
              )
            }}
            date={item % 2 === 0 ? new Date(2022, 12, 27).toISOString() : new Date(2022, 11, 27).toISOString() }
            shot={item % 2 === 0 ? 'second-dose' : 'first-dose'}
            title={item % 2 === 0 ? 'Johnson' : 'Astrazeneca'}
          />
        )}
      />
    </Container>
  );
}
