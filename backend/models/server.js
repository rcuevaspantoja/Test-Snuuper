const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/configdb');
class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Conexión de la bdd
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Rutas
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares() {

        //CORS
        this.app.use(cors())

        //Lectura
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes(){

        this.app.use(this.usuariosPath, require('../routes/user'));

    }       

    listen(){

        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto: ', this.port);
        });
    }
}

module.exports = Server;