import { PlaceDTO } from "../../../@types/dtos/place";
import { VaccineDTO } from "../../../@types/dtos/vaccine";
import useAuth from "../../../hooks/useAuth";
import api from "../../api";
import { GetPlacesRequest } from "./types";

export async function getPlaces(params?: Partial<GetPlacesRequest>) : Promise<Array<PlaceDTO>>{
  const {data} = await api.get(`/vaccinationPlace`, {params}); // Desconstroi o retorno do axios pra data que já é o resultado do VaccineDTO;
  return data
} 