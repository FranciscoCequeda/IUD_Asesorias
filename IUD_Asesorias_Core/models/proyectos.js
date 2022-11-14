const { Schema, model } = require("mongoose");

const ProyectosSchema = Schema(
    {
        numero: {
            type: Number,
            unique: true,
            required: [true, "Numero obligatorio"]
        },
        titulo: {
            type: String,
            required: true
        },
        fecha_inicio: {
            type: Date,
            default: new Date(),
            required: true
        },
        fecha_entrega: {
            type: Date,
            default: new Date(),
            required: true
        },
        valor: {
            type: Number,
            required: [true, "Valor obligatorio"]
        },
        fecha_creacion: {
            type: Date,
            default: new Date()
        },
        fecha_actualizacion: {
            type: Date,
            default: new Date()
        },
        cliente_id: {
            type: Schema.Types.ObjectId,
            ref: 'Clientes',
            required: true
        },
        tipo_proyecto_id: {
            type: Schema.Types.ObjectId,
            ref: 'TipoProyectos',
            required: true
        },
        universidad_id: {
            type: Schema.Types.ObjectId,
            ref: 'Universidades',
            required: true
        },
        etapa_id: {
            type: Schema.Types.ObjectId,
            ref: 'Etapas',
            required: true
        }
    }
);

module.exports = model('Proyectos', ProyectosSchema)