const express = require("express");
const { ElevenLabsClient } = require("elevenlabs");
const dotenv = require("dotenv");

dotenv.config();

const router = express.Router();

// 辅助函数：将 Stream 转换为 Buffer
async function streamToBuffer(stream) {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

const client = new ElevenLabsClient({ apiKey: process.env.ELEVENLABS_API_KEY });

router.post("/synthesize", async (req, res) => {
  try {
    const { text, voiceId } = req.body;

    if (!text || !voiceId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const audioStream = await client.textToSpeech.convert(voiceId, {
      output_format: "mp3_44100_128",
      text: text,
      model_id: "eleven_multilingual_v2"
    });

    // 转换 Stream 为 Buffer
    const audioBuffer = await streamToBuffer(audioStream);

    // 只返回 Base64，而不包含 `data:audio/mpeg;base64,`
    const audioBase64 = audioBuffer.toString("base64");

    res.json({
      success: true,
      audio: audioBase64 // 只返回 Base64 数据
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;