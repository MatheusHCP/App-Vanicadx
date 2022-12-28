import React from 'react';
import { Pressable } from 'react-native';
import styles from './styles';
import { ShadowProps } from './types';


export default function Shadow({children, onPress} : ShadowProps){
return (
   <Pressable onPress={onPress} style={styles.shadow}>
    {children}
   </Pressable>
  );
}