import React, { forwardRef, useImperativeHandle, useState } from "react";
import { BsBanFill } from "react-icons/bs";
import { NewCharacterBackground } from "../assets/img";

const CharacterAppearanceInput = forwardRef((props, ref) => {
  // Description fields to be merged
  const descriptionFields = {
    bodyType: "",
    skinColor: "",
    hairstyle: "",
    hairAccessory: "",
    hairColor: "",
    eyeColor: "",
    earType: "",
    decoration: "",
    facialFeatures: "",
    hat: "",
    accessories: "",
    topWear: "",
    bottomWear: "",
    others: "",
    shoes: "",
  };

  // Store form data (only description now)
  const [descriptionData, setDescriptionData] = useState(descriptionFields);
  const [description, setDescription] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update description fields
    const updatedDescriptionData = {
      ...descriptionData,
      [name]: value,
    };

    setDescriptionData(updatedDescriptionData);

    // Generate description string
    const newDescription = Object.entries(updatedDescriptionData)
      .filter(([_, val]) => val.trim() !== "")
      .map(([key, val]) => `${getLabel(key)}: ${val}`)
      .join("; ");

    setDescription(newDescription);
  };

  // Allow parent component to retrieve data
  useImperativeHandle(ref, () => ({
    getChildData: () => ({ description }),
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
        <p className="text-4xl font-bold">Character Appearance</p>
      </div>
      <div className="w-[50vh] h-[60vh] bg-[rgba(255,255,255,0.3)] rounded-b-3xl">
        <div className="flex w-full h-full gap-8 justify-evenly">
          <div className="flex flex-col w-[80%] h-full justify-evenly">
            {/* Character Appearance Fields */}
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
          </div>
        </div>
      </div>
    </div>
  );
});

// Convert fields to human-readable labels
const getLabel = (key) => {
  const labels = {
    bodyType: "Body Type",
    skinColor: "Skin Color",
    hairstyle: "Hairstyle",
    hairAccessory: "Hair Accessory",
    hairColor: "Hair Color",
    eyeColor: "Eye Color",
    earType: "Ear Type",
    decoration: "Decoration",
    facialFeatures: "Facial Features",
    hat: "Hat",
    accessories: "Accessories",
    topWear: "Top Wear",
    bottomWear: "Bottom Wear",
    others: "Others",
    shoes: "Shoes",
  };
  return labels[key] || key;
};

export default CharacterAppearanceInput;