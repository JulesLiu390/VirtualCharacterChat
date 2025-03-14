import React, { useImperativeHandle, useRef, useState } from 'react'
import Header from './Header';
import CharacterBackgroundInput from './CharacterBackgroundInput';
import { NewCharacterPageBackground } from '../assets/img';
import { getAllCharacters, saveNewCharacter } from '../api';
import CharacterAppearanceInput from './CharacterAppearanceInput';
import CharacterVoiceInputs from './CharacterVoiceInput';


import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // ✅ 直接从 `firebase/storage` 导入
import { storage} from "../config/firebase.config";
import { useStateValue } from '../content/StateProvider';
import { actionType } from '../content/reducer';




export const NewCharacter = () => {

  const [{allCharacters}, dispatch] = useStateValue();


  function base64ToFile(base64, fileName, mimeType = "image/png") {
    const byteCharacters = atob(base64);
    const byteArrays = [];
  
    for (let i = 0; i < byteCharacters.length; i++) {
      byteArrays.push(byteCharacters.charCodeAt(i));
    }
  
    const byteArray = new Uint8Array(byteArrays);
    console.log(byteArray)
    return new File([byteArray], fileName, { type: mimeType });
  }
  
  // ✅ 直接上传 `File` 到 Firebase
  async function uploadFileToFirebase(file, path) {
    try {
      console.log(`Uploading ${file.name} to Firebase...`);
  
      const storageRef = ref(storage, `${path}/${file.name}`);
  
  
      // 🔹 直接上传 `File`
      await uploadBytes(storageRef, file);
  
      const downloadURL = await getDownloadURL(storageRef);
      console.log("Uploaded File to Firebase:", downloadURL);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading File to Firebase:", error);
      return null;
    }
  }





  const childRef = useRef();
  const childRefApperance = useRef(null);
  const childRefVoice = useRef(null);

  async function fetchVoiceID(voicePrompt) {
    console.log("Generating voice for prompt:", voicePrompt);
  
    try {
      const response = await fetch("http://localhost:4000/api/textToSpeech/newVoice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          voiceDescription: voicePrompt,
          text: "The night air carried whispers of betrayal, thick as London fog. I adjusted my cufflinks - after all, even spies must maintain appearances, especially when the game is afoot."
        }),
      });
      const data = await response.json();
      if (!data.success || !data.voice_id) {
        console.error("Failed to fetch voice");
        return null;
      }
      return data.voice_id;
    } catch (error) {
      console.error("Error fetching voice:", error);
      return null;
    }
  }

  async function fetchImageBase64(imagePrompt) {
    console.log("Generating image for prompt:", imagePrompt);
  
    try {
      const response = await fetch("http://localhost:4000/api/textToImage/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: imagePrompt,
        }),
      });
      const data = await response.json();
      if (!data.success || !data.image) {
        console.error("Failed to fetch image");
        return null;
      }

      const file = base64ToFile(data.image, `character_${Date.now()}.png`);
      const imageUrl = await uploadFileToFirebase(file, "background");
      return imageUrl;


      // return data.image;
    } catch (error) {
      console.error("Error fetching image:", error);
      return null;
    }
  }

  async function fetchAvatarBase64(imagePrompt) {
    console.log("Generating avatar for prompt:", imagePrompt);
  
    try {
      const response = await fetch("http://localhost:4000/api/textToImage/avatar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: imagePrompt,
        }),
      });
      const data = await response.json();
      if (!data.success || !data.image) {
        console.error("Failed to fetch avatar");
        return null;
      }
      const file = base64ToFile(data.image, `avatar_${Date.now()}.png`);
      // 🔹 上传 PNG 文件到 Firebase
      const avatarUrl = await uploadFileToFirebase(file, "avatar");
      return avatarUrl;


      // return data.image;
    } catch (error) {
      console.error("Error fetching avatar:", error);
      return null;
    }
  }

  async function fetchChildData() {
    if (childRef.current && childRefApperance.current) {
      const data = childRef.current.getChildData();
      const dataApperance = childRefApperance.current.getChildData();
      const dataVoice = childRefVoice.current.getChildData();

      alert(JSON.stringify(dataVoice, null, 2));

      // 确保所有请求的返回值被正确获取
      const [imageBase64, voiceID, avatarBase64] = await Promise.all([
        fetchImageBase64(data.characterPrototype + ' ' + data.gender + ' height:' + data.height + ' weight' + data.weight + ' ' + JSON.stringify(dataApperance, null, 2) + ' ' + childRef.current.getChildData()),
        fetchVoiceID(JSON.stringify(dataVoice, null, 2)),
        fetchAvatarBase64(data.characterPrototype + ' ' + data.gender + ' height:' + data.height + ' weight' + data.weight + ' ' + JSON.stringify(dataApperance, null, 2) + ' ' + childRef.current.getChildData())
      ]);
  

      console.log("Fetched voiceID:", voiceID);
      console.log("Fetched imageBase64:", imageBase64);
      console.log("Fetched avatarBase64:", avatarBase64);

      // 只有在所有数据都正确获取后才进行下一步
      if (!voiceID || !imageBase64 || !avatarBase64) {
        alert("Failed to generate character data, please try again.");
        return;
      }

      const newCharacterData = {
        name: data.name,
        description: dataApperance.description,
        personality: data.personality,
        isPublic: "true",
        voiceID,
        avatarBase64,
        imageBase64,
      };

      console.log("Final character data:", newCharacterData);
  
      saveNewCharacter(newCharacterData).then(res => {
        alert("Character created successfully!");
      }).catch(err => {
        console.error("Error saving character:", err);
        alert("Failed to save character.");
      });

      getAllCharacters().then(data => {
        dispatch({
          type : actionType.SET_ALL_CHARACTERS,
          allCharacters: data.character,
        })
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
      <Header/>

      <div className='flex gap-8'>
        <CharacterBackgroundInput ref={childRef} className='mt-8 w-full min-h-[80%] flex-col flex items-center'/>
        <CharacterAppearanceInput ref={childRefApperance} />
        <CharacterVoiceInputs ref={childRefVoice}/>
      </div>
      
      <button className='h-auto w-auto bg-white' onClick={fetchChildData}>
        Create Character
      </button>
      
    </div>
  )
}

export default NewCharacter;