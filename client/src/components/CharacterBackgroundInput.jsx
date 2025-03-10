import React, { forwardRef, useImperativeHandle, useState } from "react";
import { BsBanFill } from "react-icons/bs";
import { NewCharacterBackground } from "../assets/img";

const CharacterBackgroundInput = forwardRef((props, ref) => {
  // 独立字段
  const [formData, setFormData] = useState({
    name: "",
    personality: "",
    description: "", // description 现在是字符串
  });

  // 需要合并到 description 的字段
  const descriptionFields = {
    gender: "",
    occupation: "",
    catchphrase: "",
    favoriteItems: "",
    dislikedItems: "",
    height: "",
    weight: "",
    familyBackground: "",
    growthExperience: "",
    relationshipWithYou: "",
    characterPrototype: "",
  };

  // 额外存储 description 相关的字段
  const [descriptionData, setDescriptionData] = useState(descriptionFields);

  // 处理输入变化
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name" || name === "personality") {
      // 直接更新 name 或 personality
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      // 更新 description 相关字段
      const updatedDescriptionData = {
        ...descriptionData,
        [name]: value,
      };

      setDescriptionData(updatedDescriptionData);

      // 动态拼接 description
      const newDescription = Object.entries(updatedDescriptionData)
        .filter(([_, val]) => val.trim() !== "") // 过滤掉空值
        .map(([key, val]) => `${getLabel(key)}: ${val}`) // 转成人类可读的文本
        .join("; ");

      setFormData((prevData) => ({
        ...prevData,
        description: newDescription,
      }));
    }
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
        <p className="text-4xl font-bold">Character Sheet</p>
      </div>
      <div className="w-[50vh] h-[60vh] bg-[rgba(255,255,255,0.3)] rounded-b-3xl">
        <div className="flex w-full h-full gap-8 justify-evenly">
          <div className="flex flex-col w-[80%] h-full justify-evenly">
            {/* 独立字段 */}
            {["name", "personality"].map((key) => (
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
            {Object.keys(descriptionFields).map((key) => (
              <div key={key} className="w-full flex justify-between items-center">
                <div className="text-[rgba(133,119,109,1)] text-sm rounded-md bg-[rgba(245,230,211,1)] flex items-center justify-center gap-1">
                  <BsBanFill />
                  <p>{getLabel(key)}：</p>
                </div>
                <input
                  className="rounded-lg w-2/3 bg-transparent border border-gray-500"
                  type="text"
                  name={key}
                  value={descriptionData[key]}
                  onChange={handleChange}
                />
              </div>
            ))}

            {/* description 预览
            <div className="w-full text-sm bg-gray-100 p-2 rounded-md mt-2">
              <p><strong>Description:</strong> {formData.description || "No description yet..."}</p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
});

// 将字段转换成人类可读的标签
const getLabel = (key) => {
  const labels = {
    name: "Name",
    personality: "Personality",
    gender: "Gender",
    occupation: "Occupation",
    catchphrase: "Catchphrase",
    favoriteItems: "Favorite Items",
    dislikedItems: "Disliked Items",
    height: "Height",
    weight: "Weight",
    familyBackground: "Family Background",
    growthExperience: "Growth Experience",
    relationshipWithYou: "Relationship with You",
    characterPrototype: "Character Prototype",
  };
  return labels[key] || key;
};

export default CharacterBackgroundInput;