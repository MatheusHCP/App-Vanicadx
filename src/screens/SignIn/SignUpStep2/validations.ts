import * as yup from 'yup';

export const schemaSignupStep2 = yup.object({
  password: yup
    .string()
    .required('Campo Obrigatório')
    .min(8, 'Necessário pelo menos 8 caracteres.'),
  confirmPassword: yup
    .string()
    .required('Campo obrigatório')
    .min(8, 'Necessário pelo menos 8 caracteres.')
    .oneOf([yup.ref('password')], "Senha não coincide com a informada"),
});
