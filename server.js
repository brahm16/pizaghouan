const express = require('express')
const morgan = require('morgan')
const connectDB = require('./config/db')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require("path");
const multer = require("multer");
//const socketio = require('socket.io');
//const http = require('http');
//const {addUser, removeUser, getUser, getUsersOfRoom} = require('./users')





// Config dotev
require('dotenv').config({
    path: './config/config.env'
})


const app = express()


  




// Connect to database
connectDB();

// body parser
app.use(bodyParser.json())
// Load routes
const authRouter = require('./routes/auth.route')
const userRouter = require('./routes/user.route')

// Dev Logginf Middleware
if (process.env.NODE_ENV === 'development') {
    app.use(cors({
        origin: process.env.CLIENT_URL
    }))
    app.use(morgan('dev'))
}

// Use Routes
app.use('/api', authRouter)
app.use('/api', userRouter)



app.use((req, res) => {
    res.status(404).json({
        success: false,
        msg: "Page not founded"
    })
})
const PORT = process.env.PORT || 5000
/*
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket)=>{
    socket.on('join',({name},callback)=>{
      const room="zaghouan"
      const {error, user} = addUser({id:socket.id, name, room});
  
      if(error)
        return callback(error);
  
      socket.join(user.room);
  
      //admin generated messages are called 'message'
      //welcome message for user
      socket.emit('message',{user:"admin",text:`${user.name}, welcome to the room ${user.room}`})
  
      //message to all the users of that room except the newly joined user
      socket.broadcast.to(user.room).emit('message',{user:'admin',text:`${user.name} has joined`});
  
  
      io.to(user.room).emit('roomData',{room:user.room, users:getUsersOfRoom(user.room)})
  
      callback();
    })
  
    //user generated message are called 'sendMessage'
    socket.on('sendMessage',(message, callback) => {
      const user = getUser(socket.id);
      io.to(user.room).emit('message',{user:user.name, text:message});
      io.to(user.room).emit('roomData',{room:user.room, users:getUsersOfRoom(user.room)});
  
      callback();
    })
  
    socket.on('disconnect',()=>{
      const user = removeUser(socket.id);
      if(user){
        io.to(user.room).emit('message',{user:'admin',text:`${user.name} has left.`})
      }
    })
  })
*/


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});