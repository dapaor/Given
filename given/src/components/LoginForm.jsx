import React from 'react'
import { useState } from 'react';
import { Link, withRouter} from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const LoginForm = (props) => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState(null);

    const procesarDatos = e =>{
        e.preventDefault();
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                //const user = userCredential.user;
                setError(null);
                setEmail('');
                setPassword('');
                props.history.push('/perfil');
                // ...
            })
            .catch((error) => {
                if(error.code === 'auth/invalid-email'){
                    setError('Email no válido')
                }
                if(error.code === 'auth/user-not-found'){
                    setError('Email no registrado')
                }
                if(error.code === 'auth/wrong-password'){
                    setError('Constraseña incorrecta')
                }
            });
    }
    return(
        <div className="form-content-right">
            <form className="form"  onSubmit={procesarDatos}>
                <h1>Inicia sesión con tu cuenta Given</h1>
                <div className="form-inputs">
                    {
                        error ? 
                        (<div className='alert alert-danger'>
                        {error}
                        </div>) : null
                    }
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" name="email" className="form-input" placeholder="Correo electrónico"
                    onChange={e => setEmail(e.target.value)} value={email}/>
                </div>
                <div className="form-inputs">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input type="password" name="password" className="form-input" placeholder="Introduce tu contraseña"
                    onChange={e => setPassword(e.target.value)} value={password}/>
                </div>
                <button className='form-input-btn' type='submit'>Inicia sesión</button>
                <Link to='/register'><button className='btn btn-info btn-sm btn-block'>Regístrate aquí si no tienes cuenta</button></Link>
            </form>
        </div>
    )
}

export default withRouter(LoginForm);