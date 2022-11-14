const Router = require("express");

const { createProyectos, updateProyectosByID, deleteProyectosByID } = require("../controllers/proyectos");

const router = Router();

/*
Crear Proyecto
 */
router.post("/create", createProyectos);

/*
Actualizar un elemento de Proyecto por su ID
*/
router.put("/update/:id", updateProyectosByID);

/*
Borrar un elemento de Proyecto por su ID
*/
router.delete("/delete/:id", deleteProyectosByID);

module.exports = router;