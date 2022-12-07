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
        <ContainerAreaView>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Icon icon='morte' size={100} activeColor="error"/>
            <Separator width={80}/>
            <Icon icon='grafico' size={150} />
          </View>
          <View>
            <Input ref={refEmail} icon='grafico' placeholder='johndoe@gmail.com' label='E-mail' iconPosition='right' />
            <Separator height={10} />
            <Input ref={refPassword} label="Password" placeholder='Sua senha' error='Senha Incorreta' secureTextEntry/>
          </View>
          <Button mode='outlined' color='surface' onPress={handlePress} >Change Icons</Button>
          <Separator />
        </ContainerAreaView>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
