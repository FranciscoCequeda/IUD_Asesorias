const { model, Schema } = require("mongoose");

const ClientesSchema = Schema(
    {
        nombre: {
            type: String,
            required: true
        },
        email: {
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

module.exports = model('Clientes', ClientesSchema);
