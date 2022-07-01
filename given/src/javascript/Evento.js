import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import "../styles/evento.css"
import {getAuth} from 'firebase/auth';
import db from '../firebase';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { getFirestore,getDoc,doc,collection,addDoc,getDocs,query,deleteDoc,where} from "firebase/firestore";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import MapContainer from '../components/MapContainer';

const Evento = (props) => {
    const dbuse = getFirestore(db);
    const url = window.location.href.toString();
    const idEvento = url.split("/").pop();
    const [userID,setUserID] = useState("");
    const [nombreEvento, setNombreEvento] = useState("");
    const [descripcion,setDescripcion] = useState("");
    const [organizador,setOrganizador] = useState("");
    const [soyOrganizador,setSoyOrganizador]  = useState(false);
    const [numParticipantes,setNumParticipantes] = useState(0);
    const [esParticipante,setEsParticipante] = useState(false);
    const [sigueTem, setSigueTem] = useState(false);
    const participantes = [];
    const [email,setEmail] = useState("");
    const tematicas=[];
    const [tematica,setTematica] = useState("");
    const [fechaFin,setFechaFin] = useState("");
    const [orgString,setOrgString] = useState("");
    const [ubicacion,setUbicacion] = useState("");
    const editarEvento = "/editaEvento/"+idEvento;
    const anadePrograma = "/anadePrograma/"+idEvento;
    const imagenes=[]
    const leeEvento= async () =>{
        if(getAuth().currentUser){

            const docRef = doc(dbuse, "eventos", idEvento);
            const docSnap = await getDoc(docRef);
            setNombreEvento(docSnap.data().nombre)
            setDescripcion(docSnap.data().descripcion)
            setOrganizador(docSnap.data().organizador)
            setUbicacion(docSnap.data().ubicacion);
            setOrgString("/perfil/"+docSnap.data().organizador);
            setFechaFin(docSnap.data().fechafin);

            if(getAuth().currentUser.email === docSnap.data().organizador) setSoyOrganizador(true);
            
            const q = query(collection(docRef,"participantes"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                participantes.push(doc.data().email)
                setEmail(doc.id)
            });
            
            const queryUser = query(collection(dbuse,"users"),where("email","==",getAuth().currentUser.email.toString()))
            
            getDocs(queryUser).then((docs)=>{
                docs.forEach((docu) => {
                    setUserID(docu.id.toString())
                    const docRefUser = doc(dbuse, "users", docu.id.toString());
                    const colTematicas = query(collection(docRefUser,"tematicas")); //tenemos la coleccion de tematicas preferidas del user
                    gestionaTematicas(colTematicas,docSnap).then(() => {
                        return docSnap.data();
                    })
                }) 
            });
        }else{ 
            props.history.push("/login")
        }
    }

    async function gestionaTematicas(colTematicas,docSnap){
        const tematicasSnapshot = await getDocs(colTematicas);
        tematicasSnapshot.forEach((doc) =>{
            tematicas.push(doc.data().nombre)
        });
        setTematica(docSnap.data().tematica)
        if(tematicas.includes(docSnap.data().tematica)) setSigueTem(true);
        else setSigueTem(false);
    }
    const procesarDatos = () => {
        
        leeEvento().then((evento) => {
            var boton = document.getElementById("participaButton")
           
            setNumParticipantes(participantes.length);
            if(participantes.find(element => element === getAuth().currentUser.email)) {
                boton.innerHTML="No voy a asistir"
                setEsParticipante(true);
            }
            else boton.innerHTML="¡Participa!";
            var botonTematica = document.getElementById("tematicaButton");
            if(sigueTem){
                botonTematica.innerHTML="Ya sigues esta temática" 
            }else{
                botonTematica.innerHTML="Sigue esta temática";
            } 
        })
    }
    const participa = () =>{
        if(esParticipante){
            eliminaParticipante()
        }else{
            addParticipante()
        }
    }
    const seguirTematica = () =>{
        const docRefUser = doc(dbuse, "users", userID); //tenemos el doc del user
        const colTematicas = collection(docRefUser,"tematicas"); //tenemos la coleccion de tematicas preferidas del user
        
        if(sigueTem){
            //Borrar temática de la lista
            eliminarTematica(colTematicas);
        }else{
            //añadir temática a la lista
            addTematica(colTematicas);
        }
    }
    async function addTematica(colTematicas){
        if(getAuth().currentUser){
            await addDoc(colTematicas, {
                nombre: tematica,
              });
            window.location.reload();
        }else{ 
            props.history.push("/login")
        }
    }
    async function eliminarTematica(colTematicas){
        var idTematica = "";
        const tematicasSnapshot = await getDocs(colTematicas);
            tematicasSnapshot.forEach((doc) =>{
                if(doc.data().nombre === tematica) idTematica = doc.id; 
            });
        if(getAuth().currentUser){
            await deleteDoc(doc(colTematicas,idTematica));
            window.location.reload()
        }else{ 
            props.history.push("/login")
        }
    }
    async function addParticipante() {
        if(getAuth().currentUser){
            const eventosRef = collection(dbuse, "eventos"); 
            const eventoDoc = doc(eventosRef,idEvento);
            const membersRef = collection(eventoDoc,"participantes");
            await addDoc(membersRef, {
                email: getAuth().currentUser.email,
              }).then(anadeEventoAUser(getDoc(eventoDoc)));
            window.location.reload();
        }else{ 
            props.history.push("/login")
        }
    }
    async function auxAnadeEvento(colEventosUser){
        await addDoc(colEventosUser, {
            nombre: nombreEvento,
            fechaFin: fechaFin
        }); 
    }
    async function anadeEventoAUser(){
        const queryUser = query(collection(dbuse,"users"),where("email","==",getAuth().currentUser.email.toString()));
        getDocs(queryUser).then((docs)=>{
            docs.forEach((docu) => {
                const docRefUser = doc(dbuse, "users", docu.id.toString());
                const colEventosUser = collection(docRefUser,"eventosAsistidos"); 
                auxAnadeEvento(colEventosUser);
            })
        });
    }
    async function eliminaEventoAUser(){
        const queryUser = query(collection(dbuse,"users"),where("email","==",getAuth().currentUser.email.toString()));
        var colEventosUser;
        var queryEvento;
        getDocs(queryUser).then((docs)=>{
            docs.forEach((docu) => {
                const docRefUser = doc(dbuse, "users", docu.id.toString());
                colEventosUser = collection(docRefUser,"eventosAsistidos");
                queryEvento=query(colEventosUser,where("nombre","==",nombreEvento));
                getDocs(queryEvento).then((docs)=>{
                    docs.forEach((docu) => {
                        deleteDoc(doc(colEventosUser,docu.id.toString()));
                    })})
            })
        });
    }
    
    async function eliminaParticipante(){
        const eventosRef = collection(dbuse, "eventos"); 
        const eventoDoc = doc(eventosRef,idEvento);
        const membersRef = collection(eventoDoc,"participantes");

        await deleteDoc(doc(membersRef,email));
        await eliminaEventoAUser().then(window.location.reload());
    }
    useEffect(() => {
            if(getAuth().currentUser){
                procesarDatos();
            }else{
                props.history.push('/login');
            }
    },[props]);
    return (
        <div className='main-content-div'>
            <div className="head-evento">
                <h2>{nombreEvento}</h2>
                
                <button type="button" id="participaButton" className="btn btn-primary" onClick={participa}></button>
                <button type="button" id="tematicaButton" className="btn btn-primary" onClick={seguirTematica}></button>
                {
                    soyOrganizador ? (<div>
                        <Link to={editarEvento}><button type="button" id="linkEditar" className="btn btn-primary">Edita tu evento</button></Link>
                        <Link to ={anadePrograma} className='linkEditar'><button className='btn btn-primary'>Añade el programa del evento</button></Link>
                        </div>) : null
                }
                <div id="ubicacionDiv">
                <MapContainer/>
                
                <p className='eventInfo'>Ubicación: {ubicacion}</p>
                </div>
                
                <br></br>
            </div>
            <div id="divDesc" className='divDesc'>{descripcion}
                {
                    numParticipantes !== 0 ? (<p className='eventInfo'>Numero de participantes: {numParticipantes}</p>) : (<p>Aún no hay participantes</p>)
                }
                {
                    soyOrganizador ? (<p className='eventInfo'>Eres el organizador del evento</p>):(<p className='eventInfo'>Organizador: <a href={orgString}>{organizador}</a></p>)
                }
            </div>
            <div class="carouselEvento">
                <button id="retroceder">Retroceder</button>
                <div id="imagenEvento"></div>
                <button id="avanzar">Avanzar</button>
            </div>
        </div>
    )
}

export default withRouter(Evento)