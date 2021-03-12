const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require("mongoose")
const User = require("./user")
require('dotenv').config()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded());
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.post("/api/exercise/new-user", (req, res)=>{
  const user = new User({
    userName: req.body.username
  })
  user.save().then((data)=>{
    res.send(data);
  })
})

app.get("/api/exercise/users", (req, res)=>{
  User.find().then(data =>{
    res.send(data);
  })
})

app.post("/api/exercise/add", (req, res)=>{
  User.findByIdAndUpdate(req.body.userId, {description: req.body.description, duration: req.body.duration, date: req.body.date || new Date()}, {new: true})
  .then(data=>{
    res.send(data);
  }) 
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
