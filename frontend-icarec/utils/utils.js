import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
    nombreApellidos: Yup.string().required('El nombre y apellidos son obligatorios'),
    tipoDocumento: Yup.string().notOneOf(['default'], 'Selecciona un tipo de documento'),
    numeroDocumento: Yup.number()
        .integer('El número de documento debe ser un número entero')
        .positive('El número de documento debe ser positivo')
        .typeError('El número de documento es obligatorio')
        .required('El número de documento es obligatorio'),
    celular: Yup.number()
    .integer('El celular debe ser un número entero')
    .positive('El celular debe ser positivo')
    .typeError('El celular es obligatorio')
    .required('El celular es obligatorio'),
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

  /* export const validationSchemaWithoutCredentials = Yup.object().shape({
    nombreApellidos: Yup.string().required('El nombre y apellidos son obligatorios'),
    tipoDocumento: Yup.string().notOneOf(['default'], 'Selecciona un tipo de documento'),
    numeroDocumento: Yup.number()
        .integer('El número de documento debe ser un número entero')
        .positive('El número de documento debe ser positivo')
        .typeError('El número de documento es obligatorio')
        .required('El número de documento es obligatorio'),
    celular: Yup.number()
    .integer('El celular debe ser un número entero')
    .positive('El celular debe ser positivo')
    .typeError('El celular es obligatorio')
    .required('El celular es obligatorio'),
    terminosCondiciones: Yup.boolean().oneOf([true], 'Debes aceptar los términos y condiciones').required(),
  }) */

  export const validationSchemaWithoutCredentials = Yup.object().shape({
    //tipoDocumento: Yup.string().notOneOf(['default'], 'Selecciona un tipo de documento'),
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