import { InformationCircleIcon } from '@heroicons/react/outline'
import React from 'react'

function PortionSection({Alw, portionObj}) {

  return (
    <div className='relative mt-16 mb-5'>
        <hr className='w-[90%] relative top-0 left-1/2 -translate-x-1/2 bg-orange-400 opacity-100'/>

        <div className='flex items-center space-x-2 mt-[25px] cursor-pointer group'>
            <InformationCircleIcon className='h-8 w-8 text-sky-500'/>
            <p className='text-sky-700 text-xl font-semibold'>Portion Chicken Calculation</p>
        </div>

        <table className="table mt-3 ">
            <thead className='text-gray-500'>
                <tr>
                    <th scope="col">
                        <div className='flex justify-center items-center space-x-3'>
                           <span>Family</span>
                        </div> 
                    </th>
                    <th scope="col">
                        <div className='flex justify-center items-center space-x-3'>
                           <span>T-Order(Kg)</span>
                        </div> 
                    </th>
                    <th scope="col">
                        <div className='flex justify-center items-center space-x-3'>
                            <span>% From Chicken</span>
                        </div> 
                    </th>
                    <th scope="col">
                        <div className='flex justify-center items-center space-x-3'>
                            <span>Chkn(Kg) to Achieve</span>
                        </div> 
                    </th>
                    <th scope="col">
                        <div className='flex justify-center items-center space-x-3'>
                            <span>Chkn(#) to Achieve</span>
                        </div> 
                    </th>
                </tr>
            </thead>
            <tbody className='text-gray-600'>
                {portionObj.map((d)=>(
                    <tr key = {d.index} className=' hover:bg-gray-200 font-semibold hover:text-blue-600 hover:font-bold cursor-pointer text-lg'>
                        <th scope="row" className=' pt-3 pb-3 text-center'>{d.family}</th>
                        <td className=' pt-3 pb-3 text-center'>{d.order}</td>
                        <td className=' pt-3 pb-3 text-center'>{d.yieldFromChkn}<span className='text-blue-600'>%</span></td>
                        <td className=' pt-3 pb-3 text-center'>{d.requiredChknKg}</td>
                        <td className=' pt-3 pb-3 text-center'>{(Math.round((d.requiredChknKg / (Alw / 1000)))).toLocaleString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>   
        <p className='text-xl font-semibold text-white bg-green-600 rounded-md p-2 shadow-md mt-3'>Needed Count to Cover Portion Orders :- </p> 
        {/* <p className='text-xl font-semibold text-white bg-green-600 rounded-md p-2 shadow-md mt-3'>Needed Count to Cover Portion Orders :-  {highestQty}</p>  */}


    </div>
  )
}

export default PortionSection