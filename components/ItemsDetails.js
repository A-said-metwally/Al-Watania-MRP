import React from 'react'
import {TrashIcon} from '@heroicons/react/outline'

function ItemsDetails({Items, addData, removeItem}) {

    const getData = (e)=>{addData(e)}

  return (
    <div>
        <table className="table mt-10 mb-5">
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
                {Items.map((d)=>(
                    <tr key = {d.index} className=' hover:bg-gray-200 font-semibold hover:text-blue-600 hover:font-bold cursor-pointer text-lg'>
                        <th scope="row" className=' pt-3 pb-3'>{d.material}</th>
                        <td className=' pt-3 pb-3'>{d.materialNumber}</td>
                        <td className=' pt-3 pb-3'>
                            <input 
                                type = 'number' 
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

    </div>
  )
}

export default ItemsDetails