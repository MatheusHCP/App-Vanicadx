import React from 'react';
import { Button } from '../../../components/Button';
import useAuth from '../../../hooks/useAuth';

import {
 Container
} from './styles';

export function Home(){

  const {signOut} = useAuth()

  return (
   <Container>
    <Button onPress={signOut}>Sign Out</Button>
   </Container>
  );
}