

import { DataTypes } from "sequelize";
import db from "../config/db.js";

// Modelo para tabla de Categorias en la db.
const Categoria = db.define("categorias", { 
    nombre:{
        type: DataTypes.STRING(30),
        allowNull: false
    }
 });

export default Categoria