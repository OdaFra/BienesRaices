import { DataTypes } from "sequelize";
import db from "../config/db.js";

// Modelo para tabla de Precio en la db.
const Precio = db.define("precios", { 
    nombre:{
        type: DataTypes.STRING(30),
        allowNull: false
    }
 });

export default Precio