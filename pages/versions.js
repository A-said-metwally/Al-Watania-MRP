import React from 'react'

function Versions() {
  return (
    <div className='container flex justify-center'>
        <ul className='text-2xl capitalize'>
            <li className='p-2'>V1 : calculate mrp Without any special specifications </li>
            <li className='p-2'>V2 : Add special items like mixed parts, americana and albaik etc ...</li>
            <li className='p-2'>V3 : possibility of calculation requirements according to multiple types of yield (cobb, Meyn, etc .. ) </li>
        </ul>

    </div>
  )
}

export default Versions