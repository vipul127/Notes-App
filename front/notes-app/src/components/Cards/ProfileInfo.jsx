import React from 'react'
import { GetInitials } from '../../utils/helper'

const ProfileInfo = (OnLogout) => {
  return (
    <div className='flex items-centered gap-3'>
        <div className='w-11 h-11 flex items-center justify-center rounded-full text-black font-bold text-slate-950 font-medium bg-slate-100'>
            {GetInitials("lorem ipsum")}
        </div>

        <div>
            <p className='text-sm font-medium'> Ipsem</p>
            <button className=' text-sm text-slate-700 underline' onClick={OnLogout}>Logout</button>
        </div>

    </div>
  )
}

export default ProfileInfo