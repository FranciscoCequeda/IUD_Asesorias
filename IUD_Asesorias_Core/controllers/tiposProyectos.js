const tipoProyecto = require("../models/tiposProyecto");

const { request, response } = require("express");


// Creacion de CRUD Tipo Proyecto

/*
Crear Tipo Proyecto
 */

const createtipoProyecto = async (req = request, res = response) => {

    try {

        if (req.body.nombre.length < 3) {
            return res.status(400).json({ msg: 'Dato debe ser mayor a 3 caracteres!!' })
        }

        const data = { nombre: req.body.nombre.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")};
        const tipoProyectoDB = await tipoProyecto.findOne({nombre: data.nombre});

        if (tipoProyectoDB) {
            return res.status(400).json({ msg: 'Ya existe en la DB' })
        }

        const tipoProyectoSchema = new tipoProyecto(data);
 
        await tipoProyectoSchema.save();
        return res.status(201).json({ msg: "Tipo Proyecto creado correctamente!", tipoProyectoSchema })

    } catch (e) {
        return res.status(500).json({ Error: 'No se puede realizar la solicitud!!', e });
    }
}


/*
Consultar todos los documentos de la coleccion Tipo Proyecto
*/
const getAlltipoProyecto = async (req = request, res = response) => {
    try {
        const tipoProyectosDB = await tipoProyecto.find();
        return res.json({ tipoProyectosDB })
    } catch (e) {
        return res.status(500).json({ Error: 'No se puede realizar la solicitud!!', e });
    }
}


/*
Consultar un documento de Tipo Proyecto por su ID
*/

const gettipoProyectoByID = async (req = request, res = response) => {
    try {
        const id = req.params.id;
        const tipoProyectodb = await tipoProyecto.findById(id);

        if (!tipoProyectodb) {
            return res.status(404).json({ Error: "Error, Tipo Proyecto no encontrado!!" });
        }

        return res.status(200).json(tipoProyectodb)

    } catch (e) {
        return res.status(500).json({ Error: 'No se puede realizar la solicitud!!', e });
    }
}


/*
Actualizar un documento de Tipo Proyecto por su ID
*/

const updatetipoProyectobyID = async (req = request, res = response) => {

    try {

        if (req.body.nombre) {
            req.body.nombre = req.body.nombre.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        }

        const id = req.params.id;
        const data = req.body;
        data.fecha_actualizacion = new Date();

        const val = await tipoProyecto.findById(id);

        if (!val) {
            return res.status(404).json({ Error: "Error, Tipo Proyecto no encontrado!!" });
        }

        const tipoProyectoDB = await tipoProyecto.findByIdAndUpdate(id, data, { new: true })
        return res.status(201).json({ msg: "Actualizacion realizada correctamente!!", tipoProyectoDB })

    } catch (e) {
        return res.status(500).json({ Error: 'No se puede realizar la solicitud!!', e });
    }
}


/*
Borrar un documento de Tipo Proyecto por su ID
*/

const deletetipoProyectobyID = async (req = request, res = response) => {

    try {
        const id = req.params.id;
        const tipoProyectoDB = await tipoProyecto.findById(id);

        if (!tipoProyectoDB) {
            return res.status(404).json({ Error: "Error, Tipo Proyecto no encontrado!!" });
        }

        await tipoProyecto.findByIdAndDelete(id);
        return res.status(200).json({ msg: "Operacion realizada con exito!!, se borró Tipo Proyecto:", tipoProyectoDB })

    } catch (e) {
        return res.status(500).json({ Error: 'No se puede realizar la solicitud!!', e });
    }
}

module.exports = { createtipoProyecto, getAlltipoProyecto, gettipoProyectoByID, updatetipoProyectobyID, deletetipoProyectobyID }