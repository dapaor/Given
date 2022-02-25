import Login from './pages/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"; 
import Main from './pages/Main';
import CreaEventos from './pages/CreaEventos';
import Register from './pages/Register';
import ModificaEvento from './pages/ModificaEvento';
import TestDB from './pages/TestDB';
import Perfil from './pages/Perfil';
import EditarPerfil from './pages/EditarPerfil';
import TestQR from './pages/TestQR';
function App() {
  return (
    <Router>
      <div className ="container">
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/crearEvento" exact>
            <CreaEventos/>
          </Route>
          <Route path="/modificarEvento" exact>
            <ModificaEvento/>
          </Route>
          <Route path="/testDB" exact>
            <TestDB/>
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
          <Route path="/" exact>
            <Main/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
