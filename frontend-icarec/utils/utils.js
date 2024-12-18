const jwt = require('jsonwebtoken')
import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
  fullName: Yup
    .string()
    .required('El nombre y apellidos son obligatorios')
    .test('es-nombre-apellido', 'Debe ser un nombre y apellido válido', (value) => {
      const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s']+$/   
      return regex.test(value)
  }),
  sex: Yup.string()
    .oneOf(['Hombre', 'Mujer'], 'Debes seleccionar una opción de género.')
    .required('Debes seleccionar tu sexo.'),
    documentType: Yup.string()
    .oneOf(['default', 'DNI'], 'Selecciona un tipo de documento válido')
    .required('El tipo de documento es obligatorio'),
  documentNumber: Yup.string()
    .nullable() // Permite que sea null o vacío
    .matches(/^\d*$/, 'El número de documento debe ser un número entero positivo'),
  phoneNumber: Yup.number()
    .integer('El celular debe ser un número entero')
    .positive('El celular debe ser positivo')
    .typeError('El celular es obligatorio')
    .required('El celular es obligatorio'),
  phoneCode: Yup.number()
    .required('El codigo de pais es requerido'),
  email: Yup.string()
    .email('Ingresa un correo electrónico válido').required('El correo electrónico es obligatorio'),
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
  })

export const validationSchemaWithoutCredentials = Yup.object().shape({
  documentType: Yup.string()
    .oneOf(['default', 'DNI'], 'Selecciona un tipo de documento válido')
    .required('El tipo de documento es obligatorio'),
  documentNumber: Yup.string()
    .nullable() // Permite que sea null o vacío
    .matches(/^\d*$/, 'El número de documento debe ser un número entero positivo'),
  phoneNumber: Yup.number()
    .integer('El celular debe ser un número entero')
    .positive('El celular debe ser positivo')
    .typeError('El celular es obligatorio')
    .required('El celular es obligatorio'),
  phoneCode: Yup.number()
    .required('El codigo de pais es requerido'),
  sex: Yup.string()
    .oneOf(['Mujer', 'Hombre'], 'Debes seleccionar una opción de género.')
    .required('Debes seleccionar tu sexo.'),
})

export const validationLogin = Yup.object().shape({
  email: Yup.string()
    .email('Ingrese un correo electrónico válido')
    .required('Ingrese su correo electrónico'),
  password: Yup.string()
    .required('Ingrese su contraseña'),
})

export const validationForgotPassword = Yup.object().shape({
  email: Yup.string()
    .email('Ingrese un correo electrónico válido')
    .required('Ingrese su correo electrónico'),
})

export const validationPasswords = Yup.object().shape({
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
})

export const logEvent = (action) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action)
  }
}

export const getTokenExpirationTime = async(token) => {
  try {
    const decodedToken = jwt.decode(token)

    if (decodedToken && decodedToken.exp) {
      const expirationTimestamp = decodedToken.exp
      const currentTime = Math.floor(Date.now() / 1000)
      const timeLeftInSeconds = expirationTimestamp - currentTime

      return timeLeftInSeconds;
    } else {
      return null
    }
  } catch (error) {
    console.error('Error al decodificar el token:', error)
    return null
  }
}