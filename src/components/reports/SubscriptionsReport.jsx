import React, { useEffect, useState} from 'react'
import Export from "react-data-table-component"
import DataTable from 'react-data-table-component'
import { useUser } from '../../context/UserContext';
import BackButton from '../BackButton';

function SubscriptionsReport() {
    const{fetchMembers, membersList,memberLoading}=useUser()
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

    const list = membersList.map((doc)=>(
        {...doc.data(), 
        joiningDate:doc.data().joiningDate.slice(8) + '-' + doc.data().joiningDate.slice(5,7) + '-' + doc.data().joiningDate.slice(0,4),
        lastPaymentDate:doc.data().lastPaymentDate.slice(8) + '-' + doc.data().lastPaymentDate.slice(5,7) + '-' + doc.data().lastPaymentDate.slice(0,4)
        
    }
))
const filteredList = list.filter(item => (item.firstName + item.lastName) && (item.firstName + item.lastName).toLowerCase().includes(filterText.toLowerCase()))

const handleClear = () => {
          if (filterText) {
            setResetPaginationToggle(!resetPaginationToggle);
            setFilterText('');
          }
        };

 
    
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
    <div className='m-6 min-h-screen'>
        <BackButton link={'/dashboard/reports'}/>
        <div className='border-2 bg-white border-gray-200'>
            <div className='border px-2 rounded flex justify-end py-1'>
                <input
                    id="search"
                    type="text"
                    className=' outline-none border px-1'
                    placeholder="Filter By Name"
                    aria-label="Search Input"
                    value={filterText}
                    onChange={e=>setFilterText(e.target.value)}
                />
                <button className='bg-brand-primary px-2 text-white' type="button" onClick={handleClear}>
                    X
                </button>
            </div>
            <DataTable
            columns={columns}
            data={filteredList}
            pagination
            paginationResetDefaultPage={resetPaginationToggle}
            progressPending={memberLoading}
            // actions={actionsMemo}
            fixedHeader
            fixedHeaderScrollHeight="800px"
            selectableRows persistTableHead
            />
        </div>
    </div>
  )
}

export default SubscriptionsReport
