import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../GIVEN_logo_morado.png';

class LoginForm extends React.Component{
  render(){
    return(
      <div id="main-container">
        <a className="title">
            <label>Bienvenido a Given</label> <br />
            <img src={logo} alt="Logo" ></img>
        </a>
        <div id="loginform">
        <span className="form-input-login"><label className='titleIni'>Inicia sesión</label> o <Link to="/register" className='linkLogin'>regístrate</Link> si todavía no tienes una cuenta con nosotros</span>
          <Form />
        </div>
      </div>
    )
  }
}


const Form = () => (
   <div>
     <FormInput description="Correo electrónico" placeholder="Introduce tu correo electrónico" type="text" />
     <FormInput description="Contraseña" placeholder="Introduce tu contraseña" type="password"/>
     <Link to="/register"><FormButton title="Log in"/></Link>
   </div>
);

const FormButton = props => (
  <div id="button" class="row">
    <button>{props.title}</button>
  </div>
);

const FormInput = props => (
  <div class="row">
    <label>{props.description}</label>
    <input type={props.type} placeholder={props.placeholder}/>
  </div>  
);
export default LoginForm;