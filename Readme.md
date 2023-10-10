![HenryLogo](./frontend-icarec/public/metadata/frame2.png)
<!-- La finalidad de Kuskana es permitir que cualquier negocio pueda crear su perfil de manera gratuita y generar su propia página web de forma sencilla, sin requerir un gran esfuerzo. Esto les permite ganar interacciones de los demás internautas al experimentar con el negocio que ofrecen, lo que puede llevarlos a clasificar en los primeros lugares. Además, los negocios tienen la opción de compartir su página web en las redes sociales a través de un enlace que permite a los usuarios ponerse en contacto con ellos. -->

<!-- Uno de los objetivos clave del proyecto es crear alcance y tráfico en la plataforma web. Esto es esencial para implementar estrategias de publicidad y promoción efectivas. -->
<!-- Otro objetivo importante es dar seguimiento a los usuarios a través de su registro en nuestra plataforma. Este seguimiento y análisis del comportamiento de los usuarios nos proporciona información valiosa para mejorar la experiencia del usuario y nuestras estrategias de marketing. -->
<!-- El proyecto también busca fomentar una especie de competitividad. Al permitir a los negocios obtener interacciones positivas y mejorar su visibilidad, Kuskana crea un entorno en el que los negocios compiten por atraer a los usuarios y mejorar sus calificaciones. Esto impulsa la mejora continua y la calidad de los servicios ofrecidos. -->

# Kuskana - Directorio de Negocios
Kuskana es un Directorio de Negocios con el objetivo de permitir que cualquier empresa pueda crear su perfil de negocio de manera gratuita y generar su propio sitio web de forma sencilla, sin esfuerzo excesivo. Esto brinda a las empresas la oportunidad de experimentar y mostrar sus productos y servicios, lo que les permite atraer la atención e interacción de los visitantes de la plataforma. Al obtener interacciones positivas, los negocios pueden mejorar su visibilidad y posicionamiento en los resultados de búsqueda, lo que, a su vez, les proporciona una ventaja competitiva.

## Objetivos del Proyecto
- **Generar Alcance y Tráfico Web:** El proyecto busca aumentar el tráfico en la plataforma a través de la creación de perfiles de negocio y la interacción de los usuarios. A medida que más usuarios experimentan y se relacionan con los negocios, se incrementa el tráfico web, lo que, a su vez, permite la implementación de estrategias de publicidad.

- **Seguimiento de Usuarios:** Kuskana rastrea a los usuarios a través de su registro en la plataforma. Esto permite un seguimiento y análisis efectivo del comportamiento de los usuarios, lo que puede ser útil para mejorar la experiencia del usuario y las estrategias de marketing.

- **Fomentar la Competitividad:** Al permitir a los negocios obtener interacciones positivas y mejorar su visibilidad, Kuskana crea una especie de competitividad. Los negocios compiten por atraer a los usuarios y mejorar sus calificaciones, lo que impulsa la mejora continua y la calidad de los servicios ofrecidos.



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
