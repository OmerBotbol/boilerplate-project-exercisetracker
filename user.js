const mongoose = require("mongoose");
require("dotenv").config()

mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log("mongoose connected")
}).catch((e)=>{
    console.log("error: " + e)
})

const userSchema = mongoose.Schema({
    userName: {type: String, required: true},
    description: String,
    duration: Number,
    date: Date
})

module.exports = mongoose.model("User", userSchema);