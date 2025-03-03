const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    imageURL : {
        type : String,
        required : true,
    },
    user_id : {
        type : String,
        required : true,
    },
    email_verified : {
        type : String,
        required : true,
    },
    role : {
        type : String,
        required : true,
    },
    auth_time : {
        type : String,
        required : true,
    },
},
{ timestamps : true }
);

module.exports = mongoose.model("user", userSchema);