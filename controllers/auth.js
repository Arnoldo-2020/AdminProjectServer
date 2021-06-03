const { response } = require('express');
const User  = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const login = async (req, res= response) => {

    const { email, password } = req.body;

    try {

        //Verify email
        const dbUser = await User.findOne({email});

        if(!dbUser){
            res.status(404).json({
                ok: false,
                msg: 'Invalid email or password'
            });
        }

        //Verify password
        const validPassword = bcrypt.compareSync(password, dbUser.password);

        if(!validPassword){
            res.status(400).json({
                ok: false,
                msg: 'Email and Password are invalid'
            });
        }

        //Generate token
        const token = await generateJWT( dbUser.id );
        
        res.status(200).json({
            ok: true,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        });
    }

}

module.exports = {
    login
}