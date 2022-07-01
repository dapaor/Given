import React from 'react'
import '../styles/perfil.css'
import { Link } from 'react-router-dom'
import { getAuth } from "firebase/auth";
import { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { query,getFirestore,getDocs, where, collection} from 'firebase/firestore';
import db from '../firebase'
import SacaFormacion from './SacaFormacion';

const PerfilPropio = (props) => {

    const [nombre,setNombre] = useState('');
    const [apellidos,setApellidos] = useState('');  
    const [photoURL, setPhotoURL] = useState("/public/img/profileDefault.png")
    const [descripcion,setDescripcion] = useState('');

    async function getDocData(db){
        const colRef = collection(db, "users");
        const docRef = query(colRef, where("email","==",getAuth().currentUser.email.toLowerCase()));
        const docSnap = await getDocs(docRef);
        docSnap.forEach( (doc) => {
            setNombre(doc.data().nombre);
            setApellidos(" "+doc.data().apellidos);
            setDescripcion(doc.data().descripcion);
        })
        
    }
    useEffect(() => {
        if(getAuth().currentUser){
            const dbuse = getFirestore(db);
            getDocData(dbuse);
            if(getAuth().currentUser.photoURL){
                setPhotoURL(getAuth().currentUser.photoURL)
            }else{
                setPhotoURL("https://firebasestorage.googleapis.com/v0/b/given-b6d8f.appspot.com/o/aEguqoLTuGbl1GOYiplc7Sx1XSw1.png?alt=media&token=b6fb3804-dfcf-40b8-98be-717ae7dfd27c");
            }
        }else{
            props.history.push('/login');
        }
    },[props]);
    return(
        <div id="main-container-profile">
                <div className="container mt-5 mb-5">
                    <div className="row no-gutters">
                        <div className="col" id="nameAndPic">
                        <div id="container-header-profile">
                            <h3 className="display-5" >{nombre}{apellidos}</h3>
                        </div>
                            <img src={photoURL} id="profilePic" alt="profPic"></img>
                        </div>
                        <div className="col">
                            <div className="d-flex flex-column">
                                <br></br>
                                <div className="d-flex flex-row text-white" id="col-options">
                                    <div className="container-prof-1">
                                        <Link to='/eventosAsistidos'><h6>Eventos asistidos</h6></Link>
                                    </div>
                                    <div className="container-prof-1">
                                        <Link to='/listaEventos'><h6>Mis eventos</h6></Link>
                                    </div>
                                    <div className="container-prof-1">
                                        <Link to="/editarPerfil" className='link-profile'><h6>Editar perfil</h6></Link>
                                    </div>
                                    <div className="container-prof-1">
                                        <Link to="/editarFormacion" className='link-profile'><h6>Editar formación</h6></Link>
                                    </div>s
                                </div>
                            </div>
                            <div className="formacionDiv">
                                <p className="formacionTitle">Formación:</p>
                                <SacaFormacion/>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <p id="userDescription" className="userDescription">{descripcion}</p>
                    </div>
                </div>
            </div> 
    )
    }
export default withRouter(PerfilPropio)