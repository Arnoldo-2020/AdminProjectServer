const fs = require('fs');
const User = require('../models/user');
const Doctor = require('../models/doctors');
const Hospital = require('../models/hospital');

const eraseImage = (path) =>{

    if(fs.existsSync(path)){
        //Delete old image
        fs.unlinkSync(path);
    }
    
}

const updateImage = async(type, id, fileName) =>{

    let oldPath = '';

    switch (type) {
        case 'users':

            const user = await User.findById(id);
            if(!user){
                console.log('Is not a doctor');
                return false;
            }

            oldPath = `./uploads/users/${user.img}`;
            eraseImage(oldPath);
            
            
            user.img = fileName;
            user.save();    

            break;

        case 'doctors':

            const doctor = await Doctor.findById(id);
            if(!doctor){
                console.log('Is not a doctor');
                return false;
            }

            oldPath = `./uploads/doctors/${doctor.img}`;
            eraseImage(oldPath);
            
            
            doctor.img = fileName;
            doctor.save();
            break;
    
        case 'hospitals':

            const hospital = await Hospital.findById(id);
            if(!hospital){
                console.log('Is not a doctor');
                return false;
            }

            oldPath = `./uploads/hospitals/${hospital.img}`;
            eraseImage(oldPath);
            
            
            hospital.img = fileName;
            hospital.save();
        
            break;

        default:
            break;
    }
    


}

module.exports = {
    updateImage
}