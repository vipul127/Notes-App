import React, { useState, useEffect} from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import {MdAdd} from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import axiosInstance from '../../utils/axiosinstance';
import Modal from 'react-modal'
import Footer from '../../components/Footer/Footer'
import { useNavigate } from 'react-router-dom'
Modal.setAppElement('#root');

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal ] = useState({
    isShown: false,
    type: "add",
    data: null
  })

  const [allNotes, setAllNotes] = useState([])

  const [userInfo, setUserInfo] = useState(null)

  const navigate = useNavigate()

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({isShown:true, data: noteDetails, type: "edit"})
  }

  const getUserInfo = async () => {
    try{
      const response = await axiosInstance.get("/get-user")
      if(response.data && response.data.user){
        setUserInfo(response.data.user)
      }
    }catch(error){
      localStorage.clear()
      navigate("/login")
    }
  }

  //retrieving Notes-API
  const getAllNotes= async ()=>{
    try{
      const response = await axiosInstance.get("/get-all-notes")
    if(response.data && response.data.notes){
      setAllNotes(response.data.notes)
    }
    }
    catch(error){
      console.log("An unexpected error.")
    }
  }

  useEffect(() => {
    getAllNotes()
    getUserInfo()  
    return () => {    }
  }, [])
  
  return (
    <div className="flex flex-col min-h-screen"> 
      
      <Navbar userInfo={userInfo}/>
      <div className="container mx-auto flex-grow"> 
        <div className="grid grid-cols-3 gap-4 mt-8">
        {allNotes.map((item,index)=> (
        <NoteCard
        key={item._id} 
        title={item.title} 
        date={item.createdOn}
        content={item.content}
        tags={item.tags}
        isPinned={item.isPinned}
        onEdit={() => handleEdit(item)}
        onDelete={()=>{}}
        onPinNote={()=>{}}
        />
      ))}
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

        getAllNotes={getAllNotes}
        />
      </Modal>

      <Footer />
    </div>
  )

}

export default Home
