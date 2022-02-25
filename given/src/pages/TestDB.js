import { getDocs } from 'firebase/firestore';
import React from 'react'
import firebase from '../firebase';
import { getFirestore, collection } from 'firebase/firestore/lite';

const TestDB = () => {
    const db = getFirestore(firebase);
    const users = getUsers(db);
    console.log(users.map(user => user.data()));
    return (
        <div>
            
        </div>
    )
}
async function getUsers(db){
    const usersCol = collection(db, 'users');
    const userSnapshot = await getDocs(usersCol);
    const userList = userSnapshot.docs.map(doc => doc.data());
    return userList;
}
export default TestDB
