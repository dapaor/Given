import React from "react"
import html2canvas from "html2canvas";
import {jsPDF} from 'jspdf';
import { useEffect } from "react";
import { getAuth } from "firebase/auth";
import "../styles/certificado.css"
import { useState } from "react";
import { getFirestore,collection,query,where,getDocs } from "firebase/firestore";
import db from "../firebase";
const GetCertificate = () =>{
    const printRef = React.useRef();
    const dbuse = getFirestore(db);
    const nEvento = decodeURI(window.location.href.toString().split("/").pop());
    const [nombreUsuario,setNombreUsuario] = useState("");
    const [apellidos,setApellidos] = useState("");
    const [fechaini,setFechaIni] = useState("") ;
    const [fechafin,setFechaFin] = useState("");
    const [unDia,setUnDia] = useState(false);
    
    const handleDownloadPdf = async () =>{
        const element = printRef.current;
        const canvas = await html2canvas(element)
        const data = canvas.toDataURL('images/png');
        const pdf = new jsPDF();
        const imgProperties = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
        pdf.addImage(data,'PNG',0,0,pdfWidth,pdfHeight);
        pdf.save('print.pdf');
    }
    const getUserInfo = async () => {
        const colRef = collection(dbuse, "users");
        const queryUser = query(colRef, where("email","==",getAuth().currentUser.email.toLowerCase()));
        getDocs(queryUser).then((docs)=>{
            
            docs.forEach((doc => {
                setNombreUsuario(doc.data().nombre)
                setApellidos(doc.data().apellidos)
            }))
        })
    }
    const getEventoInfo = async () => {
        
        const colRef = collection(dbuse,"eventos");
        const queryEvento = query(colRef, where("nombre","==",nEvento));
        getDocs(queryEvento).then((docs) =>{
            docs.forEach((doc) => {
                let fechaIniaux = doc.data().fechaini.toDate();
                let fechaFinaux = doc.data().fechafin.toDate();
                
                setFechaIni(fechaIniaux.getDay().toString()+" de "+(fechaIniaux.getMonth()+1).toString()+" del "+fechaIniaux.getFullYear().toString())
                setFechaFin (fechaFinaux.getDay().toString()+" de "+(fechaFinaux.getMonth()+1).toString()+" del "+fechaFinaux.getFullYear().toString())

                if(fechafin.dia === fechaini.dia && 
                   fechafin.mes === fechafin.mes  &&
                   fechafin.año === fechaini.año) setUnDia(true);
                

                //if() unDia=true;
            })
        })
    }
    useEffect(() => {
        if(getAuth().currentUser){
            getUserInfo();
            getEventoInfo();
        }else{
            window.location.redirect("/login")
        }
    })
    return (<div>
        <button type="button" onClick={handleDownloadPdf}>Haz click aquí para descargar tu certificado</button>
        <div ref={printRef} id="pdfDiv">
            <hr id="hr1" size="15"/>
            <img src="/img/GIVEN_logo_morado.png" id="logoGiven" alt="logo"/>
            <p className="textPDF">Este certificado hace constar que</p>
            <p className="nombreUsuario">{nombreUsuario+" "+apellidos}</p>
            <p className="textPDF">ha participado en el evento </p>
            <p className="nombreEvento">{nEvento}</p>
            {
                unDia ? 
                (<p className="textPDF">que ha tenido lugar el día {fechaini}</p>) 
                : 
                (<p className="textPDF">que tuvo lugar entre los días  {fechaini} 
                 y  {fechafin}</p>)
            }
            <p className="textPDF">Muchas gracias por su asistencia. Esperamos que haya disfrutado del evento y que pueda asistir a próximas actividades.</p>
            <br></br>
            <br></br>
            <br></br>
            <p className="textPDF">Atentamente, el equipo de Given</p>
            <hr id="hr2" size="15"/>
        </div>
    </div>)
}

export default GetCertificate