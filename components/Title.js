import React from 'react'
// import { Container } from 'react-bootstrap'

function Title({Icon, title , date}) {
  return (
    <div className=' mt-[80px] mb-1 '>
        <div className=' flex flex-row-reverse space-x-6 justify-center'>
            <Icon className="h-9 text-green-600 ml-4"/>
            <h1 className=' text-3xl font-serif text-green-600 font-semibold' >{title}</h1>
        </div>
    </div>
  )
}

export default Title