const { model, Schema } = require("mongoose");

const TipoProyectosSchema = Schema(
    {
        nombre: {
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

module.exports = model('TipoProyectos', TipoProyectosSchema);
