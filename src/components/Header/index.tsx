import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function Header(){
return (
  <View>
    <Text style={styles.title}>Olá!</Text>
    <Text style={styles.subtitle}>Matheus</Text>
  </View>
  );
}

const styles = StyleSheet.create({
  app:{
    flex: 1
  },
  title:{
    color: 'black',
    fontSize: 30
  },
  subtitle:{
    color:'black',
    fontSize: 15
  }
});