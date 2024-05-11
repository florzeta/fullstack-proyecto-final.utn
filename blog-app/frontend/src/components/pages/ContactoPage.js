import '../styles/components/pages/ContactoPage.css';

const ContactoPage = (props) => {
    return (
        <main className="holder contacto">
            <div>
                <h2>Contacto Rapido</h2>
                <form action="" method="" className="formulario">
                    <p>
                        <label for="nombre">Nombre</label>
                        <input type='text' name='' />
                    </p>
                    <p>
                        <label for="email">Email</label>
                        <input type='text' name='' />
                    </p>
                    <p>
                        <label for="telefono">telefono</label>
                        <input type='text' name='' />
                    </p>
                    <p>
                        <label for="mensaje">mensaje</label>
                        <textarea type='text' name=''></textarea>
                    </p>
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