import { VaccineDTO } from "../../../@types/dtos/vaccine";

export interface GetVaccinesRequest extends VaccineDTO{
  search?: string;
}