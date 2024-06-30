// src/context/UserContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, db } from '../firebase/Firebase';
import { useNavigate } from 'react-router-dom';
import { collection, doc, getDoc, getDocs, query, setDoc, where, } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const UserContext = createContext();



export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [trainerList, setTrainerList] = useState([])
  const [TrainerLoading, setTrainerLoading] = useState(false)

  const [membersList, setMembersList] = useState([])
  const [memberLoading, setMemberLoading] = useState(false)

  const [packageList, setPackageList] = useState([])
  const [packageLoading, setPackageLoading] = useState(false)

  const [equipmentList, setEquipmentList] = useState([])
  const [equipmentLoading, setEquipmentLoading] = useState(false)

  const navigate = useNavigate();
  let uniqueId = Date.now()


  const fetchMembers = async () => {
    setMemberLoading(true)
    try {
      const q = query(collection(db, "users"), where("role", "==", "member"))
      const querySnapShot = await getDocs(q)
      let docArr = []
      querySnapShot.forEach((doc) => {
        docArr.push(doc)
      })
      setMembersList(docArr)
      setMemberLoading(false)
    } catch (error) {
      setMemberLoading(false)
      console.log(error);
    }
  }
  const fetchTrainer = async () => {
    setTrainerLoading(true)
    try {
      const q = query(collection(db, "users"), where("role", "==", "trainer"))
      const querySnapShot = await getDocs(q)
      let docArr = []
      querySnapShot.forEach((doc) => {
        docArr.push(doc.data())
      })
      setTrainerList(docArr)
      setTrainerLoading(false)
    } catch (error) {
      setTrainerLoading(false)
      console.log(error);
    }
  }
  const addingPackage = async ({ name, amount, duration, description, editId }) => {
    if (editId) uniqueId = editId;
    try {
      await setDoc(doc(db, 'packages', `${uniqueId}`), {
        name,
        amount,
        duration,
        description,
        type: 'package',
      });

    } catch (err) {
      console.log(err);
    }
  }
  const fetchPackages = async () => {
    setPackageLoading(true)
    try {
      const querySnapShot = await getDocs(collection(db, 'packages'))
      let packageArr = [];
      querySnapShot.forEach((doc) => packageArr.push(doc))
      setPackageList(packageArr)
      setPackageLoading(false)
      return packageArr
    } catch (err) {
      console.log(err);
      setPackageLoading(false)
    }

  }
  const addingEquipment = async ({ equipment, price, weight, quantity, editId, installedDate }) => {
    if (editId) {
      uniqueId = editId;

    }

    try {
      await setDoc(doc(db, 'equipments', `${uniqueId}`), {
        equipment,
        price,
        weight,
        quantity,
        installedDate,
      });
      uniqueId = Date.now()
    } catch (err) {
      console.log(err);
    }
  }
  const fetchEquipments = async () => {
    setEquipmentLoading(true)
    try {
      const querySnapShot = await getDocs(collection(db, 'equipments'))
      let equipmentArr = [];
      querySnapShot.forEach((doc) => equipmentArr.push(doc))
      setEquipmentList(equipmentArr)
      setEquipmentLoading(false)
    } catch (err) {
      console.log(err);
      setEquipmentLoading(false)
    }

  }


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {
        const ref = doc(db, 'users', user.uid);
        const userDoc = await getDoc(ref);
        let dataStore = userDoc.data();
  
        const adminData = localStorage.getItem("adminData");
        const parsedAdminData = adminData ? JSON.parse(adminData) : null;
  
        if (parsedAdminData && parsedAdminData.role === 'admin') {
          dataStore = parsedAdminData;
        } else {
          if (userDoc.data().role === 'admin') {
            localStorage.setItem("adminData", JSON.stringify(userDoc.data()));
          }
        }
  
        setUser(dataStore);
      } else {
        console.log('user is logged out');
        setUser(null);
        navigate('/');
      }
    });
  
    return () => unsubscribe();
  }, []);


  return (
    <UserContext.Provider value={{
      user,
      TrainerLoading, fetchTrainer, trainerList,
      memberLoading, fetchMembers, membersList,
      packageLoading, addingPackage, fetchPackages, packageList,
      equipmentList, addingEquipment, equipmentLoading, fetchEquipments,
    }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => useContext(UserContext);