import {useNavigation} from '@react-navigation/native';
import {isAfter} from 'date-fns';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {FlatList, Pressable, Alert, StatusBar} from 'react-native';
import {useTheme} from 'styled-components/native';
import {useDebouncedCallback} from 'use-debounce';
import {VaccineDTO} from '../../../@types/dtos/vaccine';
import {Button} from '../../../components/Button';
import { Empty } from '../../../components/Empty';
import {HeaderOptions} from '../../../components/HeaderOptions';
import {Icon} from '../../../components/Icon';
import Input from '../../../components/Input';
import {Separator} from '../../../components/Separator';
import {Text} from '../../../components/Text';
import {VaccineCard} from '../../../components/VaccineCard';
import useAuth from '../../../hooks/useAuth';
import {getVaccines} from '../../../services/resource/vaccine';
import {Container, RowFilterVaccine} from './styles';
import {FilterVaccine} from './types';

export function MyVaccine() {
  const {goBack, navigate} = useNavigation<SignedInStackNavigatorProps>();
  const {spacing} = useTheme();
  const {user} = useAuth();

  /**
   * States
   */
  const [toggleFilter, setToggleFilter] = useState<FilterVaccine>('all');
  const [searchInput, setSearchInput] = useState('');
  const [vaccines, setVaccines] = useState<VaccineDTO[]>([]);
  const [loading, setLoading] = useState(true);

  /**
   * Callback
   */
  const handleToggleFilter = () => {
    setToggleFilter(old => (old == 'all' ? 'next' : 'all')); // Como é um toggle de filtro e só possui dois estados. feitos direto no set do filter
  };

  const handleFetchVaccines = useCallback(async () => {
    if (user) {
      try {
        setLoading(true);
        const response = await getVaccines({userID: user.id});
        setVaccines(response); // Filtrando somente as próximas vacinas, datas superiores a hoje.
      } catch (error) {
        Alert.alert('Ops!', 'Não foi possível carregar as vacinas.');
      } finally {
        setLoading(false);
      }
    }
  }, [user]);

  const handleSearchVaccines = useCallback(
    async (search: string) => {
      if (user) {
        try {
          setLoading(true);
          const response = await getVaccines({search});
          setVaccines(response); // Filtrando somente as próximas vacinas, datas superiores a hoje.
        } catch (error) {
          Alert.alert('Ops!', 'Não foi possível carregar as vacinas.');
        } finally {
          setLoading(false);
        }
      }
    },
    [user],
  );

  const debounceHandleSearchVaccines = useDebouncedCallback(
    handleSearchVaccines
  );

  useEffect(() => {
    if(searchInput.length == 0){
      handleFetchVaccines();
    }
  }, [handleFetchVaccines, searchInput]);

  useEffect(() => {
    if (searchInput.length > 0) {
      debounceHandleSearchVaccines(searchInput);
    }
  }, [searchInput, debounceHandleSearchVaccines]);

  /**
   * Memos
   */

  const filteredVaccines = useMemo(() => {
    if (toggleFilter == 'all') {
      return vaccines;
    }
    return vaccines.filter(e =>
      isAfter(new Date(e.nextApplicationDate), new Date()),
    );
  }, [vaccines, toggleFilter]);

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
        data={filteredVaccines}
        keyExtractor={item => `${item.id}`} // Passando dessa forma pois o keyExtractor ele pede uma string para tornar o item dessa lista unico.
        ItemSeparatorComponent={() => <Separator height={15} />}
        ListFooterComponent={() => <Separator height={15} />}
        renderItem={({item}) => (
          <VaccineCard
            //FIXME: Shimmer Effect
            vaccine={item}
          />
        )}
        ListEmptyComponent={() => (
            //FIXME: Shimmer Effect
          <Empty title="Não foi possível encontrar" />
        )}
      />
    </Container>
  );
}
