import React from 'react'
import '../styles/editaFormacion.css'
import {withRouter} from 'react-router-dom'
import { getAuth } from 'firebase/auth';
import SacaFormacion from '../components/SacaFormacion';
import { query,getFirestore,getDocs, where,doc, collection, addDoc} from 'firebase/firestore';
import db from '../firebase'


const EditaFormacion = (props) => {
    const dbuse = getFirestore(db);
    if(getAuth().currentUser != null){

    }else{
        props.history.push("/login")
    }
    async function setFormacion() {
        const formacion = document.getElementById("inputFormacion").value;
        if(formacion !== ""){
            const colRef = collection(dbuse, "users");
            const queryUser = query(colRef, where("email","==",getAuth().currentUser.email.toLowerCase()));
            getDocs(queryUser).then((docs)=>{
                docs.forEach((docu) => {
                    const docRefUser = doc(dbuse, "users", docu.id.toString());
                    const colFormacion = collection(docRefUser,"formacion"); //tenemos la coleccion de formacion del user
                    anadeFormacion(colFormacion,formacion).then(() => {
                        window.location.reload();
                    });
                })
                
            })
        }
    }
    async function anadeFormacion(colFormacion,formacion){
        await addDoc(colFormacion, {
            nombre: formacion,
          })
    }
    return (
        <div className="content">
            <div>
            <p className="titleFormacion">Tu formación:</p>
            </div>
            <div className="optionsDropdown">
                    <SacaFormacion/>
                    <div className="inputAndButton">
                    <input className="inputFormacion" id="inputFormacion"type="text"></input>
                    <button className="buttonAnadir" onClick={setFormacion}>Añadir a la formación</button>
                    </div>
            </div>
        </div>
    )
}

export default withRouter(EditaFormacion)
