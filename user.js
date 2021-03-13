const mongoose = require("mongoose");
require("dotenv").config()

mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log("mongoose connected")
}).catch((e)=>{
    console.log("error: " + e)
})

const userSchema = mongoose.Schema({
    username: {type: String, required: true},
    count: Number,
    log: {type: Array, default: []}
})
userSchema.set('clean', {
    transform: (document, returnedObject) => {
      delete returnedObject.__v
    }
  })

  
module.exports = mongoose.model("User", userSchema);