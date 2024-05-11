var express = require('express');
var router = express.Router();
var publicacionesModel = require('../../models/publicacionesModel');
const util = require('util');
const cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);

router.get('/', async function (req, res, next) {
    var publicaciones = await publicacionesModel.getPublicaciones();
    publicaciones = publicaciones.map(publicacion => {
        if (publicacion.img_id) {
            const imagen = cloudinary.image(publicacion.img_id, {
                width: 70,
                height: 70,
                crop: 'fill'
            });
            return {
                ...publicacion,
                imagen
            }
        } else {
            return {
                ...publicacion,
                imagen: ''
            }
        }
    });

    res.render('admin/publicaciones', {
        layout: 'admin/layout',
        usuario: req.session.nombre,
        publicaciones
    });
});

router.get('/agregar', (req, res, next) => {
    res.render('admin/agregar', {
        layout: 'admin/layout'
    })
});

router.post('/agregar', async (req, res, next) => {
    try {
        var img_id = '';
        // console.log(req.files.imagen);
        if (req.files && Object.keys(req.files).length > 0) {
            imagen = req.files.imagen;
            img_id = (await uploader(imagen.tempFilePath)).public_id;
        }

        if (req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != "") {
            await publicacionesModel.insertPublicacion({
                ...req.body,
                img_id
            });
            res.redirect('/admin/publicaciones')
        } else {
            res.render('admin/agregar', {
                layout: 'admin/layout',
                error: true,
                message: 'Todos los campos son requeridos'
            })
        }
    } catch (error) {
        console.log(error)
        res.render('admin/agregar', {
            layout: 'admin/layout',
            error: true,
            message: 'No se cargo la publicacion'
        });
    }
});

router.get('/eliminar/:id', async (req, res, next) => {
    var id = req.params.id;

    let publicacion = await publicacionesModel.getPublicacionById(id);
    if (publicacion.img_id) {
        await (destroy(publicacion.img_id));
    }
    await publicacionesModel.deletePublicacionById(id);
    res.redirect('/admin/publicaciones');
});

router.get('/modificar/:id', async (req, res, next) => {
    var id = req.params.id;
    var publicacion = await publicacionesModel.getPublicacionById(id);
    res.render('admin/modificar', {
        layout: 'admin/layout',
        publicacion
    });
});

router.post('/modificar', async (req, res, next) => {
    try {
        let img_id = req.body.img_original;
        let borrar_img_vieja = false;
        if (req.body.img_delete === "1") {
            img_id = null;
            borrar_img_vieja = true;
        } else {
            if (req.files && Object.keys(req.files).length > 0) {
                imagen = req.files.imagen;
                img_id = (await uploader(imagen.tempFilePath)).public_id;
                borrar_img_vieja = true;
            }
        }
        if (borrar_img_vieja && req.body.img_original) {
            await (destroy(req.body.img_original));
        }

        var obj = {
            titulo: req.body.titulo,
            subtitulo: req.body.subtitulo,
            fecha_subida: req.fecha_subida,
            cuerpo: req.body.cuerpo,
            img_id
        }

        await publicacionesModel.modificarPublicacionById(obj, req.body.id);
        res.redirect('/admin/publicaciones');
    }
    catch (error) {
        console.log(error)
        res.render('admin/modificar', {
            layout: 'admin/layout',
            error: true,
            message: 'No se modifico la publicacion'
        })
    }
})


module.exports = router;