const express = require('express');
require('dotenv').config();
var cors = require('cors');

const { dbConnection } = require('./db/config')

//Build the express server
const app = express();

//Setup Cors
app.use(cors());

//Reading and Parsing of the body
app.use( express.json() )

//Database
dbConnection();

//Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/login', require('./routes/auth'));

app.listen( process.env.PORT, () => {
    console.log('Server running in port '+ process.env.PORT);
})


