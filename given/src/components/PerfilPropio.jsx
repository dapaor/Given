import React from 'react'
import '../styles/perfil.css'
import { Link } from 'react-router-dom'
import { getAuth } from "firebase/auth";
import { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { query,getFirestore,getDocs, where, collection} from 'firebase/firestore';
import db from '../firebase'
const PerfilPropio = (props) => {
    const [nombre,setNombre] = useState('');
    const [apellidos,setApellidos] = useState('');  
    const [photoURL, setPhotoURL] = useState("img/profileDefault.png")
    async function getDocData(db){
        const colRef = collection(db, "users");
        const docRef = query(colRef, where("email","==",getAuth().currentUser.email.toLowerCase()));
        const docSnap = await getDocs(docRef);
        docSnap.forEach( (doc) => {
            setNombre(doc.data().nombre);
            setApellidos(" "+doc.data().apellidos);
        })
        
    }
    useEffect(() => {
        if(getAuth().currentUser){
            const dbuse = getFirestore(db);
            getDocData(dbuse);
            setPhotoURL(getAuth().currentUser.photoURL)
        }else{
            props.history.push('/login');
        }
    },[props]);
    return(
        <div id="main-container-profile">
                <div class="container mt-5 mb-5">
                    <div class="row no-gutters">
                        <div class="col">
                            <img src={photoURL} alt="profPic"></img></div>
                        <div class="col">
                            <div class="d-flex flex-column">
                                <div id="container-header-profile">
                                    <h3 class="display-5" >{nombre}{apellidos}</h3>
                                </div>
                                <br></br>
                                <div class="d-flex flex-row text-white" id="col-options">
                                    <div id="container-prof-1">
                                        <h6>Eventos asistidos</h6>
                                    </div>
                                    <div id="container-prof-1">
                                        <Link to='/listaEventos'><h6>Mis eventos</h6></Link>
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
export default withRouter(PerfilPropio)