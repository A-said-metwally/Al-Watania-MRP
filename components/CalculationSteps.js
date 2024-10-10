import { ChevronDoubleDownIcon, ChevronDownIcon, InformationCircleIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'

function CalculationSteps({losses}) {
  const [Show, setShow] = useState(false)
  return (
    <div>
        <div 
          className='flex items-center space-x-2 mt-5 cursor-pointer group'
          onClick={()=>setShow(!Show)}
          >
            <InformationCircleIcon className='h-8 w-8 text-sky-500'/>
            <p className='text-sky-700 text-xl font-semibold'>Calculation Steps</p>
            <ChevronDoubleDownIcon className='h-6 w-6  text-orange-500 group-hover:animate-bounce'/>
        </div>
 
          <ul className={` ${Show ? 'block' : 'hidden'} transition-all duration-500 ease-in-out list-disc text-lg font-semibold font-serif ml-3 mt-2`}>
              <li>Calculate Losses = 
                <span className='text-red-500 font-semibold'> {losses.toFixed(1)}% </span>
                , Net to Packing Chks = 
                <span className='text-red-500 font-semibold'> {100 - losses.toFixed(1)}% </span> </li>
              <li>Calculate Normal Distribution of Chicken</li>
              <li>Calculate Required Chkns to Achieve Every Whole Group Order</li>
              <li>Decide the Quantity That Will be Cover All Whole Orders</li>
              <li>Next Step Categories Portion Orders By Family Group</li>
              <li>Set Contribution for Every Family From Live Chicken</li>
              <li>Calculate Required Chkns to Achieve Every Family Orders</li>
              <li>Decide the Quantity That Will be Cover All Families Requirements</li>
              <li>Recalculate Families Outputs According the Last Quantity</li>
              <li className=' text-purple-600'>According to Recalculation Outputs , You Must Be Reconsidered The Required Order </li>
              <li>Now System Have Two Numbers For Achieving Whole & Portion</li>
              <li>Calculate Remained After Achieve Whole & Complete It to Achieve Portion </li>
              <li>Finally Add The Losses Percent to The Maximum Number to Be The Required Chickens  </li>
          </ul>        
    </div>
  )
}

export default CalculationSteps