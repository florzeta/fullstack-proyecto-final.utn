import React, { useState, useEffect } from 'react';
import { Card, } from "react-bootstrap";
import axios from "axios";
import '../styles/components/pages/HomePage.css';

const HomePage = () => {
    const [publicacionesDestacadas, setPublicacionesDestacadas] = useState([]);
    const [indicePublicacion, setIndicePublicacion] = useState(0);

    useEffect(() => {
        const fetchPublicacionesDestacadas = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/publicaciones");
                setPublicacionesDestacadas(response.data);
            } catch (error) {
                console.error("Error al cargar las publicaciones destacadas:", error);
            }
        };

        fetchPublicacionesDestacadas();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            // Avanzar al siguiente índice de publicación
            setIndicePublicacion(prevIndice => (prevIndice + 1) % publicacionesDestacadas.length);
        }, 3 * 60 * 1000); // Cambiar cada 3 minutos

        return () => clearInterval(interval);
    }, [publicacionesDestacadas.length]);
    return (
        <main className="holder">
            <div>
                <section className='homeimg'>
                    <img src="images/banner-color.png" alt="imagen de portada" width="100%" />
                </section>
                    <div className="bienvenido!">
                        <h2>Inicia sesion para comenzar y comparte tus ideas</h2>
                        <p>Sumérgete en un mundo de historias, consejos y descubrimientos. Desde consejos de estilo de vida hasta exploraciones en profundidad de temas fascinantes, encontrarás inspiración y conocimiento aquí. ¡Explora, aprende y comparte tus pensamientos con nosotros!</p>
                    </div>
                    <section className="featured-posts">
                        <h2>Destacados del día:</h2>
                        {publicacionesDestacadas.length > 0 && (
                        <Card className="featured-card">
                        <Card.Body>
                            <h3>{publicacionesDestacadas[indicePublicacion].titulo}</h3>
                            <p>{publicacionesDestacadas[indicePublicacion].subtitulo}</p>
                            <img src={publicacionesDestacadas[indicePublicacion].imagen} alt="Publicación" />
                            <p>{publicacionesDestacadas[indicePublicacion].cuerpo}</p>
                        </Card.Body>
                    </Card>
                    )}
                    </section>
            </div>
        </main>
    );
}

export default HomePage;
