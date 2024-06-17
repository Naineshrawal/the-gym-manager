import React from 'react';
import LoginForm from '../components/LoginForm';

function TrainerLogin() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-brand-primary">Trainer Login</h2>
        <LoginForm userType="Trainer" />
      </div>
    </div>
  );
}

export default TrainerLogin;
