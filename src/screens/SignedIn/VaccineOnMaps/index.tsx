import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Platform, Pressable, StyleSheet} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useTheme} from 'styled-components/native';
import {Icon} from '../../../components/Icon';
import Input from '../../../components/Input';
import {Separator} from '../../../components/Separator';
import icons from '../../../constants/icons';
import {getRandomImageUnsplash} from '../../../constants/unsplash';
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

  const [selectedMarker, setSelectedMarker] = useState(false);

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
              />
            </InputRow>
          </HeaderContentRow>
          <Separator height={spacing.lg} />
        </HeaderContent>
      </Header>
      <MapView
        provider={Platform.OS == 'android' ? PROVIDER_GOOGLE : undefined} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        <Marker
        image={icons.marker}
          onPress={e => {
            setSelectedMarker(old => !old);
          }}
          coordinate={{
            latitude: 37.79500,
            longitude: -122.4324,
          }}
        />
        <Marker
        image={icons.marker}
          onPress={e => {
            setSelectedMarker(old => !old);
          }}
          coordinate={{
            latitude: 37.79500,
            longitude: -122.4300,
          }}
        />
      </MapView>
      {!!selectedMarker && (
        <CardMap
          distance="1.5KM"
          image={{uri: getRandomImageUnsplash(100)}}
          title="Unidade de saúde de familia Campos do Iguaçu"
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
