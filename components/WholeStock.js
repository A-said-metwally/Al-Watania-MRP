import React from 'react'
import {CalculatorIcon} from '@heroicons/react/outline'

function WholeStock({Alw, wholeTot, remainedFromWholeDist, largestToAchieveWhole, largestToAchievePortion}) {
    let w = largestToAchieveWhole
    // let p = (largestToAchievePortion === -Infinity ? 0 : largestToAchievePortion)/ 0.70 / Alw
  return (
    <div className='  relative flex flex-col  mt-8'>
          <hr className='w-[90%] relative top-0 left-1/2 -translate-x-1/2 bg-orange-400 opacity-100'/>
          <div className='flex justify-center items-center space-x-2 mt-[25px] mb-3 cursor-pointer group'>
              <CalculatorIcon className=' h-8 w-8 text-sky-400'/>
              <p className='text-sky-700 text-xl font-semibold'>Whole Evaluation (Over Stock)</p>
          </div>
      
          <table className="table mt-3 ">
              <thead className='text-gray-500'>
                  <tr>
                      <th scope="col">
                          <div className='flex justify-center items-center space-x-3'>
                            <span>Weight Group</span>
                          </div> 
                      </th>
                      <th scope="col">
                          <div className='flex justify-center items-center space-x-3'>
                              <span>Distribution</span>
                          </div> 
                      </th>
                      <th scope="col">
                          <div className='flex justify-center items-center space-x-3'>
                              <span>Over Stock</span>
                          </div> 
                      </th>
                  </tr>
              </thead>
              <tbody className='text-gray-600'>
                  {remainedFromWholeDist.map((d, index)=>(
                    <tr key = {index} className=' hover:bg-gray-200 font-semibold hover:text-blue-600 hover:font-bold cursor-pointer text-lg even:bg-gray-200'>
                          <th scope="row" className=' pt-3 pb-3 text-center'>{d.group}</th>
                          <td className=' pt-3 pb-3 text-center'>{(d.percent).toFixed(1)}<span className='text-blue-600'>%</span></td>
                          <td className=' pt-3 pb-3 text-center'>
                            {Math.round((d.percent / 100 * (w - wholeTot)),0).toLocaleString()}
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>   
    </div>
  )
}

export default WholeStock