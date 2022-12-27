import { UserDTO } from "../../../@types/dtos/user";

export interface RequestSignInData{ // Interface para requisição de Login
  email: string;
  password?: string;

}

// export interface ResponseSignInData{ // Interface response do endpoint de Login, com alguns campos não traçados como por exemplo o password, pois não tem necessidade do uso do password do usuário no app.
//   user: UserDTO // DTO seria interfaces com tratativas de dados com isso somente o necessário é colocado na interface.
// }

export type ResponseSignInData = Array<UserDTO>;