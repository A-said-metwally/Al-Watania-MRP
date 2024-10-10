import React from 'react'

function Controls({getAlw, calc}) {
  return (
    <div className='flex justify-between items-center'>
        <label htmlFor="avgWt" className='text-blue-600 text-xl font-semibold'>Expected Live Avg Wt</label>
        <input 
        id='avgWt'
        // value={SearchText}
        onChange={(e)=>{getAlw(e.target.value/1000)}}
        className='flex h-[50px] w-[150px] border-2 border-sky-500 p-1 focus:outline-none
        text-xl text-center text-sky-600 font-semibold rounded-xl shadow-md' 
        type = 'number' placeholder='Live Wt' 
        />
        <button 
          onClick={()=>calc()}
          className='p-2 w-[150px] bg-sky-400 text-white font-semibold text-lg rounded-xl 
          shadow-md cursor-pointer hover:bg-sky-700 hover:border-2 hover:border-yellow-500'
        >Calculate</button>
    </div>
)
}

export default Controls