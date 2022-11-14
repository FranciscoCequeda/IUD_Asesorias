const Etapas = require("../models/etapas");

const { request, response } = require("express");


// Creacion de CRUD Etapas

/*
Crear Etapas
 */

const createEtapa = async (req = request, res = response) => {

    try {

        if (req.body.etapa.length < 3) {
            return res.status(400).json({ msg: 'Dato debe ser mayor a 3 caracteres!!' })
        }

        const data = { etapa: req.body.etapa.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")};
        const EtapaDB = await Etapas.findOne({etapa: data.etapa});

        if (EtapaDB) {
            return res.status(400).json({ msg: 'Ya existe en la DB' })
        }

        const EtapaSchema = new Etapas(data);
 
        await EtapaSchema.save();
        return res.status(201).json({ msg: "Etapa creado correctamente!", EtapaSchema })

    } catch (e) {
        return res.status(500).json({ Error: 'No se puede realizar la solicitud!!', e });
    }
}


/*
Consultar todos los documentos de la coleccion Etapas
*/
const getAllEtapas = async (req = request, res = response) => {
    try {
        const EtapassDB = await Etapas.find();
        return res.json({ EtapassDB })
    } catch (e) {
        return res.status(500).json({ Error: 'No se puede realizar la solicitud!!', e });
    }
}


/*
Consultar un documento de Etapas por su ID
*/

const getEtapaByID = async (req = request, res = response) => {
    try {
        const id = req.params.id;
        const Etapa = await Etapas.findById(id);

        if (!Etapa) {
            return res.status(404).json({ Error: "Error, Etapa no encontrado!!" });
        }

        return res.status(200).json(Etapa)

    } catch (e) {
        return res.status(500).json({ Error: 'No se puede realizar la solicitud!!', e });
    }
}


/*
Actualizar un documento de Etapas por su ID
*/

const updateEtapabyID = async (req = request, res = response) => {

    try {

        if (req.body.etapa) {
            req.body.etapa = req.body.etapa.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        }

        const id = req.params.id;
        const data = req.body;
        data.fecha_actualizacion = new Date();

        const val = await Etapas.findById(id);

        if (!val) {
            return res.status(404).json({ Error: "Error, Etapa no encontrado!!" });
        }

        const EtapaDB = await Etapas.findByIdAndUpdate(id, data, { new: true })
        return res.status(201).json({ msg: "Actualizacion realizada correctamente!!", EtapaDB })

    } catch (e) {
        return res.status(500).json({ Error: 'No se puede realizar la solicitud!!', e });
    }
}


/*
Borrar un documento de Etapas por su ID
*/

const deleteEtapabyID = async (req = request, res = response) => {

    try {
        const id = req.params.id;
        const EtapaDB = await Etapas.findById(id);

        if (!EtapaDB) {
            return res.status(404).json({ Error: "Error, Etapa no encontrado!!" });
        }

        await Etapas.findByIdAndDelete(id);
        return res.status(200).json({ msg: "Operacion realizada con exito!!, se borró Etapa:", EtapaDB })

    } catch (e) {
        return res.status(500).json({ Error: 'No se puede realizar la solicitud!!', e });
    }
}

module.exports = { createEtapa, getAllEtapas, getEtapaByID, updateEtapabyID, deleteEtapabyID }