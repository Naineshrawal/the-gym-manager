import { faBell, faCircleXmark, faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect} from 'react'
import { useUser } from '../context/UserContext'
import { toast } from 'react-toastify'
import { db } from '../firebase/Firebase'
import { doc, updateDoc } from 'firebase/firestore'
import { logger } from './logging/Logging'

function Notifications() {

  const {fetchMembers, membersList } = useUser()
  
// sinding notification to user in firebase
  const sendNotification =async (member)=>{
    try {
      const memberRef = doc(db, 'users', member.id);
      await updateDoc(memberRef, {
        notification: 'Your plan has expired. Please renew your plan.'
      });
      toast.success(`Notification sent to member ${member.data().firstName}`);
    } catch (error) {
      logger.error('Error sending notification:', error);
      toast.error('Failed to send notification.');
    }
    
  }

    useEffect(()=>{
      fetchMembers()
    },[])
    
    const expiredMembers = membersList?.filter((member)=>member.data().subscription === 'Expired')
 
    
  return (
    <div className=' m-6 min-h-screen'>
        <h1 className='text-center font-bold text-3xl text-brand-neutral'>Notifications</h1>
        <div className='bg-gray-300 mx-auto  max-w-[400px] mt-10 rounded-2xl py-10 px-4'>

          {/* header */}
            <div className='flex justify-between px-6 bg-brand-dark rounded-t-lg py-2 text-gray-400 text-lg font-medium'>
              <h1>Name</h1>
              <h1>Plan Status</h1>
            </div>

            {/* body */}
            {expiredMembers.length? expiredMembers.map((member)=>(

              <div key={member.id} className='flex justify-between items-center px-4 bg-[#9f9f9f] py-3 rounded-lg mt-2 text-gray-100'>
                <h1 className='text-black'>{member.data().firstName + ' ' + member.data().lastName}</h1>
                <div className='flex items-center space-x-2'>
                  <h1 className='text-[#ff2020] font-bold'>{member.data().subscription}</h1>
                  <FontAwesomeIcon onClick={()=>(sendNotification(member))} className='text-lg text-[#ff9123] cursor-pointer' icon={faBell}/>
                  {/* <div 
                onClick={()=>(divert(member.data().firstName +  member.data().lastName))} 
                className='bg-white w-5 rounded-full h-5 flex items-center justify-center cursor-pointer'>
                  </div> */}
                </div>
              </div>
              ))
              :
              <div className='flex justify-center  px-4 bg-gray-600 py-3 rounded-lg mt-2 text-green-600'>No New Notification</div>
            }
        </div>
    </div>
  )
}

export default Notifications
