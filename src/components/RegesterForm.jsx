// src/components/RegisterForm.jsx
import React, { useState } from 'react';
import { auth, db } from '../firebase/Firebase';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState('male');
//   const [formError, setFormError] = useState(false)
//   const [role, setRole] = useState('admin'); // Default role is member
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    // if(email && name && password && age ){
    //     setFormError(true)
    // }

    try {
        
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user role and other details in Firestore
      const docRef = await addDoc(collection(db, "users"),
      {
        name: name,
        age:age,
        gender: gender,
        email: user.email,
        role: 'admin',
        isApproved: false,
        createdAt: new Date(),
      })
      
      console.log(docRef);
      setSuccess('User registered successfully!');
      setEmail('');
      setPassword('');
    //   setRole('admin');

      // Optionally navigate to another page or show a message
      navigate('/dashboard');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleRegister}>
        <div className="mb-2">
          <label htmlFor="name" className="block text-gray-700">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>
          <div className='mb-2 flex  justify-between'>
            <div className='w-14'>
                <label className='text-gray-700' htmlFor="age">Age:</label>
                <input required className="w-full p-2 border border-gray-300 rounded mt-1 " type="number" />
            </div>
            <div>
                <label className='text-gray-700' htmlFor="age">Gender:</label>
                <select
                required
                id="role"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-1 "
                >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
          </div>
        <div className="mb-2">
          <label htmlFor="email" className="block text-gray-700">Email:</label>
          <input
            
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1 "
            required
          />
        </div>
       
        <div className="mb-2">
          <label htmlFor="password" className="block text-gray-700">Create Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>
        <div className="mb-2">
            
            <h2 className='text-brand-dark font-medium'>you will be regestered as admin</h2>
            
            
        
        </div>
        <button type="submit" className="w-full bg-brand-primary text-white p-2 rounded">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
