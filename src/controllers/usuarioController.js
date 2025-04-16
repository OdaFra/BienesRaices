import { check, validationResult } from "express-validator";
import { emailRegistro, olvidePassword } from "../helpers/emails.js";
import { generarId } from "../helpers/token.js";
import Usuario from "../models/Usuario.js";

// CONTROLLERS
// -> LOGIN
const formularioLogin = (req, res) => {
  res.render("auth/login", {
    pagina: "Inicio de sesión",
  });
};

// -> Registrar
const formularioRegistro = (req, res) => {
  res.render("auth/registro", {
    pagina: "Crear cuenta",
    csurfToken: req.csrfToken(),
  });
};

const registrar = async (req, res) => {
  //validar
  await check("nombre")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .run(req);
  await check("email")
    .isEmail()
    .withMessage("El email es obligatorio")
    .run(req);
  await check("password")
    .isLength({ min: 6 })
    .withMessage("El password es obligatorio y debe ser minimo de 6 caracteres")
    .run(req);
  await check("repetir_password")
    .equals(req.body.password)
    .withMessage("Los passwords no son iguales")
    .run(req);

  let resultado = validationResult(req);

  // Verificar que el resultado este vacio

  if (!resultado.isEmpty()) {
    return res.render("auth/registro", {
      pagina: "Crear cuenta",
      //Errores
      errores: resultado.array(),
      usuario: {
        nombre: req.body.nombre,
        email: req.body.email,
      },
      csurfToken: req.csrfToken(),
    });
  }

  //Extraer los datos
  const { nombre, email, password } = req.body;

  //Verificar que el usuario no este duplicado
  const existeUsuario = await Usuario.findOne({ where: { email } });

  if (existeUsuario) {
    return res.render("auth/registro", {
      pagina: "Crear Cuenta",
      errores: [{ msg: "El usuario ya esta registrado" }],
      csurfToken: req.csrfToken(),
      usuario: {
        nombre: nombre,
        email: email,
      },
    });
  }
  // Almacenar el usuario
  const usuario = await Usuario.create({
    nombre,
    email,
    password,
    token: generarId(),
  });

  // Enviar email de confirmacion

  emailRegistro({
    nombre: usuario.nombre,
    email: usuario.email,
    token: usuario.token,
  });

  //Mostrar mensaje de confirmacion
  res.render("templates/mensaje", {
    pagina: "Cuenta Creada Correctamente",
    mensaje: "Hemos enviado un email de confirmacion, presiona en el enalce",
  });
};

// -> Confirmar cuenta (comprobar)
const confirmar = async (req, res) => {
  const { token } = req.params;

  //Verificar si el token es valido para confirmar tu cuenta
  const usuario = await Usuario.findOne({
    where: {
      token,
    },
  });

  if (!usuario) {
    return res.render("auth/confirmar-cuenta", {
      pagina: "Error al confirmar cuenta",
      mensaje: "Hubo un error al confirmar tu cuenta",
      error: true,
    });
  }
  try {
    usuario.token = null;
    usuario.confirmado = true;
    await usuario.save();
    res.render("auth/confirmar-cuenta", {
      pagina: "Cuenta confirmada",
      mensaje: "Tu cuenta ha sido confirmada correctamente",
    });
  } catch (error) {
    return res.render("auth/confirmar-cuenta", {
      pagina: "Error al confirmar cuenta",
      mensaje: "Hubo un error al confirmar tu cuenta",
      error: true,
    });
  }
};

// -> Olvide mi pass
const formularioOlvidePassword = (req, res) => {
  res.render("auth/olvide-password", {
    pagina: "Recupera tu acceso a Bienes raices",
    csurfToken: req.csrfToken(),
  });
};

//Reset de password
const resetPassword = async (req, res) => {
  //validar

  await check("email")
    .isEmail()
    .withMessage("El email es obligatorio")
    .run(req);

  let resultado = validationResult(req);

  // Verificar que el resultado este vacio

  if (!resultado.isEmpty()) {
    return res.render("auth/olvide-password", {
      pagina: "Recupera tu acceso a Bienes raices",
      _csrf: req.csrfToken(),
      errores: resultado.array(),
    });
  }
  // Si el email existe
  const { email } = req.body;
  const existeUsuario = await Usuario.findOne({ where: { email } });

  if (!existeUsuario) {
    return res.render("auth/olvide-password", {
      pagina: "Recupera tu acceso a Bienes raices",
      _csrf: req.csrfToken(),
      errores: [{ msg: "El email no pertenece a ningun usuario" }],
    });
  }
  // Generar un token y enviar al email

  existeUsuario.token = generarId();
  await existeUsuario.save();
  //Enviar el email
  olvidePassword({
    nombre: existeUsuario.nombre,
    email: existeUsuario.email,
    token: existeUsuario.token,
  });

  //Mostrar mensaje de confirmacion
  res.render("templates/mensaje", {
    pagina: "Reestablece tu password",
    mensaje: "Hemos enviado un email con las instrucciones",
  });
};
// -> Comprobar token
const comporbararToken = async (req, res) => {
  const { token } = req.params;
  //Verificar si el token es valido para confirmar tu cuenta
  const usuario = await Usuario.findOne({
    where: {
      token,
    },
  });

  if (!usuario) {
    return res.render("auth/confirmar-cuenta", {
      pagina: "Restablecer password",
      mensaje: "Hubo un error al comprobar tu identidad",
      error: true,
    });
  }
};

// -> Nuevo password
const nuevoPassword = async (req, res) => {};

export {
  comporbararToken,
  confirmar,
  formularioLogin,
  formularioOlvidePassword,
  formularioRegistro,
  nuevoPassword,
  registrar,
  resetPassword,
};
