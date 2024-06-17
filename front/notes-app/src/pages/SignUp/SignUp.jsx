import React, { useState } from 'react'
import {Link, useNavigate, useLocation} from 'react-router-dom';
import { isValidEmail } from '../../utils/helper';
import Navbar from '../../components/Navbar/Navbar';

const SignUp = () => {
    const[name,setName] = useState("")
    const[email,setEmail] = useState("");
    const[error, setError] = useState(null)
    const navigate = useNavigate();
    const handleSignUp = async (e) => {
      e.preventDefault();
      if (!isValidEmail(email)){
        setError("Please Enter a Valid Email...")
        return
      }
      setError("")
      navigate ('/welcome', { state: { name: name } }); 
    }
  return (
    <>
    <Navbar/>
    <div className='  flex items-center justify-center mt-28'>
      <div className='w-96 border more-rounded bg-white px-7 py-10'>
        <form onSubmit={handleSignUp}>
          <h4 className='text-2xl mb-7 font-bold'>SignUp</h4>
          <input 
            type='text' 
            placeholder='Enter Your Name' 
            className='input-box'
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
          <input 
            type='text' 
            placeholder='Enter Your Email' 
            className='input-box'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            
          {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
          
          <button type='submit' className='btn-primary'>Create password</button>

          <p className='text-sm text-center mt-4'>
              Already Registered? {""}
              <Link to='/login' className='font-medium text-primary underline'>
                Login
              </Link>
          </p>



        </form>
      </div>
    </div>
    </>
  )
}

export default SignUp