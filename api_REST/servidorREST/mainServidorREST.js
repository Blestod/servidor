// .....................................................................
// mainServidorREST.js
// .....................................................................
const express = require('express')
const bodyParser = require('body-parser')

const path = require('path')
// .....................................................................
// main()
// .....................................................................
function main() {
    // creo el servidor
    var servidorExpress = express()
    servidorExpress.use(express.static(path.join(__dirname, '../ux')))
    // para poder acceder a la carga de la petición http, asumiendo que es JSON
    servidorExpress.use(express.json())
    // cargo las reglas REST
    
    var Logica = require( "../logica/Logica.js" )
    var laLogica = new Logica("../bd/datos.bd",
    function (err) {
        if (err) {
            throw new Error("No he podido conectar con datos.db")
        }
    })
    var reglas = require("./ReglasREST.js")
    reglas.cargar(servidorExpress, laLogica)
    // arrancao el servidor
    var servicio = servidorExpress.listen(8080, function () {
        console.log("servidor REST escuchando en el puerto 8080 ")
    })
    // capturo control-c para cerrar el servicio ordenadamente
    process.on('SIGINT', function () {
        console.log(" terminando ")
        servicio.close()
    })
} // ()
// .....................................................................
// .....................................................................
main()
// .....................................................................
// .....................................................................
