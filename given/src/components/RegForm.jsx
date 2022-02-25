import React from 'react';
import { Link } from 'react-router-dom';
import useForm from '../hooks/useForm';
import validate from '../util/validateInfo';
import '../styles/register.css'
const RegForm = ({submitForm}) => {
    const {handleChange, values, handleSubmit, errors} = useForm(submitForm, validate);
    return(
        <div className="form-content-right">
            <form className="form" onSubmit={handleSubmit}>
                <h1>Empieza a usar Given registrándote</h1>
                <div className="form-inputs">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" name="email" className="form-input" placeholder="Correo electrónico"
                    value={values.email}
                    onChange={handleChange}/>
                    {errors.email && <p>{errors.email}</p>}
                </div>
                <div className="form-inputs">
                    <label htmlFor="name" className="form-label">Nombre</label>
                    <input type="text" name="nombre" className="form-input" placeholder="Nombre"
                    value={values.nombre}
                    onChange={handleChange}/>
                    {errors.nombre && <p>{errors.nombre}</p>}
                </div>
                <div className="form-inputs">
                    <label htmlFor="apellidos" className="form-label">Apellidos</label>
                    <input type="text" name="apellidos" className="form-input" placeholder="Apellidos"
                    value={values.apellidos}
                    onChange={handleChange}/>
                    {errors.apellidos && <p>{errors.apellidos}</p>}
                </div>
                <div className="form-inputs">
                    <label htmlFor="password1" className="form-label">Contraseña</label>
                    <input type="password" name="password1" className="form-input" placeholder="Introduce tu contraseña"
                    value={values.password1}
                    onChange={handleChange}/>
                    {errors.password1 && <p>{errors.password1}</p>}
                </div>
                <div className="form-inputs">
                    <label htmlFor="password2" className="form-label">Confirmar contraseña</label>
                    <input type="password" name="password2" className="form-input" placeholder="Repite tu contraseña"
                    value={values.password2}
                    onChange={handleChange}/>
                    {errors.password2 && <p>{errors.password2}</p>}
                </div>
                <button className='form-input-btn' type='submit'>Regístrate</button>
                <span className="form-input-login">Entra <Link to="/login" className='linkLogin'>aquí</Link> si ya tienes cuenta con nosotros</span>
            </form>
        </div>
    );
};

export default RegForm;