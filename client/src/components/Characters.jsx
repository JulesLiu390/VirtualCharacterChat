import React, { useEffect } from 'react'
import Header from './Header';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { IoAdd, IoPause } from 'react-icons/io5';
import {AiOutlineClear} from "react-icons/ai";
import { getAllCharacters } from '../api';
import { useStateValue } from '../content/StateProvider';
import { actionType } from '../content/reducer';
import {motion} from "framer-motion"




export const Characters = () => {

  const [{allCharacters}, dispatch] = useStateValue();

  useEffect(() => {
    if(!allCharacters) {
      getAllCharacters().then(data => {
        dispatch({
          type : actionType.SET_ALL_CHARACTERS,
          allCharacters: data.character,
        })
      })
    }
  }, [])

  return (
    <div className='w-full flex-col flex items-center'>
      <Header/>
      <div className='w-full flex justify-center items-center gap-20 mt-4 mb-4'>
        <NavLink to="/newcharacter" className="flex items-start justify-center px-4 py-3 border rounded-md border-green-500 hover:border-green-900 hover:shadow-md cursor-pointer">
          <IoAdd></IoAdd>
        </NavLink>

        {/* <input type='text' className={ `w-52 px-4 py-2 border ${isFocus ? "border-gray-500 shadow-md" : 'border-gray-300'} */}
        <input type='text' className={ `w-52 px-4 py-2 border }rounded-md bg-transparent outline-none duration-150 transition-all ease-in-out text-base text-textColor font-semibold`} placeholder='Your emotional journey'></input>

        <i>
          <AiOutlineClear className='text-3xl text-textColor cursor-pointer'></AiOutlineClear>
        </i>
      </div>
      <CharacterContainer data={allCharacters} />
      
    </div>
  )
}

export const CharacterContainer = ({data}) => {
  return (
    <div className='w-full flex flex-wrap gap-3 items-center justify-evenly'>
      {data && data.map((character, i) => <CharacterCard key={character._id} data={character} index={i}/>)}
      <></>
    </div>
  )
}

export const CharacterCard = ({data, index}) => {
  const [{currentCharacter}, dispatch] = useStateValue();
  const navigate = useNavigate(); 
  const cardSetCurrentCharacter = () => {
    dispatch({
        type: actionType.SET_CURRENT_CHARACTER,
        currentCharacter: data,
    })
    navigate("/game")
    // window.location.href = "/game"
  }
  return (
    <motion.div className='relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center'
    onClick={cardSetCurrentCharacter}
    >
        <div className='w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden'>
            <motion.img 
                whileHover={{scale:1.05}}
                src={data.avatarBase64}
                className='w-full h-full rounded-lg object-cover'
            />
        </div>
        <p className='text-base flex flex-col text-center text-headingColor font-semibold my-2'>
            {data?.name.length > 25 ? `${data?.name.slice(0,25)}..` : data?.name}
            {data.artist && (
                <span className='block text-sm text-gray-400 my-1'>
                {data?.artist.length > 25 ? `${data?.artist.slice(0,25)}..` : data?.artist}
                </span>
            )}
        </p>

    </motion.div>
  )
}



export default Characters;