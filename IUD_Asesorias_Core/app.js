const express = require("express");

const app = express();

/*
* Importacion rutas de Router (Para mapear los metodos y sus endpoints)
*/

const Clientes = require("./routes/clientes");
const Etapas = require("./routes/etapas");
const TipoProyectos = require("./routes/tiposProyectos")
const Universidades = require("./routes/universidades")
const Proyectos = require("./routes/proyectos")

app.use(express.json())


app.use("/api/clientes", Clientes);
app.use("/api/etapas", Etapas);
app.use("/api/tipoproyectos", TipoProyectos);
app.use("/api/universidades", Universidades);
app.use("/api/proyectos", Proyectos);


app.get("*", (req, res) => {
    return res.status(404).json({
        Error: 'Pagina solicitada no encontrada!!!'
    });
});

module.exports = app;