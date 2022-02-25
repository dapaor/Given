import React, { useState } from 'react';
import RegForm from '../components/RegForm';
import RegFormExito from '../components/RegFormExito';
import 'bootstrap/dist/css/bootstrap.min.css'
const Register = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    function submitForm(){
        setIsSubmitted(true);
    }
    return (
        <div id="main-container">
            {!isSubmitted ? (<RegForm submitForm={submitForm}/>) : (<RegFormExito/>)}
        </div>
    )
}

export default Register;
