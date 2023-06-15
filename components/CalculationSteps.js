import { ChevronDoubleDownIcon, ChevronDownIcon, InformationCircleIcon } from '@heroicons/react/outline'
import React from 'react'

function CalculationSteps({losses}) {
  return (
    <div>
        <div className='flex items-center space-x-2 mt-5 cursor-pointer group'>
            <InformationCircleIcon className='h-8 w-8 text-sky-500'/>
            <p className='text-sky-700 text-xl font-semibold'>Calculation Steps</p>
            <ChevronDoubleDownIcon className='h-6 w-6  text-orange-500 group-hover:animate-bounce'/>
        </div>
        <ul className=' list-disc text-lg font-semibold font-serif ml-3 mt-2'>
            <li>Calculate Losses = 
              <span className='text-red-500 font-semibold'> {losses.toFixed(1)}% </span>
               , Net to Packing Chks = 
              <span className='text-red-500 font-semibold'> {100 - losses.toFixed(1)}% </span> </li>
            <li>Summaries Order By Category 
                Whole<span className='text-red-500 font-semibold'>(90%)</span>
                /Parts<span className='text-red-500 font-semibold'>(10%)</span>
            </li>
            <li>Calculate Normal Distribution of Chicken</li>
            <li>Calculate Required Chkns to Achieve Whole Orders/Every Group</li>
            <li>Decide the Quantity That Will be Cover All Whole Orders</li>
        </ul>
    </div>
  )
}

export default CalculationSteps