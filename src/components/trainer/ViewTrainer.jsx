import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import BackButton from '../BackButton';
import { useUser } from '../../context/UserContext';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/Firebase';
import { toast } from 'react-toastify';
import AddTrainer from './AddTrainer';

const ViewTrainer =  () => {
  const {TrainerLoading,fetchTrainer,trainerList} = useUser()
  const [editMode, setEditMode] = useState(false)
  const [editData, setEditData] = useState('')
  const [editId, setEditId] = useState('')
  
  const deleteTrainer = async (id)=>{
    await  deleteDoc(doc(db, 'users', id))
    toast.success("Trainer Deleted")
    fetchTrainer()
  }

  const getFormatedDate = (date)=>{
      return date.slice(8) + '-' + date.slice(5,7) + '-' + date.slice(0,4)
  }

    useEffect(()=>{
      

      fetchTrainer()
    },[])
  // console.log(trainerList);
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
        <div className=' section-container   m-6' >
          <BackButton link={'/dashboard/trainers'}/>
          <div className='shadow-lg rounded-xl overflow-hidden bg-white'>
          <h1 className='text-center font-bold text-brand-neutral text-2xl my-5'>Trainer List</h1>
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
                          <th  scope="col" className="px-6 py-3 text-[white]">
                            {"Number"}
                          </th>
                          <th  scope="col" className="px-6 py-3 text-[white]">
                            {"Age"}
                          </th>
                          <th  scope="col" className="px-6 py-3 text-[white]">
                            {"Salary"}
                          </th>
                          <th  scope="col" className="px-6 py-3 text-[white]">
                            {"Joined"}
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
                  {!TrainerLoading ?
                  <>
                    {trainerList.map((doc, index)=>(
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
                                        {"image"}
                                    </td>
                                    {/* Number*/}
                                    <td  className="px-6 py-4">
                                        {doc.data()?.number}
                                    </td>
                                    <td  className="px-6 py-4">
                                        {doc?.data()?.age}
                                    </td>
                                    {/* salary */}
                                    <td  className="px-6 py-4">
                                        {doc?.data()?.salary}
                                    </td>
                                    {/* Joinning Date */}
                                    <td  className="px-6 py-4 text-nowrap">
                                        {getFormatedDate(doc.data()?.joiningDate)}
                                    </td>
                                    {/* edit  */}
                                    <td  className="px-6 py-4">
                                      <FontAwesomeIcon 
                                      className='text-brand-primary font-bold cursor-pointer text-xl' 
                                      icon={faEdit} 
                                      onClick={()=>(
                                        setEditMode(true),
                                        setEditData(doc.data()),
                                        setEditId(doc.id)
                                      )}/>
                                    </td>
                                      {/* delete */}
                                    <td  className="px-6 py-4"> 
                                      <FontAwesomeIcon 
                                      className='text-brand-primary font-bold cursor-pointer text-xl' 
                                      icon={faTrash} 
                                      onClick={()=>deleteTrainer(doc.id)}/>
                                    </td>
                                </tr>
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
        </div>
      }
    </>
  );
};

export default ViewTrainer;
