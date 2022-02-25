import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import '../styles/main.css'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
const Main = () => {
    return (
        <div className='container'>
            <h1>Bienvenido a Given</h1>
            <Link to='/register' className='link'><Button>Registrarse</Button></Link>
            <br></br>
            <br></br>
            <Link to='/login' className='link'><Button>Iniciar sesión</Button></Link>
            <br></br>
            <br></br>
            <Link to='/crearEvento' className='link'><Button>Crear evento</Button></Link>
            <br></br>
            <br></br>
            <Link to='/modificarEvento' className='link'><Button>Modificar evento</Button></Link>
            <br></br>
            <br></br>
            <Link to='/testDB' className='link'><Button>TestUsers</Button></Link>
            <br></br>
            <br></br>
            <Link to='/perfil' className='link'><Button>Perfil</Button></Link>
            <br></br>
            <br></br>
            <Link to='/testQR' className='link'><Button>QR</Button></Link>
        </div>
    )
}

export default Main
