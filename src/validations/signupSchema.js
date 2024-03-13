import { object, string, ref } from 'yup';

export const signupSchema = object().shape({
  email: string()
    .required('Email es obligatorio')
    .email('El email no válido'),
  password: string()
    .required('Contraseña es obligatoria')
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
  confirmPassword: string()
    .oneOf([ref('password'), null], 'Las contraseñas deben ser coincidir')
    .required('Confirmar contraseña es obligatoria')
});