import React from 'react'
import {QuestionMarkCircleIcon} from '@heroicons/react/outline'

function Output({Alw, losses, wholeTot, largestToAchieveWhole, largestToAchievePortion}) {
  let remainedFromWhole = largestToAchieveWhole - wholeTot
  let needToPortion = largestToAchievePortion / Alw
  let needToAchieveAll = largestToAchieveWhole + 
    (needToPortion > 0 && remainedFromWhole > needToPortion ? 0 : needToPortion - remainedFromWhole)

  let count = needToAchieveAll + (needToAchieveAll * losses/100)

  return (
    <div className='flex justify-center mt-[100px]'>
        <div className=' relative w-[70%] text-center  bg-green-400 border-2 border-orange-600 shadow-2xl
          rounded-xl p-2 hover:scale-105 cursor-pointer'>
            <QuestionMarkCircleIcon className='h-12 w-12 text-purple-600 absolute left-1/2 -translate-x-1/2 -top-6 bg-green-400
             border-1 animate-pulse rounded-full'/>
            <h1 className=' text-purple-600 font-serif font-bold mt-12'>Required Chkns</h1>
            <p className='text-gray-700 text-[60px] font-sans font-bold'>{isNaN(count)? 0 : Math.round(count, 0).toLocaleString()}</p>
        </div>
    </div>
  )
}

export default Output