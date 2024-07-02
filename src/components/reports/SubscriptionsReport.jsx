import React, { useEffect} from 'react'
import Export from "react-data-table-component"
import DataTable from 'react-data-table-component'
import { useUser } from '../../context/UserContext';
import BackButton from '../BackButton';

function SubscriptionsReport() {
    const{fetchMembers, membersList,memberLoading}=useUser()
    
    const list = membersList.map((doc)=>(
            {...doc.data(), 
            joiningDate:doc.data().joiningDate.slice(8) + '-' + doc.data().joiningDate.slice(5,7) + '-' + doc.data().joiningDate.slice(0,4),
            lastPaymentDate:doc.data().lastPaymentDate.slice(8) + '-' + doc.data().lastPaymentDate.slice(5,7) + '-' + doc.data().lastPaymentDate.slice(0,4)
            
            }
        ))
    
    
        const actionsMemo = React.useMemo(() => <Export onExport={() => downloadCSV(list)} />, []);


    useEffect(()=>{
        fetchMembers()
    },[])
    const columns = [
        {
            name: 'Name',
            selector: row => row.firstName +  ' ' + row.lastName,
            sortable:true,
        },
        {
            name: 'Joining Date',
            selector: row => row.joiningDate,
            sortable:true,
        },
        {
            name: 'Package',
            selector: row => row.packagePlan,
            sortable:true,
        },
        {
            name: 'Duration',
            selector: row => row.duration,
            sortable:true,
        },
        {
            name: 'Subscription',
            selector: row => row.subscription,
            sortable:true,
        },
        {
            name: 'Last Payment Date',
            selector: row => row.lastPaymentDate ,
            sortable:true,
        },
        {
            name: 'Amount',
            selector: row => row.amount,
            sortable:true,
        },
    ];
    
    
    
    
    
  
  return (
    <div className='m-6'>
        <BackButton link={'/dashboard/reports'}/>
        <div className='border-2 border-gray-200'>
            <DataTable
            columns={columns}
            data={list}
            pagination
            progressPending={memberLoading}
            actions={actionsMemo}
            fixedHeader
            fixedHeaderScrollHeight="800px"
            />
        </div>
    </div>
  )
}

export default SubscriptionsReport
