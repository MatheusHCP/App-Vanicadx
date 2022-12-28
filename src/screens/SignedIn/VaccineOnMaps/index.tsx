import {useNavigation} from '@react-navigation/native';
import React, {useState, useCallback, useEffect} from 'react';
import {Alert, Platform, Pressable, StyleSheet} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useTheme} from 'styled-components/native';
import {useDebouncedCallback} from 'use-debounce';
import {PlaceDTO} from '../../../@types/dtos/place';
import {Icon} from '../../../components/Icon';
import Input from '../../../components/Input';
import {Separator} from '../../../components/Separator';
import icons from '../../../constants/icons';
import {getRandomImageUnsplash} from '../../../constants/unsplash';
import {getPlaces} from '../../../services/resource/places';
import {CardMap} from './localComponents/CardMap';

import {
  Container,
  Header,
  HeaderContent,
  HeaderContentRow,
  InputRow,
} from './styles';

export function VaccineOnMaps() {
  const {goBack} = useNavigation();
  const {colors, spacing} = useTheme();

  /**
   * States
   */

  const [selectedMarker, setSelectedMarker] = useState<PlaceDTO | null>();
  const [places, setPlaces] = useState<PlaceDTO[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const [searchInput, setSearchInput] = useState('');
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });

  /**
   * Callbacks
   */

  const handleFetchPlaces = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getPlaces();
      setPlaces(response);
    } catch (error) {
      Alert.alert('Ops!', 'Não foi possível carregar os locais de vacinação.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearchPlaces = useCallback(async (search?: string) => {
    try {
      setLoading(true);
      setSelectedMarker(null);
      const response = await getPlaces({search});
      setPlaces(response);

      if (response.length >= 1) {
        setRegion(old => ({
          ...old,
          latitude: Number(response[0].latitude),
          longitude: Number(response[0].longitude),
        }));
        setSelectedMarker(response[0]);
      }
    } catch (error) {
      Alert.alert('Ops!', 'Não foi possível carregar os locais de vacinação.');
    } finally {
      setLoading(false);
    }
  }, []);

  const debounceHandleSearchPlaces = useDebouncedCallback(
    handleSearchPlaces,
    500,
  );

  useEffect(() => {
    if(searchInput.length == 0){
      handleFetchPlaces();
    }
  }, [handleFetchPlaces]);

  useEffect(() => {
    if(searchInput.length > 0){
      debounceHandleSearchPlaces(searchInput);
    }
  }, [debounceHandleSearchPlaces, searchInput]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <HeaderContentRow>
            <Pressable onPress={goBack}>
              <Icon
                icon="back"
                size={15}
                activeColor={colors.background.main}
              />
            </Pressable>
            <Separator width={spacing.lg} />
            <InputRow>
              <Input
                placeholder="Busque por bairro"
                icon="search"
                color="primary"
                iconPosition="left"
                onChangeText={setSearchInput}
              />
            </InputRow>
          </HeaderContentRow>
          <Separator height={spacing.lg} />
        </HeaderContent>
      </Header>
      <MapView
        provider={Platform.OS == 'android' ? PROVIDER_GOOGLE : undefined} // remove if not using Google Maps
        style={styles.map}
        onRegionChangeComplete={setRegion} // quando movimenta o mapa e para ele vai setar a região com as coordenadas que está parado.
        region={region}>
        {places.map(place => (
          <Marker
            image={icons.marker}
            key={place.id}
            onPress={e => {
              setSelectedMarker(selectedMarker?.id == place.id ? null : place);
            }}
            coordinate={{
              latitude: Number(place.latitude),
              longitude: Number(place.longitude),
            }}
          />
        ))}
      </MapView>
      {!!selectedMarker && (
        <CardMap
          distance={`${selectedMarker.distance} km`}
          image={{uri: selectedMarker.picture}} // Utilizado o new Date pro React Native não cachear a imagem com isso sempre mudando a foto.
          title={selectedMarker.name}
        />
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
