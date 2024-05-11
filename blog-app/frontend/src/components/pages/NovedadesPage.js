import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PublicacionItem from '../publicaciones/PublicacionItem';
import '../styles/components/pages/NovedadesPage.css';


const NovedadesPage = (props) => {
    const [loading, setLoading] = useState(false);
    const [publicaciones, setPublicaciones] = useState([]);
    const [ordenAscendente, setOrdenAscendente] = useState(false);

    useEffect(() => {
        const cargarPublicaciones = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:3000/api/publicaciones');
                // Ordenar las publicaciones por fecha de subida, de más reciente a más antigua
                const publicacionesOrdenadas = response.data.sort((a, b) => {
                    if (ordenAscendente) {
                        return new Date(a.fecha_subida) - new Date(b.fecha_subida);
                    } else {
                        return new Date(b.fecha_subida) - new Date(a.fecha_subida);
                    }
                });
                setPublicaciones(publicacionesOrdenadas);
            } catch (error) {
                console.error('Error al cargar las publicaciones:', error);
            } finally {
                setLoading(false);
            }
        };
        cargarPublicaciones();
    }, [ordenAscendente]); // Agregar ordenAscendente como dependencia para que se ejecute el efecto cuando cambie

    const formatFecha = (fechaISO) => {
        const fecha = new Date(fechaISO);
        return fecha.toLocaleDateString();
    };

    // Función para alternar entre el orden ascendente y descendente
    const alternarOrden = () => {
        setOrdenAscendente(!ordenAscendente);
    };

    return (
        <section className="holder novedades-holder">
            <h2>Novedades</h2>
            <div className="button-container">
                <button className="button" onClick={alternarOrden}>
                    {ordenAscendente ? 'Ver las publicaciones más recientes' : 'Ver las publicaciones más antiguas'}
                </button>
            </div>
            {loading ? (
                <p>Cargando...</p>
            ) : (
                publicaciones.map(item => <PublicacionItem key={item.id_publicacion}
                    title={item.titulo} subtitle={item.subtitulo} date={formatFecha(item.fecha_subida)}
                    imagen={item.imagen} body={item.cuerpo} />)
            )}
        </section>
    )
};

export default NovedadesPage;