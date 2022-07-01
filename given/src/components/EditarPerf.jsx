import React,{ useEffect, useState } from 'react'
import '../styles/perfil.css'
import '../styles/editarPerfil.css'
import validate from '../util/validateInfo';
import { withRouter } from 'react-router-dom';
import { getAuth, updateEmail, updatePassword, updateProfile } from 'firebase/auth';
import {getStorage,ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import { getFirestore,collection,query,where, getDocs, updateDoc,doc } from 'firebase/firestore';
import db from '../firebase';


const EditarPerf = (props,{submitForm}) => {
    const dbuse = getFirestore(db);
    const [photo,setPhoto] = useState(null);
    const [loading,setLoading] = useState(false);
    const handleChange = e => {
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value
        });
    }
    const [values, setValues] = useState({
        nombre: '',
        apellidos: '',
        email: '',
        password1: '',
        password2: ''
    })
    const [errors, setErrors] = useState({});

    //ACTUALIZAR PERFIL
    const actualiza = (props) => {
        setErrors(validate(values));

        const usersRef = collection(dbuse,"users")
        const queryUser = query(usersRef,where("email","==",getAuth().currentUser.email.toString()))
        actualizaDocumento(queryUser);
        if(values.email !== '' && !loading) updateEmail(getAuth().currentUser,values.email)
        if(values.password1 !== '' && !loading) updatePassword(getAuth().currentUser,values.password1)
    }
    async function actualizaDocumento(queryUser,usersRef){
        setLoading(true);
        const snapshotUser = await getDocs(queryUser);
        snapshotUser.forEach((doc) => {
            actualizaCampos(doc.id);
        })
        setLoading(false);
    }
    async function actualizaCampos(docID){
        
        const docRef = doc(dbuse,"users",docID)
        await updateDoc(docRef,{
            email: values.email.toLowerCase(),
            nombre: values.nombre,
            apellidos: values.apellidos
        })
    }
    function handleChangePic(e){
       if (e.target.files[0]){
           setPhoto(e.target.files[0])
       }
    }
    function handleOnClick(){
        upload(photo,setLoading)
    }
    async function upload(file,setLoading){
        var fileRef = ""; 
        const queryUser = query(collection(dbuse,"users"),where("email","==",getAuth().currentUser.email));
        await getDocs(queryUser).then((docs) => {
            docs.forEach((doc) => {
                fileRef = ref(getStorage(), doc.id.toString()+'.png')
            })
        })
        setLoading(true)
        await uploadBytes(fileRef,file)
        setLoading(false)
        const photoURL = await getDownloadURL(fileRef);
        updateProfile(getAuth().currentUser, {photoURL: photoURL})
    }
    useEffect(() => {
        if(getAuth().currentUser){
            
        }else{
            props.history.push('/login');
        }
    },[props]);
    
    return (
        <div className="form-content-right">
            <form className="form" onSubmit={actualiza}>
                <h1>Editar Perfil</h1>
                <div className="form-inputs">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" name="email" className="form-input" placeholder="Correo electrónico"
                    value={values.email}
                    onChange={handleChange}/>
                    {errors.email && <p>{errors.email}</p>}
                </div>
                <div className="form-inputs">
                    <label htmlFor="name" className="form-label">Nombre</label>
                    <input type="text" name="nombre" className="form-input" placeholder="Nombre"
                    value={values.nombre}
                    onChange={handleChange}/>
                    {errors.nombre && <p>{errors.nombre}</p>}
                </div>
                <div className="form-inputs">
                    <label htmlFor="apellidos" className="form-label">Apellidos</label>
                    <input type="text" name="apellidos" className="form-input" placeholder="Apellidos"
                    value={values.apellidos}
                    onChange={handleChange}/>
                    {errors.apellidos && <p>{errors.apellidos}</p>}
                </div>
                <div className="form-inputs">
                    <label htmlFor="password1" className="form-label">Contraseña</label>
                    <input type="password" name="password1" className="form-input" placeholder="Introduce tu contraseña"
                    value={values.password1}
                    onChange={handleChange}/>
                    {errors.password1 && <p>{errors.password1}</p>}
                </div>
                <div className="form-inputs">
                    <label htmlFor="password2" className="form-label">Confirmar contraseña</label>
                    <input type="password" name="password2" className="form-input" placeholder="Repite tu contraseña"
                    value={values.password2}
                    onChange={handleChange}/>
                    {errors.password2 && <p>{errors.password2}</p>}
                </div>
                <div className="form-inputs">
                    <label htmlFor="picture" className="form-label">Actualizar foto de perfil</label>
                    <input type="file" name="picture" className="form-input" placeholder="Repite tu contraseña"
                    onChange={handleChangePic}/>
                    <button disable={loading || !photo} id="subirFoto" type='button' onClick={handleOnClick}>Subir imagen</button>
                </div>
                
                <button className='form-input-btn' type='button' onClick={actualiza}>Confirmar cambios</button>
                <button id="borrarCuenta" type="button">Solicitar eliminar cuenta</button>
            </form>
        </div>
    )
}

export default withRouter(EditarPerf)
