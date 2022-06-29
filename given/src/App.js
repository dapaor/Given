import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"; 
import Main from './javascript/Main';
import CreaEventos from './javascript/CreaEventos';
import Register from './javascript/Register';
import ModificaEvento from './javascript/ModificaEvento';
import Perfil from './javascript/Perfil';
import EditarPerfil from './javascript/EditarPerfil';
import TestQR from './javascript/TestQR';
import LoginForm from './components/LoginForm';
import { getAuth } from "firebase/auth";
import { useState } from "react";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import ListaEventos from "./javascript/ListaEventos";
import Evento from "./javascript/Evento.js";
import EditaFormacion from "./javascript/EditaFormacion";
import EventosAsistidos from "./javascript/EventosAsistidos";
import GetCertificate from "./components/GetCertificate";

function App() {
  const [firebaseUser,setFirebaseUser] = useState(false);
  useEffect(() => {
    getAuth().onAuthStateChanged(user => {
      if(user){setFirebaseUser(user)}else{setFirebaseUser(null)}
    })
  },[])
  return firebaseUser !== false ? (
    <Router>
       <Navbar firebaseUser={firebaseUser}/>
      <div className ="container">
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <LoginForm />
          </Route>
          <Route path="/crearEvento" exact>
            <CreaEventos/>
          </Route>
          <Route path="/modificarEvento" exact>
            <ModificaEvento/>
          </Route>
          <Route path="/perfil" >
            <Perfil/>
          </Route>
          <Route path="/editarPerfil" exact>
            <EditarPerfil/>
          </Route>
          <Route path="/testQR" exact>
            <TestQR/>
          </Route>
          <Route path="/listaEventos">
            <ListaEventos/>
          </Route>
          <Route path="/evento/">
            <Evento/>
          </Route>
          <Route path="/editarFormacion/">
            <EditaFormacion/>
          </Route>
          <Route path="/eventosAsistidos">
            <EventosAsistidos/>
          </Route>
          <Route path="/" exact>
            <Main/>
          </Route>
          <Route path="/getCertificate">
            <GetCertificate/>
          </Route>
        </Switch>
      </div>
    </Router>
  ) : (
    <p>Cargando...</p>
  );
}

export default App;
