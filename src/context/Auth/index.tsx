import { createContext, useState } from "react";
import { UserDTO } from "../../@types/dtos/user";
import { AuthContextProps } from "./types";

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);
// Colocado esse as no objeto dentro do Context para evittar de dar erro no typescript,
// com isso meio que estou definindo que esse objeto atende todos as props da interface
// AuthContextProps.

export const AuthProvider: React.FC = ({children}) => {
  const [user, setUser] = useState<UserDTO>();
  const [loading, setLoading] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false)

  /**
   * Callbacks
   */

  const signIn = async (data : {email?: string; password?: string}) => {
    setLoading(true)
    await new Promise(resolve => setTimeout(() => resolve('OK'), 2000))
    setLoading(false)
    setIsSignedIn(true)
    setUser({id: 'dsadsa9123hdsuah8d'})
  }

  const signOut = () => {
    setIsSignedIn(false)
    setUser(undefined)
  }

  return(
    <AuthContext.Provider value={{user, loading, isSignedIn, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  )
}