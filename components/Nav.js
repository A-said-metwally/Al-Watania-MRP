import React from 'react'
import requistes from '../utils/requistes'
import { useRouter } from 'next/router'

function Nav() {
  const router = useRouter()
  return (
    <nav className='relative flex'>
        <div className='flex px-10 sm:px-20 text-lg whitespace-nowrap space-x-10 sm:space-x-20 mb-10
        overflow-x-scroll scrollbar-hide '>
            {Object.entries(requistes).map(([key,{title, url}]) => 
               (
                <p 
                key={key} 
                onClick={()=> router.push(`/?genre=${key}`)}
                className='last:pr-24 cursor-pointer transition duration-100
                  hover:scale-125 hover:text-white active:text-red-500'>
                  {title}
                </p>
              )
             )}
        </div>
        <div className='absolute top-00 right-0 bg-gradient-to-l from-[#06202A] to-white h-10 w-1/12'></div>
    </nav>
  )
}

export default Nav