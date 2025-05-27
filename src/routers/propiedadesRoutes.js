import express from 'express';
import { admin } from '../controllers/propiedadController.js';

//Routes
const router = express.Router();

//path:
router.get('/mis-propiedades',admin);

export default router;