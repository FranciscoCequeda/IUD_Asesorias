const Clientes = require("../models/clientes");

const { request, response } = require("express");


// Creacion de CRUD Clientes

/*
Crear Clientes
 */

const createCliente = async (req = request, res = response) => {

    try {

        if (req.body.nombre.length < 3) {
            return res.status(400).json({ msg: 'Dato debe ser mayor a 3 caracteres!!' })
        }

        const data = { nombre: req.body.nombre.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ""),  email: req.body.email.toUpperCase()};
        const ClienteDB = await Clientes.findOne({ email: data.email });

        if (ClienteDB) {
            return res.status(400).json({ msg: 'Ya existe en la DB' })
        }

        const ClienteSchema = new Clientes(data);

        await ClienteSchema.save();
        return res.status(201).json({ msg: "Cliente creado correctamente!", ClienteSchema })

    } catch (e) {
        return res.status(500).json({ Error: 'No se puede realizar la solicitud!!', e });
    }
}


/*
Consultar todos los documentos de la coleccion Clientes
*/
const getAllClientes = async (req = request, res = response) => {
    try {
        const ClientessDB = await Clientes.find();
        return res.json({ ClientessDB })
    } catch (e) {
        return res.status(500).json({ Error: 'No se puede realizar la solicitud!!', e });
    }
}


/*
Consultar un documento de Clientes por su ID
*/

const getClienteByID = async (req = request, res = response) => {
    try {
        const id = req.params.id;
        const Cliente = await Clientes.findById(id);

        if (!Cliente) {
            return res.status(404).json({ Error: "Error, Cliente no encontrado!!" });
        }

        return res.status(200).json(Cliente)

    } catch (e) {
        return res.status(500).json({ Error: 'No se puede realizar la solicitud!!', e });
    }
}


/*
Actualizar un documento de Clientes por su ID
*/

const updateClientebyID = async (req = request, res = response) => {

    try {

        if (req.body.nombre) {
            req.body.nombre = req.body.nombre.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        }

        const id = req.params.id;
        const data = req.body;
        data.fecha_actualizacion = new Date();

        const val = await Clientes.findById(id);

        if (!val) {
            return res.status(404).json({ Error: "Error, Cliente no encontrado!!" });
        }

        const ClienteDB = await Clientes.findByIdAndUpdate(id, data, { new: true })
        return res.status(201).json({ msg: "Actualizacion realizada correctamente!!", ClienteDB })

    } catch (e) {
        return res.status(500).json({ Error: 'No se puede realizar la solicitud!!', e });
    }
}


/*
Borrar un documento de Clientes por su ID
*/

const deleteClientebyID = async (req = request, res = response) => {

    try {
        const id = req.params.id;
        const ClienteDB = await Clientes.findById(id);

        if (!ClienteDB) {
            return res.status(404).json({ Error: "Error, Cliente no encontrado!!" });
        }

        await Clientes.findByIdAndDelete(id);
        return res.status(200).json({ msg: "Operacion realizada con exito!!, se borró Clientes:", ClienteDB })

    } catch (e) {
        return res.status(500).json({ Error: 'No se puede realizar la solicitud!!', e });
    }
}

module.exports = { createCliente, getAllClientes, getClienteByID, updateClientebyID, deleteClientebyID }