import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import logo from '../assets/logo.svg'
const Navbar = () => {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);

  function logoutUser(){
    localStorage.removeItem('auth_token');
    setLoggedIn(false);
    navigate('/login');
  }

  useEffect(()=>{
    if(localStorage.getItem('auth_token')){
      setLoggedIn(true);
    }
  })
  return (
    <div className='flex justify-between px-2 py-4 shadow-lg items-center bg-white'>
        <div className='flex items-center gap-2 '>
            <img src={logo} className='w-8 h-8' alt="" />
            <Link className='text-xl font-bold' to={'/'}>Eagle Eye</Link>
        </div>  
        <div className='flex gap-2 items-center'>

            <Link className='hover:underline px-2' to={'/my-events'}>My Events</Link>
            {loggedIn ? 
            <button className='border-2 border-white text-white rounded-xl bg-blue-600 hover:bg-blue-800 hover:text-white px-2 p-1' to={'/login'} onClick={logoutUser}>Logout</button>
            :
            <>
            <Link className='border-2 border-white text-white rounded-xl bg-blue-600 hover:bg-blue-800 hover:text-white px-2 p-1' to={'/sign-up'}>Sign Up</Link>
            <Link className='border-2 border-white text-white rounded-xl bg-blue-600 hover:bg-blue-800 hover:text-white px-2 p-1' to={'/login'}>Login</Link>
            </>
            }
          </div>
    </div>
  )
}

export default Navbar