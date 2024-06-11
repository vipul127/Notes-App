import React from 'react'
import ProfileInfo from '../Cards/ProfileInfo'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar.jsx'

const Navbar = () => {
  const navigate=useNavigate;

  const onLogout = () => {
    navigate('/login')
  }

  return (
    <>    
      <div className='bg-white flex items-center drop-shadow justify-between px-6 py-2'>
      <h1 className='text-xl font-medium py-2'>Notes</h1>

      <SearchBar/>

      <ProfileInfo onLogout={onLogout} />

      </div>
    </>
  )
}

export default Navbar
