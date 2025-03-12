import React, { useImperativeHandle, useRef, useState } from 'react'
import Header from './Header';
import CharacterBackgroundInput from './CharacterBackgroundInput';
import { NewCharacterPageBackground } from '../assets/img';
import { saveNewCharacter } from '../api';
import CharacterAppearanceInput from './CharacterAppearanceInput';

export const NewCharacter = () => {
  const childRef = useRef();
  const childRefApperance = useRef(null);
  const [image64, setImage64] = useState("")

  async function fetchAvatarBase64(imagePrompt) {
    console.log("Generating image for prompt:", imagePrompt);

    
  
    try {
      const response = await fetch("http://localhost:4000/api/textToImage/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: imagePrompt,  // ✅ 传递正确的 prompt
        }),
      });
  
      const data = await response.json();
      if (!data.success || !data.image) {
        console.error("Failed to fetch image");
        return;
      }

      setImage64(data.image);
      console.log(image64)
  
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  }
  

  async function fetchChildData() {
    
      if (childRef.current && childRefApperance.current) {
        const data = childRef.current.getChildData(); // 获取子组件数据
        alert(childRef.current.getChildData()); // 获取子组件数据
        console.log("获取的表单数据:", data);

        const dataApperance = childRefApperance.current.getChildData();
        await fetchAvatarBase64(JSON.stringify(dataApperance, null, 2) + ' ' + childRef.current.getChildData())
        alert(JSON.stringify(dataApperance, null, 2))

        

        

        alert(JSON.stringify(data, null, 2)); // 以弹窗形式显示
        const newCharacterData = {
          name : data.name,
          description : dataApperance.description,
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
      <CharacterAppearanceInput ref={childRefApperance} />
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