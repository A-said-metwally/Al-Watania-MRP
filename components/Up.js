import React from 'react'

function Up() {

  return (
    <div className='up-btn fixed right-5 bottom-10 z-30'>
        <button 
            className=' p-3 rounded-full bg-green-600 text-white text-lg 
            font-bold hover:cursor-pointer hover:bg-gray-500 cursor-pointer shadow-md'
            onClick={()=>{window.scrollTo({
              top:0,
              behavior:'smooth'
            })}}
        >Up</button>
    </div>
  )
}

export default Up