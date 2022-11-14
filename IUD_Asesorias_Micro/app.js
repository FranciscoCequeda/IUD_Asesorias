const express = require("express");

const app = express();

/*
* Importacion rutas de Router (Para mapear los metodos y sus endpoints)
*/

const Proyectos = require("./routes/proyectos")

app.use(express.json())

app.use("/api/proyectos", Proyectos);

app.get("*", (req, res) => {
    return res.status(404).json({
        Error: 'Pagina solicitada no encontrada!!!'
    });
});

module.exports = app;