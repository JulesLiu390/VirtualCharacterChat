import React, { useImperativeHandle, useRef } from 'react'
import Header from './Header';
import CharacterBackgroundInput from './CharacterBackgroundInput';
import { NewCharacterPageBackground } from '../assets/img';
import { saveNewCharacter } from '../api';

export const NewCharacter = () => {
  const childRef = useRef();

  const fetchChildData = () => {
    
      if (childRef.current) {
        const data = childRef.current.getChildData(); // 获取子组件数据
        // alert(childRef.current.getChildData()); // 获取子组件数据
        // console.log("获取的表单数据:", data);
        alert(JSON.stringify(data, null, 2)); // 以弹窗形式显示
        const newCharacterData = {
          name : data.name,
          description : data.description,
          personality : data.personality,
          isPublic : "true",
          avatarUrl : "https://firebasestorage.googleapis.com/v0/b/virtual-character-chat.firebasestorage.app/o/avatar%2FQQ20250307-134135.png?alt=media&token=d47eb7f4-a2bb-48c1-8d33-7c38dcf1460f",
        };
  
        saveNewCharacter(newCharacterData).then(res => {
          // getAllArtists().then(artists => {
          //   dispatch({
          //     type : actionType.SET_ALL_ARTISTS,
          //     allArtists : artists.artist,
          //   })
          // })
        })
      }
  }

  return (
    <div className='w-full h-full flex-col flex items-center pb-60 bg-[rgba(245,230,211,1)] gap-8 justify-center bg-white'
          style={{
            backgroundImage: `url(${NewCharacterPageBackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
    >
    {/* <div> */}
      <Header/>


      {/* <div className='h-full'> */}
      <div className='flex gap-8'>
      <CharacterBackgroundInput ref={childRef} className='mt-8 w-full min-h-[80%] flex-col flex items-center'/>

      </div>
      <button className='h-auto w-auto bg-white'
      onClick={fetchChildData}
      >
        Create Character
      </button>



      {/* </div> */}
      {/* <Header></Header> */}

      
      
    </div>
  )
}

export default NewCharacter;