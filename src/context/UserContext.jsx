// src/context/UserContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, db } from '../firebase/Firebase';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(()=>{
    //  const unsubscribe = 
     onAuthStateChanged(auth, async (user) => {
        if (user) {
          const querySnapshot = await getDocs(collection(db, "users"))
          querySnapshot.forEach((doc)=>{
              console.log(`${doc.id} => ${doc.data()}`);
          })
         
          navigate('/dashboard');
        } else {
          
          navigate('/');
        }
      });
  
    //   return () => unsubscribe();
  },[])

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(async (user) => {
//       if (user) {
//         const userDoc = await collection('users').doc(user.uid).get();
//         const userData = userDoc.data();
//         setUser({ ...user, role: userData.role });
//         navigate('/dashboard');
//       } else {
//         setUser(null);
//         navigate('/');
//       }
//     });

//     return () => unsubscribe();
//   }, []);

  return (
    <UserContext.Provider value={""}>
      {children}
    </UserContext.Provider>
  );
};
