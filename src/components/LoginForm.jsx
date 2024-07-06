import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { auth } from '../firebase/Firebase';
import { useNavigate } from 'react-router-dom';
import { logger } from './logging/Logging';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()

  
  const goToDashboard = async (e) => {
    e.preventDefault();
    // Implement authentication logic here
    try{
      const userCredentials = await signInWithEmailAndPassword(auth, email, password)
        setEmail('')
        setPassword('')
      
      logger.info("user logged in successfully", userCredentials)
      navigate('/dashboard/overview')
    }
    catch(err){
      logger.error("error signing in", err)
      setError('Invalid Credentials')
     
    }
    
  };

  return (
    <form className="">
      <div  className='mt-3'>
        <label htmlFor='email' className="block text-black">Email</label>
        <input 
          id='email'
          placeholder='email'
          type="text" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          onFocus={()=>setError('')}
          required 
          className="w-full text-black  p-2 border border-gray-300 outline-none rounded mt-1"
        />
      </div>
      <div className='mt-3'>
        <label htmlFor='password' className="block text-black">Password</label>
        <input 
          id='password'
          placeholder='type your password'
          type="password" 
          value={password} 
          onFocus={()=>setError('')}
          onChange={(e) => setPassword(e.target.value)} 
          required 
          className="w-full p-2 border border-gray-300 rounded mt-1 outline-none text-black"
        />
      </div>
      <div className='text-[#ff1717]  font-semibold mt-1'>{error}</div>
      <button onClick={goToDashboard} type="button" className="w-full bg-brand-primary text-white p-2 mt-6 rounded hover:bg-brand-accent">Login</button>
    </form>
  );
}

export default LoginForm;
