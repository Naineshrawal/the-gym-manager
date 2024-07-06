import {doc, setDoc } from 'firebase/firestore';
import React, {  useEffect, useRef, useState } from 'react';
import { auth, db, imageDb } from '../../firebase/Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {useNavigate } from 'react-router-dom';
import BackButton from '../BackButton';
import { useUser } from '../../context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { logger } from '../logging/Logging';

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
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('Male')
  const [packagePlan, setPackagePlan] = useState('')
  const [amount, setAmount] = useState('')
  const [joiningDate, setJoiningDate] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [profileImg, setProfileImg] = useState('')
  const [profileUrl, setProfileUrl] = useState('')
  const [profileImgName, setProfileImgName] = useState('')
  
  const [formError, setFormError] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const packageDuration = []
  const navigate = useNavigate()
  let lastPaymentDate ;
  let uniqueId;
  const {packageList, fetchPackages, fetchMembers} = useUser()

 


  
//  setting initial data while editing
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
          setProfileUrl(editData.profileUrl)
          setProfileImgName(editData.profileImgName)
          
    }
        
    },[])

// profile image storing in firebase storage
    useEffect(()=>{

      if(!editMode && profileImg){ try{const imgRef = ref(imageDb, `images/${profileImg.name + Date.now()}`)
      uploadBytes(imgRef, profileImg).then((imgDoc)=>{
        setProfileImgName(imgDoc.ref.name)
        getDownloadURL(imgDoc.ref).then((url)=>setProfileUrl(url))
        setUploadSuccess(true)
      })}catch(err){
      logger.error('img upload error', err);
      }
      
    }},[profileImg])

  
// editing/adding new member  
  const addNewMember = async (e)=> {
    e.preventDefault()

    // form validation
      if(!firstName ||  !lastName || !number || !age || !packagePlan || !amount || !joiningDate || !email )
        {
                console.log('runnnn1');
                  setFormError(true)
                  return

        }else if((!password ||  !profileImg) && !editMode){

          setFormError(true)
          return
        }else{

          setFormError(false)
        }

      
      if(!uploadSuccess && !editMode)return
      const filteredDuration = packageDuration.filter((doc)=>{return doc.plan == packagePlan})
      

    //  creating auth
    if(!editMode) {
      lastPaymentDate = joiningDate
        try{
            const createUser = await createUserWithEmailAndPassword(auth, email, password)
            uniqueId = createUser.user.uid
        }catch(err){
            logger.error("error while create authentication", err)
        }
     
    }else{
      uniqueId = editId   
    }

    let subscriptionStatus = 'active'
    if(editMode) {
        subscriptionStatus = editData.subscription
        lastPaymentDate = editData.lastPaymentDate
    }

   
    //  adding member in firestore
    try {
       // craeating Invoice
          try{
            const docRef = doc(db, `users/${uniqueId}/invoices`, lastPaymentDate)
              await setDoc(docRef, {
                  name:firstName +' '+ lastName,
                  number,
                  packagePlan,
                  amount,

                })
                  // adding revenue
              await setDoc(doc(db, 'revenue', lastPaymentDate),{
                    date:lastPaymentDate,
                    amount,
              })
          }catch(err){
            logger.error("error creating invoice while adding new member", err)
          }
      
      
      
      // storing member data in firestore
          await setDoc(doc(db, 'users', uniqueId), {
            firstName,
            lastName,
            number,
            email,
            age,
            gender,
            role: 'member',
            subscription:subscriptionStatus,
            lastPaymentDate,
            packagePlan,
            joiningDate,
            amount,
            profileUrl:profileUrl,
            profileImgName,
            duration:filteredDuration[0].duration
          });
          
          if(editMode){
            toast.success("Member Edit Success")
          }else{
            toast.success("Member Added Successfully")
          }
      } catch (error) {
        logger.error('error while adding / editing member', error)
      }
    
    
    //  celaring state data after adding new member 
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
      setProfileUrl('')
      setUploadSuccess(false)
      setProfileImgName('')
      if(editMode){
        setEditData(null)
        setEditMode(false)
        setEditId('')
        fetchMembers()
      }
      navigate('/dashboard/view-members')
    }

  return (
    <div className=" section-container m-6">
      {/* back button */}
      {!editMode && <BackButton link={'/dashboard/members'}/>}
      <form className="relative space-y-6 bg-white  p-6  max-w-2xl mx-auto rounded-lg shadow-lg">
        {/* close editmode button */}
      {editMode && <FontAwesomeIcon className=' text-brand-primary absolute cursor-pointer right-3 top-3' icon={faX} 
                  onClick={()=>(
                    // cearing data in edit mode if user close edit mode without doing editing
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
                    setEditId(''),
                    setProfileUrl(''),
                    setProfileImgName('')
                  )}
      />}
        <h1 className="text-3xl font-bold text-center mb-10">{editMode? 'Edit' :'Add'} Member</h1>
        {/* name input */}
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
        {/* mobile number , age , gender input */}
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
        {/* select package, amount, joining date input */}
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
                value={joiningDate}
                onChange={(e)=>setJoiningDate(e.target.value)}
                />
            </div>
           
        </div>
        {/* email and password input */}
        {!editMode && 
        <div className="flex flex-col sm:flex-row gap-4">
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
        {/* select profile image file input */}
        {!editMode &&  
        <div className='flex'>
            <label className='mr-8' htmlFor="profile-img">Select Profile Image &nbsp;&#10148;&nbsp;</label>
            {!uploadSuccess && profileImg && <img className='rounded-full w-6 sm:w-8'  src="/images/loading-icon.svg" alt="loading icon" />}
            <input  id='profile-img' type="file" onChange={(e)=>setProfileImg(e.target.files[0])}/>
        </div>}
        {/* form validation error */}
        {formError && <span className='text-red-600 font-bold'>Please fill all the fields</span>}
        <button type='button' 
        onClick={(e)=>addNewMember(e)} 
        className="w-full  bg-brand-primary text-white p-2 rounded hover:bg-brand-accent">{editMode? 'Edit' :'Add'} 
        Member</button>
      </form>
    
    </div>
  )
}

export default AddMember
