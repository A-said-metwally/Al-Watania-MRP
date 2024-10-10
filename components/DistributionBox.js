import React from 'react'

function DistributionBox({group, percent}) {

  return (
    <div className = 'flex flex-col items-center justify-center text-xl font-semibold border-1 border-gray-200 group hover:text-orange-500'>
      <div className = 'relative h-[120px] w-[50px]'>
          <span 
            className = {`absolute bottom-0 left-0 w-full bg-blue-500 rounded-t-md group-hover:bg-orange-500`}
            style = {{height:`${percent.toFixed(1)}%`}}  
          ></span>
          <p 
            className = 'absolute left-[50%] -translate-y-1/2 -translate-x-1/2  p-0 '
            style = {{bottom:`${percent.toFixed(1)}%`}}  
          >{(percent).toFixed(1)}%</p>
      </div>
      <div className = 'p-3'>
          <p>{group}</p>
      </div>
    </div>
  )
}

export default DistributionBox
