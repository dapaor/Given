import React from 'react'
import '../styles/perfil.css'
import { Link } from 'react-router-dom'
const Perfil = () => {
    return (
        <div id="main-container-profile">
            <div class="container mt-5 mb-5">
                <div class="row no-gutters">
                    <div class="col">
                        <img src="https://i.imgur.com/aCwpF7V.jpg"></img><br></br><br></br><br></br></div>
                    <div class="col">
                        <div class="d-flex flex-column">
                            <div id="container-header-profile">
                                <h3 class="display-5" >Nombre del usuario</h3>
                            </div>
                            <br></br>
                            <div class="d-flex flex-row text-white" id="col-options">
                                <div id="container-prof-1">
                                    <h6>Eventos asistidos</h6>
                                </div>
                                <div id="container-prof-1">
                                    <h6>Lista de eventos pendientes</h6>
                                </div>
                                <div id="container-prof-1">
                                    <h6>Mis eventos</h6>
                                </div>
                                <div id="container-prof-1">
                                    <Link to="/editarPerfil" className='link-profile'><h6>Editar perfil</h6></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    )
}

export default Perfil
