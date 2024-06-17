import React, { useState } from 'react';

function LoginForm({ userType }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement authentication logic here
    console.log(`${userType} Login - Username: ${username}, Password: ${password}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-black">Username</label>
        <input 
          placeholder='email / username'
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
          className="w-full text-gray-400  p-2 border border-gray-300 outline-none rounded mt-1"
        />
      </div>
      <div>
        <label className="block text-black">Password</label>
        <input 
          placeholder='type your password'
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          className="w-full p-2 border border-gray-300 rounded mt-1 outline-none text-gray-400"
        />
      </div>
      <button type="submit" className="w-full bg-brand-primary text-white p-2 rounded hover:bg-brand-accent">Login</button>
    </form>
  );
}

export default LoginForm;
