const { model, Schema } = require("mongoose");

const UniversidadesSchema = Schema(
    {
        nombre: {
            type: String,
            required: true
        },
        direccion: {
            type: String,
            required: true
        },
        telefono: {
            type: String,
            required: true
        },
        fecha_creacion: {
            type: Date,
            default: new Date()
        },
        fecha_actualizacion: {
            type: Date,
            default: new Date()
        }
    }
);

module.exports = model('Universidades', UniversidadesSchema);
