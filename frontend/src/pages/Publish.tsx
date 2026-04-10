import React, { useState, type ChangeEvent } from 'react'
import Appbar from '../components/Appbar'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import { useNavigate } from 'react-router-dom'

const Publish = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    const handlePublish = async () => {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                title,
                content: description
            }, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            const blogId = response.data.id || response.data.blog?.id;
            if (blogId) {
                navigate(`/blog/${blogId}`);
            } else {
                navigate(`/blogs`);
            }
        } catch (error) {
            console.error("Failed to publish post:", error);
            alert("Error publishing post. Please make sure you are logged in.");
        }
    }

    return (
        <div className='min-h-screen bg-white'>
            <Appbar />
            <div className='flex justify-center w-full pt-12 px-4'>
                <div className='max-w-screen-lg w-full'>
                    {/* Title Input */}
                    <input 
                        onChange={(e) => setTitle(e.target.value)}
                        type="text" 
                        className='w-full text-5xl font-serif font-bold outline-none border-l-4 border-transparent focus:border-slate-100 pl-4 py-2 placeholder:text-slate-300' 
                        placeholder='Title'
                    />
                    
                    {/* Content Input Area */}
                    <div className='mt-8'>
                        <TextEditor onChange={(e) => setDescription(e.target.value)} />
                    </div>

                    {/* Publish Button Container */}
                    <div className='mt-10 mb-20 flex justify-start'>
                        <button 
                            onClick={handlePublish}
                            type="button" 
                            className="inline-flex items-center px-8 py-3 text-base font-medium text-white bg-green-600 rounded-full hover:bg-green-700 active:scale-95 transition-all duration-200 shadow-sm hover:shadow-md focus:ring-4 focus:ring-green-100"
                        >
                            Publish story
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function TextEditor({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
    return (
        <div className="w-full">
            <div className="bg-white">
                <textarea 
                    onChange={onChange} 
                    id="editor" 
                    rows={15} 
                    className="focus:outline-none block w-full text-xl font-serif text-slate-800 bg-white border-l-4 border-transparent focus:border-slate-50 pl-4 py-2 placeholder:text-slate-300 resize-none leading-relaxed" 
                    placeholder="Tell your story..." 
                    required 
                />
            </div>
            <div className='border-t border-slate-100 mt-4 pt-4 text-slate-400 text-sm italic pl-4'>
                Pro tip: Use the toolbar to add images or format text (coming soon) .
            </div>
        </div>
    )
}

export default Publish
  