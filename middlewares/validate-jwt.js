const { response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req, res= response, next) => {

    //Read token
    const token = req.header('x-token');
    
    if (!token){
        return res.status(401).json({
            ok: false,
            msg: 'The request has no token'
        });
    }

    try {
        
        const {uid} = jwt.verify( token, process.env.JWT_SECRET );
        
        req.uid = uid;
        next();

    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Invalid token'
        });
    }
}

module.exports = {
    validateJWT,
}