import React, { useEffect, useState } from 'react'
import Header from './Header';
import { test_img } from '../assets/img';
import {motion} from 'framer-motion'
import {FiChevronUp} from 'react-icons/fi'
import { useStateValue } from "../content/StateProvider";
import { actionType } from '../content/reducer';

import { getVertexAI, getGenerativeModel } from "firebase/vertexai";
import { app } from '../config/firebase.config';


export const Game = () => {

    const [prompt, setPrompt] = useState("")
    // useStateValue
    const [{isChatBoxOpen, gameText}, dispatch] = useStateValue();  

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
            <motion.img src={test_img} className='rounded-md h-full object-contain'
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
        <ChatBox d_width={imgWidth} d_height={imgHeight}/>
        <div>
        <TextBox d_width={imgWidth} d_height={imgHeight} 
        text={gameText} 
        name={"???"}
        speed={50}></TextBox>
        </div>
    </div>
  )
}

const ChatBox = ({d_width, d_height}) => {
    const [prompt, setPrompt] = useState("")
    // useStateValue
    const [{isChatBoxOpen, gameText}, dispatch] = useStateValue();  

    // Initialize the Vertex AI service
    const vertexAI = getVertexAI(app);
    // Initialize the generative model with a model that supports your use case
    const model = getGenerativeModel(vertexAI, { model: "gemini-2.0-flash" });
    // Wrap in an async function so you can use await

    const [history, setHistory] = useState([
        {
            role: "user",
            // parts: [{ text: "Now, You are pretend as a high school girl to chat with me, thank you." }],
            parts: [{ text: "现在开始，你将作为一名日本女高中生与我展开中文对话，谢谢！" }],


        },
        {
            role: "model",
            parts: [{ text: "可以" }],

        },
    ]); // 聊天记录

    const promptChange = (e) => {
        setPrompt(e.target.value);
    }



    // const [isChatBoxOpen, setIsChatBoxOpen] = useState(false)
    const [placeholder, setPlaceholder] = useState("Type content to chat with character...");

    async function sendToCharacter() {
        const chat = model.startChat({
            history,
            generationConfig: {
            maxOutputTokens: 20,
            },
        });
        
        

        const result = await chat.sendMessage(prompt);
        
        const response = await result.response;
        const text = response.text();

        // 添加用户消息
        const newUserMessage = { role: "user", parts: [{ text: prompt }] };
        const updatedHistory = [...history, newUserMessage]; // 更新 history


        const newAIMessage = { role: "model", parts: [{ text: text }] };
        const finalHistory = [...updatedHistory, newAIMessage]; // 记录 AI 的回复
        setHistory(finalHistory);
        console.log(history);
        dispatch({
            type: actionType.SET_GAME_TEXT,
            gameText: text,
        })
        console.log(text);
    }

    const clickSend = () => {
        sendToCharacter();
        setPrompt("");
        dispatch({
            type: actionType.SET_ISCHATBOX_OPEN,
            isChatBoxOpen: !isChatBoxOpen,
        })
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

const TextBox = ({d_height, d_width, name, text, speed}) => {
    const [{isChatBoxOpen}, dispatch] = useStateValue();  
    
    const [currentText, setCurrentText] = useState("「」")    
    useEffect(() => {
        setCurrentText("")
        let index = 0;        
        const typingWord = setInterval(() => {
            if(index < text.length) {
                index++;
                // console.log(index);
                setCurrentText("「" + text.slice(0, index) + "」");
                // console.log(text.slice(0, index));
                // console.log(currentText)
            }         
        }, speed)
        
        return () => clearInterval(typingWord); 
    }, [speed, text])

    return (
        <motion.div
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