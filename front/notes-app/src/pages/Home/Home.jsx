import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import {MdAdd, MdSignalCellularNull} from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Modal from 'react-modal'
Modal.setAppElement('#root');

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal ] = useState({
    isShown: false,
    type: "add",
    data: null
  })

  return (
    <>
    <Navbar/>

   <div className="container mx-auto">
    <div className="grid grid-cols-3 gap-4 mt-8">

    <NoteCard 
    title="ProjectX requsit" 
    date="2nd Dec 2000"
    content="Requesting To discuss requist for Project X"
    tags="#Secret"
    isPinned={true}
    onEdit={()=>{}}
    onDelete={()=>{}}
    onPinNote={()=>{}}
    />

  </div>
  </div>


    <button className=' w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10' 
    onClick={() => {
      setOpenAddEditModal({isShown: true, type:"add", data:null})
    }}>
      <MdAdd className="text-[32px] text-white" />
    </button>

    <Modal
      isOpen={openAddEditModal.isShown}
      onRequestClose={() => {}}
      style={{
        overlay: {
          backgroundColor: "rgba(0,0,0,0.2)",
        },
      }}
      contentLabel=""
      className="w-[40%] max-h-3/40 bg-white rounded-md mx-auto mt-20 p-5 overflow-hidden" 
      appElement={document.getElementById('app')}
    >
      <AddEditNotes
      type={openAddEditModal.type}
      noteData={openAddEditModal.data}
      onClose={() => {
        setOpenAddEditModal({isShown: false, type:"add", data:null})
      }}
      />
    </Modal>

    
</>
  )

}

export default Home