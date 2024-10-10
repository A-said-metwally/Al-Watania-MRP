import Link from 'next/link'
import React, { useState } from 'react'
import NavBar from './NavBar'

function HeaderItem({title, Icon, path, subNav}) {
  return (
    <Link href={path}  >
      <div className=' relative flex flex-col items-center cursor-pointer group
           hover:text-sky-500'>
                <Icon className='h-8 mb-1 group-hover:animate-bounce'/>
                <p className=' group-hover:text-sky-500 group-hover:font-semibold tracking-widest'>
                    {title}
                </p> 
                <div className='nav-bar absolute hidden
                  top-16 -left-16 z-50 shadow-md rounded-md  group-hover:flex '>
                  {subNav && <NavBar/>}
                  </div>
                
      </div>
    </Link>
  )
}

export default HeaderItem