import React, { useRef } from 'react';
import {
  Alert,
  View,
} from 'react-native';
import { Icon } from './components/Icon';
import useAppearence from './hooks/useAppearence';
import { ContainerAreaView } from './styles';
import { Button } from './components/Button';
import { Separator } from './components/Separator';
import { InputValueRef } from './components/Input/types';
import Input from './components/Input';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';
import { Routes } from './navigation';


const App = () => {

  const {theme} = useAppearence();


  const refEmail = useRef<InputValueRef>({value: ''});
  const refPassword = useRef<InputValueRef>({value: ''});

  const handlePress = () => {
    Alert.alert(refEmail.current?.value || 'Não tinha email', refPassword.current?.value || 'Não Tinha password')
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Routes/>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
