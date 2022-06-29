import React from 'react'
import { getAuth } from "firebase/auth";
import { useEffect } from 'react';
import { query,getFirestore,getDocs, where,doc, collection} from 'firebase/firestore';
import db from '../firebase'
import {withRouter} from 'react-router-dom'


const SacaFormacion = (props) => {
    const formaciones = [];
    useEffect(() => {
        if(getAuth().currentUser){
            const dbuse = getFirestore(db);
            getFormacionUser(dbuse);
        }else{
            props.history.push('/login');
        }
    },[props,getFormacionUser]);
    async function getFormacionUser(dbuse){
        const colRef = collection(dbuse, "users");
        const queryUser = query(colRef, where("email","==",getAuth().currentUser.email.toLowerCase()));
        getDocs(queryUser).then((docs)=>{
            docs.forEach((docu) => {
                const docRefUser = doc(dbuse, "users", docu.id.toString());
                const colFormacion = query(collection(docRefUser,"formacion")); //tenemos la coleccion de formacion del user
                getDocsFormacion(colFormacion).then(() => {
                    var ul = document.getElementById("ulFormacion");
                    if(ul.lastElementChild){
                        var child = ul.lastElementChild; 
                        while (child) {
                            ul.removeChild(child);
                            child = ul.lastElementChild;
                        }
                    }
                    formaciones.forEach((form) => {
                        var li = document.createElement("li");
                        li.className="liFormacion"
                        li.innerHTML = form;
                        ul.appendChild(li);
                    })
                });
            })
            
        })
    }
    async function getDocsFormacion(colFormacion){
        const formacionSnapshot = await getDocs(colFormacion);
        formacionSnapshot.forEach((doc) =>{
            formaciones.push(doc.data().nombre)
        });
    }
    return(<ul className="ulFormacion" id="ulFormacion">
        <img src="../public/img/remove.png"></img>
    </ul>);
}
export default withRouter(SacaFormacion)