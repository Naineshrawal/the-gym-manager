import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/Firebase';

function LoginForm({ userType }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const goToDashboard = async (e) => {
    e.preventDefault();
    // Implement authentication logic here
    try{
      const userCredentials = await signInWithEmailAndPassword(auth, email, password)
        setEmail('')
        setPassword('')
      
      console.log(userCredentials);
    }
    catch(err){
      console.log(err);
    }
    
  };

  return (
    <form className="space-y-6">
      <div>
        <label htmlFor='email' className="block text-black">Email</label>
        <input 
          id='email'
          placeholder='email'
          type="text" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          className="w-full text-gray-400  p-2 border border-gray-300 outline-none rounded mt-1"
        />
      </div>
      <div>
        <label htmlFor='password' className="block text-black">Password</label>
        <input 
          id='password'
          placeholder='type your password'
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          className="w-full p-2 border border-gray-300 rounded mt-1 outline-none text-gray-400"
        />
      </div>
      <button onClick={goToDashboard} type="button" className="w-full bg-brand-primary text-white p-2 rounded hover:bg-brand-accent">Login</button>
    </form>
  );
}

export default LoginForm;
