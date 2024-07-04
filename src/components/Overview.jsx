// src/components/dashboard/Overview.jsx
import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import Logout from './Logout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faUser, faUserFriends, faCoins } from '@fortawesome/free-solid-svg-icons';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase/Firebase';


const Overview = () => {
  const { user,
          trainerList,
          fetchTrainer,
          TrainerLoading,
          membersList,
          fetchMembers,
          memberLoading,
          fetchEquipments,
          equipmentLoading,
          equipmentList, 
  } = useUser();


  const [totalRevenue, setTotalRevenue] = useState([])
  const [revenueLoading, setRevenueLoading] = useState(false)
  const [showNotification, setShowNotification] = useState('')
  const [isNotified, setIsNotified] = useState(false)


  let curMonth = new Date().getMonth() + 1

  // getting current Month revenue 
const getRevenue = async()=>{
  try{ 
      
      setRevenueLoading(true)
          const docRef = collection(db, 'revenue',) 
          const snapShot = await getDocs(docRef)
          
          const filterValue = snapShot.docs.filter((doc)=>parseInt(doc.data().date.slice(5,7))==curMonth)
          setTotalRevenue(filterValue.map((doc)=>parseInt(doc.data().amount)))
          setRevenueLoading(false)
        }catch(err){
          console.log(err);
          setRevenueLoading(false)
        }
  }


  
  


//  fetching data 
  useEffect(()=>{
    fetchTrainer()
    fetchMembers()
    fetchEquipments()
    getRevenue()

    
    // show notification to member
    if(user.role === 'member' && !memberLoading){
      membersList.map((member)=>{
        if(member.id === auth.currentUser.uid && member.data().notification){
            setShowNotification(member.data().notification)
            setIsNotified(true)
        }
  
      })
    }else{
      setShowNotification('')
    }
  },[])



  return (
    <>
    <div className={`relative ${!isNotified ? 'p-6':null} `}>
      {/* notification tab */}
      {isNotified && <div className='absolute z-10 w-[100%] min-h-[100%] bg-[#000000d0] flex justify-center '>
        <div className=' w-[350px] mt-40 h-40 rounded-xl px-2 text-center text-xl font-semibold text-brand-dark bg-brand-secondary'>
          <h1 className='mt-10 '>{showNotification}</h1>
          <button onClick={()=>setIsNotified(false)} className='mt-4 bg-brand-primary px-3 py-1'>OK</button>
        </div>
      </div>}
        <div className="bg-white flex justify-between p-6 rounded-lg shadow-lg mb-2">
            <h1 className="text-3xl font-bold">Hello, <br /> <span className='text-brand-neutral'>{user.role === 'admin'? user.name : user.firstName + ' ' + user.lastName}</span> <span className='text-sm text-gray-400'>({user.role})</span></h1>
            <Logout/>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg mb-2">
          <h1 className="text-2xl font-bold text-brand-primary mb-4">Dashboard Overview</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
              <div className="bg-brand-primary p-4 rounded-lg text-white">
                <FontAwesomeIcon icon={faUser} className="text-4xl text-brand-dark mb-2" />
                <h2 className="text-lg font-bold">Total Members</h2>
                {!memberLoading?
                  <p className="text-4xl">{membersList?.length}</p>
                :
                <div className='w-5 mt-3 flex justify-center items-center relative h-5 border-2 border-gray-400 rounded-full'><div className='w-5 h-5 border-t-2 animate-spin rounded-full'></div></div>
                }
              </div>
              <div className="bg-brand-secondary p-4 rounded-lg text-white">
                <FontAwesomeIcon icon={faUserFriends} className="text-4xl text-brand-primary mb-2" />
                <h2 className="text-lg font-bold">Total Trainers</h2>
                {!TrainerLoading ?
                <p className="text-4xl ">{trainerList?.length}</p>
                :
                <div className='w-5 mt-3 flex justify-center items-center relative h-5 border-2 border-gray-400 rounded-full'><div className='w-5 h-5 border-t-2 animate-spin rounded-full'></div></div>
                }
              </div>
              <div className="bg-brand-neutral p-4 rounded-lg text-white">
                <FontAwesomeIcon icon={faDumbbell} className="text-4xl text-brand-secondary mb-2" />
                <h2 className="text-lg font-bold">Total Equipments</h2>
                {!equipmentLoading ?
                <p className="text-4xl ">{equipmentList?.length}</p>
                :
                <div className='w-5 mt-3 flex justify-center items-center relative h-5 border-2 border-gray-400 rounded-full'><div className='w-5 h-5 border-t-2 animate-spin rounded-full'></div></div>
                }
              </div>
              {user.role === 'admin'&& 
              <div className="bg-brand-accent p-4 rounded-lg text-white">
                  <FontAwesomeIcon icon={faCoins} className="text-4xl text-brand-primary mb-2" />
                  <h2 className="text-lg font-bold">Monthly Revenue</h2>
                  {!revenueLoading?<p className="text-4xl">
                    { totalRevenue.reduce((totalVal, curVal)=>totalVal + curVal,0)}
                  </p>
                  :
                  <><div className='w-5 mt-3 flex justify-center items-center relative h-5 border-2 border-gray-400 rounded-full'><div className='w-5 h-5 border-t-2 animate-spin rounded-full'></div></div></>
                  }
              </div>}
              
          </div>
        </div>
        <div className="bg-white  flex flex-col lg:flex-row gap-6 p-6 rounded-lg shadow-lg mb-2">
            <div className="bg-white p-4 rounded w-full shadow">
              <h2 className="text-2xl font-bold mb-4">Attendance Reports</h2>
              <p>Last Seven Days Report</p>
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                {/* Placeholder for the chart */}
                Chart
              </div>
            </div>
            {user.role === 'admin' && <div className="bg-white p-4 w-full rounded shadow">
              <h2 className="text-2xl font-bold mb-4">Total Reports</h2>
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                
                Pie Chart 
              </div>
            </div>}
        </div>
    </div>
    </>
  );
};

export default Overview;
