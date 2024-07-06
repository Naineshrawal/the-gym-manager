// src/components/dashboard/Overview.jsx
import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import Logout from './Logout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faUser, faUserFriends, faCoins, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase/Firebase';
import InvoicePage from './invoices/InvoicePage';


const Overview = () => {
  const { user,
          trainerList,fetchTrainer,TrainerLoading,
          membersList,fetchMembers,memberLoading,
          fetchEquipments,equipmentLoading,equipmentList, 
          fetchAttendanceRecords,attendance,setInvoiceId,invoiceLoading,invoiceId,getInvoices,invoiceList
  } = useUser();

  
          const [totalRevenue, setTotalRevenue] = useState([])
          const [revenueLoading, setRevenueLoading] = useState(false)
          const [showNotification, setShowNotification] = useState('')
          const [isNotified, setIsNotified] = useState(false)

          const [name, setName] = useState('')
          const [number, setNumber] = useState('')
          const [packagePlan, setPackagePlan] = useState('')
          const [amount, setAmount] = useState('')
          const [date, setDate] = useState('')
          const [viewInvoice, setViewInvoice] = useState(false)
          
          {viewInvoice?window.scrollTo({top:0, left:0, behavior:'smooth'} ):null}
          let curMonth = new Date().getMonth() + 1
          const months = ['JAN','FAB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']
          
        
          
         

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

          

  //  fetching data and showing member notifications
          useEffect(()=>{
            fetchTrainer()
            fetchMembers()
            fetchEquipments()
            getRevenue()
            
           
            
           
             // getting current loggedin member attendances / invoices
            if(user.role==='member'){
              fetchAttendanceRecords(auth.currentUser.uid)
              getInvoices(auth.currentUser.uid)
              
            }
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
    <div className={`relative ${!isNotified ? 'p-6':'p-0'} ${!viewInvoice ? 'p-6':'p-0'}`}>
      {/* invoice page */}
      {viewInvoice &&
        <div className='absolute w-[100%] min-h-screen bg-[#000000d0] '>
          <InvoicePage
          name={name}
          setName={setName}
          packagePlan={packagePlan}
          setPackagePlan={setPackagePlan}
          number={number}
          setNumber={setNumber}
          amount={amount}
          setAmount={setAmount}
          date={date}
          setDate={setDate}
          setViewInvoice={setViewInvoice}
          />
        </div>
                    }
      {/* notification tab */}
      {isNotified && 
      <div className='absolute z-10 w-[100%] min-h-[100%] bg-[#000000d0] flex justify-center '>
        <div className=' w-[350px] mt-40 h-40 rounded-xl px-2 text-center text-xl font-semibold text-brand-dark bg-brand-secondary'>
          <h1 className='mt-10 '>{showNotification}</h1>
          <button onClick={()=>setIsNotified(false)} className='mt-4 bg-brand-primary px-3 py-1'>OK</button>
        </div>
      </div>}


        <div className="bg-white flex justify-between p-6 rounded-lg shadow-lg mb-2">
            <div className='flex gap-4 items-center'>
              <img width={'70px'} src="/images/exercising3.png" alt="exercise3" />
              <h1 className="text-3xl font-bold">Hello, <br /> <span className='text-brand-neutral'>{user.role === 'admin'? user.name : user.firstName + ' ' + user.lastName}</span> <span className='text-sm text-gray-400'>({user.role})</span></h1>
            </div>
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
              <div className="bg-brand-accent  p-4 rounded-lg text-white">
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

        {/* conditional rendering for member */}
        {user.role==='member' && 
        <div className="bg-white p-4 rounded flex md:flex-row flex-col gap-10 items-center w-full shadow">
              <div className='shadow-md px-4 pb-4 w-full '>
                <h2 className="text-2xl text-brand-dark text-center font-bold mb-4">My Attendance Report</h2>
                <div className="max-w-[400px] min-h-80 p-2 bg-gray-200 flex flex-wrap gap-2 mx-auto">
                {attendance.map((att, index)=>(
                              <div className={`w-16 h-12 mb-1 flex flex-col items-center rounded justify-center ${att.status == 'present' ? 'bg-green-600': 'bg-red-500'}`} 
                              key={index}>
                                  <h1 className='font-bold text-white'>
                                      {parseInt(att.date.slice(8,10))}
                                  </h1>
                                  <p className='text-[8px] text-gray-800 font-semibold'>
                                      {months[parseInt(att.date.slice(5,7)) - 1]}/
                                      {att.date.slice(0,4)}
                                  </p>
                              </div>
                          ))}
                  </div>
              </div>
        
              <div className='shadow-md px-4 pb-4 w-full '>
                        {!invoiceLoading?
                        <>
                          <h1 className="text-2xl text-brand-dark text-center font-bold mb-4">Your Bills</h1>
                          <div className="max-w-[400px] min-h-80 p-2 bg-gray-200 flex flex-wrap gap-2 mx-auto">
                            {invoiceList.map((doc, index)=>(
                                  
                                  <div className='flex flex-col justify-center items-center w-16 h-16 cursor-pointer' 
                                  key={index} 
                                  onClick={()=>(
                                      setViewInvoice(true),
                                      setName(doc.name),
                                      setAmount(doc.amount),
                                      setNumber(doc.number),
                                      setPackagePlan(doc.packagePlan),
                                      setDate(doc.date)
                                  )}
                                  >
                                      <FontAwesomeIcon className='text-red-500 text-5xl' icon={faFilePdf} />
                                      <p className='text-[8px] mt-1'>{doc.date.slice(8) + '/' + doc.date.slice(5,7) + '/' + doc.date.slice(0,4)}</p>
                                      
                                  </div>
                              ))}
                          </div>
                        </>
                        :
                        <h1 className='text-center font-semibold text-lgs text-brand-neutral'>Loading...</h1>
                        }
              </div>
            
           
        </div>}

    </div>
    </>
  );
};

export default Overview;
