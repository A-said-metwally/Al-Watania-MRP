import React from 'react'
import NavItems from './NavItems'

function NavBar() {
  return (
    <div className='scrollbar-hide bg-[#e5e7eb] p-2 border border-gray-300 shadow-md rounded-md'>
        <nav className ="navbar navbar-expand-lg ">
            <div className ="container-fluid">
                <button className ="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
            </div>
        </nav>
    </div>

  )
}

export default NavBar