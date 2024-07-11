import React, { useState } from 'react';
import ProfileInfo from '../Cards/ProfileInfo';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar.jsx';

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate(); 
  const onLogout = () => {
    console.log("logging out")
    localStorage.clear();
    navigate('/login');
  };

  const handleSearch = () => {
      if(searchQuery){
        onSearchNote(searchQuery)
      }
  };

  const onClearSearch = () => {
    setSearchQuery('');
    handleClearSearch()
  };

  return (
    <div className='bg-white items-center drop-shadow flex justify-between  px-6 py-2'>
      <h1 className='grid text-xl font-medium py-2]'>Notes</h1>
      <SearchBar
        
        value={searchQuery}
        onChange={({ target }) => {
          setSearchQuery(target.value);
        }}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />
      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </div>
  );
};

export default Navbar;
