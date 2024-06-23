import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { auth, db } from '../../firebase/Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const AddTrainer = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [age, setAge] = useState('')
  const [isMale, setIsMale] = useState(true)
  const [joinningDate, setJoinningDate] = useState('')
  const [salary, setSalary] = useState('')

  const navigate = useNavigate();


  const addNewTrainer = async (e)=> {
    e.preventDefault()
      const toCapitalize = (str)=>{
        return str[0].toUpperCase() + str.slice(1)
      }
      const fullName = toCapitalize(firstName) + ' ' + toCapitalize(lastName)

      

      const createUser = await createUserWithEmailAndPassword(auth, email, password)
      
      const docRef = await setDoc(doc(db, 'trainers', createUser.user.uid), {
        name: fullName,
        email,
        age,
        isMale,
        role: 'trainer',
        joinningDate,
      });

      // const docRef =await addDoc(collection(db, 'users'), {
      //     name: fullName,
      //     email,
      //     age,
      //     isMale,
      //     role: 'trainer',
      //     joinningDate,
      // })

      
      navigate('/dashboard/trainers')
      console.log(docRef);
      
      setEmail('')
      setPassword('')
      setFirstName('')
      setLastName('')
      setAge('')
      setIsMale(false)
      setJoinningDate('')
      setSalary('')
  }

  return (
    <div className=" ">
      <form className="space-y-6 bg-white  p-6  max-w-2xl mx-auto rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-10">Add Tariner</h1>
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
        <div className='flex flex-wrap space-x-10'>
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
                // value={gender}
                onChange={(e) => {
                  if(e.target.value === 'Female') setIsMale(false)
                }}
                className="p-2 border border-gray-300 outline-none rounded mt-1"
                >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
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
                value={joinningDate}
                onChange={(e)=>setJoinningDate(e.target.value)}
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
        </div>
        <button type="button" onClick={addNewTrainer} className="w-full bg-brand-primary text-white p-2 rounded hover:bg-brand-accent">Add Member</button>
      </form>
    
    </div>
  );
};

export default AddTrainer;
