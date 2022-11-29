import React, {useState, useEffect, useCallback, useMemo, useRef} from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  TextInput,
} from 'react-native';
import { Header } from './components/Header';


const App = () => {

  const [name, setName] = useState<string>('Matheus')
  const [title, setTitle] = useState<string>('Bem vindo ao RN')


  useEffect(() => {
    if(name == 'Ismael'){
      setTitle('Hello')
    }
    else{
      setTitle("Olá!")
    }
  }, [name])

  const handlePressButton = useCallback(() => {
   if(name == 'Ismael'){
    setName('Matheus')
   }
   else{
    setName('Ismael')
   }
  }, [name])


  const inputRef = useRef<TextInput>({} as TextInput)

  return (
    <SafeAreaView style={styles.app}>
      <Header/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  app:{
    flex: 1
  },
  input: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
    color: 'white',
    fontSize: 20
  }
});

export default App;
