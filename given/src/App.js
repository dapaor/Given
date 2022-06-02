import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"; 
import Main from './pages/Main';
import CreaEventos from './pages/CreaEventos';
import Register from './pages/Register';
import ModificaEvento from './pages/ModificaEvento';
import Perfil from './pages/Perfil';
import EditarPerfil from './pages/EditarPerfil';
import TestQR from './pages/TestQR';
import LoginForm from './components/LoginForm';
import { getAuth } from "firebase/auth";
import { useState } from "react";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import ListaEventos from "./pages/ListaEventos";
import Evento from "./pages/Evento";

function App() {
  const [firebaseUser,setFirebaseUser] = useState(false);
  useEffect(() => {
    getAuth().onAuthStateChanged(user => {
      if(user){setFirebaseUser(user)}else{setFirebaseUser(null)}
    })
  },[])
  return firebaseUser !== false ? (
    <Router>
      <div className ="container">
        <Navbar firebaseUser={firebaseUser}/>
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
          <Route path="/perfil" exact>
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
          <Route path="/" exact>
            <Main/>
          </Route>
        </Switch>
      </div>
    </Router>
  ) : (
    <p>Cargando...</p>
  );
}

export default App;
