import React, { useState, useEffect} from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import {MdAdd} from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import axiosInstance from '../../utils/axiosinstance';
import Modal from 'react-modal'
import Footer from '../../components/Footer/Footer'
import { useNavigate } from 'react-router-dom'
import Toast from '../../components/ToastMessage/Toast'
import EmptyCard from '../../components/EmptyCard/EmptyCard'
import AddNotesImg from '../../assets/images/add-note.svg'
Modal.setAppElement('#root');

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal ] = useState({
    isShown: false,
    type: "add",
    data: null
  })

  const [showToast, setshowToast] = useState({
    isShown: false,
    message: "",
    type: "add",

  })
  const [allNotes, setAllNotes] = useState([])

  const [userInfo, setUserInfo] = useState(null)

  const navigate = useNavigate()

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({isShown:true, data: noteDetails, type: "edit"})
  }

  const showToastMsg = (message,type) => {
    setshowToast({isShown: true, message, type})
  }

  const handleCloseToast = () => {
    setshowToast({ isShown: false, message: "", type: "add" });
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

  const deleteNote = async (data) => {
    const noteId = data._id
    try {
        const response = await axiosInstance.delete("/delete-note/"+ noteId)
      
        if (response.data && !response.data.error) {
            showToastMsg("Note Deleted Successfully", 'delete')
            getAllNotes();
        }
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            console.log("An unexpected error occured. Please Try again")
        }
    }
};

  useEffect(() => {
    getAllNotes()
    getUserInfo()  
    return () => {    }
  }, [])
  
  return (
    <div className="flex flex-col min-h-screen"> 
      
      <Navbar userInfo={userInfo}/>
      
      <div className="container mx-auto flex-grow mt-12  ">
      <div className="flex items-center justify-center">
          <Toast
        isShown={showToast.isShown}
        message={showToast.message}
        type={showToast.type}
        onClose={handleCloseToast}
       />
          </div>
          {allNotes.length > 0 ? <div className="grid grid-cols-3 gap-4 mt-8 ">
        
        {allNotes.map((item,index)=> (
        <NoteCard
        key={item._id} 
        title={item.title} 
        date={item.createdOn}
        content={item.content}
        tags={item.tags}
        isPinned={item.isPinned}
        onEdit={() => handleEdit(item)}
        onDelete={()=>deleteNote(item)}
        onPinNote={()=>{}}
        />
      ))}
        </div> : (<EmptyCard imgSrc={AddNotesImg} message={`Start Creating your First Note! Click 'New Note' Button to Start writing down ideas and thoughts. Start Now!!`}/>)}
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
        showToastMsg={showToastMsg}
        />
      </Modal>
          
      <Footer />
    </div>
  )

}

export default Home