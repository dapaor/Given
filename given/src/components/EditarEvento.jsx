import React from "react";
import db from "../firebase";
import { getFirestore, doc,getDoc, updateDoc} from "firebase/firestore";
import { useState } from "react";
import DatePicker from "react-datepicker";
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { getAuth } from "firebase/auth";

const EditarEvento = (props) => {
    const dbuse = getFirestore(db);
    const url = window.location.href.toString();
    const idEvento = url.split("/").pop();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [values,setValues] = useState({
        fechaIni:'',
        fechaFin: ''
    })


    const [nombre,setNombre] = useState("");
    const [tematica,setTematica] = useState("")
    const [descripcion,setDescripcion] = useState("")
    const [ubicacion,setUbicacion] = useState("")


    const handleChange = e => {
        const {name, value} = e.target
        if(name === "nombre"){
            setNombre(value)
        }
        if(name === "tematica"){
            setTematica(value)
        }
        if(name === "descripcion"){
            setDescripcion(value)
        }
        if(name === "ubicacion"){
            setUbicacion(value)
        }
    }
    const actualizaEvento = async () => {
        const docRef = doc(dbuse, "eventos", idEvento);
        console.log("Se van a añadir los siguientes valores: \n"+nombre+"\n"+tematica+"\n"+ubicacion+"\n"+descripcion+"\n"+endDate+"\n"+startDate)
        await updateDoc(docRef, {
            nombre: nombre,
            tematica: tematica,
            ubicacion: ubicacion,
            descripcion: descripcion,
            fechaini: startDate,
            fechafin: endDate
        })
        alert("El evento se ha actualizado correctamente.")
    }
    const procesaDatos = () => {
        setDefaults();
    }
    const setDefaults = async () => {
        const docRef = doc(dbuse, "eventos", idEvento);
        const docSnap = await getDoc(docRef);

        if(values.nombre === '' ||  values.nombre === undefined) {
            setNombre(docSnap.data().nombre)
        }
        if(values.tematica === '' || values.tematica === undefined) {
            setTematica(docSnap.data().tematica)
        }
        if(values.ubicacion === '' || values.ubicacion === undefined) {
            if(docSnap.data().ubicacion === undefined){
                setUbicacion("Por definir")
            }else{
                setUbicacion(docSnap.data().ubicacion)
            }
        }
        if(values.descripcion === '' || values.descripcion === undefined) {
            setDescripcion(docSnap.data().descripcion)
        }
        setStartDate(docSnap.data().fechaini.toDate());
        setEndDate(docSnap.data().fechafin.toDate());
        setValues({fechaIni: docSnap.data().fechaini.toDate()})
        setValues({fechaFin: docSnap.data().fechafin.toDate()})
    }
    useEffect(() => {
        if(getAuth().currentUser){
            procesaDatos();
        }else{
            props.history.push('/login');
        }
    },[props]);
    return (
        <div>
             <div className='form-content-right-evs'>
            <h1 className='tituloForm'>Edita tu evento</h1>
             <div className="form-evs">
                <div className="form-inputs-evs">
                    <label htmlFor="nombre" className="form-label">Nombre del evento</label>
                    <input type="text" name="nombre" className="form-input" placeholder="Nombre del evento"
                    value={nombre}
                    onChange={handleChange}/>
                </div>
                <div className="form-inputs-evs">
                    <label htmlFor="tematica" className="form-label">Temática</label>
                    <input type="text" name="tematica" className="form-input" placeholder="Temática del evento"
                    value={tematica}
                    onChange={handleChange}/>
                </div>
                <div className="form-inputs-evs">
                    <label htmlFor="ubicacion" className="form-label">Ubicación</label>
                    <input type="text" name="ubicacion" className="form-input" placeholder="Ubicación del evento"
                    value={ubicacion}
                    onChange={handleChange}/>
                </div>
                <div className="form-inputs-evs">
                    <label htmlFor="descripcion" className="form-label">Descripción</label>
                    <input type="text" name="descripcion" className="form-input" placeholder="Descripción del evento"
                    value={descripcion}
                    onChange={handleChange}/>
                </div>
                <div className="form-inputs-evs">
                    <label htmlFor="fechaEvento" className="form-label">Fecha de inicio</label>
                    <DatePicker id="fechaini"selected={startDate} format = "MMMM d, yyyy h:mmaa" selectsStart endDate={endDate}onChange={(date) => setStartDate(date)} 
                    value={values.fechaIni}/>
                    <label htmlFor="fechaEvento" className="form-label">Fecha de final</label>
                    <DatePicker id="fechafin"selected={endDate} format="MMMM d, yyyy h:mmaa" selectsEnd startDate={startDate} endDate={endDate} minDate={startDate}
                     onChange={(date) => setEndDate(date)}
                    value={values.fechaFin}/>
                </div>
                    <button className='form-input-btn' type='button' onClick={actualizaEvento}>Edita el evento</button>
                </div>
        </div>
        </div>
    );
}
export default withRouter(EditarEvento);