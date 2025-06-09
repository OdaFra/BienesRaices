import express from 'express';
import { admin, crear } from '../controllers/propiedadesController.js';

//Routes
const router = express.Router();

//path:
router.get('/mis-propiedades',admin);
router.get('/propiedades/crear',crear);



export default router;