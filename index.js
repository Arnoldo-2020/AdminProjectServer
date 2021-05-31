const express = require('express');
require('dotenv').config();
var cors = require('cors');

const { dbConnection } = require('./db/config')

//Build the express server
const app = express();

//Setup Cors
app.use(cors());

//Database
dbConnection();

//Routes
app.get('/', (req, res) =>{
    
    res.json({
        ok: true,
        msg:'Hello'
    })

})


app.listen( process.env.PORT, () => {
    console.log('Server running in port '+ process.env.PORT);
})


