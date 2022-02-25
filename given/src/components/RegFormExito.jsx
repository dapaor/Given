import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import '../styles/register.css';
const RegFormExito = () => {
    return (
        <div className="form-content-right">
            <div className="form-exito"><h2>Hemos recibido tu petición de registro</h2></div>
            <Link to="/">Vuelve a inicio</Link>
            <img src="img/GIVEN_logo_morado.png" alt="exito" className="form-img-2" />
        </div>
    )
}

export default RegFormExito
