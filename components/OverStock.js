import React from 'react'
import {CalculatorIcon} from '@heroicons/react/outline'

function OverStock({Alw, wholeTot, remainedFromWholeDist, largestToAchieveWhole, largestToAchievePortion}) {
    let w = largestToAchieveWhole
    // let p = (largestToAchievePortion === -Infinity ? 0 : largestToAchievePortion)/ 0.70 / Alw
  return (
    <div className='  relative flex flex-col  mt-8'>
          <hr className='w-[90%] relative top-0 left-1/2 -translate-x-1/2 bg-orange-400 opacity-100'/>
          <div className='flex justify-center items-center space-x-2 mt-[25px] mb-3  group'>
              <CalculatorIcon className=' h-8 w-8 text-sky-400'/>
              <p className='text-sky-700 text-xl font-semibold'>Over Stock Items</p>
          </div>

        <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item text-lg font-semibold" role="presentation">
                <button className="nav-link active " id="wholeStock" data-bs-toggle="tab" data-bs-target="#wholeStock-pane" type="button" role="tab" aria-controls="wholeStock-pane" aria-selected="true">Whole</button>
            </li>
            <li className="nav-item text-lg font-semibold" role="presentation">
                <button className="nav-link" id="portionStock" data-bs-toggle="tab" data-bs-target="#portionStock-pane" type="button" role="tab" aria-controls="portionStock-pane" aria-selected="false">Portion</button>
            </li>
        </ul>
        <div className="tab-content" id="myTabContent">
            <div className="tab-pane fade show active" id="wholeStock-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
                {wholeTot === 0 && <p className=' text-center text-2xl text-blue-500 font-bold mt-5'>No Whole Orders</p>}
                {wholeTot > 0 && 
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
                }
            </div>

            <div className="tab-pane fade" id="portionStock-pane" role="tabpanel" aria-labelledby="portionStock" tabIndex="0">
                <p className=' text-center text-2xl text-blue-500 font-bold mt-5'>On Progress</p>
            </div>
        </div>




    </div>
  )
}

export default OverStock