import React from 'react'
import { ArrowDownIcon, ArrowCircleDownIcon } from '@heroicons/react/outline'

function FamilyEval({family, qty, st, act}) {
  return (
    <div className='w-1/2 p-3 '>
        <div className='h-[130px] border-1 border-orange-500 rounded-xl shadow-md p-3 bg-gray-200 hover:scale-105'>
            <div className='flex justify-between text-3xl font-semibold'>
                <p className=''>{family}</p>
                <p className='font-serif'>{qty} <span className=' text-green-600 text-xl'>Kg</span></p>
            </div>
            <div className='flex justify-evenly mt-3 items-center'>
                <div className='flex flex-col items-center text-lg font-semibold text-green-600'>
                    <p>Standard</p>
                    <p>{st}%</p>
                </div>
                <div className='flex flex-col items-center text-lg font-semibold text-blue-600'>
                    <p>Actual</p>
                    <p>{act}%</p>
                </div>
                <div className='flex flex-col items-center text-lg font-semibold text-orange-600'>
                    <p>Variance</p>
                    <p>{3}%</p>
                </div>
                <ArrowCircleDownIcon className='h-8 w-8 text-red-500'/>
            </div>
        </div>
    </div>
  )
}

export default FamilyEval