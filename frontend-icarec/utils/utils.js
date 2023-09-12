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
    .notOneOf(['default'], 'Selecciona un tipo de documento')
    .required('El tipo de documento es obligatorio'),
  documentNumber: Yup.number()
      .integer('El número de documento debe ser un número entero')
      .positive('El número de documento debe ser positivo')
      .typeError('El número de documento es obligatorio')
      .required('El número de documento es obligatorio'),
  phoneNumber: Yup.number()
  .integer('El celular debe ser un número entero')
  .positive('El celular debe ser positivo')
  .typeError('El celular es obligatorio')
  .required('El celular es obligatorio'),
  email: Yup.string().email('Ingresa un correo electrónico válido').required('El correo electrónico es obligatorio'),
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
    .notOneOf(['default'], 'Selecciona un tipo de documento')
    .required('El tipo de documento es obligatorio'),
  documentNumber: Yup.number()
    .integer('El número de documento debe ser un número entero')
    .positive('El número de documento debe ser positivo')
    .typeError('El número de documento es obligatorio')
    .required('El número de documento es obligatorio'),
  phoneNumber: Yup.number()
    .integer('El celular debe ser un número entero')
    .positive('El celular debe ser positivo')
    .typeError('El celular es obligatorio')
    .required('El celular es obligatorio'),
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

export const logPageView = (pageName) => {
  if (typeof window !== 'undefined') {
      const pagePath = window.location.pathname
      if (window.gtag) {
          window.gtag('event', 'page_view', {
              'page_title': pageName,
              'page_path': pagePath || 'default/rute'
          })
      } else {
          console.log("window.gtag is not available. Analytics not tracked.")
      }
  }
}

export const logEvent = (action) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action)
  }
}