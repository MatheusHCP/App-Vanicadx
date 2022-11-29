/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

import { Header } from './components/Header';

const App = () => {

  const [name, setName] = useState<string>('Matheus')
  const [title, setTitle] = useState<string>('Bem vindo ao RN')

  function handlePressButton(){
    
    setName((previousState) => {
      if (previousState == "Ismael")
        return "Matheus"
      else
        return "Ismael"
    })
  }

  return (
    <SafeAreaView style={styles.app}>
      <Header name={name} title={title} />
      <Button title='Change name' onPress={handlePressButton}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  app:{
    flex: 1
  }
});

export default App;
