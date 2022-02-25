import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/perfil.css'
const EditarPerfil = () => {
    return (
        <div id="main-container-editprof">
            <h3 className='editHeader'>Editar perfil</h3>
            <div className='form-content-right-evs'> 
             <form className="form-evs">
                <div className="form-inputs-evs">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input type="text" name="nombre" className="form-input" placeholder="Nombre"/>
                </div>
                <div className="form-inputs-evs">
                    <label htmlFor="apellidos" className="form-label">Apellidos</label>
                    <input type="text" name="apellidos" className="form-input" placeholder="Apellidos"/>
                </div>
                <div className="form-inputs-evs">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" name="email" className="form-input" placeholder="Email"/>
                </div>
                <div className="form-inputs-evs">
                    <label htmlFor="pwd1" className="form-label">Nueva contraseña</label>
                    <input type="password" name="pwd1" className="form-input" placeholder="Nueva contraseña"/>
                </div>
                <div className="form-inputs-evs">
                    <label htmlFor="pwd2" className="form-label">Confirmar contraseña</label>
                    <input type="password" name="pwd2" className="form-input" placeholder="Confirma tu nueva contraseña"/>
                </div>
                <Link to="/perfil"><button className='btn-primary'>Vuelve a perfil</button></Link>
            </form>
            </div>
        </div>
    )
}

export default EditarPerfil
