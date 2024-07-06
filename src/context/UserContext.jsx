// src/context/UserContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, db } from '../firebase/Firebase';
import { useNavigate } from 'react-router-dom';
import { collection, doc, getDoc, getDocs, query, setDoc, where, } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { logger } from '../components/logging/Logging';

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

  const [invoiceId, setInvoiceId] = useState('')
  const [invoiceList, setInvoiceList] = useState([])
  const [invoiceLoading, setInvoiceLoading] = useState(false)
  
  const [attendance, setAttendance] = useState([])
  let notificationsArr = []

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
      logger.error("error fetching member in userContext", error)
    }
  }
  const fetchTrainer = async () => {
    setTrainerLoading(true)
    try {
      const q = query(collection(db, "users"), where("role", "==", "trainer"))
      const querySnapShot = await getDocs(q)
      let docArr = []
      querySnapShot.forEach((doc) => {
        docArr.push(doc)
      })
      setTrainerList(docArr)
      setTrainerLoading(false)
    } catch (error) {
      setTrainerLoading(false)
      logger.error("error fetching trainer in userContext", error)
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
      logger.error("error adding package in userContext", err)
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
      setPackageLoading(false)
      logger.error("error fetching package in userContext", err)
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
      logger.error("error adding equipment in userContext", err)
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
      setEquipmentLoading(false)
      logger.error("error fetching equipment in userContext", err)
    }

  }
  const getInvoices = async (memberId) => {
      
        setInvoiceLoading(true)

      try{
        const docRef = collection(doc(db, 'users', memberId), 'invoices')
        const snapShot = await getDocs(docRef)
        let invcArr = []
        snapShot.docs.map((doc)=>invcArr.push({...doc.data(), date:doc.id}))
        setInvoiceList(invcArr);
        setInvoiceLoading(false)
      }catch(err){
        setInvoiceLoading(false)
        logger.error("error getting invoice in userContext", err)
      }
      
      
  }
  // fetching attendance record of perticular member
  const fetchAttendanceRecords = async (memberId) => {

    try {
        
        const docRef =collection( doc(db, 'users' ,`${memberId}`), "memberAttendance")
        const snapShot = await getDocs(docRef)
        let attArr = []
        snapShot.docs.map((doc)=>{
                attArr.push({...doc.data(), date:doc.id})
        })
        setAttendance(attArr)

   
    
    } catch (error) {
      logger.error('Error fetching attendance records:', error);
    }
    
    
  };

  

// getting current user on auth state changed
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
        localStorage.removeItem('adminData');
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
      getInvoices,invoiceList, invoiceLoading,invoiceId, setInvoiceId,
      notificationsArr,fetchAttendanceRecords,attendance,setAttendance,
    }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => useContext(UserContext);