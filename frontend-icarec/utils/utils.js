import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
    nombreApellidos: Yup.string().required('El nombre y apellidos son obligatorios'),
    tipoDocumento: Yup.string().notOneOf(['default'], 'Selecciona un tipo de documento'),
    numeroDocumento: Yup.number()
        .integer('El número de documento debe ser un número entero')
        .positive('El número de documento debe ser positivo')
        .typeError('El número de documento es obligatorio')
        .required('El número de documento es obligatorio'),
    correoElectronico: Yup.string().email('Ingresa un correo electrónico válido').required('El correo electrónico es obligatorio'),
    password: Yup.string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/,
        'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial'
      )
      .required('La contraseña es obligatoria'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
      .required('Confirma tu contraseña'),
    terminosCondiciones: Yup.boolean().oneOf([true], 'Debes aceptar los términos y condiciones').required(),
  })