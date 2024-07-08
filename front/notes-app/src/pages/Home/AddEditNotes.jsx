import React, { useState } from 'react';
import TagInput from '../../components/Input/TagInput';
import { MdClose } from 'react-icons/md';
import axiosInstance from '../../utils/axiosinstance';

const AddEditNotes = ({ noteData, getAllNotes, type, onClose }) => {
    const [title, setTitle] = useState(noteData.title || "");
    const [content, setContent] = useState(noteData.content || "");
    const [tags, setTags] = useState(noteData.tags || []);
    const [error, setError] = useState(null);

    const addNewNote = async () => {
        try {
            const response = await axiosInstance.post("/add-note", {
                title,
                content,
                tags
            });

            if (response.data && response.data.note) {
                getAllNotes();
                onClose();
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            }
        }
    };

    const editNote = async () => {
        const noteId = noteData._id
        try {
            const response = await axiosInstance.put("/edit-note/"+ noteId, {
                title,
                content,
                tags
            });

            if (response.data && response.data.note) {
                getAllNotes();
                onClose();
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            }
        }
    };

    const handleAddNote = () => {
        if (!title) {
            setError("Please Enter A Title.");
            return;
        }
        if (!content) {
            setError("Please write the Content.");
            return;
        } else {
            setError("");
        }

        if (type === 'edit') {
            editNote();
        } else {
            addNewNote();
        }
    };

    return (
        <div className='relative'>
            <button className='w-8 h-8 rounded-full flex items-center justify-center absolute -top-3.5 -right-3.5 hover:bg-slate-100 hover:text-primary' onClick={onClose}>
                <MdClose className='text-xl text-slate-400 hover:text-primary' />
            </button>
            <div className="flex flex-col gap-2">
                <label className='input-label'>TITLE</label>
                <input
                    type='text'
                    className='text-2xl t1 text-slate-950 outline-none bg-slate-100 p-2 my-.5'
                    placeholder='Title'
                    value={title}
                    onChange={({ target }) => {
                        setTitle(target.value);
                        setError("");
                    }}
                />
            </div>

            <div className="flex flex-col gap-2 mt-4">
                <label className="input-label">CONTENT</label>
                <textarea
                    type='text'
                    className='text-sm text-slate-950 outline-none bg-slate-50 p-2 r1'
                    placeholder='Content'
                    rows={10}
                    value={content}
                    onChange={({ target }) => {
                        setContent(target.value);
                        setError("");
                    }}
                />
            </div>

            <div className="mt-3">
                <label className='input-label'>TAGS</label>
                <TagInput tags={tags} setTags={setTags} />
            </div>
            {error && <p className='text-xs text-red-500 pt-4'>{error}</p>}
            <button className='btn-primary font-medium mt-4 p-2' onClick={handleAddNote}>{type === 'edit' ? 'UPDATE' : 'ADD'}</button>
        </div>
    );
};

export default AddEditNotes;
