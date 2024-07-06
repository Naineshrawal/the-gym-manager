import { doc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { auth, db, imageDb } from '../../firebase/Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import BackButton from '../BackButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '../../context/UserContext';
import { toast } from 'react-toastify';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { logger } from '../logging/Logging';

const AddTrainer = ({
          editData,
          setEditData,
          editMode,
          setEditMode,
          editId,
          setEditId,
        }) => {

        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')
        const [firstName, setFirstName] = useState('')
        const [lastName, setLastName] = useState('')
        const [age, setAge] = useState('')
        const [gender, setGender] = useState('male')
        const [joiningDate, setJoiningDate] = useState('')
        const [salary, setSalary] = useState('')
        const [number, setNumber] = useState('')
        const [profileImg, setProfileImg] = useState('')
        const [profileUrl, setProfileUrl] = useState('')
        const [profileImgName, setProfileImgName] = useState('')
        const [formError, setFormError] = useState(false)
        const [uploadSuccess, setUploadSuccess] = useState(false)

        const {fetchTrainer} = useUser()

        let uniqueId ;

        const navigate = useNavigate();

// setting data while  editing trainer
        useEffect(()=>{

            if(editData){
              setFirstName(editData.firstName)
              setLastName(editData.lastName)
              setAge(editData.age)
              setGender(editData.gender)
              setJoiningDate(editData.joiningDate)
              setSalary(editData.salary)
              setNumber(editData.number)
              setProfileUrl(editData.profileUrl)
              setProfileImgName(editData.profileImgName)
              setEmail(editData.email)
            }
        },[])

// profile image storing
        useEffect(()=>{
      
          if(!editMode && profileImg){ try{const imgRef = ref(imageDb, `images/${profileImg.name + Date.now()}`)
          uploadBytes(imgRef, profileImg).then((imgDoc)=>{
            setProfileImgName(imgDoc.ref.name)
            getDownloadURL(imgDoc.ref).then((url)=>setProfileUrl(url))
            setUploadSuccess(true)
          })}catch(err){
           console.log('img upload error', err);
          }
          
        }},[profileImg])
  
                
// adding new member
        const addNewTrainer = async (e)=> {
          e.preventDefault()

          // validating form 
          if(!firstName ||  !lastName || !number || !age || !salary || !joiningDate || !email ){
              
              setFormError(true)
              return
            }else if((!password || !profileImg )&& !editMode){
              setFormError(true)
              return

            }else{
              setFormError(false)
            }
            
            if(!uploadSuccess && !editMode)return 
           
          // creating auth  
              if(!editMode){
                try{const createUser = await createUserWithEmailAndPassword(auth, email, password)
                    uniqueId = createUser.user.uid
                }catch(err){
                  logger.error("error while creating firebase auth", err)
                }
              }else{
                uniqueId = editId
              }

          // adding new member data to firestore 
             try {
                const docRef = await setDoc(doc(db, 'users', uniqueId), {
                  firstName,
                  lastName,
                  email,
                  age,
                  gender,
                  role: 'trainer',
                  joiningDate,
                  salary,
                  number,
                  profileUrl,
                  profileImgName,
                });

                if(editMode){
                  toast.success("Member Edit Success")
                }else{
                  toast.success("Member Added Successfully")
                }
                
             } catch (error) {
              logger.error("error while adding member data to firestore", error)
             }
          

              
              
          // clearing state data after adding/ editing member  
              setEmail('')
              setPassword('')
              setFirstName('')
              setLastName('')
              setAge('')
              setGender('male')
              setJoiningDate('')
              setSalary('')
              setNumber('')
              setUploadSuccess(false)
              setProfileImgName('')
              if(editMode){
                setEditData('')
                setEditId('')
                setEditMode('')
                fetchTrainer()
              }
              navigate('/dashboard/view-trainer')
  }

  return (
    <div className=" m-6">
      {!editMode && <BackButton link={'/dashboard/trainers'}/>}
      
      <form className="relative space-y-6 bg-white  p-6  max-w-2xl mx-auto rounded-lg shadow-lg">
          {editMode && <FontAwesomeIcon className=' text-brand-primary absolute cursor-pointer right-3 top-3' icon={faX} 
                        onClick={()=>(
                          // cearing data in editmode while closing edit mode
                                setEmail(''),
                                setPassword(''),
                                setFirstName(''),
                                setLastName(''),
                                setAge(''),
                                setGender('male'),
                                setJoiningDate(''),
                                setSalary(''),
                                setNumber(''),
                                setEditId(''),
                                setEditMode(''),
                                setEditData(''),
                                setProfileImgName('')
                        )}
          />}
          <h1 className="text-3xl font-bold text-center mb-10">{editMode? 'Edit':'Add'} Tariner</h1>
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
              <div className='w-20'>
                  <label className='text-gray-700' htmlFor="age">Age:</label>
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
                  <label className='text-gray-700 block' htmlFor="gender">Gender:</label>
                  <select
                  required
                  id="gender"
                  value={gender}
                  onChange={(e) => {setGender(e.target.value)
                  }}
                  className="p-2 border border-gray-300 outline-none rounded mt-1"
                  >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                  </select>
              </div>
              <div>
                <label htmlFor="mo-number">Mo. Number</label>
                <input 
                  id='mo-number' 
                  type="number"
                  required
                  className="w-full p-2 border border-gray-300 outline-none rounded mt-1" 
                  value={number}
                  onChange={(e)=>setNumber(e.target.value)}
                />
              </div>
          </div>
          <div className='flex flex-col sm:flex-row gap-4'>
              <div className='w-full'>
                  <label className='text-gray-700' htmlFor="join-date">Joinning Date:</label>
                  <input 
                  id='join-date'
                  required 
                  className="w-full p-2 border border-gray-300 outline-none rounded mt-1" 
                  type="date" 
                  value={joiningDate}
                  onChange={(e)=>setJoiningDate(e.target.value)}
                  />
              </div>
              <div className='w-full'>
                  <label className='text-gray-700' htmlFor="salary">Salary:</label>
                  <input
                  type='number'
                  required
                  placeholder='₹ in rupees'
                  id="salary"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  className="w-full p-2 border border-gray-300 outline-none rounded mt-1"
                  >
                  </input>
              </div>
          </div>
          {!editMode && 
          <div className="flex flex-col sm:flex-row gap-4">
            <div className='w-full'>
              <label htmlFor='email' className="block text-black">Email</label>
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
              <label htmlFor='password' className="block text-black">Password</label>
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
          
          {!editMode &&  
          // upload profile image
            <div className='flex'>
              <label className='mr-8' htmlFor="profile-img">Select Profile Image &nbsp;&#10148;&nbsp;</label>
              {!uploadSuccess && profileImg && <img className='rounded-full w-6 sm:w-8 '  src="/images/loading-icon.svg" alt="loading icon" />}
              <input id='profile-img' type="file" onChange={(e)=>setProfileImg(e.target.files[0])}/>
            </div>}
            {formError && <span className='text-red-600 font-bold'>Please fill all the fields</span>}
          <button type="button" onClick={addNewTrainer} className="w-full bg-brand-primary text-white p-2 rounded hover:bg-brand-accent">{editMode? 'Edit':'Add'}  Member</button>
      </form>
    
    </div>
  );
};

export default AddTrainer;
