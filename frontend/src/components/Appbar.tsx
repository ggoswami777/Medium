import React from 'react'
import { Avatar } from './BlogCard'
import { Link } from 'react-router-dom'

const Appbar = () => {
  // 
    return (
        <div className='border-b border-slate-200 flex justify-between items-center px-10 py-3 sticky top-0 bg-white z-50'>
            <Link to={'/blogs'} className='flex flex-col justify-center cursor-pointer text-xl font-bold tracking-tight'>
                Medium
            </Link>
            <div className='flex items-center gap-4'>
                <Link to={'/publish'}>
                    <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center transition-all duration-200 shadow-sm hover:shadow-md">
                        New
                    </button>
                </Link>
                <div className='flex items-center justify-center cursor-pointer transition-transform hover:scale-105'>
                    <Avatar name="Gaurav" size="big" />
                </div>
            </div>
        </div>
    )
}

export default Appbar
