import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { ThemeProvider } from 'styled-components';
import { CustomButton } from './components/CustomButton';
import { Header } from './components/Header';
import { Icon } from './components/Icon';
import { Text } from './components/Text';
import { themeDark } from './constants/styles/themes/dark';
import { themeLight } from './constants/styles/themes/light';
import useAppearence from './hooks/useAppearence';
import { ContainerAreaView } from './styles';
import { Button } from './components/Button';
import { Separator } from './components/Separator';


const App = () => {

  const {theme} = useAppearence();

  return (
    <ThemeProvider theme={theme}>
      <ContainerAreaView>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <Icon icon='morte' size={100} activeColor="error"/>
          <Separator width={80}/>
          <Icon icon='grafico' size={150} />
        </View>
        <Button mode='outlined' color='surface' >Change Icons</Button>
      </ContainerAreaView>
    </ThemeProvider>
  );
};

export default App;
