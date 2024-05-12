import '../styles/components/pages/ContactoPage.css';
import { useState } from 'react';
import axios from 'axios';

const ContactoPage = (props) => {

    const initialForm = {
        nombre: '',
        email: '',
        telefono: '',
        mensaje: ''
    }

    const [sending, setSending] = useState(false);
    const [msg, setMsg] = useState('');
    const [formData, setFormData] = useState(initialForm);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(oldData => ({
            ...oldData,
            [name]: value
        }));
    }

    const handleSubmit = async e => {
        e.preventDefault();
        setMsg('');
        setSending(true)
        const response = await
            axios.post('http://localhost:3000/api/contacto', formData);
        setSending(false);
        setMsg(response.data.message);
        if (response.data.error === false) {
            setFormData(initialForm)
        }
    }

    return (
        <main className="holder contacto">
            <div>
                <h2>Contacto Rapido</h2>
                <form className="formulario" onSubmit={handleSubmit}>
                    <p>
                        <label for="nombre">Nombre</label>
                        <input type='text' name='nombre' value={formData.nombre}
                            onChange={handleChange} />
                    </p>
                    <p>
                        <label for="email">Email</label>
                        <input type='text' name='email' value={formData.email} onChange={handleChange} />
                    </p>
                    <p>
                        <label for="telefono">telefono</label>
                        <input type='text' name='telefono' value={formData.telefono} onChange={handleChange} />
                    </p>
                    <p>
                        <label for="mensaje">mensaje</label>
                        <textarea type='text' name='mensaje' value={formData.mensaje} onChange={handleChange}></textarea>
                    </p>
                    {sending ? <p>Enviando...</p> : null}
                    {msg ? <p>{msg}</p> : null}
                    <p class="acciones"><input type='submit' value="enviar" /></p>
                </form>
            </div>
            <div class="datos">
                <h2>Otras vias de comunicacion</h2>
                <p>Tambien podes comunicarte con nosotros usando los siguientes medios</p>
                <ul>
                    <li>telefono: 83735241</li>
                    <li>Email: contacto@nuestrapagina.com</li>
                    <li>Facebook:</li>
                    <li>Twitter</li>
                    <li>Skype</li>
                </ul>
            </div>
        </main >
    )
}

export default ContactoPage;