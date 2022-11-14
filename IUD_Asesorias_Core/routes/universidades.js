const Router = require("express");

const { createUniversidad, getAllUniversidades, getUniversidadByID, updateUniversidadbyID, deleteUniversidadbyID } = require("../controllers/universidades");

const router = Router();

/*
Crear Universidad
 */
router.post("/create", createUniversidad);

/*
Consultar todos los elementos de la coleccion Universidad
*/
router.get("/all", getAllUniversidades);

/*
Consultar un elemento de Universidad por su ID
*/
router.get("/:id", getUniversidadByID);

/*
Actualizar un elemento de Universidad por su ID
*/
router.put("/update/:id", updateUniversidadbyID);

/*
Borrar un elemento de Universidad por su ID
*/
router.delete("/delete/:id", deleteUniversidadbyID);

module.exports = router;