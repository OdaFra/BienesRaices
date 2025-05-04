import bcrypt from "bcrypt";
import { DataTypes } from "sequelize";
import db from "../config/db.js";

//Modelo para crear la tabla y definir las columnas para la db
const Usuario = db.define(
  "usuarios",
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
    },
    confirmado: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    hooks: {
      beforeCreate: async function (usuario) {
        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(usuario.password, salt);
      },
    },
  }
);

//Método personalizado para comparar el password
Usuario.prototype.verificarPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
}

export default Usuario;
