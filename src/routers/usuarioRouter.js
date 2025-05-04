import express from "express";
import {
  autenticar,
  comporbararToken,
  confirmar,
  formularioLogin,
  formularioOlvidePassword,
  formularioRegistro,
  nuevoPassword,
  registrar,
  resetPassword
} from "../controllers/usuarioController.js";

const router = express.Router();

//Routing
router.get("/login", formularioLogin);
router.post("/login", autenticar);

router.get("/registro", formularioRegistro);
router.post("/registro", registrar);

//Ruta para confirmar cuenta
router.get("/olvide-password", formularioOlvidePassword);// Ruta para recuperar password 
router.post("/olvide-password", resetPassword);

//Insercion de variable en la url, para este caso el token
router.get("/confirmar/:token", confirmar);
//Almacena el nuevo password
router.get("/olvide-password/:token", comporbararToken);
router.post("/olvide-password/:token", nuevoPassword);


export default router;
