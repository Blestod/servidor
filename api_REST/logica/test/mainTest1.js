// ........................................................
// mainTest1.js
// ........................................................
const Logica = require("../Logica.js")
var assert = require('assert')
// ........................................................
// main ()
// ........................................................
describe("Test 1: insertar una medicion", function () {
    // ....................................................
    // ....................................................
    var laLogica = null
    // ....................................................
    // ....................................................
    it("conectar a la base de datos", function (hecho) {
        laLogica = new Logica(
            "../bd/datos.bd",
            function (err) {
                if (err) {
                    throw new Error("No he podido conectar con datos.db")
                }
                hecho()
            })
    }) // it
    // ....................................................
    // ....................................................
    it("borrar todas las filas", async function () {
        await laLogica.borrarFilasDeTodasLasTablas()
    }) // it
    // ....................................................
    // ....................................................
    it("puedo insertar una medicion",
        async function () {
            await laLogica.insertarMedicion(
                {
                    //insert into Medicion values (3, 150, 16.2, '2023-10-06T14:30:00', '40.7128 -74.0060' );
                    idMedicion: 4, o3: 190,
                    temperatura: 12.3, fecha: "2023-10-06T14:30:00",
                    lugar: "40.7128 -74.0060"
                })
            var res = await laLogica.buscarMedicionConID(4)
            assert.equal(res.length, 1, "¿no hay un resulado?")
            assert.equal(res[0].idMedicion, 4, "¿no es 1?")
            assert.equal(res[0].temperatura, 12.3, "¿no es 12.3?")
        }) // it
    // ....................................................
    // ....................................................
    it("no puedo insertar una persona con id que ya está",
        async function () {
            var error = null
            try {
                await laLogica.insertarMedicion(
                    {
                    idMedicion: 4, o3: 190,
                    temperatura: 12.3, fecha: "2023-10-06T14:30:00",
                    lugar: "40.7128 -74.0060"
                    })
            } catch (err) {
                error = err
            }
            assert(error, "¿Ha insertado el id que ya estaba? (¿No ha pasado por el catch()?")
        }) // it
    // ....................................................
    // ....................................................
    it("cerrar conexión a la base de datos",
        async function () {
            try {
                await laLogica.cerrar()
            } catch (err) {
                // assert.equal( 0, 1, "cerrar conexión a BD fallada: " + err)
                throw new Error("cerrar conexión a BD fallada: " + err)
            }
        }) // it
        
}) // describe