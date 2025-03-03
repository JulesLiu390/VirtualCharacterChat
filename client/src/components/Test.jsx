import React, { useEffect, useState } from 'react'
import { getVertexAI, getGenerativeModel } from "firebase/vertexai";
// import {} from ""
import { app } from '../config/firebase.config';
import { useStateValue } from '../content/StateProvider';
import { actionType } from '../content/reducer';

export const Test = () => {
    const [prompt, setPrompt] = useState("")
    const [result, setResult] = useState("")
    const [{gameText}, dispatch] = useStateValue();  
    // Initialize the Vertex AI service
    const vertexAI = getVertexAI(app);
    // Initialize the generative model with a model that supports your use case
    const model = getGenerativeModel(vertexAI, { model: "gemini-2.0-flash" });
    // Wrap in an async function so you can use await

    const [history, setHistory] = useState([
        {
            role: "user",
            parts: [{ text: "Now, You are pretend as a high school girl to chat with me, thank you." }],

        },
    ]); // 聊天记录

    async function run() {
        const chat = model.startChat({
          history,
          generationConfig: {
            maxOutputTokens: 100,
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
      


    const promptChange = (e) => {
        setPrompt(e.target.value);
    }

    // useEffect(() => {
    //     // 当 count 发生变化时，更新 message
    //     setResult(gameText)
    // }, [gameText]); // 监听 count 的变化
    const send_value = () => {
        run();
    }

  
  return (
    <div>
        <textarea className='w-32 h-32' value={prompt} onChange={promptChange}></textarea>
        <button
        onClick={send_value}
        className='bg-green-100'>send</button>
        <p>{gameText || "Generating..."}</p>
    </div>
  )
}

export default Test;