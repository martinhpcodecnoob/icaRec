import * as Yup from 'yup'
import ReactGA from 'react-ga'

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
      /* .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/,
        'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial'
      ) */
      .required('La contraseña es obligatoria'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
      .required('Confirma tu contraseña'),
    terminosCondiciones: Yup.boolean().oneOf([true], 'Debes aceptar los términos y condiciones').required(),
  })

  export const initGA = () => {
    ReactGA.initialize(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID)
    // Deshabilitar las características publicitarias
    ReactGA.ga('set', 'allowAdFeatures', false);

    console.log("Se inicializa google analytics")
  }
  
  export const logPageView = (pageName) => {
    ReactGA.set({ page: pageName })
    ReactGA.pageview(pageName)
  };
  
  export const logEvent = (category, action, label) => {
    ReactGA.event({
      category,
      action,
      label,
    })
  }