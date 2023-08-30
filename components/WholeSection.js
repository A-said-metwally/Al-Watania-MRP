import React, { useEffect, useState } from 'react'
import { InformationCircleIcon } from '@heroicons/react/outline'

function WholeSection({wholeObj, wholeTot, neededCount}) {

    
    return (
    <div className='relative mt-16 mb-5 w-full'>
        <hr className='w-[90%] relative top-0 left-1/2 -translate-x-1/2 bg-orange-400 opacity-100'/>

        <div className='flex items-center space-x-2 mt-[25px] cursor-pointer group'>
            <InformationCircleIcon className='h-8 w-8 text-sky-500'/>
            <p className='text-sky-700 text-xl font-semibold'>Whole Chicken Calculation</p>
        </div>

        <table className="table mt-3 ">
            <thead className='text-gray-500'>
                <tr>
                    <th scope="col">
                        <div className='flex justify-center items-center space-x-3'>
                           <span>Group</span>
                        </div> 
                    </th>
                    <th scope="col">
                        <div className='flex justify-center items-center space-x-3'>
                           <span>T-Order(Each)</span>
                        </div> 
                    </th>
                    <th scope="col">
                        <div className='flex justify-center items-center space-x-3'>
                            <span>Distribution</span>
                        </div> 
                    </th>
                    <th scope="col">
                        <div className='flex justify-center items-center space-x-3'>
                            <span>Needed to Achieve</span>
                        </div> 
                    </th>
                </tr>
            </thead>
            <tbody className='text-gray-600'>
                {wholeObj.map((d)=>(
                    <tr key = {d.index} className=' hover:bg-gray-200 font-semibold hover:text-blue-600 hover:font-bold cursor-pointer text-lg even:bg-gray-200'>
                        <th scope="row" className=' pt-3 pb-3 text-center'>{d.group}</th>
                        <td className=' pt-3 pb-3 text-center'>{d.order}</td>
                        <td className=' pt-3 pb-3 text-center'>{d.distribution}<span className='text-blue-600'>%</span></td>
                        <td className=' pt-3 pb-3 text-center'>{(d.toAchieved).toLocaleString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>   

        <div className='mt-5 flex items-center justify-start space-x-7 bg-yellow-200 rounded-xl border-1
         border-purple-500 shadow-md p-4 text-2xl text-left font-bold text-blue-500'>
            <p className=' '>Total Order from Whole Chicken {wholeTot.toLocaleString()}</p>
        </div>

        <p className='text-xl font-semibold text-white bg-green-600 rounded-md p-2 
            shadow-md mt-3 hover:scale-105 cursor-pointer'>Needed Count to Cover Whole Orders : {Math.round(neededCount, 0).toLocaleString()} Bird</p> 
    </div>
  )
}

export default WholeSection