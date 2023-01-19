import React, { useEffect } from 'react';
import useAppearence from './hooks/useAppearence';

import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';
import { Routes } from './navigation';
import { AuthProvider } from './context/Auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const App = () => {

  const {theme} = useAppearence();
  
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '832996488811-tvhcbmh451okt3obg3jf2e9hf6v0cunq.apps.googleusercontent.com',
      offlineAccess: true,
      scopes: ['profile', 'email']
    });
  },[])
  
  return (
    <ThemeProvider theme={theme}>
      {/*@ts-ignore */}
      <AuthProvider>
        <NavigationContainer>
          <Routes/>
        </NavigationContainer>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
