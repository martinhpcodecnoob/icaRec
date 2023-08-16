const RegistrationEmailHTML = (clientName) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gracias por Registrarte</title>
</head>
<body style="font-family: Arial, sans-serif; text-align: center;">
    <h2>¡Gracias por Registrarte, ${clientName}!</h2>
    <p>Estimado ${clientName},</p>
    <p>Te damos la bienvenida a nuestro sitio y agradecemos tu registro. ¡Esperamos que disfrutes de nuestros servicios!</p>
    <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en ponerte en contacto con nuestro equipo de soporte.</p>
    <p>¡Esperamos verte pronto!</p>
    <br>
    <p>Atentamente,</p>
    <p>El Equipo de Tiendas é</p>
</body>
</html>
`;

module.exports = {RegistrationEmailHTML}