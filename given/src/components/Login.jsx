import React from 'react';
import { Link } from 'react-router-dom';
import login from '../hooks/login';
import '../styles/register.css';
const Login = ({submitForm}) => {
    const {values,handleSubmit,handleChange} = login(submitForm);
    return(
        <div className="form-content-right">
            <form className="form" onSubmit={handleSubmit}>
                <h1>Inicia sesión con tu cuenta Given</h1>
                <div className="form-inputs">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" name="email" className="form-input" placeholder="Correo electrónico"
                    value={values.email}/>
                </div>
                <div className="form-inputs">
                    <label htmlFor="password1" className="form-label">Contraseña</label>
                    <input type="password" name="password1" className="form-input" placeholder="Introduce tu contraseña"
                    value={values.contra}
                    onChange={handleChange}/>
                </div>
                <button className='form-input-btn' type='submit'>Inicia sesión</button>
            </form>
        </div>
    );
};

export default Login;