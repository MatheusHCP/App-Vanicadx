import { createContext, useEffect, useState } from "react";
import { UserDTO } from "../../@types/dtos/user";
import { asyncUserKeys, AuthContextProps } from "./types";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signInResource } from "../../services/resource/auth";
import { RequestSignInData } from "../../services/resource/auth/types";
import { Alert } from "react-native";
import api from "../../services/api";
import { RequestCreateUserData } from "../../services/resource/user/types";
import { createUserResource } from "../../services/resource/user";

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);
// Colocado esse as no objeto dentro do Context para evittar de dar erro no typescript,
// com isso meio que estou definindo que esse objeto atende todos as props da interface
// AuthContextProps.

export const AuthProvider: React.FC = ({children}) => {
  const [user, setUser] = useState<UserDTO>();
  const [loading, setLoading] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [rehydrateLoading, setRehydrateLoading] = useState(true)

  /**
   * Callbacks
   */

  async function saveUserToStorageAndConfigToken(data: UserDTO){
    api.defaults.headers.Authorization = `Bearer ${data.token}`;
    await AsyncStorage.setItem(asyncUserKeys.user, JSON.stringify(data))
  }

  const signIn = async (data: RequestSignInData) => {
    try {
      setLoading(true)
      const response = await signInResource(data)
      setUser(response.user)
      saveUserToStorageAndConfigToken(response.user)
      setLoading(false)
      setIsSignedIn(true)
     
    } catch (error) {
      Alert.alert("Erro ao efetuar login", "Não foi possível realizar o login, tente novamente.")
    }
    finally{
      setLoading(false)
    }

  }

  async function signUp(data: RequestCreateUserData){
    try {
      setLoading(true)
      const response = await createUserResource(data)
      setUser(response.user)
      setLoading(false)
      setIsSignedIn(true)
      await saveUserToStorageAndConfigToken(response.user)
    } catch (error) {
      Alert.alert("Erro ao efetuar cadastro", "tente novamente.")
    }
    finally{
      setLoading(false)
    }
  }


  const signOut = async () => {
    setIsSignedIn(false)
    setUser(undefined)
    api.defaults.headers.Authorization = `Bearer `;
    await AsyncStorage.clear()
  }

  const rehydrate = async () => {
    const rehydrateUser = await AsyncStorage.getItem(asyncUserKeys.user);

    if(rehydrateUser){
      setUser(JSON.parse(rehydrateUser))
      setIsSignedIn(true);
    }
    setRehydrateLoading(false)

  }

  useEffect(() => {
    rehydrate()
  }, [])
  

  return(
    <AuthContext.Provider value={{user, loading, isSignedIn, signIn, signUp, signOut}}>
      {!rehydrateLoading && children}
    </AuthContext.Provider>
  )
}