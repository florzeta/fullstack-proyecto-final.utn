var express = require('express');
var router = express.Router();
var publicacionesModel = require('./../models/publicacionesModel');
var cloudinary = require('cloudinary').v2;

var nodemailer = require('nodemailer');

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


router.post('/contacto', async (req, res) => {
    const mail = {
        to: 'zetastudio.ar@gmail.com',
        subject: 'Contacto web',
        html: `${req.body.nombre} se contacto a traves de la web y quiere mas informacion a este correo: ${req.body.email} <br> Ademas, hizo el siguiente comentario: ${req.body.mensaje} <br> Su tel es: ${req.body.telefono}`
    }

    const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    }); // cierra transp

    await transport.sendMail(mail)

    res.status(201).json({
        error: false,
        message: 'Mensaje enviado'
    });

});


module.exports = router;