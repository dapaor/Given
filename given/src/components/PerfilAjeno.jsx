import React from 'react'
import '../styles/perfil.css'
import { Link } from 'react-router-dom'
import { getAuth } from "firebase/auth";
import { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { query,getFirestore,getDocs, where, collection} from 'firebase/firestore';
import {getStorage,ref,getDownloadURL} from 'firebase/storage';
import db from '../firebase'
import SacaFormacion from './SacaFormacion';

const PerfilAjeno = (props) => {

    
    const [nombre,setNombre] = useState('');
    const [apellidos,setApellidos] = useState('');  
    const [descripcion,setDescripcion] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [idUser, setIdUser] = useState('');
    async function getDocData(db){
        const colRef = collection(db, "users");
        const docRef = query(colRef, where("email","==",this.props.email.toString()));
        
        const docSnap = await getDocs(docRef);
        docSnap.forEach( (doc) => {
            setNombre(doc.data().nombre);
            setApellidos(" "+doc.data().apellidos);
            setDescripcion(doc.data().descripcion);
            setIdUser(doc.id)
        })
        const storage = getStorage();
        const pathReference = ref(storage, idUser+'.png');
        getDownloadURL(ref(storage, 'images/stars.jpg')).then((url) => {
            setPhotoURL(url);
        })
    }
    useEffect(() => {
        if(getAuth().currentUser){
            const dbuse = getFirestore(db);
            getDocData(dbuse);
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
                                </div>
                            </div>
                            <div className="formacionDiv">
                                <p className="formacionTitle">Formacion:</p>
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
export default withRouter(PerfilAjeno)