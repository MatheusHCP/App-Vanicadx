import React, { useState } from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { ThemeProvider } from 'styled-components';
import { CustomButton } from './components/CustomButton';
import { Header } from './components/Header';


const App = () => {

  const themeDark = {
    colors: {
      primary: 'black',
      onPrimary: 'white',
      secondary: 'red',
      onSecondary: 'black'
    }
  }

  const themeLight = {
    colors: {
      primary: 'white',
      onPrimary: 'black',
      secondary: 'green',
      onSecondary: 'black'
    }
  }

  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  return (
    <ThemeProvider theme={theme == 'light' ? themeLight : themeDark}>
      <SafeAreaView style={styles.app}>
        <Header/>
        <CustomButton title='Change Theme' onPress={() => setTheme(old => {
          if(old == 'light')
            return 'dark'
          else
            return 'light'
        })} />
      </SafeAreaView>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  app:{
    flex: 1,
    backgroundColor: "#000"
  }
});

export default App;
