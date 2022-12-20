import { UserDTO } from "../../../@types/dtos/user";

export interface RequestCreateUserData { // Interface para requisição de Login
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface ResponseCreateUserData{
  user: UserDTO

}