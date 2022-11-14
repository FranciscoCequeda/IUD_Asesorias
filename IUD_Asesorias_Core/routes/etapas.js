const Router = require("express");

const { createEtapa, getAllEtapas, getEtapaByID, updateEtapabyID, deleteEtapabyID } = require("../controllers/etapas");

const router = Router();

/*
Crear Etapa
 */
router.post("/create", createEtapa);

/*
Consultar todos los elementos de la coleccion Etapa
*/
router.get("/all", getAllEtapas);

/*
Consultar un elemento de Etapa por su ID
*/
router.get("/:id", getEtapaByID);

/*
Actualizar un elemento de Etapa por su ID
*/
router.put("/update/:id", updateEtapabyID);

/*
Borrar un elemento de Etapa por su ID
*/
router.delete("/delete/:id", deleteEtapabyID);

module.exports = router;