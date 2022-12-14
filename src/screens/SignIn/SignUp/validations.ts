import * as yup from 'yup'

export const schemaSignup = yup.object({
  email: yup.string().email('Email Inválido').required('Campo Obrigatório'),
  firstName: yup.string().required('Campo obrigatório'),
  lastName: yup.string().required('Campo obrigatório'),
})