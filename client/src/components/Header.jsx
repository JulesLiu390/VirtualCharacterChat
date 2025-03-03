import React, { useState } from 'react'
import {FaCrown, FaGamepad} from "react-icons/fa6"
import { isActiveStyles, isNotActiveStyles } from '../utils/styles'
import { NavLink, useNavigate } from 'react-router-dom'
import {motion} from 'framer-motion'
import { getAuth } from 'firebase/auth'
import { app } from '../config/firebase.config'

export const Header = () => {

    const [isMenu, setisMenu] = useState(false)

    const navigate = useNavigate();




    const logOut = () => {
        const firebaseAuth = getAuth(app);
        firebaseAuth.signOut().then(() => {
            window.localStorage.setItem("auth", "false");
        }).catch((e) => console.log(e));
        navigate("/login", {replace : true});
    }

  return (
    <div>

    <div className='flex justify-between w-screen py-6 px-12 bg-pink-300 rounded-md'>
        <ul className='flex justify-start gap-5 w-[50%] mg-3 mb-3 items-center'>
        <FaGamepad/>
            <li><NavLink to={'/home'} className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}>Home</NavLink></li>
            <li><NavLink to={'/characters'} className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}>Characters</NavLink></li>
            <li><NavLink to={'/messages'} className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}>Messages</NavLink></li>
        </ul>
    

    <div
            onMouseEnter={() => setisMenu(true)}
            onMouseLeave={() => setisMenu(false)}
        className='flex items-center ml-auto cursor-pointer gap-2 relative'>
            {/* <img src={user?.user.imageURL} className='w-12 h-12 min-w-[44px] object-cover rounded-full shadow-lg' alt="" referrerPolicy='noreferrer'/> */}
            <img src={"data:image/jpeg;base64,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"} className='w-12 h-12 min-w-[44px] object-cover rounded-full shadow-lg' alt="" referrerPolicy='noreferrer'/>

            <div className='flex flex-col'>
                {/* <p className='text-textColor text-lg hover:text-headingColor font-semibold'>{user?.user?.name}</p> */}
                <p className='text-textColor text-lg hover:text-headingColor font-semibold'>{"name"}</p>
                <p className='flex items-center gap-2 text-xs text-gray-500 font-normal'>Premium Member. <FaCrown className='text-sm ml-1 text-yellow-500'></FaCrown> </p>
            </div>

            {isMenu && (
                <motion.div
                initial={{opacity : 0, y : 50}}
                animate={{opacity : 1, y : 0}}
                exit = {{opacity : 0, y : 50}}
                className='absolute z-10 top-12 p-2 right-0 w-275 gap-3 bg-card shadow-lg rounded-lg backdrop-blur-sm flex flex-col'>
                    <NavLink to={'/userProfile'}>
                        <p className='text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out'>Profile</p>
                    </NavLink>
                        <p className='text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out'>My Favourites</p>

                            <hr></hr>

                            {/* {
                                user?.user?.role === "admin" && (
                                    <>
                                    <NavLink to={"/dashboard/home"}>
                                        <p className='text-base text-textColor hover:font-semibold duration-150 transition-all  ease-in-out'>Dashboard</p>
                                    </NavLink>
                                    <hr></hr>
                                    </> 
                                )
                            } */}

                        <p className='text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out' onClick={logOut}> Sign Out</p>
                        {/* <p className='text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out' > Sign Out</p> */}

                </motion.div>                
            )}

        </div>

        </div>

    </div>


  )
}

export default Header