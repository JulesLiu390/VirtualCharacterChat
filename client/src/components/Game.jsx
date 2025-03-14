import React, { useEffect, useRef, useState } from 'react'
import Header from './Header';
import { test_img } from '../assets/img';
import {motion} from 'framer-motion'
import {FiChevronUp} from 'react-icons/fi'
import { useStateValue } from "../content/StateProvider";
import { actionType } from '../content/reducer';

import { getVertexAI, getGenerativeModel, Schema } from "firebase/vertexai";
import { app } from '../config/firebase.config';


export const Game = () => {
    const [prompt, setPrompt] = useState("")
    // useStateValue
    const [{isChatBoxOpen, gameText, currentCharacter, audioBase64}, dispatch] = useStateValue(); 

    const [jsonData, setJsonData] = useState(null)

    // 删除数组第一个元素
    const removeFirstChatItem = () => {
        if (jsonData?.chat && jsonData.chat.length > 0) {
            const newChatData = { ...jsonData, chat: jsonData.chat.slice(1) };
            setJsonData(newChatData);
        }
    };

    useEffect(() => {
        dispatch({
            type: actionType.SET_GAME_TEXT,
            gameText: "",
        })
    }, [])

    // Initialize the Vertex AI service
    const vertexAI = getVertexAI(app);
    // Initialize the generative model with a model that supports your use case
    const model = getGenerativeModel(vertexAI, { model: "gemini-2.0-flash" });
    // Wrap in an async function so you can use await

    const [imgWidth, setImgWidth] = useState(0)
    const [imgHeight, setImgHeight] = useState(0)


  return (
    <div className='flex flex-col h-screen'>
        <Header/>

        <div className='flex flex-1 w-full justify-center overflow-hidden'>
            <motion.img src={currentCharacter.imageBase64} className='rounded-md h-full object-contain'
                    animate={{
                        x: [0, -5, 5, -5, 5, 0], // 左右抖动
                      }}
                      transition={{
                        duration: 0.3, // 持续时间
                        repeat: 1, // 无限重复
                        ease: "easeInOut",
                      }}
            onLoad={
                (e) => {
                    setImgWidth(e.currentTarget.width)
                    setImgHeight(e.currentTarget.height)
                }
            }
            />
        </div>
        <ChatBox d_width={imgWidth} d_height={imgHeight}
        jsonData={jsonData} setJsonData={setJsonData}
        />
        <div>
        <TextBox 
        onRemoveChat={removeFirstChatItem}
        d_width={imgWidth} d_height={imgHeight} 
        text={gameText} 
        name={currentCharacter?.name}
        speed={50}></TextBox>
        </div>
    </div>
  )
}

const ChatBox = ({d_width, d_height, jsonData, setJsonData}) => {
    const [prompt, setPrompt] = useState("")
    // useStateValue
    const [{isChatBoxOpen, gameText, currentCharacter, audioBase64}, dispatch] = useStateValue();  

    // Initialize the Vertex AI service
    const vertexAI = getVertexAI(app);


    const responseSchema = Schema.object({
        properties: {
           chat: Schema.array({
             items: Schema.object({
               properties: {
                 responseContent: Schema.string(),
                 mood: Schema.string(),
               },
             }),
           }),
         }
       });

    // Initialize the generative model with a model that supports your use case
    const model = getGenerativeModel(vertexAI, { model: "gemini-2.0-flash",
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: responseSchema
          },
    });
    // Wrap in an async function so you can use await

    const firstPrompt = "Now, you are a character with informations I gave you, please chat with me in English with those informations:" + currentCharacter?.personality + ";name:" + currentCharacter?.name + "remeber, everytime your response should controled in 1 to 3 sentences."

    const [history, setHistory] = useState([
        {
            role: "user",
            parts: [{ text: firstPrompt }],
        },
        {
            role: "model",
            parts: [{ text: "可以 YES" }],

        },
    ]); // 聊天记录

    const promptChange = (e) => {
        setPrompt(e.target.value);
    }

    const [placeholder, setPlaceholder] = useState("Type content to chat with character...");

    async function processResponseSentence (sentencesJson) {
                // await jsonData.chat.length === 0;

        const text = sentencesJson.responseContent;
        await fetchAudioBase64(text);

        dispatch({
            type: actionType.SET_GAME_TEXT,
            gameText: text,
        })
        
        console.log(text);
    }

    useEffect(() => {
        if (jsonData?.chat && jsonData.chat.length > 0) {
            processResponseSentence(jsonData.chat[0]);
        }
    }, [jsonData]); // ✅ 监听 jsonData 变化

    async function sendToCharacter() {
        console.log(history)
        const chat = model.startChat({
            history,
            generationConfig: {
            maxOutputTokens: 60,
            },
        });
        console.log("prompt:",prompt)
        let result = await chat.sendMessage(prompt);
        console.log(result.response.text())
        result = await model.generateContent(result.response.text() + " 根据内容把句子分段， 以数组的形式填入json并且给出情绪");
        
        const response = await result.response.text();
        console.log(response)
        const parsedData = JSON.parse(response);
        // 添加用户消息
        const newUserMessage = { role: "user", parts: [{ text: prompt }] };
        const updatedHistory = [...history, newUserMessage]; // 更新 history


        const newAIMessage = { role: "model", parts: [{ text: result.response.text() }] };
        const finalHistory = [...updatedHistory, newAIMessage]; // 记录 AI 的回复
        setHistory(finalHistory);
        setJsonData(parsedData)

    }

    const clickSend = () => {
        console.log(prompt)
        sendToCharacter();
        setPrompt("");
        dispatch({
            type: actionType.SET_ISCHATBOX_OPEN,
            isChatBoxOpen: !isChatBoxOpen,
        })
    }

    let globalAudioElement = null;


    async function fetchAudioBase64(text) {
        console.log("test:" + text);
        const response = await fetch("http://localhost:4000/api/textToSpeech/synthesize", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            text: text,
            voiceId: currentCharacter.voiceID
          })
        });
      
        const data = await response.json();
        if (!data.success) {
          console.error("Failed to fetch audio");
          return;
        }
      
        // 手动拼接 `data:audio/mpeg;base64,`
        const audioSrc = `data:audio/mpeg;base64,${data.audio}`;
        console.log(data.audio)
      
        // 复用全局 Audio 元素
        if (!globalAudioElement) {
            globalAudioElement = document.createElement("audio");
            globalAudioElement.controls = false; // 隐藏控件
            document.body.appendChild(globalAudioElement);
        }

        globalAudioElement.src = audioSrc;
        globalAudioElement.play();
      }

    const getAudioBase64 = (text) => {

    }
    




    
    return (
        <motion.div className='z-50 bottom-0 w-screen items-center absolute flex justify-center flex-col'
        >


            <motion.div
                initial={{ opacity: 1, x: 0,rotate: 0 }} 
                animate={isChatBoxOpen ? { opacity: 1, y: -250, rotate: 180 } : {opacity: 1, x: 0,rotate:0}} 
                transition={{ duration: 0.1, ease: "easeInOut" }} // 过渡动画
            >
                <FiChevronUp className=' text-[rgba(255,255,255,0.8)] scale-x-150 scale-y-50'
                size={100}
                onClick={() => 
                    dispatch({
                        type: actionType.SET_ISCHATBOX_OPEN,
                        isChatBoxOpen: !isChatBoxOpen,
                    })}
                />
            </motion.div>



            <motion.div className='p-8 fixed flex flex-col justify-center items-center'
                        initial={{ opacity: 1, y:200}} 
                        animate={isChatBoxOpen ? { opacity: 1, y:-70} : {opacity: 0,y:200}} 
                        transition={{ duration: 0.1, ease: "easeInOut" }} // 过渡动画
            >
                <textarea className='font-semibold text-white text-3xl p-8  bg-[rgba(128,255,128,0.3)]  border-black border rounded-3xl'
                onFocus={() => setPlaceholder("")}
                onBlur={() => setPlaceholder("Type content to chat with character...")}
                placeholder={placeholder}
                value={prompt} onChange={promptChange}
                style={{
                    width: `${d_width}px`,
                    height: `${d_height/4}px`,
                    textShadow: `
                    -1px -1px 0 black,  
                    1px -1px 0 black,  
                    -1px  1px 0 black,  
                    1px  1px 0 black,  
                    -1px  0px 0 black,  
                    1px  0px 0 black,  
                    0px -1px 0 black,  
                    0px  1px 0 black`,
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    lineHeight: "2.5"
                }}

                ></textarea>

                <button className=' text-black rounded-md bg-[rgba(255,255,255,0.5)] hover:bg-[rgba(255,255,255,0.9)] w-32 '
                style={{
                    height: `${d_height/30}px`,
                }}
                onClick={clickSend}
                >
                    send
                </button>
            </motion.div>

        </motion.div>
    )
}

const TextBox = ({d_height, d_width, name, text, speed, onRemoveChat}) => {
    const [{isChatBoxOpen}, dispatch] = useStateValue();  
    
    const [currentText, setCurrentText] = useState("「」")    
    useEffect(() => {
        setCurrentText("")
        let index = 0;        
        const typingWord = setInterval(() => {
            if(index < text.length) {
                index++;
                setCurrentText("「" + text.slice(0, index) + "」");
            }         
        }, speed)
        
        return () => clearInterval(typingWord); 
    }, [speed, text])

    return (
        <motion.div
        onClick={onRemoveChat}
        initial={{opacity:1}}
        animate={isChatBoxOpen ? {opacity:0} : {opacity:1}}
        transition={{ duration: 0.1, ease: "easeInOut" }}
        className='fixed bottom-0 left-1/2 -translate-x-1/2'
        style={{
            width: `${d_width}px`,
            height: `${d_height/3}px`
        }}
        >
            <span className='text-6xl absolute ml-8 mt-3 mr-8 text-white z-50'
            style={{
                textShadow: `
                -1px -1px 0 black,  
                1px -1px 0 black,  
                -1px  1px 0 black,  
                1px  1px 0 black,  
                -1px  0px 0 black,  
                1px  0px 0 black,  
                0px -1px 0 black,  
                0px  1px 0 black
            ` }}
            >
                {name}
            </span>
            <span className='text-4xl absolute ml-8 mt-24 mr-8 text-white z-50'
            style={{
                textShadow: `
                -1px -1px 0 black,  
                1px -1px 0 black,  
                -1px  1px 0 black,  
                1px  1px 0 black,  
                -1px  0px 0 black,  
                1px  0px 0 black,  
                0px -1px 0 black,  
                0px  1px 0 black
            ` }}
            >{currentText}</span>
            <div className="w-full h-full relative bg-[rgba(128,128,255,0.5)] blur-md"/>
            
        </motion.div>
    )
}

export default Game;