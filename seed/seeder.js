import { exit } from "process";
import Categoria from "../src/models/Categoria.js";
import Precio from "../src/models/Precio.js";
import categorias from "./categorias.js";
import precios from "./precios.js";

import db from "../src/config/db.js";

const importarDatos = async () => {
  try {
    //Autenticar la conexion    
    await db.authenticate();
    //Generar las columnas
    await db.sync();
    //Insertar los datos
    await Promise.all(
     [
         Categoria.bulkCreate(categorias),
        console.log('Datos de categorias importados'),
         Precio.bulkCreate(precios),
        console.log('Datos de precios importados')
     ]
    );
    exit();    
  } catch (error) {
    console.log(error)
    process.exit(1);
  }
};

//Eliminar los datos
const eliminarDatos = async () => {
  try {
    //Autenticar la conexion
    await db.authenticate();
    //Generar las columnas
    await db.sync();
    //Eliminar los datos
    await Promise.all(
     [
        //esto es para modelos pequeños
         Categoria.destroy({where: {}, truncate: true}),
        console.log('Datos de categorias eliminados'),
         Precio.destroy({where: {}, truncate: true}),
        console.log('Datos de precios eliminados')
     ]
    );
    //otra forma de eliminar los datos para modelos grandes
    await db.sync({force: true});
    console.log('Datos eliminados correctamente');
    exit();    
  } catch (error) {
    console.log(error)
    process.exit(1);
  }
}


// Proceso para ejecutar las funciones desde la terminal
// node ./seed/seeder -i  (importar)
// node ./seed/seeder -e  (eliminar)    
if(process.argv[2] === '-i') {
  importarDatos();
} 
else if (process.argv[2] === '-e') {
  eliminarDatos();
}