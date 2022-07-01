import React, { useState } from 'react'
import '../styles/perfil.css'
import { getAuth } from "firebase/auth";
import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PerfilPropio from '../components/PerfilPropio'
import PerfilAjeno from '../components/PerfilAjeno';

const Perfil = (props) => {
    const [esPropio,setEsPropio] = useState(true)
    const [userEmail,setEmail] = useState("");
    useEffect(() => {
        if(getAuth().currentUser){
            const url = window.location.href.toString();
            const params = (url.split("/")); 
            if(params.length >= 5){
                if(params[4] !== getAuth().currentUser.email){
                    setEmail(params[4])
                    setEsPropio(false)
                }
            }
        }else{
            props.history.push('/login');
        }
    },[props]);
    return (
        <div>
            {
                esPropio ? (<PerfilPropio/>) : (<PerfilAjeno email={userEmail}/>)
            }
        </div>
    )
}

export default withRouter(Perfil)
