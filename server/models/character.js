const mongoose = require("mongoose");

const characterSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    personality : {
        type : String,
        required : true,
    },
    isPublic : {
        type : Boolean,
        required : true,
    },
    voiceID : {
        type : String,
        required : true,
    },
    avatarBase64 : {
        type : String,
        required : true,
    },
    imageBase64 : {
        type : String,
        required : true,
    },
},
{ timestamps : true }
);

module.exports = mongoose.model("character", characterSchema);