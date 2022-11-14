const Router = require("express");

const { createtipoProyecto, getAlltipoProyecto, gettipoProyectoByID, updatetipoProyectobyID, deletetipoProyectobyID } = require("../controllers/tiposProyectos");

const router = Router();

/*
Crear tipoProyecto
 */
router.post("/create", createtipoProyecto);

/*
Consultar todos los elementos de la coleccion tipoProyecto
*/
router.get("/all", getAlltipoProyecto);

/*
Consultar un elemento de tipoProyecto por su ID
*/
router.get("/:id", gettipoProyectoByID);

/*
Actualizar un elemento de tipoProyecto por su ID
*/
router.put("/update/:id", updatetipoProyectobyID);

/*
Borrar un elemento de tipoProyecto por su ID
*/
router.delete("/delete/:id", deletetipoProyectobyID);

module.exports = router;