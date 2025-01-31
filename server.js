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
    username: req.body.username,
    count: 0
  })
  user.save().then((data)=>{
    const dataToSend = {
      username: data.username,
      _id: data.id
    }
    res.send(dataToSend);
  })
})

app.get("/api/exercise/users", (req, res)=>{
  User.find().select("-log -count").then(data =>{
    res.send(data);
  })
})

app.post("/api/exercise/add", (req, res)=>{
  User.findById(req.body.userId).then((result =>{
    let dateToSend
    if(req.body.date === ""){
      dateToSend = new Date();
    }
    else{
      dateToSend = new Date(req.body.date)
    }
    const newData = {description: req.body.description, duration: Number(req.body.duration), date: dateToSend}
    console.log(result)
    result.log.push(newData)
    result.save().then(()=>{
      const dataToSend = {
        _id: result._id,
        username: result.username,
        date: dateToSend.toDateString(),
        duration: Number(req.body.duration),
        description: req.body.description
      }
      res.send(dataToSend);
    })
  }))
})

app.get("/api/exercise/log", (req, res)=>{
  let fromDate = 0;
  let toDate = Infinity
  if(req.query.from){
    fromDate = new Date(req.query.from).getTime();
  }
  if(req.query.to){
    toDate = new Date(req.query.to).getTime();
  }
  User.findById(req.query.userId).then((user)=>{
    user.count = user.log.length
    let userToSendLog
    if(req.query.from || req.query.to || req.query.limit){
      const limit = Number(req.query.limit) || user.count;
      userToSendLog = user.log.filter((data) => {
        console.log(data.date.getTime())
        return data.date.getTime() >= fromDate && data.date.getTime() <= toDate
      }).slice(0, limit);
    }
    else{
      userToSendLog = user.log
    }
    userToSendLog.forEach((user)=>{
      return user.date = user.date.toDateString();
    })
    const sendData = {
      _id:user._id,
      username: user.username,
      count: user.count,
      log: userToSendLog
    }
    res.send(sendData);
  })
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})