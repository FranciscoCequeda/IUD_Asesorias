const Universidades = require("../models/universidades");

const { request, response } = require("express");


// Creacion de CRUD Universidades

/*
Crear Universidades
 */

const createUniversidad = async (req = request, res = response) => {

    try {

        if (req.body.nombre.length < 3) {
            return res.status(400).json({ msg: 'Nombre debe ser mayor a 3 caracteres!!' })
        }

        if (req.body.direccion.length < 5) {
            return res.status(400).json({ msg: 'Direccion debe ser mayor a 5 caracteres!!' })
        }

        if (req.body.telefono.length < 5) {
            return res.status(400).json({ msg: 'Telefono debe ser mayor a 5 caracteres!!' })
        }

        const data = { nombre: req.body.nombre.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ""),  direccion: req.body.direccion.toUpperCase(), telefono: req.body.telefono};
        const UniversidadDB = await Universidades.findOne({ nombre: data.nombre });

        if (UniversidadDB) {
            return res.status(400).json({ msg: 'Ya existe en la DB' })
        }

        const UniversidadeSchema = new Universidades(data);

        await UniversidadeSchema.save();
        return res.status(201).json({ msg: "Universidad creado correctamente!", UniversidadeSchema })

    } catch (e) {
        return res.status(500).json({ Error: 'No se puede realizar la solicitud!!', e });
    }
}


/*
Consultar todos los documentos de la coleccion Universidades
*/
const getAllUniversidades = async (req = request, res = response) => {
    try {
        const UniversidadesDB = await Universidades.find();
        return res.json({ UniversidadesDB })
    } catch (e) {
        return res.status(500).json({ Error: 'No se puede realizar la solicitud!!', e });
    }
}


/*
Consultar un documento de Universidades por su ID
*/

const getUniversidadByID = async (req = request, res = response) => {
    try {
        const id = req.params.id;
        const Universidad = await Universidades.findById(id);

        if (!Universidad) {
            return res.status(404).json({ Error: "Error, Universidad no encontrado!!" });
        }

        return res.status(200).json(Universidad)

    } catch (e) {
        return res.status(500).json({ Error: 'No se puede realizar la solicitud!!', e });
    }
}


/*
Actualizar un documento de Universidades por su ID
*/

const updateUniversidadbyID = async (req = request, res = response) => {

    try {

        if (req.body.nombre) {
            req.body.nombre = req.body.nombre.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        }

        if (req.body.direccion) {
            req.body.direccion = req.body.direccion.toUpperCase()
        }

        const id = req.params.id;
        const data = req.body;
        data.fecha_actualizacion = new Date();

        const val = await Universidades.findById(id);

        if (!val) {
            return res.status(404).json({ Error: "Error, Universidad no encontrada!!" });
        }

        const UniversidadDB = await Universidades.findByIdAndUpdate(id, data, { new: true })
        return res.status(201).json({ msg: "Actualizacion realizada correctamente!!", UniversidadDB })

    } catch (e) {
        return res.status(500).json({ Error: 'No se puede realizar la solicitud!!', e });
    }
}


/*
Borrar un documento de Universidades por su ID
*/

const deleteUniversidadbyID = async (req = request, res = response) => {

    try {
        const id = req.params.id;
        const UniversidadDB = await Universidades.findById(id);

        if (!UniversidadDB) {
            return res.status(404).json({ Error: "Error, Universidad no encontrado!!" });
        }

        await Universidades.findByIdAndDelete(id);
        return res.status(200).json({ msg: "Operacion realizada con exito!!, se borró Universidad:", UniversidadDB })

    } catch (e) {
        return res.status(500).json({ Error: 'No se puede realizar la solicitud!!', e });
    }
}

module.exports = { createUniversidad, getAllUniversidades, getUniversidadByID, updateUniversidadbyID, deleteUniversidadbyID }