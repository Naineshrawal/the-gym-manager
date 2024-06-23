import React from 'react';
import LoginForm from '../components/LoginForm';


function Home() {

  return (
    <main className="section-container  w-full bg-black flex items-center justify-center md:justify-start bg-no-repeat  bg-center bg-cover bg-hero h-[100vh]" >
        <div className="bg-white/50 p-8 rounded shadow-md w-full max-w-xs  md:ml-20">
          <h2 className="text-2xl font-bold mb-6 text-center ">ADMIN LOGIN</h2>
          
            <LoginForm/>
          
          <div>
            
          </div>
        </div>
      </main>
  );
}

export default Home;
