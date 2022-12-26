import * as yup from 'yup';


export const schemaAddVaccineManually = yup.object({
  name: yup.string().email('Email inválido').required('Campo Obrigatório'),
  brand: yup.string().required('Campo Obrigatório'),
  applicationDate: yup.string().required('Campo Obrigatório'),
  applicationLocation: yup.string().required('Campo Obrigatório'),
  nextApplicationDate: yup.string()
})