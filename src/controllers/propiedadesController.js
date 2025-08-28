import Categoria from "../models/Categoria.js";
import Precio from "../models/Precio.js";

// Admin controller for managing properties
const admin = (req, res) => {
   res.render('propiedades/admin',{
    pagina: 'Mis Propiedades',
    barra: true,
   })
};

// Section to create a new property
//Form for creating a property
const crear =async (req, res)=>{
    //Consultar modelo de precios y categorias
    const [categorias, precios] = await Promise.all([
        Categoria.findAll(),
        Precio.findAll()
    ]);
    console.log(categorias);
    console.log(precios);

    res.render('propiedades/crear',{
     pagina: 'Crear Propiedad',
     barra: true,
     categorias: categorias,
     precios: precios
    })
}


export {
    admin,
    crear
};
