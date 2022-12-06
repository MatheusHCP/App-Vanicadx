import React, { useState } from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { ThemeProvider } from 'styled-components';
import { CustomButton } from './components/CustomButton';
import { Header } from './components/Header';
import { Text } from './components/Text';
import { themeDark } from './constants/styles/themes/dark';
import { themeLight } from './constants/styles/themes/light';
import useAppearence from './hooks/useAppearence';
import { ContainerAreaView } from './styles';


const App = () => {

  const {theme} = useAppearence();

  return (
    <ThemeProvider theme={theme}>
      <ContainerAreaView>
        <Header/>
        <CustomButton title='Change Theme' onPress={() => {}} />
        <Text typography='h4' color='primary' >TEXTO</Text>
      </ContainerAreaView>
    </ThemeProvider>
  );
};

export default App;
