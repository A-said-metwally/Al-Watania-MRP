import React , { useState }from 'react'
import {ArrowDownIcon, ChevronDownIcon, DocumentDownloadIcon, TrashIcon} from '@heroicons/react/outline'
import { handleExportExcel } from '../firebase/actions'
import FailedItems from './FailedItems'

function ItemsDetails({Items, failedData, addData, removeItem}) {

    const getData = (e)=>{addData(e)}
    const [ShowFailedData, setShowFailedData] = useState(false)
    const hideFailedData = ()=>setShowFailedData(false)

  return (
    <div className=''>
        <div className='flex justify-between text-lg font-semibold w-full h-10 rounded-lg mt-2'>
            <p className=' flex items-center space-x-2 text-green-600 rounded-lg py-4 px-2 hover:bg-gray-300  hover:cursor-pointer'>
                Valid Items <span className='pl-2'>({Items.length})</span>
            </p>
            <p 
                className=' flex items-center space-x-2 text-red-600 rounded-lg py-4 px-2 hover:bg-gray-300  hover:cursor-pointer'
                onClick={()=>setShowFailedData(true)}    
            >
                Failed Items <span className='pl-2'>({failedData.length})</span>
            </p>
            <p 
                className=' flex items-center space-x-2 text-blue-600 rounded-lg py-4 px-2 hover:bg-gray-300  hover:cursor-pointer'
                onClick={()=>handleExportExcel(Items)}
            >
                Export xlsx
            </p>
        </div>
        <table className="table mt-3 mb-5">
            <thead className='text-gray-500'>
                <tr>
                    <th scope="col">
                        <div className='flex items-center space-x-3'>
                           <span>Code</span>
                        </div> 
                    </th>
                    <th scope="col">
                        <div className='flex items-center space-x-3'>
                           <span>SKU</span>
                        </div> 
                    </th>
                    <th scope="col">
                        <div className='flex items-center space-x-3'>
                            <span>Qty(Each)</span>
                        </div> 
                    </th>
                    <th scope="col">Del.</th>
                </tr>
            </thead>
            <tbody className='text-gray-600'>
                {Items.map((d, index)=>(
                    <tr key = {index} className=' hover:bg-gray-200 font-semibold hover:text-blue-600 cursor-pointer text-md'>
                        <th scope="row" className=' pt-3 pb-3 align-middle'>{d.material}</th>
                        <td className=' pt-3 pb-3 align-middle'>{d.materialNumber}</td>
                        <td className=' pt-3 pb-3'>
                        <input 
                            type = 'number' 
                            defaultValue={d.qty}
                            placeholder='Qty' 
                            className='w-[110px] text-[20px] text-center p-1 focus:outline-none border-1 border-blue-400 rounded-md'
                            onBlur={(e)=> e.target.value.length > 0 && getData({...d, qty:+e.target.value})}
                        />
                        </td>
                        <td className=' pt-3 pb-3 align-middle'>
                            <TrashIcon 
                                className='h-7 w-7 text-red-500 hover:text-black hover:scale-105'
                                onClick={()=>removeItem(d.material)}
                                />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>  

        {ShowFailedData && <FailedItems failedData={failedData} hide = {hideFailedData}/>}
  

    </div>
  )
}

export default ItemsDetails