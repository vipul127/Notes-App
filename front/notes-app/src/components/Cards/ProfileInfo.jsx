import React from 'react';
import { getInitials } from '../../utils/helper';

const ProfileInfo = ({ userInfo, onLogout }) => {
  return (
    <div className='flex items-center gap-3'>
      <div className='w-11 h-11 flex items-center justify-center rounded-full text-black font-bold text-slate-950 font-medium bg-slate-100'>
        {getInitials(userInfo?.fullName)}
      </div>

      <div>
        <p className='text-sm font-medium'>{userInfo?.fullName}</p>
        <button
          className='text-sm text-slate-700 hover:underline'
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;