import React from 'react'
import '../styles/eventos.css'
import FormEventos from '../components/FormEventos';
import {withRouter} from 'react-router-dom'
import { getAuth } from 'firebase/auth';
const CreaEventos = (props) => {
    if(getAuth().currentUser){

    }else{
        props.history.push("/login")
    }
    return (
        <div className='form-content-eventos'>
            <FormEventos/>
        </div>
    )
}

export default withRouter(CreaEventos)
