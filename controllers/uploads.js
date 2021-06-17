const path = require('path');
const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { updateImage } = require('../helpers/update-image');
const fs = require('fs');


const fileUpload = (req, res= response) =>{

    const type = req.params.type;
    const id = req.params.id;

    //Validate types
    const validTypes = ['users', 'hospitals','doctors'];

    if(!validTypes.includes(type)){
        res.status(400).json({
            ok: false,
            msg:'It isnt a user, doctor or hospital'
        });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg:'No files were uploaded'
        });
    }

    //Process the image
    const file = req.files.image;
    const formatName = file.name.split('.');//name.jpg
    const fileExtension = formatName[formatName.length-1];

    //Validate extension
    const validateExtensions = ['jpg', 'png', 'jpeg', 'gif'];
    if(!validateExtensions.includes(fileExtension)){
        res.status(400).json({
            ok: false,
            msg:'Extension invalid'
        });
    }

    //Generate file name
    const fileName = `${uuidv4()}.${fileExtension}`;

    //Path to save the image
    const path = `./uploads/${type}/${fileName}`;

    // Move image
    file.mv(path, (err) => {
        if (err){
            console.log(err);
            return res.status(400).json({
                ok: false,
                msg:'Error moving the image'
            });
        }
            
        //Update image
        updateImage( type, id, fileName );

        res.json({
            ok: true,
            msg:'File uploaded',
            fileName
        });
    });
}

const returnImage = (req, res= response) =>{

    const type = req.params.type;
    const picture = req.params.picture;

    const pathImg = path.join( __dirname, `../uploads/${type}/${picture}`);
    
    if(fs.existsSync(pathImg)){
        res.sendFile(pathImg);
    }else{
        const pathImg = path.join( __dirname, `../uploads/no-img.jpg`);
        res.sendFile(pathImg);
    }

}

module.exports = {
    fileUpload,
    returnImage
};