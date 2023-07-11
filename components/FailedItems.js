import React from 'react'
import items from '../items.json'

function FailedItems({failedData, hide}) {

  return (
    <div className=' fixed top-1/2 left-1/2 h-[60%] w-[90%] -translate-x-1/2 -translate-y-1/2
        z-10 flex flex-col bg-gray-700 border-1 border-orange-500 rounded-2xl shadow-md overflow-scroll '>
        <button 
            className=' absolute top-3 right-4 text-xl text-gray-100 border-1 rounded-full h-10 w-10 font-bold hover:bg-slate-50 hover:text-red-500  hover:cursor-pointer'
            onClick={()=>hide()}
        >X</button>
        <p className='text-lg text-left text-white p-3 font-semibold'>Failed Items</p>
        <table className="table p-3 mt-[10px]  w-full overflow-x-scroll">
            <thead className='text-white text-md '>
                <tr>
                <th scope="col" >
                        <div className='flex justify-center items-center space-x-3'>
                            <span className=' capitalize'>Material</span>
                        </div> 
                    </th>
                    <th scope="col" >
                        <div className='flex justify-center items-center space-x-3'>
                            <span className=' capitalize'>Description</span>
                        </div> 
                    </th>
                    <th scope="col" >
                        <div className='flex justify-center items-center space-x-3'>
                            <span className=' capitalize'>Family</span>
                        </div> 
                    </th>
                    <th scope="col" >
                        <div className='flex justify-center items-center space-x-3'>
                            <span className=' capitalize'>Class</span>
                        </div> 
                    </th>
                    <th scope="col" >
                        <div className='flex justify-center items-center space-x-3'>
                            <span className=' capitalize'>yield From Chkn</span>
                        </div> 
                    </th>
                    <th scope="col" >
                        <div className='flex justify-center items-center space-x-3'>
                            <span className=' capitalize'>yield After Evas</span>
                        </div> 
                    </th>
                    <th scope="col" >
                        <div className='flex justify-center items-center space-x-3'>
                            <span className=' capitalize'>yield From Family</span>
                        </div> 
                    </th>
                </tr>
            </thead>
            <tbody className='text-white'>
                {failedData?.map((elm, index)=>{
                    const item = items.filter((i)=>{return i.material === elm.material})
                    return (
                        <tr key = {index} className=' hover:bg-gray-200 font-semibold hover:text-blue-600 hover:font-bold cursor-pointer text-lg'>
                            <td className=' pt-3 pb-3 text-center'>{elm.material}</td>
                            <td className=' pt-3 pb-3 text-center'>{item[0]?.materialNumber || 'Not Existing'}</td>
                            <td className=' pt-3 pb-3 text-center'>{item[0]?.family}</td>
                            <td className=' pt-3 pb-3 text-center'>{item[0]?.class}</td>
                            <td className=' pt-3 pb-3 text-center'>{(+item[0]?.yieldFromChkn).toFixed(1)}%</td>
                            <td className=' pt-3 pb-3 text-center'>{(+item[0]?.yieldAfterEvas).toFixed(1)}%</td>
                            <td className=' pt-3 pb-3 text-center'>{(+item[0]?.yieldFromFamily).toFixed(1)}%</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>          
)
}

export default FailedItems