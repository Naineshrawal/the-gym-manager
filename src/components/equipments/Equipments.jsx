import React, { useEffect, useState } from 'react'
import { useUser } from '../../context/UserContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import {  deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase/Firebase'
import AddEquipment from './AddEquipment';

function Equipments() {
    const [adding, setAdding]= useState(false)
    const [editing, setEditing]= useState(false)
    const [editId, setEditId]= useState('')
    const [editData, setEditData]= useState(null)
    const {equipmentList, equipmentLoading, fetchEquipments} = useUser()
    // console.log(equilo);
    // console.log(equipmentList);
    const deleteEquipment = async (dltdoc)=>{
        await deleteDoc(doc(db, 'equipments', dltdoc.id))
        fetchEquipments()
    }
    useEffect(()=>{
        fetchEquipments()
    },[adding])


  return (
    <div className='section-container mb-5' >
        
        {!adding  ? 
        <div className='flex flex-col mt-5'>
            <div className='shadow-lg rounded-xl bg-white overflow-hidden '>   
                    <h1 className='text-center font-bold text-brand-neutral text-2xl my-10 '>Equiments List</h1>
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
                                {"Equipment"}
                                </th>
                                <th  scope="col" className="px-6 py-3 text-[white]">
                                {"Price"}
                                </th>
                                <th  scope="col" className="px-6 py-3 text-[white]">
                                {"Weight"}
                                </th>
                                <th  scope="col" className="px-6 py-3 text-[white]">
                                {"Date installed"}
                                </th>
                                <th  scope="col" className="px-6 py-3 text-[white]">
                                {"Quantity"}
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
                        {!equipmentLoading ?
                            <>
                            {equipmentList.map((doc, index)=>(
                                <tbody key={index}>
                                        <tr className=" border-b-2">
                                            {/* S.No   */}
                                            <td  className="px-4 py-4">
                                                {index + 1}.
                                            </td>
                                            {/* equipment Name */}
                                            <td  scope="row" className="px-6 py-4 font-medium ">
                                                {doc?.data().equipment} 
                                            </td>
                                            {/* price*/}
                                            <td  className="px-6 py-4">
                                                {doc?.data().price}
                                            </td>
                                            {/* weight*/}
                                            <td  className="px-6 py-4">
                                                {doc?.data().weight}
                                            </td>
                                            {/* installed */}
                                            <td  className="px-6 py-4">
                                                {doc?.data().installedDate}
                                                
                                            </td>
                                            {/* quantity */}
                                            <td  className="px-6 py-4">
                                                {doc?.data().quantity}
                                                
                                            </td>
                                            {/* edit  */}
                                            <td  className="px-6 py-4">
                                                <div >
                                                    <FontAwesomeIcon 
                                                    onClick={()=>(
                                                    setAdding(true),
                                                    setEditData(doc?.data()),
                                                    setEditId(doc.id),
                                                    setEditing(true))}  
                                                    
                                                    className='text-brand-primary font-bold cursor-pointer text-xl' 
                                                    icon={faEdit} />
                                                </div>
                                            </td>
                                            {/* delete */}
                                            <td  className="px-6 py-4">
                                                <FontAwesomeIcon  
                                                onClick={()=>{deleteEquipment(doc)}} 
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
                >Add Equipment</button>
        </div>
        :
        <AddEquipment 
            setEditData={setEditData}
            editData={editData}
            setEditId={setEditId}
            editId={editId}
            editing={editing}
            setEditing={setEditing}
            setAdding={setAdding}
        />
        }
        
      </div>
  )
}

export default Equipments
