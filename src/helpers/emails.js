import nodemailer from "nodemailer";

const emailRegistro = async (datos) => {
  var transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  console.log(datos);
  const { email, nombre, token } = datos;
  // Enviar el mail
  await transport.sendMail({
    from: "Bienes Raices",
    to: email,
    subject: "Confirma tu cuenta en Bienes Raices",
    text: "Confirma tu cuenta en Bienes Raices",
    html: `
                <p>Hola ${nombre}, comprueba tu cuenta en Bienes Raices </p>
                <p>Tu cuenta ya esta casi lista, solo debes confirmarla en el siguiente enlace: 
                <a href="${process.env.BACKEND_URL}:${
                  process.env.PORT ?? 3000
                }/auth/confirmar/${token}">Confirmar cuenta</a> </p>

                <p> Si tu no creaste esta cuenta, puedes ignorar el mensaje </p>
            `,
  });
};

export { emailRegistro };
