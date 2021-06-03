const mongoose = require('mongoose');


const dbConnection = async() => {

    try {
        
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('Db Online');

    } catch (error) {
        console.log(error);
        throw new Error('Error initializing the database, check the logs')
    }
}

module.exports = {
    dbConnection
}