import React, { useState }  from 'react'
import DatePicker from "react-datepicker";
import '../styles/eventos.css'
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
const FormEventos = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <div className='form-content-right-evs'>
             <form className="form-evs">
                <div className="form-inputs-evs">
                    <label htmlFor="nombreEvento" className="form-label">Nombre del evento</label>
                    <input type="text" name="nombeEvento" className="form-input" placeholder="Nombre del evento"/>
                </div>
                <div className="form-inputs-evs">
                    <label htmlFor="temaEvento" className="form-label">Temática</label>
                    <input type="text" name="temaEvento" className="form-input" placeholder="Temática del evento"/>
                </div>
                <div className="form-inputs-evs">
                    <label htmlFor="descEvento" className="form-label">Descripción</label>
                    <input type="text" name="descEvento" className="form-input" placeholder="Descripción del evento"/>
                </div>
                <div className="form-inputs-evs">
                    <label htmlFor="fechaEvento" className="form-label">Fecha de inicio</label>
                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}/>
                    <label htmlFor="fechaEvento" className="form-label">Fecha de final</label>
                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}/>
                </div>
                <Link to="/"><button className='btn-primary'>Vuelve a incio</button></Link>
            </form>
        </div>
    )
}

export default FormEventos
