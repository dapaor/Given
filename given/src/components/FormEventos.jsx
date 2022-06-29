import React, { useState }  from 'react'
import DatePicker from "react-datepicker";
import db from '../firebase';
import {getFirestore,doc,collection,addDoc} from 'firebase/firestore'
import '../styles/eventos.css'
import "react-datepicker/dist/react-datepicker.css";
import {getAuth} from 'firebase/auth'
import { withRouter } from 'react-router-dom';
const FormEventos = (props) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [values, setValues] = useState({
        nombre: '',
        tematica: '',
        descripcion: '',
        ubicacion: ''
    });
    const handleChange = e => {
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value
        });
    }
    const addEvento = () => {
        const dbuse = getFirestore(db);
        const userRef = collection(dbuse, "users"); 
        const userDoc = doc(userRef,getAuth().currentUser.email);
        const evsRef = collection(userDoc,"eventos");
        setUserEvento(evsRef);
        setEvento(collection(dbuse,"eventos"));
        props.history.push("/listaEventos")
    } 
    async function setUserEvento(db){
        await addDoc(db, {
        nombre: values.nombre,
      });
    }
    async function setEvento(db){
        await addDoc(db, {
        nombre: values.nombre,
        tematica: values.tematica,
        descripcion: values.descripcion,
        ubicacion: values.ubicacion,
        fechaini: startDate,
        fechafin: endDate,
        organizador: getAuth().currentUser.email
      });
    }
    return (
        <div className='form-content-right-evs'>
            <h1 className='tituloForm'>Crea un nuevo evento</h1>
             <form className="form-evs" onSubmit={addEvento}>
                <div className="form-inputs-evs">
                    <label htmlFor="nombre" className="form-label">Nombre del evento</label>
                    <input type="text" name="nombre" className="form-input" placeholder="Nombre del evento"
                    value={values.nombre}
                    onChange={handleChange}/>
                </div>
                <div className="form-inputs-evs">
                    <label htmlFor="tematica" className="form-label">Temática</label>
                    <input type="text" name="tematica" className="form-input" placeholder="Temática del evento"
                    value={values.tematica}
                    onChange={handleChange}/>
                </div>
                <div className="form-inputs-evs">
                    <label htmlFor="ubicacion" className="form-label">Ubicación</label>
                    <input type="text" name="ubicacion" className="form-input" placeholder="Ubicación del evento"
                    value={values.ubicacion}
                    onChange={handleChange}/>
                </div>
                <div className="form-inputs-evs">
                    <label htmlFor="descripcion" className="form-label">Descripción</label>
                    <input type="text" name="descripcion" className="form-input" placeholder="Descripción del evento"
                    value={values.descripcion}
                    onChange={handleChange}/>
                </div>
                <div className="form-inputs-evs">
                    <label htmlFor="fechaEvento" className="form-label">Fecha de inicio</label>
                    <DatePicker id="fechaini"selected={startDate} format = "dd/mm/yyyy"selectsStart endDate={endDate}onChange={(date) => setStartDate(date)} 
                    value={values.fechaini}/>
                    <label htmlFor="fechaEvento" className="form-label">Fecha de final</label>
                    <DatePicker id="fechafin"selected={endDate} selectsEnd startDate={startDate} endDate={endDate} minDate={startDate}
                     onChange={(date) => setEndDate(date)}
                    value={values.fechafin}/>
                </div>
                <button className='form-input-btn' type='submit'>Crea el evento</button>
                </form>
        </div>
    )
}

export default withRouter(FormEventos)
