import React from 'react'
import { ArrowDownIcon, ArrowCircleDownIcon, ArrowCircleUpIcon } from '@heroicons/react/outline'

function FamilyEval({family, order, outPut, st, act}) {

    const deviation = ((outPut - order) / order * 100)

    return (
    <div className='w-1/2 p-2 '>
        <div className=' border-1 border-orange-500 rounded-xl shadow-md bg-gray-200 hover:scale-105'>
            <p className={`text-2xl text-center w-full ${deviation <= 5 ? 'bg-green-600' :  isNaN(deviation) ? 'bg-gray-500' : 'bg-red-500'} text-white font-serif p-1 rounded-t-xl`}>{family}</p>
            <div className='flex justify-evenly text-3xl font-semibold mt-2'>
                <div className='flex flex-col items-center text-lg font-semibold'>
                    <p>Order</p>
                    <p className='font-serif'>{order >0 ? Math.round(order, 0).toLocaleString() : 0} <span className=' text-green-600 text-xl'>Kg</span></p>
                </div>
                <div className='flex flex-col items-center text-lg font-semibold'>
                    <p>Output</p>
                    <p className='font-serif'>{Math.round(outPut, 0).toLocaleString()} <span className=' text-green-600 text-xl'>Kg</span></p>
                </div>
                <div className='flex flex-col items-center text-lg font-semibold'>
                    <p>OverOrder</p>
                    <p className='font-serif'>{order >0 ? Math.round((outPut - order), 0).toLocaleString() : 0} <span className=' text-green-600 text-xl'>Kg</span></p>
                </div>
            </div>
            <div className='flex justify-between mt-3 items-center p-3'>
                <div className='flex flex-col items-center text-lg font-semibold text-green-600'>
                    <p>Standard</p>
                    <p>{st}%</p>
                </div>
                <div className='flex flex-col items-center text-lg font-semibold text-orange-600'>
                    <p>Deviation</p>
                    <p>{order >0 ? deviation.toFixed(1) : 0}%</p>
                </div>
                { deviation > 5 && <ArrowCircleUpIcon className='h-8 w-8 text-red-500'/>}
                { (isNaN(deviation) || deviation <= 5) && <ArrowCircleDownIcon className='h-8 w-8 text-green-500'/>}
                
            </div>
        </div>
    </div>
  )
}

export default FamilyEval