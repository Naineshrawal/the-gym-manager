import React from 'react';
import LoginForm from '../components/LoginForm';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';


function Home() {
  const {user} = useUser()
  
  return (
    <main className="section-container  w-full bg-black flex items-center justify-center md:justify-start bg-no-repeat  bg-center bg-cover bg-hero min-h-[100vh]" >
        {!user ? <div className="bg-white/50 p-8 rounded shadow-md w-full max-w-xs  md:ml-20">
          <h2 className="text-2xl font-bold mb-6 text-center ">LOGIN</h2>
          
            <LoginForm/>
          
        </div>
        :
          <div >
            <Link to={'/dashboard/overview'}>
                <button type="button" className=" text-xl font-bold p-3 ml-20 rounded-lg shadow-md  bg-brand-primary text-white  hover:bg-brand-accent ">Goto Dashboard</button>
            </Link>
          </div>
        }
      </main>
  );
}

export default Home;
