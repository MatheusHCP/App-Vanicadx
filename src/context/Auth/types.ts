import { UserDTO } from "../../@types/dtos/user";


interface RequestSignInData{
  email: string;
  password: string;
}

export interface AuthContextProps{
  isSignedIn: boolean;
  loading: boolean;
  user?: UserDTO;
  signIn: (data: RequestSignInData) => Promise<void>
  signOut: () => void;

}