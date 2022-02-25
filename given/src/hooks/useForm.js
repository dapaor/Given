import {useState, useEffect} from 'react';
import {addDoc } from 'firebase/firestore';
import db from '../firebase';
import { getFirestore, collection } from 'firebase/firestore';

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
      const dbuse = getFirestore(db);
      const userRef = collection(dbuse, "users"); 
      e.preventDefault();
      setUser(userRef);
      setErrors(validate(values));
      setIsSubmitting(true);
      
    }
    async function setUser(db){
      await addDoc(db, {
          nombre: values.nombre, apellidos: values.apellidos, email: values.email, pwd: values.password1,});
    }
    useEffect(
        () => {
          if (Object.keys(errors).length === 0 && isSubmitting) {
            callback();
          }
        },
        [errors]
      );
    return{handleChange,values,handleSubmit,errors}
}

export default useForm;