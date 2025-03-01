import React, { useEffect, useState } from 'react'
import Header from './Header';
import { test_img } from '../assets/img';
import {motion} from 'framer-motion'
import {FiChevronUp} from 'react-icons/fi'
import { useStateValue } from "../content/StateProvider";
import { actionType } from '../content/reducer';


export const Game = () => {
    const [{isChatBoxOpen}, dispatch] = useStateValue();  
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
        text={"Hmph! Took you long enough! Don’t get the wrong idea—I wasn’t waiting for you or anything… I just happened to be here, that’s all!"} 
        name={"???"}
        speed={50}></TextBox>
        </div>
    </div>
  )
}

const ChatBox = ({d_width, d_height}) => {
    const [{isChatBoxOpen}, dispatch] = useStateValue();  
    // const [isChatBoxOpen, setIsChatBoxOpen] = useState(false)
    const [placeholder, setPlaceholder] = useState("Type content to chat with character...");

    return (
        <motion.div className='z-50 bottom-0 w-screen items-center absolute flex justify-center flex-col'
        >

            <motion.div
                initial={{ opacity: 1, x: 0,rotate: 0 }} 
                animate={isChatBoxOpen ? { opacity: 1, y: -200, rotate: 180 } : {opacity: 1, x: 0,rotate:0}} 
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

            <motion.textarea className='font-semibold text-white text-3xl p-8 fixed bg-[rgba(128,255,128,0.3)]  border-black border rounded-3xl'
            onFocus={() => setPlaceholder("")}
            onBlur={() => setPlaceholder("Type content to chat with character...")}
            placeholder={placeholder}
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
            initial={{ opacity: 1, y:200}} 
            animate={isChatBoxOpen ? { opacity: 1, y:-50} : {opacity: 0,y:200}} 
            transition={{ duration: 0.1, ease: "easeInOut" }} // 过渡动画
            ></motion.textarea>

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