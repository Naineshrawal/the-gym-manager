import React, { useEffect, useState } from 'react'
import { useUser } from '../../context/UserContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import {  deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase/Firebase'
import AddPackage from './AddPackage'

function Packages() {
    const [adding, setAdding]= useState(false)
    const [editing, setEditing]= useState(false)
    const [editData, setEditData]= useState(null)
    const [editId, setEditId]= useState('')
    const {packageList, packageLoading, fetchPackages} = useUser()
    
    
    const deletePackage = async (dltdoc)=>{
        try{
            await deleteDoc(doc(db, 'packages', dltdoc.id))
                       
            
            fetchPackages()
        }catch(err){
            console.log(err);
            console.log('err');
        }
    }
    useEffect(()=>{
        fetchPackages()
    },[editing, adding, setAdding ])


  return (
    <div className='section-container m-5 ' >
        
        {!adding  ? 
        <div className='flex flex-col mt-5'>
            <div className='shadow-lg rounded-xl bg-white overflow-hidden '>   
                    <h1 className='text-center font-bold text-brand-neutral text-2xl my-10 '>Packages List</h1>
                <div className="overflow-x-auto ">
                    {/* table  */}
                    <table className="w-full border-2  border-white shadow-md text-sm text-left text-gray-500 dark:text-gray-400" >
                        {/* thead  */}
                        <thead
                            
                            className="text-xs bg-brand-dark">
                            <tr>
                                <th  scope="col" className="px-2 py-3 text-[white]">
                                {"S.No"}
                                </th>
                                <th  scope="col" className="px-6 py-3 text-[white]">
                                {"Package Name"}
                                </th>
                                <th  scope="col" className="px-6 py-3 text-[white]">
                                {"Description"}
                                </th>
                                <th  scope="col" className="px-6 py-3 text-[white]">
                                {"Amount"}
                                </th>
                                <th  scope="col" className="px-6 py-3 text-[white]">
                                {"Duration"}
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
                        {!packageLoading ?
                        <>
                        {packageList.map((doc, index)=>(
                            <tbody key={index}>
                                    <tr className=" border-b-2">
                                        {/* S.No   */}
                                        <td  className="px-4 py-4">
                                            {index + 1}.
                                        </td>
                                        {/* Package Name */}
                                        <td  scope="row" className="px-6 py-4 font-medium ">
                                            {doc?.data().name} 
                                        </td>
                                        {/* Description*/}
                                        <td  className="px-6 py-4">
                                            {doc?.data().description}
                                        </td>
                                        {/* Amount*/}
                                        <td  className="px-6 py-4">
                                            {doc?.data().amount}
                                        </td>
                                        {/* duration */}
                                        <td  className="px-6 py-4">
                                            {doc?.data().duration}
                                            
                                        </td>
                                        {/* edit  */}
                                        <td  className="px-6 py-4">
                                            <div >
                                                <FontAwesomeIcon onClick={()=>(
                                                setEditing(true), 
                                                setAdding(true), 
                                                setEditData(doc?.data()), 
                                                setEditId(doc.id))}  
                                                className='text-brand-primary font-bold cursor-pointer text-xl' 
                                                icon={faEdit} />
                                            </div>
                                        </td>
                                        {/* delete */}
                                        <td  className="px-6 py-4">
                                            <FontAwesomeIcon  
                                            onClick={()=>{deletePackage(doc)}} 
                                            className='text-brand-primary font-bold cursor-pointer text-xl' 
                                            icon={faTrash} />
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
                <button type='button' 
                onClick={()=>setAdding(true)} 
                className='p-2 rounded-lg mt-4 text-white text-xl bg-brand-primary mx-auto hover:bg-brand-accent'
                >Add New Package</button>
        </div>
        :
        <AddPackage 
        setAdding={setAdding}
        setEditing={setEditing}
        editing={editing}
        editData={editData}
        setEditData={setEditData}
        editId={editId}
        setEditId={setEditId}
         />
        }
        
      </div>
  )
}

export default Packages
