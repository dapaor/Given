import {useState, useEffect} from 'react';
import {addDoc,getFirestore,collection} from 'firebase/firestore';
import db from '../firebase';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const useForm = (callback,validate) =>{
    const [values, setValues] = useState({
        nombre: '',
        apellidos: '',
        email: '',
        password1: '',
        password2: ''
    })
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleChange = e => {
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value
        });
    }
    const handleSubmit = e =>{
      e.preventDefault();
      setErrors(validate(values));
      setIsSubmitting(true);
      Registrar();
    }
    
    function Registrar(){
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, values.email, values.password1)
        .then((userCredential) => {
          auth.currentUser.displayName=values.nombre+" "+values.apellidos;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("Code "+errorCode+": "+errorMessage);
          // ..
        });
        const dbuse = getFirestore(db);
        setUser(dbuse);
    }
    async function setUser(db){
      await addDoc(collection(db, "users"), {
        nombre: values.nombre,
        apellidos: values.apellidos,
        email: values.email.toLowerCase(),
      });
    }
    
    useEffect(
        () => {
          if (Object.keys(errors).length === 0 && isSubmitting) {
            callback();
          }
        },
        [errors,isSubmitting,callback]
      );
    return{handleChange,values,handleSubmit,errors}
}

export default useForm;