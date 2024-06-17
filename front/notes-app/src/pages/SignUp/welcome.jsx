import React, {useState} from 'react'
import {useLocation } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar';
import PasswordInput from '../../components/Input/PasswordInput';

const welcome = () => {
  const location = useLocation();
  const { name } = location.state || {}
  const[password, setPassword] = useState("");
  const[error, setError] = useState(null)

  const handleWelcome = async (e) => {
    e.preventDefault();
    if(!password){
      setError("Please Enter the password")
      return
    }
        
    setError("")
     
  }

  return (
    <>
    <Navbar/>
    <div className='  flex items-center justify-center mt-28'>
      <div className='w-96 border more-rounded bg-white px-7 py-10'>
        <form onSubmit={handleWelcome}>
          <h4 className='text-2xl mb-7 font-bold'>Hi, {name}</h4>
          <PasswordInput
            value={password}
              onChange={(e) => setPassword(e.target.value) }
            />

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
            <button type='submit' className='btn-primary'>Create Account</button>
        </form>
      </div>
    </div>
    </>
    
  )
}

export default welcome
