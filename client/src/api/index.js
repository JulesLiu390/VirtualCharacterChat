import axios from "axios"

const baseURL = "http://localhost:4000/";

export const saveNewCharacter = async(data) => {
    try {
        const res = axios.post(`${baseURL}api/characters/save/`, {...data});
        return (await res).data.savedCharacter;
    } catch (error) {
        return null;
    }
}

export const getAllCharacters = async() => {
    try {
        const res = await axios.get(`${baseURL}api/characters/getAll/`);
        return res.data;
    } catch (error) {
        return null;
    }
}

export const getAudio64 = async (text, voiceId) => {
    try {
        const res = await axios.post(`${baseURL}api/textToSpeech/synthesize/`, {
            text: text,
            voiceId: voiceId
        });

        return res.data.audio; // 只返回 Base64 音频数据
    } catch (error) {
        console.error("Error fetching audio:", error);
        return null;
    }
};

export const getImage64 = async (prompt) => {
    try {
        const res = await axios.post(`${baseURL}api/textToImage/generate/`, {
            "prompt": "a futuristic cyberpunk city with neon lights at night"
        });

        return res.data.image; // 只返回 Base64 音频数据
    } catch (error) {
        console.error("Error fetching image:", error);
        return null;
    }
};