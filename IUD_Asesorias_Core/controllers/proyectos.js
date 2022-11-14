const Proyectos = require("../models/proyectos");

const { request, response } = require("express");

const Cliente = require("../models/clientes");
const Etapas = require("../models/etapas");
const TipoProyectos = require("../models/tiposProyecto");
const Universidades = require("../models/universidades");

// Creacion de CRUD Proyectos

/*
Crear Proyectos
*/

const createProyectos = async (req = request, res = response) => {

    try {

        const ProyectosDB = await Proyectos.findOne({ numero: req.body.numero })

        if (ProyectosDB) {
            return res.status(400).json({ msg: 'Ya existe en la DB' })
        }

        if (req.body.titulo && req.body.numero) {
            req.body.titulo = req.body.titulo.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        } else {
            return res.status(500).json({ Error: 'Error, Debe crear Numero y titulo!!' });
        }

        if (!req.body.fecha_inicio && !req.body.fecha_entrega) {
            return res.status(500).json({ Error: 'Error, Debe crear Fecha inicio y Fecha entrega!!' });
        }

        if (!req.body.valor) {
            return res.status(500).json({ Error: 'Error, Debe crear el Valor del proyecto!!' });
        }

        const data = req.body;

        const { cliente_id, tipo_proyecto_id, universidad_id, etapa_id } = data;

        const clientedb = await Cliente.findOne({ _id: cliente_id._id })
        const tipo_proyecto = await TipoProyectos.findOne({ _id: tipo_proyecto_id._id })
        const universidad = await Universidades.findOne({ _id: universidad_id._id })
        const etapa = await Etapas.findOne({ _id: etapa_id._id })

        if (!clientedb) {
            return res.status(404).json({ Error: 'Error, Cliente no existe!!' });
        }

        if (!tipo_proyecto) {
            return res.status(404).json({ Error: 'Error, Tipo proyecto no existe!!' });
        }

        if (!universidad) {
            return res.status(404).json({ Error: 'Error, Universidad no existe!!' });
        }

        if (!etapa) {
            return res.status(404).json({ Error: 'Error, Etapa no existe!!' });
        }

        const Proyecto = new Proyectos(data);

        await Proyecto.save();
        return res.status(201).json({ msg: "Proyecto creado correctamente!", Proyecto })

    } catch (e) {
        return res.status(500).json({ Error: 'No se puede realizar la solicitud!!', e });
    }

}

/*
Actualizar un documento de Proyectos por su ID
*/
const updateProyectosByID = async (req = request, res = response) => {
    try {

        const { id } = req.params;

        if (req.body.titulo) {
            req.body.titulo = req.body.titulo.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        }

        const data = req.body;

        const { cliente_id, tipo_proyecto_id, universidad_id, etapa_id } = data;

        if (cliente_id) {
            const clientedb = await Cliente.findOne({ _id: cliente_id._id })

            if (!clientedb) {
                return res.status(404).json({ Error: 'Error, Cliente no existe!!' });
            }
        }

        if (tipo_proyecto_id) {
            const tipo_proyectoDB = await TipoProyectos.findOne({ _id: tipo_proyecto_id._id })

            if (!tipo_proyectoDB) {
                return res.status(404).json({ Error: 'Error, Tipo proyecto no existe!!' });
            }
        }

        if (universidad_id) {
            const universidaddb = await Universidades.findOne({ _id: universidad_id._id })
            if (!universidaddb) {
                return res.status(404).json({ Error: 'Error, Universidad no existe!!' });
            }
        }

        if (etapa_id) {
            const etapadb = await Etapas.findOne({ _id: etapa_id._id })

            if (!etapadb) {
                return res.status(404).json({ Error: 'Error, Etapa no existe!!' });
            }
        }

        const Proyecto = await Proyectos.findByIdAndUpdate(id, data, { new: true });

        await Proyecto.save();
        return res.status(201).json({ msg: "Proyecto actualizado correctamente!", Proyecto })

    } catch (e) {
        return res.status(500).json({ Error: 'No se puede realizar la solicitud!!', e });
    }
}


/*
Borrar un documento de Proyectos por su ID
*/

const deleteProyectosByID = async (req = request, res = response) => {
    try {
        const id = req.params.id;
        const ProyectosDB = await Proyectos.findById(id);

        if (!ProyectosDB) {
            return res.status(404).json({ Error: "Error, Proyecto no encontrado!!" });
        }

        await Proyectos.findByIdAndDelete(id)

        return res.status(200).json({ msg: "Operacion realizada con exito!!, se borró Proyecto:", ProyectosDB })
    } catch (e) {
        return res.status(500).json({ Error: 'No se puede realizar la solicitud!!', e });
    }
}

module.exports = {
    createProyectos, updateProyectosByID,
    deleteProyectosByID
}