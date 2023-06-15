import React from 'react'
import FamilyEval from './FamilyEval'
import yieldMatrix from '../yield.json'

function Evaluation({portionObj}) {

  return (
    <div className=' flex flex-col items-center mt-8'>
        <div className='flex items-center space-x-2 mt-[25px] cursor-pointer group'>
            <i className='fa-solid fa-gauge-high text-2xl'></i>
            <p className='text-sky-700 text-xl font-semibold'>Evaluation</p>
        </div>
        <div className='flex flex-wrap justify-between w-full'>
          {yieldMatrix.map((y, index)=>{
            return (
              <FamilyEval 
                key = {index}
                family = {y.family} 
                qty = {portionObj.filter((e)=>{ return e.family === y.family})[0]?.order}
                st = {y.st} 
                act = {25.6} 
              />
            )
          })}
        </div>
    </div>
  )
}

export default Evaluation