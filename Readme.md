![HenryLogo](./frontend-icarec/public/metadata/frame2.png)
# Kuskana -  Directorio de Negocios
Su finalidad es poder que cualquier negocio pueda crear un negocio de manera gratuita y que pueda crear su propia web sencilla sin tanto esfuerzo y ganarse interacciones de los demas internautas al experimentado el negocio que ofrece y asi quedar en los primeros lugares, tiene la opcion de compartir su propia web en las redes con link que lo llevan directamente a contactarse.
## Objetivos del Proyecto
- Crear alcance y trafico de la web para poder implementar publicidad
- Dar seguimiento a los usuarios a travez de los registro a nuestra paltaforma
- Crear una especie de competitividad

## Modelos
- **Account Model:** El modelo "Account" se utiliza para gestionar la información relacionada con las cuentas de usuario en la aplicación. Contiene campos como la contraseña, el proveedor de autenticación, el tipo de autenticación, el ID de usuario, y otros datos relacionados con la autenticación y la gestión de cuentas de usuario. Este modelo es esencial para la administración de cuentas y la seguridad de los usuarios en la aplicación.
- **Business Model:** El modelo "Business" se encarga de la gestión de información relacionada con los negocios en la aplicación. Contiene campos que describen detalles del negocio, como el nombre, la ubicación, coordenadas de ubicación, descripción, número de teléfono, enlaces a redes sociales, sitio web, horario, servicios ofrecidos, imágenes y el propietario del negocio. Este modelo es fundamental para la administración y presentación de información de negocios en la aplicación.
- **User Model:** El modelo "User" se utiliza para gestionar la información de usuarios en la aplicación. Contiene campos que almacenan detalles de usuario, como nombre, número de teléfono, DNI, correo electrónico, sexo, roles, fecha de creación de usuario y la asociación a negocios. Este modelo es esencial para administrar la información de usuarios y sus relaciones con otros elementos en la aplicación.
- **Interaction Model:** El modelo "Interaction" se utiliza para gestionar las interacciones entre usuarios y negocios en la aplicación. Contiene campos que indican si un usuario ha indicado que le gusta un negocio, y registra las relaciones entre usuarios y negocios. Este modelo es fundamental para rastrear y gestionar las interacciones y recomendaciones de los usuarios hacia los negocios en la aplicación.

## Controladores
La carpeta "controllers" contiene varios controladores que gestionan diferentes aspectos de la aplicación. A continuación, se proporciona una descripción general de cada sección de controladores:

- **Auth:** El controlador "Auth" es fundamental en la aplicación, ya que se encarga de la autenticación y gestión de usuarios. Proporciona un conjunto de funciones clave para gestionar la creación de cuentas, el inicio de sesión, la gestión de contraseñas y la seguridad en general. Además, maneja la generación y renovación de tokens de acceso para asegurar la autenticación de los usuarios y mantener sus sesiones activas. Esta sección es esencial para garantizar la seguridad y la experiencia del usuario en la aplicación.

- **Users:** La sección "Users" se encarga de la gestión de usuarios en la aplicación. Proporciona un conjunto de funciones para interactuar con los perfiles de usuario, lo que incluye la obtención de información de usuario, la creación de nuevos perfiles, la actualización de datos de usuario y la búsqueda de usuarios por identificación única. Estas funciones son esenciales para gestionar y personalizar perfiles de usuario en la aplicación.

- **Business:** La sección "Business" se encarga de la gestión de negocios en la aplicación y proporciona un conjunto de funciones clave para interactuar con la información de negocios y llevar a cabo operaciones relacionadas con la administración de negocios. Estas funciones permiten obtener información detallada de negocios, crear nuevos perfiles de negocios, obtener información sobre los servicios ofrecidos, actualizar la información de los negocios y gestionar la eliminación de negocios y datos asociados. 

- **Interactions:** El controlador "Interactions" se encarga de las interacciones entre usuarios y negocios. Su función principal es permitir a los usuarios dar "like" o "recomendar" negocios. Proporciona rutas y funciones relacionadas con estas acciones, lo que permite a los usuarios expresar su aprecio por los negocios y dejar recomendaciones. Estas interacciones pueden ayudar a otros usuarios a descubrir negocios populares y confiables en la plataforma.

- **Services:** La sección "Services" proporciona un conjunto de servicios esenciales para el funcionamiento de la aplicación. Estos servicios incluyen el envío de correos electrónicos, notificaciones y otras funcionalidades necesarias para mantener a los usuarios informados y comprometidos.

Cada uno de estos controladores tiene rutas y funciones específicas para llevar a cabo las operaciones relacionadas con su área de responsabilidad. Consulta la documentación específica de cada controlador para obtener más detalles sobre las rutas y funciones disponibles.
