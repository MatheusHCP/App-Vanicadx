import React, { useEffect } from 'react';
import useAppearence from './hooks/useAppearence';

import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';
import { Routes } from './navigation';
import { AuthProvider } from './context/Auth';

const App = () => {

  const {theme} = useAppearence();
  
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <NavigationContainer>
          <Routes/>
        </NavigationContainer>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
