import * as yup from 'yup'

export const schemaLogin = yup.object({
  email: yup.string().email('Email Inválido').required('Campo Obrigatório'),
  password: yup.string().min(6, 'Necessário pelo menos 6 caracteres.')
})