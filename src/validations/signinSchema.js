import { object, string } from 'yup';

export const signinSchema = object().shape({
  email: string()
    .required('Email es obligatorio'),
  password: string()
    .required('Contraseña es obligatoria')
});