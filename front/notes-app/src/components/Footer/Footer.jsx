import React from 'react'
import {AnimatedSocialIcon} from 'react-animated-social-icons'
import { Link, useNavigate } from 'react-router-dom';


const Footer = () => {

  const handleSocial = () => {
    const navigate = useNavigate();
    navigate('https://github.com/Lost-Arch');
  }

  return (
    <>
        <div className='bg-black grid grid-cols-2 gap-4 mt-10 text-white py-10 px-72 w-full flex flex-warp'>
            <div className='w-9/12'>
              <div className="text-5xl font-extrabold">
                  Want to connect?
              </div>
              <div className=''>
                <p className='text-slate-500 pt-5'>Notes App is built using the MERN stack, allows users to create, edit, and manage personal notes efficiently with a user-friendly interface and secure data storage.</p>
              </div>
            </div>

            
            <div className=" flex flex-col justify-center mt-6 flex-warp items-end mr-10 ">
                <div className="py-3 items-center flex mr-4 ani">
                      <AnimatedSocialIcon
                          brandName="github"
                          url="https://github.com/Lost-Arch"
                          animation="bounce"
                          width="2em"
                          animationDuration={0.8}
                          

                      />
                     <Link to="https://github.com/Lost-Arch" className='text-m indent-9 text-white opacity-80 transition-opacity duration-800 hover:opacity-100 '> Github</Link>
                </div>
                <div className="py-3 items-center flex ani ">
                      <AnimatedSocialIcon
                          brandName="linkedin"
                          url="https://github.com/Lost-Arch"
                          animation="bounce"
                          width="2em"
                          animationDuration={0.8}
                      />
                     <Link to="https://github.com/Lost-Arch" className='text-m indent-9 text-white opacity-80 transition-opacity duration-800 hover:opacity-100'> LinkedIn</Link>
                </div>
                <button 
                className="py-3 items-center flex mr-3 ani"
                onClick={()=>{handleSocial}}
                >
                <AnimatedSocialIcon
                      brandName="twitter"
                      url="google.com"
                      animation="bounce"
                      width="2em"
                      animationDuration={0.8}
                  />
                  <Link to="https://github.com/Lost-Arch" className='text-m indent-9 text-white opacity-80 transition-opacity duration-800 hover:opacity-100'> Twitter </Link>
                </button>
            </div>
            

            <div className='mb-3 text-slate-300'>&copy; {new Date().getFullYear()}</div>

        </div>
          
    </>
  )
}

export default Footer