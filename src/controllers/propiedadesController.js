
// Admin controller for managing properties
const admin = (req, res) => {
   res.render('propiedades/admin',{
    pagina: 'Mis Propiedades',
    barra: true,
   })
};

// Section to create a new property
//Form for creating a property
const crear = (req, res)=>{
    res.render('propiedades/crear',{
     pagina: 'Crear Propiedad',
     barra: true,
    })
}


export {
    admin,
    crear
};
