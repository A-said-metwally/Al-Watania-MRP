import React from 'react'
import items from '../items.json'

function Yield() {
    let arr = ["materialNumber", "classification", "netweight", "wUn", "division", "count", "cartonWt", "weight", "group", "family", "class", "yieldFromChkn","yieldAfterEvas", "yieldFromFamily"]

return (
    <div className=' flex flex-col p-2'>
        <h2>Yield Page</h2>
        <table className="table mt-3 ">
            <thead className='text-gray-700 text-md '>
                <tr>
                    {arr.map((a, index)=>{
                        return (
                            <th scope="col" key = {index}>
                                <div className='flex justify-center items-center space-x-3'>
                                    <span className=' capitalize'>{a}</span>
                                </div> 
                            </th>
                        )
                    })}
                </tr>
            </thead>
            <tbody className='text-gray-600'>
                {items.map((d, index)=>{
                    return (
                        <tr key = {index} className=' hover:bg-gray-200 font-semibold hover:text-blue-600 hover:font-bold cursor-pointer text-lg even:bg-gray-200'>
                            {arr.map((a, index)=>{
                                return (
                                    <td key = {index} className=' pt-3 pb-3 text-center'>{d[a]}</td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
  )
}

export default Yield