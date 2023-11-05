"use strict"

class DAODestinos{

    constructor(pool){
        this.pool = pool;
    }

    getAllDestinos(callback){
        this.pool.getConnection(function(err, connection){
            if(err){
                callback(new Error("Error de conexión a la base de datos"));
            }else{
                connection.query("SELECT destinos.id as id, destinos.nombre as nombre, destinos.descripcion as descripcion,"
                +"destinos.imagen as imagen, destinos.precio as precio FROM destinos;", /* WHERE destinos.id < 14 */
                function(err, rows){
                    connection.release();
                    if(err){
                        callback(new Error("Error de acceso a la base de datos"));
                    }else{
                        let destinos = [];
                        let id; let nombre; let descripcion; let imagen; let precio;
                        rows.forEach(element => {
                                id = element.id;
                                nombre = element.nombre;
                                descripcion = element.descripcion;
                                imagen = element.imagen;
                                precio = element.precio;
                                destinos.push({id, nombre, descripcion, imagen, precio})
                        });
                        
                        callback(null, destinos);
                    }
                });
            }
        });
    }

    getDestinosNombre(nombreD, callback){
        this.pool.getConnection(function(err, connection){
            if(err){
                callback(new Error("Error de conexión a la base de datos"));
            }else{
                connection.query("SELECT destinos.id as id, destinos.nombre as nombre, destinos.descripcion as descripcion,"
                +"destinos.imagen as imagen, destinos.precio as precio FROM destinos WHERE destinos.nombre = ?", /* WHERE destinos.id < 14 */
                [nombreD],
                function(err, rows){
                    connection.release();
                    if(err){
                        callback(new Error("Error de acceso a la base de datos"));
                    }else{
                        let destinos = [];
                        let id; let nombre; let descripcion; let imagen; let precio;
                        rows.forEach(element => {
                                id = element.id;
                                nombre = element.nombre;
                                descripcion = element.descripcion;
                                imagen = element.imagen;
                                precio = element.precio;
                                destinos.push({id, nombre, descripcion, imagen, precio})
                        });
                        
                        callback(null, destinos);
                    }
                });
            }
        });
    }

}

module.exports = DAODestinos;