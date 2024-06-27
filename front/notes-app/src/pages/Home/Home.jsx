import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import {MdAdd} from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Modal from 'react-modal'
import Footer from '../../components/Footer/Footer'
Modal.setAppElement('#root');

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal ] = useState({
    isShown: false,
    type: "add",
    data: null
  })

  return (
    <div className="flex flex-col min-h-screen"> 
      <Navbar />
      <div className="container mx-auto flex-grow"> 
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
      <div className='right-10 top-10 fixed py-10'>
      <button className=' w-30 h-11 flex items-center justify-center rounded-3xl btn-primary font-medium border border-blue-500 p-3 hover:shadow-md transition-shadow duration-300 hover:animate-bounce'
        onClick={() => {
          setOpenAddEditModal({isShown: true, type:"add", data:null})
        }}>
          New Note
        <MdAdd className="text-[32px] text-white text-xl" />
      </button>
      </div>

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

      <Footer />
    </div>
  )

}

export default Home
