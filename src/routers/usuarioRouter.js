import express from "express";
import {
  confirmar,
  formularioLogin,
  formularioOlvidePassword,
  formularioRegistro,

  registrar
} from "../controllers/usuarioController.js";

const router = express.Router();

//Routing
router.get("/login", formularioLogin);
router.get("/registro", formularioRegistro);
router.post("/registro", registrar);
//Insercion de variable en la url, para este caso el token
router.get("/confirmar/:token", confirmar);
router.get("/olvide-password", formularioOlvidePassword);

export default router;
