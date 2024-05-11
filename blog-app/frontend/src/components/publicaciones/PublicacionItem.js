import React from 'react';

const PublicacionItem = (props) => {
    const { title, subtitle, date, imagen, body } = props;
    return (
        <div className="publicaciones">
            <h1>{title}</h1>
            <h2>{subtitle}</h2>
            <p>{date}</p>
            <img src={imagen} alt='Publicacion'/>
            <div dangerouslySetInnerHTML={{ __html: body }}/>
                <hr />
        </div>
    );
}

export default PublicacionItem;