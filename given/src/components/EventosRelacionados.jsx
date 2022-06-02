import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom';
import db from '../firebase';
import { getFirestore,collection, query, getDocs, doc , where} from "firebase/firestore";
import {getAuth} from 'firebase/auth';
const EventosRelacionados = (props) => {
    var tematicas =  [];
    var listaURL = [];
    var eventos = [];
    const dbuse = getFirestore(db);
    const muestraEventos = () =>{
        leeTematicas().then((eventos) => {
                leeEventos().then((eventos) => {
                    var eventosRelacionados = document.getElementById("EventosRelacionados");
                    if(eventosRelacionados.lasElementChild){var child = eventosRelacionados.lastElementChild; 
                    while (child) {
                        eventosRelacionados.removeChild(child);
                        child = eventosRelacionados.lastElementChild;
                    }} //HAY QUE ARREGLAR LO DEL ASYNC DE EVENTOS, NO PILLA EL LENGTH BIEN
                    var i =0;
                    for (const evento of eventos){
                        var div = document.createElement('div');
                        div.className="eventoChild";
                        var eventoChild = document.createElement('a');
                        eventoChild.href= listaURL[i];
                        eventoChild.innerHTML = evento;
                        div.appendChild(eventoChild);
                        eventosRelacionados.appendChild(div);
                        i++;
                    }
                })
                
        }) 
    }
    async function leeTematicas(){
            const docRef = doc(dbuse, "users", getAuth().currentUser.email); //tenemos el doc del user
            const colTematicas = query(collection(docRef,"tematicas")); //tenemos la coleccion de tematicas preferidas del user
            const tematicasSnapshot = await getDocs(colTematicas);
            tematicasSnapshot.forEach((doc) =>{
                tematicas.push(doc.data().nombre)
            });
            return eventos 
    }
    async function leeEventos(){
        
        for (const tematica of tematicas){
            const q = query(collection(dbuse, "eventos"),where("tematica","==",tematica));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                eventos.push(doc.data().nombre)
                listaURL.push("/evento/"+doc.id) 
            });
        }   
             //AQUÍ SÍ QUE COGE EL LENGTH (DENTRO FUNCIÓN ASYNC)
            return eventos;
    }
    useEffect(()=>{
        if(getAuth().currentUser){
            muestraEventos();
        }else return null;
    });
    return <div id="EventosRelacionados">
        
    </div>
}
export default withRouter(EventosRelacionados);