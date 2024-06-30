import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react';
import { auth, db } from '../../firebase/Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Await, useNavigate } from 'react-router-dom';
import BackButton from '../BackButton';
import { useUser } from '../../context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

function AddMember({
  editData,
  setEditData,
  editMode,
  setEditMode,
  editId,
  setEditId,
}) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [number, setNumber] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('Male')
  const [joiningDate, setJoiningDate] = useState('')
  const [packagePlan, setPackagePlan] = useState('')
  const [amount, setAmount] = useState('')
  const packageDuration = []
  const navigate = useNavigate()
  let uniqueId;
  const {packageList, fetchPackages, fetchMembers} = useUser()

 


  
  useEffect(()=>{
       fetchPackages()
       if(editMode){
        setFirstName(editData.firstName)
        setLastName(editData.lastName)
        setAge(editData.age)
        setEmail(editData.email)
        setGender(editData.gender)
        setJoiningDate(editData.joiningDate)
        setNumber(editData.number)
        setPackagePlan(editData.packagePlan)
        setAmount(editData.amount)      
  }
       
  },[])

  
  const formatDate = (date)=>{setJoiningDate(
    new Date(date).toLocaleDateString('en-IN',{
      day:'2-digit',
      month:'2-digit',
      year:'numeric'
    }).replaceAll('/','-')
  )
  
  } 
  const addNewMember = async (e)=> {
    e.preventDefault()
    
    const filteredDuration = packageDuration.filter((doc)=>{return doc.plan == packagePlan})
    if(!editMode) {

    const createUser = await createUserWithEmailAndPassword(auth, email, password)
    
    uniqueId = createUser.user.uid
  }

    if(editId) uniqueId = editId
    try {
      
      
      
  
      await setDoc(doc(db, 'users', uniqueId), {
            firstName,
            lastName,
            number,
            email,
            age,
            gender,
            role: 'member',
            subscription:'active',
            lastPaymentDate:joiningDate,
            packagePlan,
            joiningDate,
            amount,
            duration:filteredDuration[0].duration
          });
          
          // craeating Invoice
              // try{const docRef = doc(db, `users/${String(createUser.user.uid)}/invoices`, joiningDate)
              // await setDoc(docRef, {
              //     name:firstName +' '+ lastName,
              //     number,
              //     amount,
              //     packagePlan,
    
              // })}catch(err){
              //   console.log(err);
              // }
          
      } catch (error) {
        console.log(error);
      }
    
    

      setEmail('')
      setPassword('')
      setFirstName('')
      setLastName('')
      setAge('')
      setGender('Male')
      setJoiningDate('')
      setNumber('')
      setPackagePlan('')
      setAmount('')
      if(editMode){
        setEditData(null)
        setEditMode(false)
        setEditId('')
        fetchMembers()
      }
      navigate('/dashboard/view-members')
    }

  return (
    <div className=" section-container">
      {!editMode && <BackButton link={'/dashboard/members'}/>}
      <form className="relative space-y-6 bg-white  p-6  max-w-2xl mx-auto rounded-lg shadow-lg">
      {editMode && <FontAwesomeIcon className=' text-brand-primary absolute cursor-pointer right-3 top-3' icon={faX} 
      onClick={()=>(
        
        setEmail(''),
        setPassword(''),
        setFirstName(''),
        setLastName(''),
        setAge(''),
        setGender('Male'),
        setJoiningDate(''),
        setNumber(''),
        setPackagePlan(''),
        setAmount(''),
        setEditData(null),
        setEditMode(false),
        setEditId('')
      )}
      />}
        <h1 className="text-3xl font-bold text-center mb-10">Add Member</h1>
        <div className='flex flex-col sm:flex-row gap-4 w-full'>
          <div className='w-full'>
            <label htmlFor='first-name' className="block text-black">First Name</label>
            <input 
              id='first-name'
              placeholder='Name'
              type="text" 
              value={firstName} 
              onChange={(e) => setFirstName(e.target.value)} 
              required 
              className=" p-2 w-full border border-gray-300 outline-none rounded mt-1"
            />
          </div>
          <div className='w-full'>
            <label htmlFor='last-name' className="block text-black">Last Name</label>
            <input 
              id='last-name'
              placeholder='Surname'
              type="text" 
              value={lastName} 
              onChange={(e) => setLastName(e.target.value)} 
              required 
              className="p-2 w-full border border-gray-300 outline-none rounded mt-1"
            />
          </div>
        </div>

        <div className='flex flex-col sm:flex-row gap-4 sm:gap-8'>
            <div className=''>
                <label className='text-gray-700' htmlFor="MoNumber">Mobile Number</label>
                <input 
                id='MoNumber'
                required 
                className="w-full  p-2 border border-gray-300 outline-none rounded mt-1 " 
                type="number" 
                value={number}
                onChange={(e)=>setNumber(e.target.value)}
                />
            </div>
            <div className='w-20'>
                <label className='text-gray-700' htmlFor="age">Age</label>
                <input 
                id='age'
                required 
                className="w-full  p-2 border border-gray-300 outline-none rounded mt-1 " 
                type="number" 
                value={age}
                onChange={(e)=>setAge(e.target.value)}
                />
            </div>
            <div>
                <label className='text-gray-700 block' htmlFor="gender">Gender</label>
                <select
                required
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="p-2 border border-gray-300 outline-none rounded mt-1"
                >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
        </div>

        <div className='flex  flex-col sm:flex-row gap-4'>
            <div>
                <label className='text-gray-700 block' htmlFor="package">Select Package</label>
                <select
                required
                id="package"
                // value={packagePlan}
                onChange={(e) => (setPackagePlan(e.target.value))}
                className="p-2 border border-gray-300 outline-none rounded mt-1"
                >
                  {packageList.map((doc)=>(
                    packageDuration.push({plan:doc.data().name, duration:doc.data().duration}),
                    <option key={doc.id}>{doc.data().name}</option>
                  ))}
                    {/* <option value="silver">Silver-1M</option>
                    <option value="gold">Gold-3M</option>
                    <option value="platinum">Platinum-6M</option>
                    <option value="diamond">Diamond-8M</option> */}
                </select>
            </div>
            <div className='flex-1'>
                <label className='text-gray-700' htmlFor="amount">Amount</label>
                <input 
                
                id='amount'
                required 
                className="w-full p-2 border border-gray-300 outline-none rounded mt-1" 
                type="number" 
                value={amount}
                onChange={(e)=>setAmount(e.target.value)}
                />
            </div>
            <div className=''>
                <label className='text-gray-700' htmlFor="join-date">Joinning Date</label>
                <input 
                
                id='join-date'
                required 
                className="w-full p-2 border border-gray-300 outline-none rounded mt-1" 
                type="date" 
                // value={joiningDate}
                onChange={(e)=>formatDate(e.target.value)}
                />
            </div>
           
        </div>

        {!editMode && <div className="flex flex-col sm:flex-row gap-4">
          <div className='w-full'>
            <label htmlFor='email' className="block text-black">Member Email</label>
            <input 
              id='email'
              placeholder='email'
              type="text" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="w-full p-2 border border-gray-300 outline-none rounded mt-1"
            />
          </div>
          <div className='w-full'>
            <label htmlFor='password' className="block text-black">Member Password</label>
            <input 
              id='password'
              placeholder='type your password'
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="w-full p-2 border border-gray-300 outline-none rounded mt-1"
            />
          </div>
        </div>}
        <button type='button' onClick={(e)=>addNewMember(e)} className="w-full bg-brand-primary text-white p-2 rounded hover:bg-brand-accent">{editMode? 'Edit' :'Add'} Member</button>
      </form>
    
    </div>
  )
}

export default AddMember
