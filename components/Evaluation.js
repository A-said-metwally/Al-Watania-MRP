import React from 'react'
import FamilyEval from './FamilyEval'
import yieldMatrix from '../yield.json'
import {CalculatorIcon} from '@heroicons/react/outline'

function Evaluation({portionObj, largestToAchievePortion, Alw}) {

  const getOrder = (f)=>{
    let order = 0
    let familyOrders = portionObj.filter((e)=>{ return e.family === f })
    familyOrders.map((o)=>{return order += o.requiredFromFamilyKg })
    return order
  }
  
  return (
    <div className='  relative flex flex-col  mt-8'>
        <hr className='w-[90%] relative top-0 left-1/2 -translate-x-1/2 bg-orange-400 opacity-100'/>

        <div className='flex justify-center items-center space-x-2 mt-[25px] mb-3 cursor-pointer group'>
            <CalculatorIcon className=' h-8 w-8 text-sky-400'/>
            <p className='text-sky-700 text-xl font-semibold'>Portion Evaluation</p>
        </div>
        {/* portion Evaluation */}
        <div className='flex flex-wrap justify-between w-full mb-4'>
          {yieldMatrix.map((y, index)=>{
            return (
              <FamilyEval 
                key = {index}
                family = {y.family} 
                Alw = {Alw}
                order = {getOrder(y.family)}
                outPut = {largestToAchievePortion * (y.st /100)}
                st = {y.st} 
              />
            )
          })}
        </div>
    </div>
  )
}

export default Evaluation