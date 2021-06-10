const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
const Chats = require("./models/chat.model");
const { initializeDB } = require("./config/db.config"); 

dotenv.config()
const app = express();
const PORT = process.env.PORT || 5000;

require("./config/app.config")(app);
const server = http.createServer(app);

initializeDB(process.env.URI);

// initialize io
const io = require("socket.io")(server,{
    cors:{
        origin:"*",
        method:["GET","POST"]
    }
});

// connect to socket
io.on("connection",(socket) => {
    socket.on("joinRoom",async(chatId,userId) => {
        const chat = await Chats.findById(chatId)
        if(chat.users.includes(userId)){
            socket.join(chatId)
        }
    })
    socket.on("sendMessage",(chatId,chat) => {
        io.in(chatId).emit("receiveMsg",chat)
    })
    socket.on("typing",(chatId) => {
        socket.broadcast.to(chatId).emit("typing")
    })
    socket.on("stopTyping",(chatId) => {
        socket.broadcast.to(chatId).emit("stopTyping")
    })
})

server.listen(PORT,() => console.log(`listening on port ${PORT}`));