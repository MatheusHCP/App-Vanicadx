import { UserDTO } from "../../@types/dtos/user";
import { RequestCreateUserData } from "../../services/resource/user/types";


interface RequestSignInData{
  email: string;
  password: string;
}

export interface AuthContextProps{
  isSignedIn: boolean;
  loading: boolean;
  user?: UserDTO;
  signIn: (data: RequestSignInData) => Promise<void>
  signUp: (data: RequestCreateUserData) => Promise<void>
  signOut: () => void;

}


export const asyncUserKeys={
  user: 'Vacinadex:user'
}