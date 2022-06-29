import React, { useState } from 'react'
import EditarPerf from '../components/EditarPerf';
import '../styles/perfil.css'
const EditarPerfil = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    function submitForm(){
        setIsSubmitted(true);
    }
    return (
        <div id="main-container">
            {!isSubmitted ? (<EditarPerf submitForm={submitForm}/>) : <EditarPerf></EditarPerf>}
        </div>
    )
}

export default EditarPerfil
