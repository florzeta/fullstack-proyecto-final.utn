import { NavLink } from "react-router-dom";
import "../styles/components/layout/Nav.css"
const Nav = (props) => {
    return (
        <nav>
            <div>
                <ul>
                    <li><NavLink to="/" className={({ isActive }) => isActive ? "activo": undefined}> Home</NavLink></li>
                    <li><NavLink to="/publicaciones" className={({ isActive }) => isActive ? "activo": undefined}>Publicaciones</NavLink></li>
                    <li><NavLink to="/novedades" className={({ isActive }) => isActive ? "activo": undefined}>novedades</NavLink></li>
                    <li><NavLink to="/contacto" className={({ isActive }) => isActive ? "activo": undefined}>Contacto</NavLink></li>
                </ul>
            </div>
        </nav>
    );
}

export default Nav;
