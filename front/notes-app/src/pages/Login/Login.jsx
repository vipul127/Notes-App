import React from 'react'
import Navbar from '../../components/Navbar/Navbar';
import {Link} from 'react-router-dom';

const Login = () => {
  return (
    <>
      <Navbar/>
      <div className='flex items-center justify-center mt-28'>
        <div className=''>
          <form onSubmit={()=>{}}>
            <h4>Login</h4>
            <input type='text' placeholder='Enter Username' className='input-box'/>
            <input type='password' placeholder='Enter Password' className='input-box'/>

            <button type='submit' className='btn-primary'>Login</button>
            <p className='text-sm text-center mt-4'>
              Not Registered? {""}
              <Link to='/signUp'>
                Create an Account
              </Link>
            </p>

          </form>
        </div>
      </div>
    </>
  );
};

export default Login