import React from 'react'
import '../styles/register.css'
import FormEventos from '../components/FormEventos';
import {withRouter} from 'react-router-dom'
import { getAuth } from 'firebase/auth';
const CreaEventos = (props) => {
    if(getAuth().currentUser){

    }else{
        props.history.push("/login")
    }
    return (
        <div id='form-content-eventos'>
            <h1>Crea un nuevo evento</h1>
            <FormEventos/>
        </div>
    )
}

export default withRouter(CreaEventos)
