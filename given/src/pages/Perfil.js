import React from 'react'
import '../styles/perfil.css'
import { getAuth } from "firebase/auth";
import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PerfilPropio from '../components/PerfilPropio'
const Perfil = (props) => {
    
    useEffect(() => {
        if(getAuth().currentUser){
            
        }else{
            props.history.push('/login');
        }
    },[props]);
    return (
        <PerfilPropio/>
    )
}

export default withRouter(Perfil)
