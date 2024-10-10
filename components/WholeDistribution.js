import React from 'react'
import DistributionBox from './DistributionBox'
import { InformationCircleIcon } from '@heroicons/react/outline'

function WholeDistribution({Distribution}) {
  return (
    <div className='mt-5 mb-5 '>

      <hr className='w-[90%] relative top-0 left-1/2 -translate-x-1/2 bg-orange-400 opacity-100'/>

      <div className='flex items-center space-x-2 mt-[25px] cursor-pointer group'>
          <InformationCircleIcon className='h-8 w-8 text-sky-500'/>
          <p className='text-sky-700 text-xl font-semibold'>Normal Distribution ....</p>
      </div>

      <div className='overflow-x-scroll border-1 border-orange-500 rounded-t-2xl p-3 mt-3'>
        <div className = 'flex hover:scale-110 cursor-pointer '>
          {Distribution.map((d, index)=>{
            return (
              <DistributionBox key = {index} group={d.group} percent={d.percent}/>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default WholeDistribution
