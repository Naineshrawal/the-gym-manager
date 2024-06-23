// src/context/UserContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, db } from '../firebase/Firebase';
import { useNavigate } from 'react-router-dom';
import {  doc, getDoc, } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const UserContext = createContext();



export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();



  useEffect(() => {
    onAuthStateChanged(auth, async user => {
      if(user){
        const ref = doc(db, 'users', user.uid)
        const userDoc = await getDoc(ref)

        
        console.log(userDoc.data());
        setUser(userDoc.data())
        navigate('/dashboard/overview')
        
      }else{
        console.log('user is loggedout');
        setUser(null)
        navigate('/')
      }
      
    })
  }, []);


  return (
    <UserContext.Provider value={{user,}}>
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => useContext(UserContext);