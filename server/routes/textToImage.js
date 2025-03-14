const express = require("express");
const OpenAI = require("openai");
const dotenv = require("dotenv");


dotenv.config();

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// 文生图路由
router.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Missing required field: prompt" });
    }

    // 调用 OpenAI DALL·E 生成图片
    const response = await openai.images.generate({
      model: "dall-e-3", // 或 "dall-e-2"
      prompt: prompt,
      n: 1,
      size: "1792x1024",
      response_format: "b64_json",
    });

    // 获取生成的图片 URL
    const imageUrl = response.data[0].b64_json;

    res.json({
      success: true,
      image: imageUrl, // 返回 URL
    });
  } catch (error) {
    console.error("Image generation error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 文生图路由 avatar
router.post("/avatar", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Missing required field: prompt" });
    }

    // 调用 OpenAI DALL·E 生成头像
    const response = await openai.images.generate({
      model: "dall-e-2", // 或 "dall-e-3"
      prompt: prompt,
      n: 1,
      size: "256x256",
      response_format: "b64_json",
    });

    // 获取生成的图片 URL
    const imageUrl = response.data[0].b64_json;

    res.json({
      success: true,
      image: imageUrl, // 返回 URL
    });
  } catch (error) {
    console.error("Image generation error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;