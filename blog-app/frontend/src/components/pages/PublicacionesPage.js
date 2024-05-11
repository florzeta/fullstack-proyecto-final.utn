import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PublicacionItem from '../publicaciones/PublicacionItem';
import '../styles/components/pages/PublicacionesPage.css';

const PublicacionesPage = (props) => {
    const [loading, setLoading] = useState(false);
    const [publicaciones, setPublicaciones] = useState([]);

    useEffect(() => {
        const cargarPublicaciones = async () => {
            setLoading(true);
            const response = await axios.get('http://localhost:3000/api/publicaciones');
            setPublicaciones(response.data);
            setLoading(false);
        };
        cargarPublicaciones();
    }, []);
    return (
        <section className="holder">
            <h2>Publicaciones</h2>
            {loading ? (
                    <p>Cargando...</p>
                ) : (
                    publicaciones.map(item => <PublicacionItem key={item.id_publicacion}
                        title={item.titulo} subtitle={item.subtitulo}
                        imagen={item.imagen} body={item.cuerpo} />)
                )
            }
        </section>
    )
};

export default PublicacionesPage;