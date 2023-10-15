// .....................................................................
// Logica.js
// .....................................................................
const sqlite3 = require("sqlite3")
// .....................................................................
// .....................................................................
module.exports = class Logica {
    // .................................................................
    // nombreBD: Texto
    // -->
    // constructor () -->
    // .................................................................
    constructor(nombreBD, cb) {
        this.laConexion = new sqlite3.Database(
            nombreBD,
            (err) => {
                if (!err) {
                    this.laConexion.run("PRAGMA foreign_keys = ON")
                }
                cb(err)
            })
    } // ()
    // .................................................................
    // nombreTabla:Texto
    // -->
    // borrarFilasDe() -->
    // .................................................................
    borrarFilasDe(tabla) {
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(
                "delete from " + tabla + ";",
                (err) => (err ? rechazar(err) : resolver())
            )
        })
    } // ()
    // .................................................................
    // borrarFilasDeTodasLasTablas() -->
    // .................................................................
    async borrarFilasDeTodasLasTablas() {
        await this.borrarFilasDe("Medicion")
        //await this.borrarFilasDe("Usuario")
        //await this.borrarFilasDe("Dispositivo")
    } // ()
    // .................................................................
    // datos:{dni:Texto, nombre:Texto: apellidos:Texto}
    // -->
    // insertarPersona() -->
    // .................................................................
    insertarMedicion(datos) {
        var textoSQL =
            'insert into Medicion values($idMedicion, $o3, $temperatura, $fecha, $lugar);'
        var valoresParaSQL = {
            $idMedicion: datos.idMedicion, $o3: datos.o3,
            $temperatura: datos.temperatura, $fecha: datos.fecha,
            $lugar: datos.lugar
        }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
                (err ? rechazar(err) : resolver())
            })
        })
    } // ()
    // .................................................................
    // dni:Texto
    // -->
    // buscaridMedicion() <--
    // <--
    // {dni:Texto, nombre:Texto: apellidos:Texto}
    // .................................................................
    buscarMedicionConID(idMedicion) {
        var textoSQL = "select * from Medicion where idMedicion=$idMedicion;";
        var valoresParaSQL = { $idMedicion: idMedicion }
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL, valoresParaSQL,
                (err, res) => {
                    (err ? rechazar(err) : resolver(res))
                })
        })
    } // ()
    // .................................................................
    // cerrar() -->
    // .................................................................
    cerrar() {
        return new Promise((resolver, rechazar) => {
            this.laConexion.close((err) => {
                (err ? rechazar(err) : resolver())
            })
        })
    } // ()

    buscarUltimaMedicion() {
        return new Promise((resolver, rechazar) => {
            const textoSQL = "SELECT * FROM Medicion ORDER BY idMedicion DESC LIMIT 1;";
    
            this.laConexion.get(textoSQL, (err, row) => {
                if (err) {
                    rechazar(err);
                } else {
                    resolver(row);
                }
            });
        });
    
    } // ()
    // .................................................................
    // cerrar() -->
    // .................................................................
     // ()


} // class
// .....................................................................
// .....................................................................
