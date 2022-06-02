import React from 'react'
import '../styles/register.css'
import {getAuth} from 'firebase/auth';
import db from '../firebase';
import { withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
//import { useParams } from 'react-router';
import { getFirestore,collection, query, where, getDocs } from "firebase/firestore";

const ListaEventos = (props) => {
    const dbuse = getFirestore(db);  
    var nombres =  [];
    var listaURL = [];
    const muestraEventos = () =>{
        
        leeEventos().then((nombres) => {
                var eventos = document.getElementById("eventos")
                var child = eventos.lastElementChild; 
                while (child) {
                    eventos.removeChild(child);
                    child = eventos.lastElementChild;
                }
                var i=0;
                nombres.forEach(function() {
                    var div = document.createElement('div')
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
        if(getAuth().currentUser){
            const q = query(collection(dbuse, "eventos"), where("organizador", "==", getAuth().currentUser.email));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                nombres.push(doc.data().nombre)
                listaURL.push("/evento/"+doc.id) 
            });
            return nombres
        }else{
            props.history.push('/login');
        }  
    }
    muestraEventos();
    
    return(
        <div className='main-content-div'>
            <h1>Tus eventos</h1>
            <div id='eventos'></div>
        </div>
    )
}

export default withRouter(ListaEventos)