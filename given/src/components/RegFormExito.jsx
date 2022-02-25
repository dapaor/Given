import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import '../styles/register.css';
const RegFormExito = () => {
    return (
        <div className="form-content-right">
            <div className="form-exito"><h2>¡Gracias por conectar con nosotros!</h2></div>
            <Link to="/login">Inicia sesión aquí</Link>
            <br></br>
            <br></br>
            <br></br>
            <div className="LOGO"><img src="img/GIVEN_logo_morado.png" alt="exito" className="form-img-2" /></div>
        </div>
    )
}

export default RegFormExito
