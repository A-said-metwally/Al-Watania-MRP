import { InformationCircleIcon } from '@heroicons/react/outline'
import React from 'react'

function PortionSection({Alw, portionObj, neededCount, protionFamilyValues}) {

  return (
    <div className='relative mt-16 mb-5 '>
        <hr className='w-[90%] relative top-0 left-1/2 -translate-x-1/2 bg-orange-400 opacity-100'/>

        <div className='flex items-center space-x-2 mt-[25px] cursor-pointer group'>
            <InformationCircleIcon className='h-8 w-8 text-sky-500'/>
            <p className='text-sky-700 text-xl font-semibold'>Portion Chicken Calculation</p>
        </div>

        <div className=' w-full overflow-x-scroll'>
            <table className="table mt-3 ">
                <thead className='text-gray-500'>
                    <tr className=' text-center align-middle'>
                        <th scope="col" className=' align-middle'>
                            <div className='flex justify-center items-center space-x-3'>
                            <span>Family</span>
                            </div> 
                        </th>
                        <th scope="col" className=' align-middle'>
                            <div className='flex justify-center items-center space-x-3 w-[200px]'>
                            <span>Class</span>
                            </div> 
                        </th>
                        <th scope="col" className=' align-middle'>
                            <div className='flex justify-center items-center space-x-3'>
                            <span>Order(Kg)</span>
                            </div> 
                        </th>
                        <th scope="col" className=' align-middle'>
                            <div className='flex justify-center items-center space-x-3'>
                                <span>% From Family</span>
                            </div> 
                        </th>
                        <th scope="col" className=' align-middle'>
                            <div className='flex justify-center items-center space-x-3'>
                                <span>Family Contribution</span>
                            </div> 
                        </th>
                        <th scope="col" className=' align-middle'>
                            <div className='flex justify-center items-center space-x-3'>
                                <span>Family(Kg) to Achieve</span>
                            </div> 
                        </th>
                        <th scope="col" className=' align-middle'>
                            <div className='flex justify-center items-center space-x-3'>
                                <span>Chkn(Kg) to Achieve</span>
                            </div> 
                        </th>
                        <th scope="col" className=' align-middle'>
                            <div className='flex justify-center items-center space-x-3'>
                                <span>Chkn(#) to Achieve</span>
                            </div> 
                        </th>
                    </tr>
                </thead>
                <tbody className='text-gray-600'>
                    {portionObj.sort((a, b)=>{return a.family.localeCompare(b.family)}).map((d)=>(
                        <tr key = {d.index} className=' hover:bg-gray-200 font-semibold hover:text-blue-600 hover:font-bold cursor-pointer text-lg even:bg-gray-200'>
                            <th className=' pt-3 pb-3 text-center'>{d.family}</th>
                            <th className=' pt-3 pb-3 text-center'>{d.class}</th>
                            <td className=' pt-3 pb-3 text-center'>{Math.round(d.order, 2).toLocaleString()}</td>
                            <td className=' pt-3 pb-3 text-center'>{d.yieldFromFamily}<span className='text-blue-600'>%</span></td>
                            <td className=' pt-3 pb-3 text-center'>{d.yieldFromChkn}<span className='text-blue-600'>%</span></td>
                            <td className=' pt-3 pb-3 text-center'>{(Math.round(d.requiredFromFamilyKg, 0)).toLocaleString()}</td>
                            <td className=' pt-3 pb-3 text-center'>{Math.round(d.requiredChknKg, 0).toLocaleString()}</td>
                            <td className=' pt-3 pb-3 text-center'>{(Math.round((d.requiredChknKg / (Alw)),0)).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>   
        </div>
        <div className='mt-5 flex items-center justify-start space-x-7 bg-yellow-200 rounded-xl border-1 border-purple-500 shadow-md'>
                        <div className='p-4 text-2xl text-left'>
                            <p className=' font-bold text-blue-500'>Family</p>
                            <p>Required From Family Qty(Kg)</p>
                            <p className='text-red-500'>Required From Chicken (Kg)</p>
                        </div>

                {protionFamilyValues.sort((a, b)=>{return b.requiredChknKg - a.requiredChknKg }).map((e, index)=>{
                    return (
                        <div key = {index} className='p-4 text-2xl text-center'>
                            <p className=' font-bold text-blue-500'>{e.group}</p>
                            <p>{isNaN(e.requiredFromFamilyKg)? 0 : e.requiredFromFamilyKg.toLocaleString() }</p>
                            <p className='text-red-500'>{isNaN(e.requiredChknKg)? 0: e.requiredChknKg.toLocaleString()}</p>
                        </div>
                    )
                })}
        </div>
        <p className='text-xl font-semibold text-white bg-green-600 rounded-md p-2 shadow-md mt-3 hover:scale-105 cursor-pointer'>
            Needed Qty to Cover Portion Orders : 
                <span> </span>{Math.round(neededCount, 0).toLocaleString()} Kg
                <span> , </span>{Math.round(neededCount / Alw, 0).toLocaleString()} Bird
        </p> 

    </div>
  )
}

export default PortionSection