import React, { useEffect,  useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCross, faEdit, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import BackButton from '../BackButton';
import { useUser } from '../../context/UserContext';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/Firebase';
import { toast } from 'react-toastify';
import AddMember from './AddMember';

function ViewMembers() {
    const {memberLoading,fetchMembers,membersList, fetchPackages, packageList} = useUser()
    const [renewBox, setRenewBox] = useState('')
    const [packagePlan, setPackagePlan] = useState('Select Plan')
    const [editMode, setEditMode] = useState(false)
    const [editData, setEditData]= useState(null)
    const [editId, setEditId]= useState(null)
    const packageDuration = []

    
    const expiry = (lastPaymentDate, planMonths, docs, uid)=>{
      
      let monthsRemaining ;
      let daysRemaining ;
      
      
      let currentYear = new Date().getFullYear();

      let lastPaymentMonth = parseInt(lastPaymentDate.slice(3,5)) 
      let currentMonth = new Date().getMonth() + 1 ;
      let duration = parseInt(planMonths)
      
      let lastPaymentDay = parseInt(lastPaymentDate.slice(0,2)) 
      let currentDay = new Date().getDate()  ;
      
      function getDaysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }
      
      const daysInMonth = getDaysInMonth(currentMonth,currentYear)

      
      
// calculating rmaining months
      if(currentMonth < lastPaymentMonth){
        monthsRemaining = duration - (12 - lastPaymentMonth + currentMonth)
      }
      
      else{
        monthsRemaining = duration - (currentMonth - lastPaymentMonth)
      }

// calculating remaining days
      if(currentDay > lastPaymentDay){
        monthsRemaining = monthsRemaining - 1
        daysRemaining = daysInMonth-( currentDay - lastPaymentDay)
      }else if(lastPaymentDay === currentDay  ){
        
        daysRemaining =  lastPaymentDay - currentDay
      }else{
        
        daysRemaining = lastPaymentDay  - currentDay
      }

// if plan expired
      if(monthsRemaining <=0 && daysRemaining <=0){
        
        const updatePlan = async ()=> {
          
                try {
                    await setDoc(doc(db, 'users', uid), 
                      {...docs, subscription:'Expired' ,duration:'0 months'}
                  );
              } catch (error) {
                console.log(error);
              }
            }
            updatePlan()
            
            return null
          }else if(lastPaymentDay === 31 && monthsRemaining <=0 && daysRemaining <=1){
            const updatePlan = async ()=> {
              
                try {
                    await setDoc(doc(db, 'users', uid), 
                    {...docs, subscription:'Expired', duration:'0 months'});
                  
                  
              } catch (error) {
                console.log(error);
              }
              
            }
            updatePlan()
            return null
          }

      if(daysRemaining <=10 && monthsRemaining == 0)return(<span className='text-red-700'>{daysRemaining}  Days to go</span>)
        
      return monthsRemaining + ' Month' + ' ' + daysRemaining + ' Days to go'
    }

    const updatePlan = async (docs, uid)=> {
      if(packagePlan =='Select Plan') return toast.error('Please Select Plan First')
      const filteredDuration = packageDuration.filter((doc)=>{return doc.plan == packagePlan})
      
      try {
        await setDoc(doc(db, 'users', uid), 
        {...docs, subscription:'active' ,duration:filteredDuration[0].duration, packagePlan}
      );
    } catch (error) {
      console.log(error);
    }
    fetchMembers()
    setRenewBox('')
    setPackagePlan('Select Plan')
}
    const renew = (docId, )=>{
        setRenewBox(docId)
        fetchPackages()
  }
    const deleteMember =async (memberId)=>{
      await deleteDoc(doc(db, 'users', memberId))
      fetchMembers()
    }
    
    
    useEffect(()=>{
        fetchMembers()
      },[])
  return (
    <>
      {editMode?
      <AddMember
        editData = {editData}
        setEditData = {setEditData}
        editMode={editMode}
        setEditMode = {setEditMode}
        editId={editId}
        setEditId={setEditId}
      />
      :<div className='section-container mb-5' >
        
        <BackButton link={'/dashboard/members'}/>
        <div className=' overflow-hidden rounded-xl bg-white shadow-md'>
          
          <h1 className='text-center font-bold text-brand-neutral text-2xl my-5'>Members List</h1>
          <div className="overflow-x-auto  rounded-t-xl">
          
              {/* table  */}
              <table className="w-full border-2  border-white shadow-md text-sm text-left text-gray-500 dark:text-gray-400" >
                  {/* thead  */}
                  <thead
                      
                      className="text-xs bg-brand-dark">
                      <tr>
                          <th  scope="col" className="px-6 py-3 text-[white]">
                            {"S.No"}
                          </th>
                          <th  scope="col" className="px-6 py-3 text-[white]">
                            {"Profile"}
                          </th>
                          <th  scope="col" className="px-6 py-3 text-[white]">
                            {"Name"}
                          </th>
                          <th  scope="col" className="px-6 py-3 text-[white]">
                            {"Number"}
                          </th>
                          <th  scope="col" className="px-6 py-3 text-[white]">
                            {"Age"}
                          </th>
                          <th  scope="col" className="px-6 py-3 text-[white]">
                            {"Subscription"}
                          </th>
                          <th  scope="col" className="px-6 py-3 text-[white]">
                            {"Expire On"}
                          </th>
                          <th  scope="col" className="px-6 py-3 text-[white]">
                            {"Package"}
                          </th>
                          <th  scope="col" className="px-6 py-3 text-[white]">
                            {"Edit"}
                          </th>
                          <th  scope="col" className="px-6 py-3 text-[white]">
                            {"Delete"}
                          </th>
                      </tr>
                  </thead>
                  {/* tbody  */}
                  {!memberLoading ?
                  <>
                    {membersList.map((doc, index)=>(
                      
                        <tbody key={doc.id}>
                          {/* conditional rendering for renew box */}
                            {doc.id===renewBox?
                                <tr id="renewBox" className="border-b-2 py-4 h-[73px] bg-white">
                                  <td colSpan={10} className=' '>
                                    <div className='relative flex  py-3 rounded-xl mx-72 justify-between items-center border border-red-800'>
                                      <div className='flex flex-grow items-center px-6 gap-4'>
                                      <label htmlFor="selectPlan">Select Plan &nbsp;&#10148;</label>
                                      <select
                                          required
                                          id="selectPlan"
                                          value={packagePlan}
                                          onChange={(e) => (setPackagePlan(e.target.value))}
                                          className="px-2 py-1 border border-gray-300 outline-none rounded flex-grow"
                                          >
                                            <option  aria-disabled key={0}>select Plan</option>
                                            {packageList.map((doc)=>(
                                              packageDuration.push({plan:doc.data().name, duration:doc.data().duration}),
                                              <option key={doc.id}>{doc.data().name}</option>
                                            ))}
                                              
                                          </select>
                                      </div>
                                      <button className='bg-brand-dark text-white px-2 py-1 mr-16' onClick={()=>updatePlan(doc.data(),doc.id)}>Submit</button>
                                      <FontAwesomeIcon className='absolute cursor-pointer text-red-500 font-bold text-xl right-5' onClick={()=>setRenewBox('')} icon={faXmark} />
                                    </div>
                                    
                                  </td>
                                  
                                </tr>
                                :
                                <tr className="border-b-2">
                                    {/* S.No   */}
                                    <td  className="px-6 py-4">
                                        {index + 1}.
                                        
                                    </td>
                                    {/* profile Img */}
                                    <td  className="px-6 py-4">
                                        {"image"}
                                    </td>
                                    {/* Name */}
                                    <td  scope="row" className="px-6 py-4 font-medium ">
                                        {doc.data()?.firstName + ' ' + doc.data()?.lastName} 
                                    </td>
                                    {/* Number*/}
                                    <td  className="px-6 py-4">
                                        {doc.data()?.number}
                                    </td>
                                    {/* age */}
                                    <td  className="px-6 py-4">
                                        {doc.data()?.age}
                                    </td>
                                    {/* Subscription*/}
                                    <td  className="px-6 py-4">
                                    {doc.data()?.subscription == 'active' ? <div className={`text-white  bg-green-700  flex justify-center items-center py-1 rounded-xl `}>{doc.data()?.subscription}</div>:<div onClick={()=>renew(doc.id)} className={`text-white bg-orange-500 flex justify-center items-center py-1 rounded-xl cursor-pointer`}>Renew</div>}
                                    
                                    </td>
                                    {/* expyry date*/}
                                    <td  className="px-6 py-4">
                                        <div className='text-nowrap py-1 rounded-xl '>{doc.data()?.subscription == 'Expired'? <span className='text-red-600'>plan is expired</span> :expiry(doc.data()?.lastPaymentDate, doc.data()?.duration, doc.data(),doc.id)}</div>

                                    </td>
                                    {/* package*/}
                                    <td  className="px-6 py-4">
                                        <div className='flex justify-center items-center py-1 rounded-xl '>{doc.data()?.packagePlan}</div>

                                    </td>
                                    {/* edit  */}
                                    <td  className="px-6 py-4">
                                      <FontAwesomeIcon 
                                      onClick={()=>(
                                        setEditData(doc.data()),
                                        setEditMode(true),
                                        setEditId(doc.id))
                                      }
                                      className='text-brand-primary font-bold cursor-pointer text-xl' icon={faEdit} />
                                    </td>
                                    {/* delete */}
                                    <td onClick={()=>deleteMember(doc.id)} className="px-6 py-4">
                                      <FontAwesomeIcon className='text-brand-primary font-bold cursor-pointer text-xl' icon={faTrash} />
                                    </td>
                                </tr>
                            }
                        </tbody>
                    ))} 
                  </>
                  :
                  <tbody className=''>
                    <tr ><td className='flex text-base sm:text-xl font-semibold items-center'><img className='rounded-full w-6 sm:w-8'  src="/images/loading-icon.svg" alt="loading icon" />Loading...</td></tr>
                  </tbody>
                  }
                  
              </table>
          </div>
        </div>
      </div>}
    </>
  )
}

export default ViewMembers
