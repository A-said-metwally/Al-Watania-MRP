import React from 'react'

function Versions() {
  return (
    <div className='container flex justify-center'>
        <ul className='text-2xl capitalize'>
            <li className='p-2 text-green-500'>V1 : calculate mrp Without any special specifications </li>
            <li className='p-2 text-green-500'>V2 : Add special items like mixed parts</li>
            {/* <li className='p-2 '>V3 : Add special items like Americana and Albaik etc ...</li> */}
            <li className='p-2'>V3 : Integrate With Copilot Tool to Inhance Sales Order </li>
            <li className='p-2'>V4 : possibility of calculation requirements according to multiple types of yield (cobb, Meyn, etc .. ) </li>
            <li className='p-2'>V5 : Optimization User Experience </li>
        </ul>

    </div>
  )
}

export default Versions