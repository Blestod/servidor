// .....................................................................
// ReglasREST.js
// .....................................................................
module.exports.cargar = function (servidorExpress, laLogica) {
    // .......................................................
    // GET /prueba
    // .......................................................
    servidorExpress.get('/prueba/', function (peticion, respuesta) {
        console.log(" * GET /prueba ")
        respuesta.send("¡Funciona!")
    }) // get /prueba
    // .......................................................
    // GET /longitud/<palabra>
    // .......................................................
    servidorExpress.get('/longitud/:palabra',
        function (peticion, respuesta) {
            console.log(" * GET /longitud ")
            var palabra = peticion.params.palabra
            var solucion = { palabra: palabra, longitud: palabra.length }
            respuesta.send(JSON.stringify(solucion))
        }) // get /longitud
    // .......................................................
    // GET /dividir?a=<num>&b=<num>
    // .......................................................
    servidorExpress.get(
        '/dividir',
        function (peticion, respuesta) {
            console.log(" * GET /dividir ")
            var a = peticion.query.a
            var b = peticion.query.b
            if (isNaN(a) || isNaN(b) || b == 0) {
                // si a o b no son números, o b es 0
                // no se puede dividir
                // (400 = bad request)
                respuesta.status(400).send(" no puedo dividir ");
                return
            }
            var solucion = { a: a, b: b, division: a / b }
            respuesta.send(JSON.stringify(solucion))
        }) // get /dividir
    // .......................................................
    // POST /alta
    // .......................................................
    servidorExpress.post(
        '/alta',
        function (peticion, respuesta) {
            console.log(" * POST /alta ")
            const jsonData = peticion.body
            console.log(jsonData.idMedicion)
            console.log(jsonData.o3)
            console.log(jsonData.temperatura)
            console.log(jsonData.fecha)
            console.log(jsonData.lugar)
            respuesta.send("OK")
            let idMedicion = parseInt(jsonData.idMedicion)
            let o3 = parseInt(jsonData.o3)
            let temperatura = parseFloat(jsonData.temperatura)
            laLogica.insertarMedicion(
                {
                idMedicion: idMedicion, o3: o3,
                temperatura: temperatura, fecha: jsonData.fecha,
                lugar: jsonData.lugar
                })
            
            // supuesto procesamiento
            // if (datos.fecha == '2023-10-06T14:30:00') {
            //     respuesta.send("OK")
            // } else {
            //     // 404 = not found
            //     respuesta.status(404).send("no acertaste con el ID")
            // }
            


        })

        servidorExpress.get('/baja', async function (peticion, respuesta) {
            console.log(" * GET /baja");
            try {
                const resultado = await laLogica.buscarUltimaMedicion();
                console.log(resultado);
                respuesta.send(resultado);
            } catch (error) {
                console.error("Error:", error);
                respuesta.status(500).send("Error interno del servidor");
            }
        });
} // ()
// .....................................................................
// .....................................................................
// .....................................................................
