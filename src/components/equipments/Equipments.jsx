import React, { useEffect, useState } from 'react'
import { useUser } from '../../context/UserContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons'
import {  deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase/Firebase'
import AddEquipment from './AddEquipment';
import { logger } from '../logging/Logging'

function Equipments() {
    const [adding, setAdding]= useState(false)
    const [editing, setEditing]= useState(false)
    const [editId, setEditId]= useState('')
    const [editData, setEditData]= useState(null)
    const {equipmentList, equipmentLoading, fetchEquipments, user} = useUser()
    const [searchTerm,setSearchTerm] = useState('')

    const filteredEquipments = equipmentList?.filter((equp)=>equp.data().equipment.toLowerCase().includes(searchTerm.toLocaleLowerCase()))
    

    const deleteEquipment = async (dltdoc)=>{
        
        try{
            await deleteDoc(doc(db, 'equipments', dltdoc.id))
        }catch(err){
            logger.error('error deleting equipment', err)
        }
        fetchEquipments()
    }


// fetching equipments list when component did mount
    useEffect(()=>{
        fetchEquipments()
    },[adding])


  return (
    <div className='section-container mb-5 min-h-screen' >
            {/* conditional rendering while adding .1 */}
            {!adding  ? 
            <div className='flex flex-col mt-5'>
                <div className='shadow-lg rounded-xl bg-white overflow-hidden '>   
                        <img width={'100px'} className='mx-auto mt-5' src="/images/gym-dumbell.png" alt="" />
                        <h1 className='text-center font-bold text-brand-neutral text-2xl mb-10 '>Equiments List</h1>
                        {/* equipment search box */}
                        <div className='flex mx-auto mb-4 py-2 pr-4 pl-6 justify-center items-center gap-1 sm:gap-4 border-2 rounded-3xl bg-brand-dark border-gray-600 max-w-[300px] sm:max-w-[400px]'>
                            <input className='border-gray-300 rounded border-2 outline-none grow' id='search-trainer' type="text" onChange={(e)=>setSearchTerm(e.target.value)} />
                            <FontAwesomeIcon className='text-white text-xl' icon={faSearch}/>
                        </div>

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
                                        {user.role ==='admin' && 
                                        <th  scope="col" className="px-6 py-3 text-[white]">
                                        {"Price"}
                                        </th>}
                                        <th  scope="col" className="px-6 py-3 text-[white]">
                                        {"Weight"}
                                        </th>
                                        <th  scope="col" className="px-6 py-3 text-[white]">
                                        {"Date installed"}
                                        </th>
                                        <th  scope="col" className="px-6 py-3 text-[white]">
                                        {"Quantity"}
                                        </th>
                                        {user.role==='admin' && 
                                        <th  scope="col" className="px-6 py-3 text-[white]">
                                        {"Edit"}
                                        </th>}
                                        {user.role==='admin' && 
                                        <th  scope="col" className="px-6 py-3 text-[white]">
                                        {"Delete"}
                                        </th>}
                                    </tr>
                                </thead>
                                {/* tbody  */}
                                {/* conditional rendering while loading equipments list .1 */}
                                {!equipmentLoading ?
                                <>
                                    {searchTerm? 
                                    // search filter .1
                                    <>
                                    {filteredEquipments.map((doc, index)=>(
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
                                                    {user.role==='admin' && 
                                                    <td  className="px-6 py-4">
                                                        {doc?.data().price}
                                                    </td>}
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
                                                    {user.role==='admin' && 
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
                                                    </td>}
                                                    {/* delete */}
                                                    {user.role==='admin' && 
                                                    <td  className="px-6 py-4">
                                                        <FontAwesomeIcon  
                                                        onClick={()=>{deleteEquipment(doc)}} 
                                                        className='text-brand-primary font-bold cursor-pointer text-xl' 
                                                        icon={faTrash} />
                                                    </td>}
                                                </tr>
                                        </tbody>
                                    ))} 
                                    </>
                                    :
                                    // search filter .2
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
                                                    {user.role==='admin' && 
                                                    <td  className="px-6 py-4">
                                                        {doc?.data().price}
                                                    </td>}
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
                                                    {user.role==='admin' && 
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
                                                    </td>}
                                                    {/* delete */}
                                                    {user.role==='admin' && 
                                                    <td  className="px-6 py-4">
                                                        <FontAwesomeIcon  
                                                        onClick={()=>{deleteEquipment(doc)}} 
                                                        className='text-brand-primary font-bold cursor-pointer text-xl' 
                                                        icon={faTrash} />
                                                    </td>}
                                                </tr>
                                        </tbody>
                                    ))} 
                                    </>}
                                </>
                                :
                                /* conditional rendering while loading equipments list .2 */
                                <tbody className=''>
                                <tr ><td className='flex text-base sm:text-xl font-semibold items-center'><img className='rounded-full w-6 sm:w-8'  src="/images/loading-icon.svg" alt="loading icon" />Loading...</td></tr>
                                </tbody>
                                }
                                
                            </table>
                        </div>
                </div>
                {user.role==='admin' && 
                <button type='button' 
                onClick={()=>setAdding(true)} 
                className='p-2 rounded-lg mt-4 text-white text-xl bg-brand-primary mx-auto hover:bg-brand-accent'
                >Add Equipment</button>}
            </div>
        :
        /* conditional rendering while adding .2 */
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
