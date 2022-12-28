import { VaccineDTO } from "../../../@types/dtos/vaccine";
import api from "../../api";

export async function getVaccines(params: Partial<VaccineDTO>) : Promise<Array<VaccineDTO>>{
  const {data} = await api.get(`/users/${params.userID}/vaccines`); // Desconstroi o retorno do axios pra data que já é o resultado do VaccineDTO;
  return data
} 