const { model, Schema } = require("mongoose");

const EtapasSchema = Schema(
    {
        etapa: {
            type: String,
            required: [true, 'Campo requerido']
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

module.exports = model('Etapas', EtapasSchema);
