
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { response } = require('express');
const { generateJWT } = require('../helpers/jwt');

const getUsers = async (req, res) =>{

    const from = Number(req.query.from) || 0;

    const [users, total] = await Promise.all([

        User
            .find({}, 'name email role google img')
            .skip(from)
            .limit(5),
        
        User.countDocuments()
    ]);
    
    res.json({
        ok: true,
        users,
        total
    });

}

const createUsers = async (req, res= response) =>{

    const { email, password } = req.body;

    try {

        const emailExists = await User.findOne({email});

        if(emailExists){
            res.status(400).json({
                ok: false,
                msg: 'Email already exists'
            })
        }

        const user = new User(req.body);

        //Encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        //Saving user
        await user.save();

        //Generate token
        const token = await generateJWT( user.id );
        
        res.json({
            ok: true,
            user: user,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg:'Unexpected error, check the logs'
        });
    }

}

const updateUser = async(req, res= response) => {

    const uid = req.params.id;

    try {
        
        const dbUser = await User.findById(uid);

        if(!dbUser){

            res.status(404).json({
                ok: false,
                msg: 'The user with that id, doesnt exists'
            });
        }

        //Updates
        const fields = req.body;

        if( dbUser.email === req.body.email ){
            delete fields.email;
        }else{
            const userExists = await User.findOne({ email: req.body.email });

            if(userExists){
                res.status(400).json({
                    ok: false,
                    msg:'An user already has that email, choose another one'
                })
            }
        }

        delete fields.password;
        delete fields.google;

        const dbUserUpdated = await User.findByIdAndUpdate(uid, fields, {new: true});

        res.json({
            ok: true,
            user: dbUserUpdated
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        });
    }

}

const deleteUser = async(req, res= response) => {

    const uid = req.params.id;

    try {

        const dbUser = await User.findById(uid);

        if(!dbUser){
            res.status(404).json({
                ok: false,
                msg: 'The user with that id, doesnt exists'
            });
        }

        await User.findByIdAndDelete(uid);
        
        res.status(200).json({
            ok: true,
            msg: 'User deleted'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        })
    }

}

module.exports = {
    getUsers,
    createUsers,
    updateUser,
    deleteUser
}