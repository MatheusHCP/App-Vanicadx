import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { HeaderProps } from './types';

export function Header(props : HeaderProps){
return (
  <View>
    <Text style={styles.title}>{props.title}</Text>
    <Text style={styles.subtitle}>{props.name}</Text>
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