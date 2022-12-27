import { UserDTO } from "../../@types/dtos/user";
import { RequestCreateUserData } from "../../services/resource/user/types";


interface RequestSignInData{
  email: string;
  password?: string;
}

export interface AuthContextProps{
  isSignedIn: boolean;
  loading: boolean;
  user?: UserDTO;
  signIn: (data: RequestSignInData) => Promise<void>
  signInApple: (userApple: string) => Promise<void>
  signUp: (data: RequestCreateUserData) => Promise<void>
  signOut: () => void;
  checkifExistUser: (params: Partial<UserDTO>) => Promise<boolean>;

}


export const asyncUserKeys={
  user: 'Vacinadex:user'
}