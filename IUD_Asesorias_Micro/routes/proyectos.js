const Router = require("express");

const { getAllProyectos, getProyectosByID } = require("../controllers/proyectos");

const router = Router();

/*
Consultar todos los elementos de la coleccion Proyecto
*/
router.get("/all", getAllProyectos);
router.get("/:id", getProyectosByID);


module.exports = router;