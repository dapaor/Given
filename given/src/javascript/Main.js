import React, {useEffect} from 'react'
import '../styles/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { getFirestore,collection, query, getDocs, } from "firebase/firestore";
import db from '../firebase'
import {getAuth} from 'firebase/auth';
import EventosRelacionados from '../components/EventosRelacionados';

const Main = (props) => {
    const dbuse = getFirestore(db);  
    var nombres =  [];
    var listaURL = [];
    const muestraEventos = () =>{
        leeEventos().then((nombres) => {
                var eventos = document.getElementById("ProxEventos")
                if(getAuth()){
                    var child = eventos.lastElementChild; 
                    while (child) {
                        eventos.removeChild(child);
                        child = eventos.lastElementChild;
                    }}
                var i=0;
                nombres.forEach(function() {
                    var div = document.createElement('div')
                    div.className="eventoChild"
                    var evento = document.createElement('a')
                    evento.href= listaURL[i]
                    evento.innerHTML = nombres[i];
                    i++;
                    div.appendChild(evento)
                    eventos.appendChild(div)
                });
        }) 
    }
    async function leeEventos(){
        
            const q = query(collection(dbuse, "eventos"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                nombres.push(doc.data().nombre)
                listaURL.push("/evento/"+doc.id) 
            });
            return nombres 
    }
    useEffect(() => {
        if(getAuth().currentUser){
            muestraEventos();
        }else{
            muestraEventos();
        }
    },[props]);
    
    return (
        <div className='main-content-div'>
            {
                getAuth().currentUser ? (
                <div><h2>Eventos que podrían gustarte</h2><p>basados en tus temáticas favoritas</p>
                <EventosRelacionados/>
                <br></br></div>
                ) : null
            }
            <h2>Próximos Eventos</h2>
            <p>basados en fechas próximas</p>
            <div id="ProxEventos"></div>
        </div>
    )
}

export default Main
