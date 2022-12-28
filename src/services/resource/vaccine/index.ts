import { VaccineDTO } from "../../../@types/dtos/vaccine";
import useAuth from "../../../hooks/useAuth";
import api from "../../api";
import { GetVaccinesRequest } from "./types";

export async function getVaccines(params: Partial<GetVaccinesRequest>) : Promise<Array<VaccineDTO>>{
  const {data} = await api.get(`/vaccines`, {params}); // Desconstroi o retorno do axios pra data que já é o resultado do VaccineDTO;
  return data
} 