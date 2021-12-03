const mongoose = require('mongoose');

const dbConnection = async() => {

    try{

        //conexión Mongoose
        await mongoose.connect(process.env.MONGODB_CNN);
        //log de conexión
        console.log('Conectado vía Mongoose');

    } catch(err){

        throw new Error('Error a la hora de inciar la base de datos');
        console.log(err)

    }
}

module.exports = {
    dbConnection
}
