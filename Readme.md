![HenryLogo](./frontend-icarec/public/metadata/frame2.png)

# Kuskana - Directorio de Negocios
Kuskana es un Directorio de Negocios con el objetivo de permitir que cualquier empresa pueda crear su perfil de negocio de manera gratuita y generar su propio sitio web de forma sencilla, sin esfuerzo excesivo. Esto brinda a las empresas la oportunidad de experimentar y mostrar sus productos y servicios, lo que les permite atraer la atención e interacción de los visitantes de la plataforma. Al obtener interacciones positivas, los negocios pueden mejorar su visibilidad y posicionamiento en los resultados de búsqueda, lo que, a su vez, les proporciona una ventaja competitiva.

## Objetivos del Proyecto
- **Generar Alcance y Tráfico Web:** El proyecto busca aumentar el tráfico en la plataforma a través de la creación de perfiles de negocio y la interacción de los usuarios. A medida que más usuarios experimentan y se relacionan con los negocios, se incrementa el tráfico web, lo que, a su vez, permite la implementación de estrategias de publicidad.

- **Seguimiento de Usuarios:** Kuskana rastrea a los usuarios a través de su registro en la plataforma. Esto permite un seguimiento y análisis efectivo del comportamiento de los usuarios, lo que puede ser útil para mejorar la experiencia del usuario y las estrategias de marketing.

- **Fomentar la Competitividad:** Al permitir a los negocios obtener interacciones positivas y mejorar su visibilidad, Kuskana crea una especie de competitividad. Los negocios compiten por atraer a los usuarios y mejorar sus calificaciones, lo que impulsa la mejora continua y la calidad de los servicios ofrecidos.

# Front-end
1. La cabecera estan compuesta por navegacion a las subrutas y logueo del usuario, 
2. El segundo en componente carrousel que tiene como funcion publicitar imagenes de terceros
3. Este componente tiene la funcion de destacar los negocios de nuestra plataforma a las personas que han hecho un pago donde solo habra espacio de cuatro negocios. 
4. En si son todas las cards de un negocio que se mostraran ya sea en un modal en la misma landing que se muestre, se podra redireccionar su propia pagina personal del negocio. En cada card mostrara la cantidad de recomendaciones de parte del cliente.

## Rutas
Existen 5 rutas cada uno con una funcion diferente.

- **/myweb:** La ruta en si muestra la informacion completa y contacto del cliente donde en esta parte figurara lo que hace y que ofrece, mas las imagenes de contenido de su negocio, los users podran interaccionar dando un "recomiendame" y tambien podra editar su negocio desde otra ruta que en si es /mybusiness y podran usar el servicio de google Maps para ubicar donde esta dicho negocio.

- **/mybusiness:** La ruta nos proporcionara crear el negocio con un limite de 3 imagenes y peso de 1.5mb ya que para almacenar las imagenes usamos cloudinary en una carpeta del cliente que solo se visualiza en la misma plataforma de cloudinary en si las imagenes fueron algo complicadas ya que cuando uno guarda las imagenes lo hace de manera local en el navegador pero en el momento de guardar esta se guardan en cloudinary y genera un link de cloudinary para reemplazar el link de imagen local por una imagen ya almacenda en el cloudinary, se integro un componente cards  que tiene doble funcion una que edite la ubicacion donde esta y la otra figura donde esta ubicado y no se pueda editar. La ruta misma nos proporcionara para editar el negocio en el mismo link incluyendo los parametros de id del negocio a editar.

- **/register:** La ruta nos proporciona un formulario donde se registra el usuario logueado ya sea por google o facebook donde no es necesario que cree una credencial de correo y contraseña. Existira como ultimo paso el registro de algunas carateristicas del usuario como sexo, telefono y ciudad. Este registro contiene muy pocos campos a rellenar.

- **/newUser:** La otra ruta es un regitro en nuestra misma plataforma ya sea que no pueda loguearse con las otras dos opciones de logue donde obtendra un formulario con mas campos a registrar y creando asi una correo de ingreso y password. Se utilizo resend para poder mandar un email donde se le da la bienvenida al usuario por su registro.

- **/recover-password:** La ruta nos proporcionara una forma de restablecer nuestra contraseña por medio de Resend enviamos un correo al usuario y le damos un link de redireccion a una page de restablecimiento de contraseña, la page tiene una duracion temporal de unos minutos pasando ese tiempo el link de restablecimiento no es valido.

# Backend

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

# Soft tech

<table align="center">
    <tr>
        <td align="center" width="100">
            <a href="#">
                <img src="https://assets-global.website-files.com/63b5c0982b18e6411f506075/64762b5b48d53f174fe39dd5_nextjs-may-30.png" width="50" alt="NextJS"/>
            </a>
            <br>NextJS
        </td>
        <td align="center" width="100">
            <a href="#">
                <img src="https://assets.website-files.com/61ca3f775a79ec5f87fcf937/6202fcdee5ee8636a145a41b_1234.png" width="50" alt="ExpressJS"/>
            </a>
            <br>ExpressJS
        </td>
        <td align="center" width="100">
            <a href="#">
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg" width="50" alt="Javascript"/>
            </a>
            <br>Javascript
        </td>
        <td align="center" width="100">
            <a href="#">
                <img src="https://raw.githubusercontent.com/sachinverma53121/sachinverma53121/master/icons/redux.png" width="50" alt="Redux"/>
            </a>
            <br>Redux
        </td>
        <td align="center" width="100">
            <a href="#">
                <img src="https://w7.pngwing.com/pngs/834/472/png-transparent-google-cloud-icon-google-cloud-platform-cloud-computing-amazon-web-services-virtual-private-cloud-cloud-computing-text-trademark-service-thumbnail.png" width="50" alt="Google cloud"/>
            </a>
            <br>Google cloud
        </td>
        <td align="center" width="100">
            <a href="#">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/200px-Node.js_logo.svg.png" width="50" alt="NodeJS"/>
            </a>
            <br>NodeJS
        </td>
    </tr>
    <tr>
        <td align="center" width="100">
            <a href="#">
                <img src="https://w7.pngwing.com/pngs/956/695/png-transparent-mongodb-original-wordmark-logo-icon-thumbnail.png" width="50" alt="MongoDB"/>
            </a>
            <br>MongoDB
        </td>
        <td align="center" width="100">
            <a href="#">
                <img src="https://raw.githubusercontent.com/Automattic/mongoose/642abd1997c1682c88c796fe3713d9c65188e01c/docs/images/mongoose.svg" width="50" alt="Mongoose"/>
            </a>
            <br>Mongoose
        </td>
        <td align="center" width="100">
            <a href="#">
                <img src="https://files.raycast.com/sjxs3pxsc6k63ju0fzv8l3cu4v90" width="50" alt="TailwindCSS"/>
            </a>
            <br>TailwindCSS
        </td>
        <td align="center" width="100">
            <a href="#">
                <img src="https://flowbite.s3.amazonaws.com/brand/logo-dark/mark/flowbite-logo.png" width="50" alt="Flowbite"/>
            </a>
            <br>Flowbite
        </td>
        <td align="center" width="100">
            <a href="#">
                <img src="https://cloudinary-res.cloudinary.com/image/upload/website/cloudinary_web_favicon.png" width="50" alt="Cloudinary"/>
            </a>
            <br>Cloudinary
        </td>
        <td align="center" width="100">
            <a href="#">
                <img src="https://cdn.sanity.io/images/599r6htc/localized/46a76c802176eb17b04e12108de7e7e0f3736dc6-1024x1024.png?w=804&h=804&q=75&fit=max&auto=format" width="50" alt="Figma"/>
            </a>
            <br>Figma
        </td>
    </tr>
    <tr>
        <td align="center" width="100">
            <a href="#">
                <img src="https://raw.githubusercontent.com/aksh4y/aksh4y.github.io/27a3b9d8302864ffb5d2e72a1c952b6e95b8b950/src/asset/images/mongodb-atlas.png" width="50" alt="Mongo Atlas"/>
            </a>
            <br>Mongo Atlas
        </td>
        <td align="center" width="100">
            <a href="#">
                <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" width="50" alt="Git"/>
            </a>
            <br>Git
        </td>
        <td align="center" width="100">
            <a href="#">
                <img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" width="50" alt="Postman"/>
            </a>
            <br>Postman
        </td>
        <td align="center" width="100">
            <a href="#">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxfnGNQzNvQsyBIj26EvQZrEPtkz2vCrOJA7aB0ZHdCvq_Lh0e8B3TjjvUZSOgpX0Kcls&usqp=CAU" width="50" alt="Auth0"/>
            </a>
            <br>Auth0
        </td>
        <td align="center" width="100">
            <a href="#">
                <img src="https://cdn.worldvectorlogo.com/logos/jwt-3.svg" width="50" alt="JWT"/>
            </a>
            <br>JWT
        </td>
        <td align="center" width="100">
            <a href="#">
                <img src="https://cdn.theorg.com/4a037ad1-1c27-47bf-be6e-27c556000049_thumb.jpg" width="50" alt="Resend"/>
            </a>
            <br>Resend
        </td>
    </tr>
</table>

# Restricciones
* No se puede crear un negocio hasta que el usuario se haya registrado o logueado, tampoco puede entrar a la ruta /mybusiness ya que bloqueara su acceso con un mensaje

* No podra editar los negocios de otros usuarios a excepcion del suyo.

* No podra poner mas 3 imagenes y un peso de 1.5mb

* Exite roles en los usuarios donde el rol "admin" tendra la opcion de descargar la data en excel y figura todos los usuarios registrados en la plataforma.

# Seguridad
En Kuskana, la seguridad es una prioridad. Para garantizarla, implementamos un sistema de acceso que utiliza dos tipos de tokens: access tokens y refresh tokens. Los access tokens permiten a los usuarios navegar por la plataforma de manera segura, accediendo a las diferentes funcionalidades. Mientras tanto, los refresh tokens les otorgan la capacidad de renovar sus access tokens, mejorando así la protección de sus cuentas.

Además, hemos incorporado un sistema de recuperación de contraseñas que agrega una capa adicional de seguridad. Cuando los usuarios necesitan restablecer sus contraseñas, se genera un token de contraseña con una vigencia de una hora. Esto garantiza que el proceso sea seguro y minimiza el riesgo de accesos no autorizados.

Para gestionar la autenticación y las sesiones de usuarios, utilizamos Next.js con NextAuth, que nos proporciona una capa de seguridad adicional al proteger nuestras sesiones a través de un secreto en las variables de entorno.

# Developers Full Stack Web
## Julio Castro Alejos
Desarrollador Backend: 
<a href="https://www.linkedin.com/in/julio-castro-alejos-a4711920b/" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="/martinhpcoding" height="20" width="40" /></a>
<p align="left">
<img src="https://media.licdn.com/dms/image/D4D35AQGTU_VoSkVzTg/profile-framedphoto-shrink_200_200/0/1682366345946?e=1697655600&v=beta&t=FXNSbR5SXVaWoJNmn9D4b7iEARTQ2EbXRXXuJhohJeE" width="80" style="border-radius: 50%;" />

## Martin Hernandez Peña
Desarrollador Frontend: 
<a href="https://www.linkedin.com/in/martinhpcoding/" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="/martinhpcoding" height="20" width="40" /></a>
<p align="left">
<img src="https://media.licdn.com/dms/image/D4E35AQH2r1tkO5N7Ug/profile-framedphoto-shrink_200_200/0/1682434191438?e=1697652000&v=beta&t=0TJsV8voncJbId-bPKJOAnITYqBnX-v_Zut5aUsP09w" width="80" style="border-radius: 50%;" />

