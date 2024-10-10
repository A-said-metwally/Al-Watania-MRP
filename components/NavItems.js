import React from 'react'
import Link from 'next/link'

export default function NavItems({dep, sections}) {
  return (
    <div className='group'>
            <li className="nav-item  dropdown  hover:scale-105">
                <a className="nav-link dropdown-toggle text-gray-600 active:text-green-400" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {dep}
                </a>
                <ul className="dropdown-menu mt-3 p-2 shadow-md shadow-slate-400 ">
                  {sections?.map((s)=>(
                    s.secName === ''
                    ? <hr/>
                    :   <li key={s}>
                          <Link href={`/evaluation/${dep}/${s.secName}/${s.grade}`}>
                            <a className="dropdown-item" >{s.secName + " G " +s.grade}</a>
                          </Link>
                        </li>
                  ))}
                </ul>
            </li>
    </div>
  )
}
