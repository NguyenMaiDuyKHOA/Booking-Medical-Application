import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
    return (
        <div className='w-[18%] min-h-screen border-r-2'>
            <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
                <NavLink to="/" className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1'>
                    <img src={assets.home} alt="" className='w-5 h-5' />
                    <p className='hidden md:block'>Clinic</p>
                </NavLink>

                <NavLink to="/about" className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1'>
                    <img src={assets.pen} alt="" className='w-5 h-5' />
                    <p className='hidden md:block'>Article</p>
                </NavLink>

                <NavLink to="/slide" className='flex items-center gap-3 border border-gray-300 border-r-0 pl-2 py-2 rounded-1'>
                    <img src={assets.banner_icon} alt="" className='w-7 h-7' />
                    <p className='hidden md:block'>Banner</p>
                </NavLink>

                <NavLink to="/add" className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1'>
                    <img src={assets.user} alt="" className='w-5 h-5' />
                    <p className='hidden md:block'>Manage doctor</p>
                </NavLink>

                <NavLink to="/list" className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1'>
                    <img src={assets.checklist} alt="" className='w-5 h-5' />
                    <p className='hidden md:block'>List Booking</p>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar