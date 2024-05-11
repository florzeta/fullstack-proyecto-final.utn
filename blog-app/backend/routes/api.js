var express = require('express');
var router = express.Router();
var publicacionesModel = require('./../models/publicacionesModel');
var cloudinary = require('cloudinary').v2;

router.get('/publicaciones', async function (req, res, next) {
    let publicaciones = await publicacionesModel.getPublicaciones();

    publicaciones = publicaciones.map(publicaciones => {
        if (publicaciones.img_id) {
            const imagen = cloudinary.url(publicaciones.img_id, {
                width: 960,
                height: 200,
                crop: 'fill'
            });
            return {
                ...publicaciones,
                imagen
            }
        } else {
            return {
                ...publicaciones,
                imagen: ''
            }
        }
    });
    res.json(publicaciones);
});

module.exports = router;