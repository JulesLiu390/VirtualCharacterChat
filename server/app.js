require('dotenv').config();
console.log("DB_STRING:", process.env.DB_STRING);
const express = require("express");
const app = express();
const cors = require("cors"); 
const {default:mongoose } = require("mongoose")




app.use(cors({origin:true}))

app.get("/", (req, res) => {
  res.send("Hello, Node.js!");
});

// user authentication route
const userRoute = require("./routes/auth");
app.use("/api/users/", userRoute);

mongoose.connect(process.env.DB_STRING, {useNewUrlParser : true});
mongoose.connection
.once("open", () => console.log("Connected"))
.on("error", (error) => {
    console.log(`error : ${error}`);
})

app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});