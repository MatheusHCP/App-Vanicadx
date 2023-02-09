import { UserDTO } from "../../../@types/dtos/user";
import api from "../../api";
import { RequestSignInData, ResponseSignInData } from "./types";

export const signInResource = async ({email, password}: RequestSignInData) : Promise<ResponseSignInData> => {
    const {data} = await api.get<ResponseSignInData>(`/users?email=${email}&password=${password}`)
    
      if(data.length == 0){
        throw 'Usuário não encontrado';
      }
    
    return data
}

export const signInAppleResource = async (userApple: string) : Promise<ResponseSignInData> => {
  const {data} = await api.get<ResponseSignInData>(`/users?userApple=${userApple}`)
  
    if(data.length == 0){
      throw 'Usuário não encontrado';
    }
  
  return data
}

export const checkIfExistUserResource = async (params: Partial<UserDTO>) : Promise<ResponseSignInData> => {
  const {data} = await api.get<ResponseSignInData>('/users', {
    params
  })
  
  return data
}