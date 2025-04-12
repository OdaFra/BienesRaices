  import dotenv from 'dotenv';
import { Sequelize } from "sequelize";

  dotenv.config({path:'.env'})

  const proevn = process.env;

  const db = new Sequelize(
    proevn.DB,
    proevn.DB_USER,
    proevn.DB_PASSWORD,
    
    {
      host: proevn.DB_HOST,
      port: 3306,
      dialect: "mysql",
      define: {
        timestamps: true,
      },
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
     // operatorsAliases: false,
    }
  );

  export default db;
