import React from 'react';
import useAppearence from './hooks/useAppearence';

import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';
import { Routes } from './navigation';


const App = () => {

  const {theme} = useAppearence();
  


  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Routes/>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
