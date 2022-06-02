import React from 'react'
import {Link, NavLink,withRouter} from 'react-router-dom'
import '../styles/navbar.css'
import { getAuth } from 'firebase/auth'
const Navbar = (props) => {
    const cerrarSesion = () =>{
        getAuth().signOut().then(() => {
            props.history.push('/login')
        }).catch(function(error) {
          });
    }
    return(
        <div className='navbar'>
            <Link className='navbar-brand' to='/'>Given</Link>
            <div>
                <div className=''>
                {
                    props.firebaseUser !== null ?
                (
                    <NavLink to='/perfil' className='navbar-link-but' > Perfil </NavLink>
                ) :
                (
                    null
                )}
                -
                {
                  props.firebaseUser !== null ?
                (
                    <NavLink to='/crearEvento' className='navbar-link-but'> Crear Evento </NavLink>
                ) :
                (
                    null
                )  
                }
                -
                {
                props.firebaseUser !== null ?
                (
                    <button type='button' className='navbar-link-but' onClick={cerrarSesion} >Cerrar sesión</button>
                ) :
                (
                    <NavLink to='/login' className='navbar-link-but'>Login</NavLink>
                )
                }
                </div>
            </div>
            
        </div>
    )
}

export default withRouter(Navbar)