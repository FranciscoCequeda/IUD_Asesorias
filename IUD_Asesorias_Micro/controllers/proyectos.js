const Proyectos = require("../models/proyectos");

const { request, response } = require("express");

const Cliente = require("../models/clientes");
const Etapas = require("../models/etapas");
const TipoProyectos = require("../models/tiposProyecto");
const Universidades = require("../models/universidades");

// Creacion de CRUD Proyectos

/*
Consultar todos los documentos de la coleccion Proyectos
*/

const getAllProyectos = async (req = request, res = response) => {

    try {

        console.log("Estas conectado al Contenedor: " + process.env.CONTAINER_HOST);

        const ProyectosDB = await Proyectos.find().populate({ path: 'cliente_id' }).populate({ path: 'tipo_proyecto_id' }).populate({ path: 'universidad_id' }).populate({ path: 'etapa_id' });
        return res.json({ ProyectosDB });

    } catch (e) {
        return res.status(500).json({ Error: 'No se puede realizar la solicitud!!', e });
    }
}

/*
Consultar un documento de Proyectos por su ID
*/

const getProyectosByID = async (req = request, res = response) => {

    try {

        console.log("Estas conectado al Contenedor: " + process.env.CONTAINER_HOST);

        const id = req.params.id;

        const ProyectosDB = await Proyectos.findById(id);
        if (!ProyectosDB) {
            return res.status(404).json({ Error: "Error, Proyecto no encontrado!!" });
        };

        return res.status(200).json(ProyectosDB)
    } catch (e) {
        return res.status(500).json({ Error: 'No se puede realizar la solicitud!!', e });
    }
}

module.exports = {
    getAllProyectos, getProyectosByID
}