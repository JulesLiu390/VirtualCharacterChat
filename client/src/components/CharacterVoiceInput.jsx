import React, { forwardRef, useImperativeHandle, useState } from "react";
import { BsBanFill } from "react-icons/bs";
import { NewCharacterBackground } from "../assets/img";

const CharacterVoiceInputs = forwardRef((props, ref) => {
  // 独立字段
  const [formData, setFormData] = useState({
    voiceDescription: "",
  });

  // 需要合并到 description 的字段
  const voiceFields = {
    race: "",
    gender: "",
    age: "",
    language: "",
    pitch: "",
    timbre: "",
    speakingRate: "",
    intonation: "",
    speakingStyle: "",
    additionalFeatures: "",
  };

  // 额外存储 description 相关的字段
  const [voiceData, setVoiceData] = useState(voiceFields);

  // 处理输入变化
  const handleChange = (e) => {
    const { name, value } = e.target;


      // 更新 voice 相关字段
      const updatedVoiceData = {
        ...voiceData,
        [name]: value,
      };

      setVoiceData(updatedVoiceData);

      // 动态拼接 description
      const newDescription = Object.entries(updatedVoiceData)
        .filter(([_, val]) => val.trim() !== "") // 过滤掉空值
        .map(([key, val]) => `${getLabel(key)}: ${val}`) // 转成人类可读的文本
        .join("; ");

      setFormData((prevData) => ({
        ...prevData,
        voiceDescription: newDescription,
      }));
    
  };

  // 让父组件可以获取当前表单数据
  useImperativeHandle(ref, () => ({
    getChildData: () => formData,
  }));

  return (
    <div
      className="flex flex-col w-[55vh] h-[70vh] items-center justify-center rounded-3xl p-4"
      style={{
        backgroundImage: `url(${NewCharacterBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-[50vh] h-[30vh] bg-[rgba(255,255,255,0.3)] rounded-t-full flex flex-col justify-center items-center">
        <p className="text-3xl font-bold">-SETTINGS-</p>
        <p className="text-4xl font-bold">Character Voice</p>
      </div>
      <div className="w-[50vh] h-[60vh] bg-[rgba(255,255,255,0.3)] rounded-b-3xl">
        <div className="flex w-full h-full gap-8 justify-evenly">
          <div className="flex flex-col w-[80%] h-full justify-evenly">
            {/* 独立字段 */}
            {["voiceName"].map((key) => (
              <div key={key} className="w-full flex justify-between items-center">
                <div className="text-[rgba(133,119,109,1)] text-sm rounded-md bg-[rgba(245,230,211,1)] flex items-center justify-center gap-1">
                  <BsBanFill />
                  <p>{getLabel(key)}：</p>
                </div>
                <input
                  className="rounded-lg w-2/3 bg-transparent border border-gray-500"
                  type="text"
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                />
              </div>
            ))}

            {/* 其他字段合并到 description */}
            {Object.keys(voiceFields).map((key) => (
              <div key={key} className="w-full flex justify-between items-center">
                <div className="text-[rgba(133,119,109,1)] text-sm rounded-md bg-[rgba(245,230,211,1)] flex items-center justify-center gap-1">
                  <BsBanFill />
                  <p>{getLabel(key)}：</p>
                </div>
                <input
                  className="rounded-lg w-2/3 bg-transparent border border-gray-500"
                  type="text"
                  name={key}
                  value={voiceData[key]}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

// 将字段转换成人类可读的标签
const getLabel = (key) => {
  const labels = {
    voicePersonality: "Voice Personality",
    race: "Race",
    gender: "Gender",
    age: "Age",
    language: "Language & Accent",
    pitch: "Pitch",
    timbre: "Timbre",
    speakingRate: "Speaking Rate",
    intonation: "Intonation",
    speakingStyle: "Speaking Style",
    additionalFeatures: "Additional Features",
  };
  return labels[key] || key;
};

export default CharacterVoiceInputs;