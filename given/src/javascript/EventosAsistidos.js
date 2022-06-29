import { collection,getDocs, getFirestore,query,where,doc } from "firebase/firestore"; 
import { getAuth } from "firebase/auth";
import "../styles/eventosAsistidos.css"
import db from "../firebase";

const EventosAsistidos = (props) => {
    const dbuse = getFirestore(db);
    var eventos = []
    const colRef = collection(dbuse, "users");

    const queryUser = query(colRef, where("email","==",getAuth().currentUser.email.toLowerCase()));
    getDocs(queryUser).then((docs)=>{
        docs.forEach((docu) => {
            const docRefUser = doc(dbuse, "users", docu.id.toString());
            const colEventosUser = collection(docRefUser, "eventosAsistidos");
            const queryEventos = query(colEventosUser);
            const ulEventos = document.getElementById("ulFormacion");
            
            getDocsEventos(queryEventos).then(() => {
                getDocs(queryEventos).then(() => {
                    if(ulEventos.lastElementChild){
                        var child = ulEventos.lastElementChild; 
                        while (child) {
                            ulEventos.removeChild(child);
                            child = ulEventos.lastElementChild;
                        }
                    }
                    eventos.forEach((ev) => {
                        var li = document.createElement("li");
                        li.className="liFormacion"
                        li.innerHTML = ev;
                        var linkDownload = document.createElement("a")
                        linkDownload.innerHTML = "consigue tu certificado"
                        linkDownload.class = "buttonCertificado"
                        linkDownload.id="buttonCertificado"
                        linkDownload.href = "/getCertificate/"+ev
                        li.appendChild(linkDownload)
                        ulEventos.appendChild(li);
                    })
                })
            })
        })
        
    })

    async function getDocsEventos(queryEventos){
        const eventosSnapshot = await getDocs(queryEventos);
        const hoy = new Date();
        eventosSnapshot.forEach((doc) =>{
            let fechaEvento = doc.data().fechaFin.toDate()
            if(fechaEvento <= hoy) eventos.push(doc.data().nombre)
        });
    }
    return(
    <div className="content">
        <ul className="ulEventos" id="ulFormacion"></ul>
    </div>
    );
}
export default EventosAsistidos;