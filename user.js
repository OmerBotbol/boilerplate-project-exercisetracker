const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log("mongoose connected")
}).catch((e)=>{
    console.log("error: " + e.massage)
})

const userSchema = mongoose.Schema({
    userName: {type: String, required: true}
})

module.exports = mongoose.model("User", userSchema);