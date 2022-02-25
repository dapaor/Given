export default function validateInfo(values){
    let errors = {}

    if(!values.nombre.trim()){
        errors.nombre = 'Es necesario especficar el nombre'
    }
    if (!values.email) {
        errors.email = 'Es necesario especificar el correo electrónico';
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'La dirección de correo especificada no es correcta';
      }
      if(!values.apellidos.trim()){
        errors.apellidos = 'Es necesario especficar los apellidos';
    }
    if (!values.password1) {
        errors.password1 = 'Es necesario especificar la contraseña';
    } else if (values.password1.length < 6) {
        errors.password1 = 'La contraseña debe tener un mínimo de 6 caracteres';
    }
    
    if (!values.password2) {
        errors.password2 = 'Es necesario confirmar la contraseña';
    } else if (values.password2 !== values.password1) {
        errors.password2 = 'Las contraseñas no coinciden';
    }
    return errors;
}