
import React,{ useEffect, useState } from 'react'
import { getAuth, updateEmail, updatePassword, updateProfile } from 'firebase/auth';
import {getStorage,ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import { getFirestore,collection,query,where, getDocs, updateDoc,doc } from 'firebase/firestore';
import db from '../firebase';
const SubeFoto = (props) => {
    const dbuse=getFirestore(db)
    const [photo,setPhoto] = useState(null);
    const [loading,setLoading] = useState(false);
    function handleChangePic(e){
        if (e.target.files[0]){
            setPhoto(e.target.files[0])
        }
     }
    async function upload(file,setLoading){
        var fileRef = "/eventos/"+this.props.idEvento+"";        
        fileRef = ref(getStorage(),+'.png')
            
        setLoading(true)
        await uploadBytes(fileRef,file)
        setLoading(false)
        const photoURL = await getDownloadURL(fileRef);
    }

    return (
        <div className="form-inputs">
            <label htmlFor="picture" className="form-label">Sube una foto para el evento</label>
            <input type="file" name="picture" className="form-input" placeholder="Repite tu contraseña"
            onChange={handleChangePic}/>
            <button disable={loading || !photo} id="subirFoto" type='button' onClick={handleOnClick}>Subir imagen</button>
        </div>
    );
}
export default SubeFoto