const { response } = require('express');
const User = require('../models/user');
const Doctor = require('../models/doctors');
const Hospital = require('../models/hospital');

const getTodo = async (req, res= response) => {

    const search = req.params.search;
    const regex = new RegExp( search, 'i');

    try {

        const [ user, doctor, hospital ] = await Promise.all([
             User.find({ name: regex }),
             Doctor.find({ name: regex }),
             Hospital.find({ name: regex })
        ])
        
        return res.status(200).json({
            ok: true,
            user,
            doctor,
            hospital
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg:'Contact the admin'
        });
    }

}

const getDocumentsCollection = async (req, res= response) => {

    const table = req.params.table;
    const search = req.params.search;
    const regex = new RegExp( search, 'i');
    let data = [];

    switch (table) {
        case 'doctors':
            data = await Doctor.find({ name: regex })
                                    .populate('user', 'name')
                                    .populate('hospital', 'name');
        break;

        case 'hospitals':
            data = await Hospital.find({ name: regex })
                                    .populate('user', 'name');
        break;
    
        case 'users':
            data = await User.find({ name: regex });
        break;

        default:
            return res.status(400).json({
                ok: false,
                msg: 'The table has to be: doctors/hospitals/users'
            });
        // break;
    }

        res.status(200).json({
            ok: true,
            result: data
        });

}

module.exports = {
    getTodo,
    getDocumentsCollection
};
