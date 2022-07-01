import React from 'react'
import '../styles/perfil.css'
import { getAuth } from "firebase/auth";
import { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { query,getFirestore,getDocs, where, collection} from 'firebase/firestore';
import {getStorage,ref,getDownloadURL} from 'firebase/storage';
import db from '../firebase'
import SacaFormacionAjena from './SacaFormacionAjena';

const PerfilAjeno = (props) => {
    
    
    const [nombre,setNombre] = useState('');
    const [apellidos,setApellidos] = useState('');  
    const [descripcion,setDescripcion] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    async function getDocData(db){
        const colRef = collection(db, "users");
        const docRef = query(colRef, where("email","==",props.email.toString()));
        const docSnap = await getDocs(docRef);
        docSnap.forEach( (doc) => {
            setNombre(doc.data().nombre);
            setApellidos(" "+doc.data().apellidos);
            setDescripcion(doc.data().descripcion);
            const storage = getStorage();
            getDownloadURL(ref(storage, doc.id+'.png')).then((url) => {
            setPhotoURL(url);
        })
        })
        creaColumnas();
        
    }
    const creaColumnas = () => {
        const colOptions = document.getElementById("col-options");
        if(colOptions !== null){
            if(colOptions.lastElementChild){
                var child = colOptions.lastElementChild; 
                while (child) {
                    colOptions.removeChild(child);
                    child = colOptions.lastElementChild;
                }
            }
            const div1 = document.createElement("div");
            div1.className="container-prof-1";
            const link1 = document.createElement("a");
            link1.href="/eventosCreados/"+props.email;
            link1.innerHTML="Eventos creados"
            div1.appendChild(link1)
            colOptions.appendChild(div1)
        }
        
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
                                <div className="d-flex flex-row text-white" id="col-options"></div>
                            </div>
                            <div className="formacionDiv">
                                <p className="formacionTitle">Formacion:</p>
                                <SacaFormacionAjena email={props.email}/>
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