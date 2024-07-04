import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import BackButton from '../BackButton';
import { useUser } from '../../context/UserContext';
import { deleteDoc, doc } from 'firebase/firestore';
import { db, imageDb } from '../../firebase/Firebase';
import { toast } from 'react-toastify';
import AddTrainer from './AddTrainer';
import { useNavigate } from 'react-router-dom';
import { deleteObject, ref } from 'firebase/storage';

const ViewTrainer =  () => {
  const {TrainerLoading,fetchTrainer,trainerList,user} = useUser()
  const [editMode, setEditMode] = useState(false)
  const [editData, setEditData] = useState('')
  const [editId, setEditId] = useState('')
  const [searchTerm,setSearchTerm] = useState('')

  const filteredTrainers = trainerList?.filter((trainer)=>
    (trainer.data().firstName+trainer.data().lastName).toLowerCase().includes(searchTerm.toLocaleLowerCase()))
  
  const navigate = useNavigate()
  
  const deleteTrainer = async (id, profileImgName)=>{
    // deleting trainer from datastore
    await  deleteDoc(doc(db, 'users', id))

    // deleting trainer profile img from storage
    const imgRef = ref(imageDb, `images/${profileImgName}`)
      await deleteObject(imgRef).catch(err=>console.log(err))

    toast.success("Trainer Deleted")
    fetchTrainer()
  }

  const getFormatedDate = (date)=>{
      return date.slice(8) + '-' + date.slice(5,7) + '-' + date.slice(0,4)
  }
    useEffect(()=>{
      fetchTrainer()
    },[])
  return (
    <>
      {editMode?
        <AddTrainer
          editData={editData}
          setEditData={setEditData}
          editId={editId}
          setEditId={setEditId}
          editMode = {editMode}
          setEditMode={setEditMode}
        />
        :
        <div className=' section-container min-h-screen  m-6' >
          {/* go to back button  */}
          <BackButton link={'/dashboard/trainers'}/>

          <div className='shadow-lg rounded-xl overflow-hidden bg-white'>
            <h1 className='text-center font-bold text-brand-neutral text-2xl my-5'>Trainer List</h1>

            {/* search trainer */}
            <div className='flex mx-auto mb-4 py-2 pr-4 pl-6 justify-center items-center gap-1 sm:gap-4 border-2 rounded-3xl bg-brand-dark border-gray-600 max-w-[300px] sm:max-w-[400px]'>
              <input className='border-gray-300 rounded border-2 outline-none grow' id='search-trainer' type="text" onChange={(e)=>setSearchTerm(e.target.value)} />
              <FontAwesomeIcon className='text-white text-xl' icon={faSearch}/>
            </div>

            {/* trainer list table */}
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
                              {"Name"}
                            </th>
                            <th  scope="col" className="px-6 py-3 text-[white]">
                              {"Profile"}
                            </th>
                            {user.role ==='admin' && <th  scope="col" className="px-6 py-3 text-[white]">
                              {"Number"}
                            </th>}
                            <th  scope="col" className="px-6 py-3 text-[white]">
                              {"Age"}
                            </th>
                            {user.role ==='admin' && <th  scope="col" className="px-6 py-3 text-[white]">
                              {"Salary"}
                            </th>}
                            <th  scope="col" className="px-6 py-3 text-[white]">
                              {"Joined"}
                            </th>
                            {user.role ==='admin' && <th  scope="col" className="px-6 py-3 text-[white]">
                              {"Edit"}
                            </th>}
                            {user.role ==='admin' && <th  scope="col" className="px-6 py-3 text-[white]">
                              {"Delete"}
                            </th>}
                        </tr>
                    </thead>
                    {/* tbody  */}
                    {!TrainerLoading ?
                    // body (trainer loading) .1
                    <>
                      {!searchTerm?
                        /* search filter .1 */
                        // when trainer list is available .1 
                        <>
                        {trainerList.length !==0? trainerList.map((doc, index)=>(
                            <tbody key={doc.id}>
                                    {<tr className=" border-b-2">
                                        {/* S.No   */}
                                        <td  className="px-6 py-4">
                                            {index + 1}.
                                        </td>
                                        {/* Name */}
                                        <td  scope="row" className="px-6 py-4 font-medium ">
                                            {doc.data()?.firstName + ' ' + doc.data()?.lastName} 
                                        </td>
                                        {/* profile Img */}
                                        <td  className="px-6 py-4">
                                        <div className='overflow-hidden w-10 h-10 flex justify-center'><img  src={doc.data()?.profileUrl} alt="profile-img" /></div>
                                        </td>
                                        {/* Number*/}
                                        {user.role === 'admin' && 
                                        <td  className="px-6 py-4">
                                            {doc.data()?.number}
                                        </td>}
                                        <td  className="px-6 py-4">
                                            {doc?.data()?.age}
                                        </td>
                                        {/* salary */}
                                        {user.role === 'admin' && 
                                        <td  className="px-6 py-4">
                                            {doc?.data()?.salary}
                                        </td>}
                                        {/* Joinning Date */}
                                        <td  className="px-6 py-4 text-nowrap">
                                            {getFormatedDate(doc.data()?.joiningDate)}
                                        </td>
                                        {/* edit  */}
                                        {user.role === 'admin' && 
                                        <td  className="px-6 py-4">
                                          <FontAwesomeIcon 
                                          className='text-brand-primary font-bold cursor-pointer text-xl' 
                                          icon={faEdit} 
                                          onClick={()=>(
                                            setEditMode(true),
                                            setEditData(doc.data()),
                                            setEditId(doc.id)
                                          )}/>
                                        </td>}
                                          {/* delete */}
                                        {user.role === 'admin' && 
                                        <td  className="px-6 py-4"> 
                                          <FontAwesomeIcon 
                                          className='text-brand-primary font-bold cursor-pointer text-xl' 
                                          icon={faTrash} 
                                          onClick={()=>deleteTrainer(doc.id,doc.data().profileImgName)}/>
                                        </td>}
                                    </tr>}
                            </tbody>))
                          :
                          // conditional rensering wehen list of trainer is empty .2
                          <tbody className=" border-b-2  ">
                            <tr>
                              <td colSpan={10} className='text-center p-4  col-span-10'> 
                                <div className='text-lg text-red-500'>No trainer Available, please add new trainer</div>
                                <button onClick={()=>navigate('/dashboard/add-trainer')} className='bg-brand-primary text-white text-lg rounded-xl px-4 py-1 mt-2'>Add Trainer</button>
                              </td>
                            </tr>
                          </tbody>
                        } 
                        </>
                        :
                        // search filter .1
                        <>
                        {filteredTrainers.map((doc, index)=>(
                            <tbody key={doc.id}>
                                    <tr className=" border-b-2">
                                        {/* S.No   */}
                                        <td  className="px-6 py-4">
                                            {index + 1}.
                                        </td>
                                        {/* Name */}
                                        <td  scope="row" className="px-6 py-4 font-medium ">
                                            {doc.data()?.firstName + ' ' + doc.data()?.lastName} 
                                        </td>
                                        {/* profile Img */}
                                        <td  className="px-6 py-4">
                                        <div className='overflow-hidden w-10 h-10 flex justify-center'><img  src={doc.data()?.profileUrl} alt="profile-img" /></div>
                                        </td>
                                        {/* Number*/}
                                        {user.role === 'admin' && 
                                        <td  className="px-6 py-4">
                                            {doc.data()?.number}
                                        </td>}
                                        <td  className="px-6 py-4">
                                            {doc?.data()?.age}
                                        </td>
                                        {/* salary */}
                                        {user.role === 'admin' && 
                                        <td  className="px-6 py-4">
                                            {doc?.data()?.salary}
                                        </td>}
                                        {/* Joinning Date */}
                                        <td  className="px-6 py-4 text-nowrap">
                                            {getFormatedDate(doc.data()?.joiningDate)}
                                        </td>
                                        {/* edit  */}
                                        {user.role === 'admin' && 
                                        <td  className="px-6 py-4">
                                          <FontAwesomeIcon 
                                          className='text-brand-primary font-bold cursor-pointer text-xl' 
                                          icon={faEdit} 
                                          onClick={()=>(
                                            setEditMode(true),
                                            setEditData(doc.data()),
                                            setEditId(doc.id)
                                          )}/>
                                        </td>}
                                          {/* delete */}
                                        {user.role === 'admin' && 
                                        <td  className="px-6 py-4"> 
                                          <FontAwesomeIcon 
                                          className='text-brand-primary font-bold cursor-pointer text-xl' 
                                          icon={faTrash} 
                                          onClick={()=>deleteTrainer(doc.id,doc.data().rofileImgName)}/>
                                        </td>}
                                    </tr>
                            </tbody>
                        ))} 
                        </>
                      }
                    </>
                    :
                    // loading img (trainer loading) .2
                    <tbody className=''>
                      <tr ><td className='flex text-base sm:text-xl font-semibold items-center'><img className='rounded-full w-6 sm:w-8'  src="/images/loading-icon.svg" alt="loading icon" />Loading...</td></tr>
                    </tbody>
                    }
                    
                </table>
            </div>
          </div>

        </div>
      }
    </>
  );
};

export default ViewTrainer;
