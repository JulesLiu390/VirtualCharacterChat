import React, { useState } from 'react'
import { LoginBackGround } from '../assets/img';
import {motion} from 'framer-motion'
import {FcGoogle} from 'react-icons/fc'

export const Login = () => {

  return (
      
      <div className='relative w-screen h-screen overflow-hidden'>
        <motion.img src={LoginBackGround} alt="Fullscreen Cover" className='absolute w-full h-full object-cover'/>
        <div className='absolute inset-0 bg-darkOveray flex items-center justify-center p-4'>
          <div className='w-375 md:w-375 p-4 bg-lightOveray shadow-2xl rounded-md backdrop-blur-md flex flex-col items-center justify-center'>
            <div className='flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-cardOveray cursor-pointer hover:bg-card hover:shadow-md duration-100 ease-in-out transition-all font-semibold'
              // onClick={loginWithGoogle}
            >
              <FcGoogle className='text-xl'/>
                Sign in with Google.
            </div>
          </div>
        </div>  
    </div>
  )
  
}

export default Login;