import { createContext, useEffect, useState } from "react";
import { UserDTO } from "../../@types/dtos/user";
import { asyncUserKeys, AuthContextProps } from "./types";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signInResource } from "../../services/resource/auth";
import { RequestSignInData } from "../../services/resource/auth/types";

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

  const signIn = async (data: RequestSignInData) => {
    try {
      setLoading(true)
      const response = await signInResource(data)
      setUser(response.user)
      setLoading(false)
      setIsSignedIn(true)
      // api.default.headers.Authorization = 'Bearer ${response.data.token}
      AsyncStorage.setItem(asyncUserKeys.user, JSON.stringify(response.user))
    } catch (error) {
      
    }
    finally{
      setLoading(false)
    }

  }

  const signOut = async () => {
    setIsSignedIn(false)
    setUser(undefined)
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
    <AuthContext.Provider value={{user, loading, isSignedIn, signIn, signOut}}>
      {!rehydrateLoading && children}
    </AuthContext.Provider>
  )
}