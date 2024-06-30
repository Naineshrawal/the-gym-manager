import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { useUser } from '../../context/UserContext';

function SubscriptionsReport() {
    const{fetchMembers, membersList,memberLoading}=useUser()
    // const [memberlist, setMembersList] = useState([])
    const list = ()=>{
        return (membersList.map(doc=>doc.data()))
    }
    useEffect(()=>{
        fetchMembers()
    },[])
    const columns = [
        {
            name: 'Name',
            selector: row => row.firstName +  ' ' + row.lastName
        },
        {
            name: 'Joining Date (yy/mm/dd)',
            selector: row => row.joiningDate,
        },
        {
            name: 'Package',
            selector: row => row.packagePlan
        },
        {
            name: 'Duration',
            selector: row => row.duration
        },
        {
            name: 'Subscription',
            selector: row => row.subscription,
        },
        {
            name: 'Last Payment Date',
            selector: row => row.lastPaymentDate ,
        },
        {
            name: 'Amount',
            selector: row => row.amount,
        },
    ];
    
 
    
    
    
  
  return (
    <>
    {!memberLoading?<div>
      <DataTable
      columns={columns}
      data={list()}
      />
    </div>
    :
    <div className='flex text-base sm:text-xl font-semibold justify-center'><img className='rounded-full w-6 sm:w-8'  src="/images/loading-icon.svg" alt="loading icon" />Loading...</div>
    }
    </>
  )
}

export default SubscriptionsReport
