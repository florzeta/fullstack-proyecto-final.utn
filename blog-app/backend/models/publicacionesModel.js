var pool = require('./bd');

async function getPublicaciones() {
    var query = "select * from publicaciones";
    var rows = await pool.query(query);
    return rows;
}

async function insertPublicacion(obj) {
    try {
        var query = "insert into publicaciones set ? ";
        var rows = await pool.query(query, [obj]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function deletePublicacionById(id) {
    var query = "delete from publicaciones where id_publicacion = ? ";
    var rows = await pool.query(query, [id]);
    return rows;
}

async function getPublicacionById(id) {
    var query = "select * from publicaciones where id_publicacion = ? ";
    var rows = await pool.query(query, [id]);
    return rows[0];
}

async function modificarPublicacionById(obj, id) {
    try {
        var query = "update publicaciones set ? where id_publicacion = ? ";
        var rows = await pool.query(query, [obj, id]);
        return rows;
    } catch (error) {
        throw error;
    }
}



module.exports = { getPublicaciones, insertPublicacion, deletePublicacionById, getPublicacionById, modificarPublicacionById }