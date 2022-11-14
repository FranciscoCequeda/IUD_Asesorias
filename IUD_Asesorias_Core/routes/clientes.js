const Router = require("express");

const { createCliente, getAllClientes, getClienteByID, updateClientebyID, deleteClientebyID } = require("../controllers/clientes");

const router = Router();

/*
Crear Cliente
 */
router.post("/create", createCliente);

/*
Consultar todos los elementos de la coleccion Cliente
*/
router.get("/all", getAllClientes);

/*
Consultar un elemento de Cliente por su ID
*/
router.get("/:id", getClienteByID);

/*
Actualizar un elemento de Cliente por su ID
*/
router.put("/update/:id", updateClientebyID);

/*
Borrar un elemento de Cliente por su ID
*/
router.delete("/delete/:id", deleteClientebyID);

module.exports = router;