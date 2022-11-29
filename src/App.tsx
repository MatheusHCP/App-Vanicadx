/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {type PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { Header } from './components/Header';

const App = () => {
  return (
    <SafeAreaView style={styles.app}>
      <Header/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  app:{
    flex: 1
  }
});

export default App;
